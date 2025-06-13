import {Modal, Button, Stack, Group, NumberInput, Text, Title, TextInput} from '@mantine/core';
import {useEffect, useState} from "react";
import {ReviewPayload} from "../Types/reviews.ts";

type ReviewModalProps = {
    opened: boolean;
    onClose: () => void;
    mode: 'add' | 'edit';
    location: {
        id: number;
        address: string;
        nickname?: string;
        latitude: number;
        longitude: number;
        mainReview?: ReviewPayload | null;
    } | null;
    onSubmit: (selectedLocationId: string, review: ReviewPayload) => Promise<void>;
};

export default function ReviewModal({ opened, onClose, onSubmit, location, mode}: ReviewModalProps) {
    const [originalReview, setOriginalReview] = useState<ReviewPayload | null>(null);
    const [locationRating, setLocationRating] = useState<number | ''>('');
    const [atmosphereRating, setAtmosphereRating] = useState<number | ''>('');
    const [qualityRating, setQualityRating] = useState<number | ''>('');
    const [costRating, setCostRating] = useState<number | ''>('');
    const [serviceRating, setServiceRating] = useState<number | ''>('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (opened && mode === 'edit' && location?.mainReview) {
            setOriginalReview(location.mainReview);
            setLocationRating(location.mainReview.locationRating);
            setAtmosphereRating(location.mainReview.atmosphereRating);
            setQualityRating(location.mainReview.qualityRating);
            setCostRating(location.mainReview.costRating);
            setServiceRating(location.mainReview.serviceRating);
        } else if (opened && mode === 'add') {
            resetForm();
        }
    }, [opened, mode, location]);

    if (!location) {
        return null;
    }

    const handleSubmit = async () => {
        if (mode === 'add' && location.mainReview) {
            setError("This IHOP already has a review. You can only add one");
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
        setOriginalReview(null);
        setLocationRating('');
        setAtmosphereRating('');
        setQualityRating('');
        setCostRating('');
        setServiceRating('');
        setError(null);
    }

    const hasChanges = (): boolean => {
        if (mode === 'add') return true; // always allow adding
        if (!originalReview) return true;

        return (
            originalReview.locationRating !== Number(locationRating) ||
            originalReview.atmosphereRating !== Number(atmosphereRating) ||
            originalReview.qualityRating !== Number(qualityRating) ||
            originalReview.costRating !== Number(costRating) ||
            originalReview.serviceRating !== Number(serviceRating)
        );
    };

    return (
        <Modal
            opened={opened}
            onClose={handleClose}
            title = {
            <Text fz="lg" fw={600} style={{color: "#057dc4"}}>
                {mode === 'add' ? 'Add a New IHOP Review' : 'Edit IHOP Review'}
            </Text>}
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
                        serviceRating === null ||
                        !hasChanges()
                    }>
                    {mode === 'add' ? 'Submit Review' : 'Update Review'}</Button>
            </Stack>
        </Modal>
    );
}