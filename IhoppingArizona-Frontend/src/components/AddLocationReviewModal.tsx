import {Modal, Button, Stack, Group, NumberInput, Text, Title, Select} from '@mantine/core';
import {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";

type AddIhopReviewModalProps = {
    opened: boolean;
    onClose: () => void;
    onSubmit: (selectedLocationId: string, review: {
        locationRating: number;
        atmosphereRating: number;
        qualityRating: number;
        costRating: number;
        serviceRating: number;
    }) => Promise<void>;
};

type IhopLocationOption = {
    id: string;
    address: string;
    nickname?: string;
};

export default function AddIhopModal({ opened, onClose, onSubmit}: AddIhopReviewModalProps) {
    const { getAccessTokenSilently } = useAuth0();
    const [selectedLocationId, setSelectedLocationId] = useState<string | ''>('');
    const [locationRating, setLocationRating] = useState<number | ''>('');
    const [atmosphereRating, setAtmosphereRating] = useState<number | ''>('');
    const [qualityRating, setQualityRating] = useState<number | ''>('');
    const [costRating, setCostRating] = useState<number | ''>('');
    const [serviceRating, setServiceRating] = useState<number | ''>('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [ihopLocations, setIhopLocations] = useState<{ value: string; label: string }[]>([]);
    const [reviewedLocationIds, setReviewedLocationIds] = useState<Set<string>>(new Set());



    useEffect(() => {
        if (opened) {
            fetchIhopLocations();
            fetchReviewedLocationIds();
        }
    }, [opened]);

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

    const fetchReviewedLocationIds = async () => {
        try {
            const token = await getAccessTokenSilently();
            const res = await fetch('http://localhost:8080/api/admin/ihopLocation/list/with-main-reviews', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Failed to fetch reviewed IHOP locations');
            const data: { id: number }[]  = await res.json();
            const ids = new Set<string>(data.map((loc: { id: number }) => loc.id.toString()));
            setReviewedLocationIds(ids);
        } catch (e) {
            console.error('Error fetching IHOP locations: ', e);
        }
    }

    const handleSubmit = async () => {
        if (reviewedLocationIds.has(selectedLocationId)) {
            setError('This IHOP already has a review. You can only add one.');
            return;
        }
        if (locationRating === '' || atmosphereRating === '' || qualityRating === '' || costRating === '' || serviceRating === '') {
            setError('Address, Latitude, and Longitude are required.');
            return;
        }
        const review = {
            locationRating: Number(locationRating),
            atmosphereRating: Number(atmosphereRating),
            qualityRating: Number(qualityRating),
            costRating: Number(costRating),
            serviceRating: Number(serviceRating),
        };

        try {
            setLoading(true);
            return await onSubmit(selectedLocationId, review);
        } finally {
            setLoading(false);
            resetForm()
            onClose();
        }
    };

    const handleClose = () => {
        resetForm()
        onClose();
    };

    const resetForm = () => {
        setLocationRating('');
        setAtmosphereRating('');
        setQualityRating('');
        setCostRating('');
        setServiceRating('');
        setError(null);
    }

    return (
        <Modal
            opened={opened}
            onClose={handleClose}
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
                <Select label="Select IHOP Location"
                        data={ihopLocations.map(loc => ({
                            ...loc,
                            disabled: reviewedLocationIds.has(loc.value)
                        }))}
                        value={selectedLocationId}
                        onChange={(val) => setSelectedLocationId(val!)}
                        required />

                <Title order={5} mt="md" mb={-5}>
                    Ratings (out of 10)
                </Title>

                <Group grow mt="md">

                    <NumberInput
                        label="Location (Out of 3)"
                        value={locationRating}
                        onChange={(value) => setLocationRating(Number(value))}
                        allowDecimal={false}
                        min={0}
                        max={3}
                        hideControls
                        required
                    />
                    <NumberInput
                        label="Atmosphere"
                        value={atmosphereRating}
                        onChange={(value) => setAtmosphereRating(Number(value))}
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
                        value={qualityRating}
                        onChange={(value) => setQualityRating(Number(value))}
                        allowDecimal={false}
                        min={0}
                        max={10}
                        hideControls
                        required
                    />
                    <NumberInput
                        label="Cost Rating"
                        value={costRating}
                        onChange={(value) => setCostRating(Number(value))}
                        allowDecimal={false}
                        min={0}
                        max={10}
                        hideControls
                        required
                    />
                    <NumberInput
                        label="Service Rating"
                        value={serviceRating}
                        onChange={(value) => setServiceRating(Number(value))}
                        allowDecimal={false}
                        min={0}
                        max={10}
                        hideControls
                        required
                    />
                </Group>

                {error && (
                    <Text mt="md" color="blue">
                        {error}
                    </Text>
                )}

                <Button
                    fullWidth
                    color="customBlue.8"
                    radius="md"
                    onClick={handleSubmit}
                    loading={loading}
                    disabled={
                        loading ||
                        qualityRating === null ||
                        locationRating === null ||
                        atmosphereRating === null ||
                        selectedLocationId === null ||
                        costRating === null ||
                        serviceRating === null
                    }>
                    Submit Review</Button>
            </Stack>
        </Modal>
    );
}