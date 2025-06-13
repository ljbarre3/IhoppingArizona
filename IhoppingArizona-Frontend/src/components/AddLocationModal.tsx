import {Modal, TextInput, Button, Stack, Group, NumberInput, Text} from '@mantine/core';
import {useState} from "react";

type AddIhopModalProps = {
    opened: boolean;
    onClose: () => void;
    onSubmit: (location: {
        nickname: string;
        address: string;
        latitude: number;
        longitude: number;
    }) => Promise<void>;
};

export default function AddIhopModal({ opened, onClose, onSubmit}: AddIhopModalProps) {
    const [nickname, setNickname] = useState('');
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState<number | ''>('');
    const [longitude, setLongitude] = useState<number | ''>('');

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {

        if (!address || latitude === '' || longitude === '') {
            setError('Address, Latitude, and Longitude are required.');
            return;
        }

        const location = {
            nickname: nickname.trim(),
            address: address.trim(),
            latitude: Number(latitude),
            longitude: Number(longitude),
        };

        try {
            setLoading(true);
            return await onSubmit(location);
        } finally {
            setLoading(false);
            resetForm();
            onClose();
        }
    };

    const handleClose = () => {
        resetForm()
        onClose();
    };

    const resetForm = () => {
        setNickname('');
        setAddress('');
        setLatitude('');
        setLongitude('');
        setError(null);
    }

    return (
        <Modal
            opened={opened}
            onClose={handleClose}
            size="lg"
            title = {
                <Text fz='lg' fw={600} style={{color: '#057dc4'}}>
                    Add a New IHOP Location
                </Text>
            }
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
                    value={address}
                    onChange={(e) => setAddress(e.currentTarget.value)}
                    required
                />
                <TextInput
                    label="Nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.currentTarget.value)}
                />

                <Group grow mt="md">
                    <NumberInput
                        label="Latitude"
                        value={latitude}
                        onChange={(value) => setLatitude(Number(value))}
                        min={-90}
                        max={90}
                        decimalScale={4}
                        hideControls
                        required
                    />
                    <NumberInput
                        label="Longitude"
                        value={longitude}
                        onChange={(value) => setLongitude(Number(value))}
                        min={-180}
                        max={180}
                        decimalScale={4}
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
                        latitude === '' ||
                        longitude === '' ||
                        address.trim() === ''
                    }>
                    Submit Location</Button>
            </Stack>
        </Modal>
    );
}