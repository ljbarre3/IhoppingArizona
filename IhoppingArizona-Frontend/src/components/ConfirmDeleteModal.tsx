import { Modal, Button, TextInput, Text, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';

type ConfirmDeleteModalProps = {
    opened: boolean;
    onClose: () => void;
    onConfirm: () => void;
    resourceLabel: string;   // e.g., "IHOP Location"
};

export default function ConfirmDeleteModal({
                                               opened,
                                               onClose,
                                               onConfirm,
                                               resourceLabel,
                                           }: ConfirmDeleteModalProps) {
    const [input, setInput] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!opened) {
            setInput('');
            setError(null);
        }
    }, [opened]);

    const handleConfirm = () => {
        if (input === 'Delete') {
            onConfirm();
            onClose();
        } else {
            setError('Typed value does not match');
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={`Delete ${resourceLabel}`}
            size="md"
            centered
            overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        >
            <Stack>
                <Text>
                    To confirm deletion of <strong>{resourceLabel}</strong>, type <strong>Delete</strong> below.
                </Text>

                <TextInput
                    label={`Type "Delete"`}
                    value={input}
                    onChange={(e) => setInput(e.currentTarget.value)}
                    error={error}
                />

                <Button
                    color="red"
                    onClick={handleConfirm}
                    disabled={input !== 'Delete'}
                >
                    Delete Permanently
                </Button>
            </Stack>
        </Modal>
    );
}