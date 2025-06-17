import React, {useEffect, useState} from 'react';
import {Title, Text, Container, Button, Group, Table, Paper, ScrollArea, Stack} from '@mantine/core';
import {useAuth0} from '@auth0/auth0-react';
import AddLocationModal from '../components/AddLocationModal.tsx';
import AddLocationReviewModal from '../components/LocationReviewModal.tsx';
import {ReviewPayload} from "../Types/reviews.ts";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal.tsx";

type IhopLocation = {
    id: number;
    address: string;
    nickname?: string;
    latitude: number;
    longitude: number;
    mainReview?: ReviewPayload | null;
}

const AdminPage: React.FC = () => {
    const { getAccessTokenSilently } = useAuth0();

    const [reviewModalOpen, setReviewModalOpened] = useState(false);
    const [locationModalOpen, setLocationModalOpened] = useState(false);
    const [createdMessage, setCreatedMessage] = useState('');

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<IhopLocation | null>(null);
    const [deleteType, setDeleteType] = useState<'review' | 'location' | null>(null);


    const [locations, setLocations] = useState<IhopLocation[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<IhopLocation | null>(null);

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const token = await getAccessTokenSilently();
            const res = await fetch('http://localhost:8080/api/admin/ihopLocation/list/with-main-reviews', {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error('Failed to fetch locations');

            const data = await res.json();
            setLocations(data);
        } catch (err) {
            console.error('Error fetching locations:', err);
        }
    };

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
                fetchLocations();
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
            notesHtml: string;
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
                fetchLocations();
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

    const handleEditReview = async (selectedLocationId: string,
                                   review: {
                                       locationRating: number;
                                       atmosphereRating: number;
                                       qualityRating: number;
                                       costRating: number;
                                       serviceRating: number;
                                       notesHtml: string;
                                   }
    ) => {
        try {
            const token = await getAccessTokenSilently();
            const res = await fetch(`http://localhost:8080/api/admin/ihopLocation/${selectedLocationId}/review/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },

                body: JSON.stringify(review),
            });
            if (res.ok) {
                setCreatedMessage('Successfully edited Review for that Ihop Location!');
                fetchLocations();
                setTimeout(() => setCreatedMessage(''), 3000);
                setReviewModalOpened(false);
            } else {
                setCreatedMessage(`Failed to Edit Ihop Location Review: Error Code(${res.status})`);
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

    const handleDeleteReview = async (locationId: number) => {
        try {
            const token = await getAccessTokenSilently();
            const res = await fetch(`http://localhost:8080/api/admin/ihopLocation/${locationId}/review/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(locationId),
            });

            if (res.ok) {
                setCreatedMessage('Successfully deleted Review for that Ihop Location!');
                fetchLocations();
                setTimeout(() => setCreatedMessage(''), 3000);
                setReviewModalOpened(false);
            } else {
                setCreatedMessage(`Failed to delete Ihop Location Review: Error Code(${res.status})`);
            }
        } catch {
            setCreatedMessage(`An unexpected error occurred`);
        }
        return;
    };

    const handleDeleteLocation = async (locationId: number) => {
        try {
            const token = await getAccessTokenSilently();
            const res = await fetch(`http://localhost:8080/api/admin/ihopLocation/delete/${locationId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(locationId),
            });

            if (res.ok) {
                setCreatedMessage('Successfully deleted Ihop Location!');
                fetchLocations();
                setTimeout(() => setCreatedMessage(''), 3000);
                setReviewModalOpened(false);
            } else {
                setCreatedMessage(`Failed to delete Ihop Location: Error Code(${res.status})`);
            }
        } catch {
            setCreatedMessage(`An unexpected error occurred`);
        }
        return;
    };

    const handleConfirmedDelete = async () => {
        if (!deleteTarget || !deleteType)
            return;

        if (deleteType === 'location') {
            await handleDeleteLocation(deleteTarget.id)
        } else if (deleteType === 'review') {
            await handleDeleteReview(deleteTarget.id)
        }

        setDeleteModalOpen(false);
        setDeleteType(null);
        setDeleteTarget(null)
    }

    const rows = locations.map((loc) => (
        <Table.Tr key={loc.id} bg="transparent">
            <Table.Td
            style = {{
                maxWidth:"10rem",
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }}
            >
                {loc.nickname || '—'}
            </Table.Td>
            <Table.Td
                style = {{
                    maxWidth:"10rem",
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                {loc.address}
            </Table.Td>
            <Table.Td
                style = {{
                    maxWidth:"10rem",
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                {loc.latitude.toFixed(4)}
            </Table.Td>
            <Table.Td
                style = {{
                    minwidth:"10rem",
                    maxWidth:"1rem",
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                {loc.longitude.toFixed(4)}
            </Table.Td>
            <Table.Td>
                <Stack gap="xs">
                    <Button size="xs" onClick={() => { setSelectedLocation(loc); setReviewModalOpened(true); }}>
                        {loc.mainReview ? 'Edit Review' : 'Add Review'}
                    </Button>
                    <Button
                        style={{
                            backgroundColor: '#FFD43B',
                            color: 'black',
                            opacity: loc.mainReview ? 1 : 0.5,
                            pointerEvents: loc.mainReview ? 'auto' : 'none',
                            cursor: loc.mainReview ? 'pointer' : 'not-allowed',
                        }}
                        size="xs"
                        color="yellow"
                        onClick={() => {
                            if (!loc.mainReview) return;
                            setDeleteType('review');
                            setDeleteTarget(loc)
                            setDeleteModalOpen(true);
                        }}>
                            Delete Review
                    </Button>
                    <Button size="xs" color="red" onClick={() => {
                        setDeleteTarget(loc);
                        setDeleteType('location')
                        setDeleteModalOpen(true);
                    }}>
                        Delete Location
                    </Button>
                </Stack>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Container>
            <Title order={2} mb="md" style={{color: "white"}}>Admin Dashboard</Title>
            <Text style={{color: "white"}}> This page is protected and should only be visible to authorized
                users.</Text>

            <Group mt="md">

            <Button mt="md" onClick={() => setLocationModalOpened(true)}>Add New Location</Button>
                {createdMessage && (
                    <Text mt="md" color="blue">
                        {createdMessage}
                    </Text>
                )}
            </Group>

            <Paper shadow="md" radius="lg" p="md" bg="transparent" style={{ color: 'white' }}>
                <ScrollArea>
                    <Table
                        highlightOnHover
                        withTableBorder
                        withColumnBorders
                        borderColor={"customBlue.8"}>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Nickname</Table.Th>
                                <Table.Th>Address</Table.Th>
                                <Table.Th>Latitude</Table.Th>
                                <Table.Th>Longitude</Table.Th>
                                <Table.Th>Actions</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                </ScrollArea>
            </Paper>

            <AddLocationModal
                opened={locationModalOpen}
                onClose={handleCloseLocationModal}
                onSubmit={handleAddLocation}
            />

            <AddLocationReviewModal
                opened={reviewModalOpen}
                onClose={handleCloseReviewModal}
                onSubmit={selectedLocation?.mainReview ? handleEditReview : handleAddReview}
                location={selectedLocation}
                mode={selectedLocation?.mainReview ? 'edit' : 'add'}
            />

            <ConfirmDeleteModal
                opened={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={() => {handleConfirmedDelete()}}
                resourceLabel= {deleteType === 'location' ? 'ihop Location' : 'review'}
                />
        </Container>
    );
};

export default AdminPage;