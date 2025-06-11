import {Modal, Button, Stack, Group, NumberInput, Text, Title, TextInput} from '@mantine/core';
import {useState} from "react";

type AddIhopReviewModalProps = {
    opened: boolean;
    onClose: () => void;
    location: {
        id: number;
        address: string;
        nickname?: string;
        latitude: number;
        longitude: number;
        mainReview?: object | null;
    } | null;
    onSubmit: (selectedLocationId: string, review: {
        locationRating: number;
        atmosphereRating: number;
        qualityRating: number;
        costRating: number;
        serviceRating: number;
    }) => Promise<void>;
};

export default function AddIhopModal({ opened, onClose, onSubmit, location}: AddIhopReviewModalProps) {
    const [locationRating, setLocationRating] = useState<number | ''>('');
    const [atmosphereRating, setAtmosphereRating] = useState<number | ''>('');
    const [qualityRating, setQualityRating] = useState<number | ''>('');
    const [costRating, setCostRating] = useState<number | ''>('');
    const [serviceRating, setServiceRating] = useState<number | ''>('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!location) {
        return null;
    }

    const handleSubmit = async () => {
        if (location.mainReview) {
            setError('This IHOP already has a review. You can only add one.');
            return;
        }
        if (locationRating === '' || atmosphereRating === '' || qualityRating === '' || costRating === '' || serviceRating === '') {
            setError('All Fields are required');
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
            return await onSubmit(location.id.toString(), review);
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
                <Title order={5}>Ihop Location:</Title>
                <TextInput
                    label="Nickname"
                    value={location?.nickname || 'Unnamed IHOP'}
                    disabled
                    readOnly
                />
                <TextInput
                    label="Address"
                    value={location?.address || ''}
                    disabled
                    readOnly
                />

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
                        costRating === null ||
                        serviceRating === null
                    }>
                    Submit Review</Button>
            </Stack>
        </Modal>
    );
}