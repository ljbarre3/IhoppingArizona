import React, {useEffect, useState} from 'react';
import {Title, Text, Container, Button, Modal, Stack, TextInput, NumberInput, Group, Select} from '@mantine/core';
import {useAuth0} from '@auth0/auth0-react';


const AdminPage: React.FC = () => {
    const { getAccessTokenSilently } = useAuth0();

    type LocationFormData = {
        address: string;
        nickname: string;
        latitude: number | null;
        longitude: number | null;
    };

    type ReviewFormData = {
        selectedLocationId: string,
        locationRating: number | null;
        atmosphereRating: number | null;
        qualityRating: number | null;
        costRating: number | null;
        serviceRating: number | null;
    };

    type IhopLocationOption = {
        id: string;
        address: string;
        nickname?: string;
    };

    const [locationModalOpen, setLocationModalOpened] = useState(false);
    const [reviewModalOpen, setReviewModalOpened] = useState(false);

    const [locationFormData, setLocationFormData] = useState<LocationFormData>({
        address: '',
        nickname: '',
        latitude: null,
        longitude: null,
    });

    const [reviewFormData, setReviewFormData] = useState<ReviewFormData>({
        selectedLocationId: '',
        locationRating: null,
        atmosphereRating: null,
        qualityRating: null,
        costRating: null,
        serviceRating: null,
    });

    const [ihopLocations, setIhopLocations] = useState<{ value: string; label: string }[]>([]);

    const fetchIhopLocations = async () => {
        try {
            const token = await getAccessTokenSilently();
            const res = await fetch('http://localhost:8080/api/admin/ihopLocation/list', {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) {
                throw new Error(`Failed to fetch IHOP locations: ${res.statusText}`);
            }

            const data: IhopLocationOption[] = await res.json();

            const options = data.map((loc) => ({
                value: loc.id.toString(),
                label: loc.nickname ? `${loc.nickname} (${loc.address})` : loc.address,
            }));

            setIhopLocations(options);
        } catch (error) {
            console.error('Error fetching IHOP locations:', error);
        }
    };

    useEffect(() => {
        if (reviewModalOpen) fetchIhopLocations();
    }, [reviewModalOpen]);

    const [locationResponseMessage, setLocationResponseMessage] = useState('');
    const [reviewResponseMessage, setReviewResponseMessage] = useState('');

    const [createdMessage, setCreatedMessage] = useState('');

    const handleLocationChange = <K extends keyof LocationFormData>(key: K, value: LocationFormData[K]) => {
        setLocationFormData((prev) => ({...prev, [key]: value}));
    };

    const handleReviewChange = <K extends keyof ReviewFormData>(key: K, value: ReviewFormData[K]) => {
        setReviewFormData((prev) => ({...prev, [key]: value}));
    };

    const handleLocationSubmit = async () => {

        const isInvalid = Object.entries(locationFormData).some(([key, value]) => {
            if (key === 'address' || key === 'nickname') return false;
            return value === null;
        });

        if (isInvalid) {
            setLocationResponseMessage('Please fill out all required fields.');
            return;
        }

        try {
            const token = await getAccessTokenSilently();
            const res = await fetch('http://localhost:8080/api/admin/ihopLocation/addIhop', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(locationFormData),
            });

            if (res.ok) {
                setLocationResponseMessage('');
                setCreatedMessage('Successfully Added New Ihop Location!');
                setTimeout(() => setCreatedMessage(''), 3000);
                setLocationModalOpened(false);
                setLocationFormData({
                    address: '',
                    nickname: '',
                    latitude: null,
                    longitude: null,
                });
            } else {
                const data = await res.text();
                setLocationResponseMessage(`Error: ${data}`);
            }
        } catch (err) {
            setLocationResponseMessage(`Request failed: ${err}`);
        }
    };

    const handleReviewSubmit = async () => {
        const { selectedLocationId, ...ratings } = reviewFormData;
        if (!selectedLocationId || Object.values(ratings).some(val => val === null)) {
            setReviewResponseMessage('Please select a location and fill all ratings.');
            return;
        }

        try {
            const token = await getAccessTokenSilently();
            const res = await fetch(`http://localhost:8080/api/admin/ihopLocation/${selectedLocationId}/review/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(reviewFormData),
            });

            if (res.ok) {
                setReviewResponseMessage('');
                setCreatedMessage('Successfully Added Review for that Ihop Location!');
                setTimeout(() => setCreatedMessage(''), 3000);
                setReviewModalOpened(false);
                setReviewFormData({
                    selectedLocationId: '',
                    locationRating: null,
                    atmosphereRating: null,
                    qualityRating: null,
                    costRating: null,
                    serviceRating: null,
                });
            } else {
                const data = await res.text();
                setReviewResponseMessage(`Error: ${data}`);
            }
        } catch (err) {
            setReviewResponseMessage(`Request failed: ${err}`);
        }
    };

    return (
        <Container>
            <Title order={2} mb="md" style={{color: "white"}}>Admin Dashboard</Title>
            <Text style={{color: "white"}}> This page is protected and should only be visible to authorized
                users.</Text>

            <Group mt="md">

            <Button mt="md" onClick={() => setLocationModalOpened(true)}>Add New Location</Button>
            <Button mt="md" onClick={() => setReviewModalOpened(true)}>Add Review</Button>
            </Group>

            <Modal
                opened={locationModalOpen}
                onClose={() => setLocationModalOpened(false)}
                title={
                    <Title order={3} style={{color: "#057dc4", fontWeight: 600}}>
                        Add a New IHOP Location
                    </Title>
                }
                size="lg"
                centered
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
                radius="md"
            >
                <Stack mt="md">
                    <TextInput
                        label="Address"
                        value={locationFormData.address}
                        onChange={(e) => handleLocationChange('address', e.currentTarget.value)}
                    />
                    <TextInput
                        label="Nickname"
                        value={locationFormData.nickname}
                        onChange={(e) => handleLocationChange('nickname', e.currentTarget.value)}
                    />

                    <Group grow mt="md">
                        <NumberInput
                            label="Latitude"
                            value={locationFormData.latitude as number}
                            onChange={(value) => handleLocationChange('latitude', value === '' || value === null ? null : Number(value))}
                            min={-90}
                            max={90}
                            decimalScale={4}
                            hideControls
                            required
                        />
                        <NumberInput
                            label="Longitude"
                            value={locationFormData.longitude as number}
                            onChange={(value) => handleLocationChange('longitude', value === '' || value === null ? null : Number(value))}
                            min={-180}
                            max={180}
                            decimalScale={4}
                            hideControls
                            required
                        />
                    </Group>

                    {locationResponseMessage && (
                        <Text mt="md" color="blue">
                            {locationResponseMessage}
                        </Text>
                    )}

                    <Button
                        fullWidth
                        color="customBlue.8"
                        radius="md"
                        onClick={handleLocationSubmit}
                        disabled={
                            locationFormData.latitude === null ||
                            locationFormData.longitude === null ||
                            locationFormData.address === null
                        }>
                        Submit Location</Button>
                </Stack>
            </Modal>


            <Modal
                opened={reviewModalOpen}
                onClose={() => setReviewModalOpened(false)}
                title={
                    <Title order={3} style={{color: "#057dc4", fontWeight: 600}}>
                        Add a New IHOP Location Review
                    </Title>
                }
                size="lg"
                centered
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
                radius="md"
            >
                <Stack mt="md">
                <Select label="Select IHOP Location" data={ihopLocations} value={reviewFormData.selectedLocationId} onChange={(val) => setReviewFormData({ ...reviewFormData, selectedLocationId: val! })} required />

                    <Title order={5} mt="md" mb={-5}>
                        Ratings (out of 10)
                    </Title>

                <Group grow mt="md">

                    <NumberInput
                        label="Location (Out of 3)"
                        value={reviewFormData.locationRating as number}
                        onChange={(value) => handleReviewChange('locationRating', value === '' || value === null ? null : Number(value))}
                        allowDecimal={false}
                        min={0}
                        max={3}
                        hideControls
                        required
                    />
                    <NumberInput
                        label="Atmosphere"
                        value={reviewFormData.atmosphereRating as number}
                        onChange={(value) => handleReviewChange('atmosphereRating', value === '' || value === null ? null : Number(value))}
                        allowDecimal={false}
                        min={0}
                        max={10}
                        hideControls
                        required
                    />
                </Group>

                <Group grow mt="md">
                    <NumberInput
                        label="Quality Rating"
                        value={reviewFormData.qualityRating as number}
                        onChange={(value) => handleReviewChange('qualityRating', value === '' || value === null ? null : Number(value))}
                        allowDecimal={false}
                        min={0}
                        max={10}
                        hideControls
                        required
                    />
                    <NumberInput
                        label="Cost Rating"
                        value={reviewFormData.costRating as number}
                        onChange={(value) => handleReviewChange('costRating', value === '' || value === null ? null : Number(value))}
                        allowDecimal={false}
                        min={0}
                        max={10}
                        hideControls
                        required
                    />
                    <NumberInput
                        label="Service Rating"
                        value={reviewFormData.serviceRating as number}
                        onChange={(value) => handleReviewChange('serviceRating', value === '' || value === null ? null : Number(value))}
                        allowDecimal={false}
                        min={0}
                        max={10}
                        hideControls
                        required
                    />
                </Group>

                {reviewResponseMessage && (
                    <Text mt="md" color="blue">
                        {reviewResponseMessage}
                    </Text>
                )}

                <Button
                    fullWidth
                    color="customBlue.8"
                    radius="md"
                    onClick={handleReviewSubmit}
                    disabled={
                        reviewFormData.qualityRating === null ||
                        reviewFormData.locationRating === null ||
                        reviewFormData.atmosphereRating === null ||
                        reviewFormData.selectedLocationId === null ||
                        reviewFormData.costRating === null ||
                        reviewFormData.serviceRating === null
                    }>
                    Submit Review</Button>
                </Stack>
            </Modal>

            {createdMessage && (
                <Text mt="md" color="blue">
                    {createdMessage}
                </Text>
            )}

        </Container>
    );
};

export default AdminPage;