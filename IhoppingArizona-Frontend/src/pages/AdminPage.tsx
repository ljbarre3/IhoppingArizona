import React, {useState} from 'react';
import {Title, Text, Container, Button, Group} from '@mantine/core';
import {useAuth0} from '@auth0/auth0-react';
import AddLocationModal from '../components/AddLocationModal.tsx';
import AddLocationReviewModal from '../components/AddLocationReviewModal.tsx';


const AdminPage: React.FC = () => {
    const { getAccessTokenSilently } = useAuth0();

    const [reviewModalOpen, setReviewModalOpened] = useState(false);
    const [locationModalOpen, setLocationModalOpened] = useState(false);

    const [createdMessage, setCreatedMessage] = useState('');

    const handleAddLocation = async (location: {
        nickname: string;
        address: string;
        latitude: number;
        longitude: number;
    }) => {
        try {
            const token = await getAccessTokenSilently();
            const res = await fetch('http://localhost:8080/api/admin/ihopLocation/addIhop', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(location),
            });

            if (res.ok) {
                setCreatedMessage('Successfully Added New Ihop Location!');
                setTimeout(() => setCreatedMessage(''), 3000);
                setLocationModalOpened(false);
            } else {
                setCreatedMessage(`Failed to Add Ihop Location: Error Code(${res.status})`);
            }
        } catch {
            setCreatedMessage(`An unexpected error occurred`);
        }
        return;
    };

    const handleAddReview = async (selectedLocationId: string,
        review: {
            locationRating: number;
            atmosphereRating: number;
            qualityRating: number;
            costRating: number;
            serviceRating: number;
        }
    ) => {
        try {
            const token = await getAccessTokenSilently();
            const res = await fetch(`http://localhost:8080/api/admin/ihopLocation/${selectedLocationId}/review/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(review),
            });

            if (res.ok) {
                setCreatedMessage('Successfully Added Review for that Ihop Location!');
                setTimeout(() => setCreatedMessage(''), 3000);
                setReviewModalOpened(false);
            } else {
                setCreatedMessage(`Failed to Add Ihop Location Review: Error Code(${res.status})`);
            }
        } catch {
            setCreatedMessage(`An unexpected error occurred`);
        }
        return;
    };

    const handleCloseLocationModal = () => {
        setLocationModalOpened(false);
    };

    const handleCloseReviewModal = () => {
        setReviewModalOpened(false);
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

            <AddLocationModal
                opened={locationModalOpen}
                onClose={handleCloseLocationModal}
                onSubmit={handleAddLocation}
            />

            <AddLocationReviewModal
                opened={reviewModalOpen}
                onClose={handleCloseReviewModal}
                onSubmit={handleAddReview}
            />

            {createdMessage && (
                <Text mt="md" color="blue">
                    {createdMessage}
                </Text>
            )}

        </Container>
    );
};

export default AdminPage;