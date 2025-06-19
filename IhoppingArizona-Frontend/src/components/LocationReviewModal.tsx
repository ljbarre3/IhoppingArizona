import {Modal, Button, Stack, Group, NumberInput, Text, Title, TextInput} from '@mantine/core';
import {useEffect, useState} from "react";
import {ReviewPayload} from "../Types/reviews.ts";
import { RichTextEditor} from "@mantine/tiptap";
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import { FileInput } from '@mantine/core';
import {useAuth0} from "@auth0/auth0-react";

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
    const { getAccessTokenSilently } = useAuth0();
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    
    const [originalReview, setOriginalReview] = useState<ReviewPayload | null>(null);
    const [locationRating, setLocationRating] = useState<number | ''>('');
    const [atmosphereRating, setAtmosphereRating] = useState<number | ''>('');
    const [qualityRating, setQualityRating] = useState<number | ''>('');
    const [costRating, setCostRating] = useState<number | ''>('');
    const [serviceRating, setServiceRating] = useState<number | ''>('');
    const [notes, setNotes] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const editor = useEditor({
        extensions: [StarterKit, Underline, Highlight],
        content: '',
        onUpdate: ({ editor }) => {
            setNotes(editor.getHTML());
        },
    });

    useEffect(() => {
        if(!opened || !editor) return;

        if (opened && mode === 'edit' && location?.mainReview) {
            setOriginalReview(location.mainReview);
            setLocationRating(location.mainReview.locationRating);
            setAtmosphereRating(location.mainReview.atmosphereRating);
            setQualityRating(location.mainReview.qualityRating);
            setCostRating(location.mainReview.costRating);
            setServiceRating(location.mainReview.serviceRating);
            setNotes(location.mainReview.notesHtml ?? '');
            if (location.mainReview.imageFile) {
                setImageFile(location.mainReview.imageFile);
            }


            editor.commands.setContent(location.mainReview.notesHtml ?? '');
        }
        if (mode === 'add') {
            resetForm();
            editor.commands.setContent('');
        }
    }, [opened, editor, mode, location]);

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
            notesHtml: notes,
        };

        try {
            setLoading(true);
            await onSubmit(location.id.toString(), review);
            if (imageFile) {
                const token = await getAccessTokenSilently();
                const formData = new FormData();
                formData.append('file', imageFile);
                await fetch(`${baseUrl}/api/admin/ihopLocation/review/${location.id}/upload-image`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });
            }
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
        setNotes('');
        setImageFile(null);
        setError(null);
    }

    const hasChanges = (): boolean => {
        if (mode === 'add') return true; // always allow adding
        if (!originalReview) return true;

        const imageFileChanged = !!imageFile && originalReview.imageFile?.name !== `/uploads/${imageFile.name}`;

        return (
            originalReview.locationRating !== Number(locationRating) ||
            originalReview.atmosphereRating !== Number(atmosphereRating) ||
            originalReview.qualityRating !== Number(qualityRating) ||
            originalReview.costRating !== Number(costRating) ||
            originalReview.serviceRating !== Number(serviceRating) ||
            originalReview?.notesHtml !== notes ||
            imageFileChanged
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

                <Title order={5} mt="lg">Notes</Title>
                <RichTextEditor editor={editor} variant="subtle">
                    <RichTextEditor.Toolbar sticky stickyOffset="var(--docs-header-height)">
                        <RichTextEditor.ControlsGroup>
                            <RichTextEditor.Bold />
                            <RichTextEditor.Italic />
                            <RichTextEditor.Underline />
                            <RichTextEditor.Strikethrough />
                            <RichTextEditor.ClearFormatting />
                            <RichTextEditor.Highlight />
                        </RichTextEditor.ControlsGroup>
                    </RichTextEditor.Toolbar>

                    <RichTextEditor.Content style={{ minHeight: 100 }}/>
                </RichTextEditor>

                <FileInput
                    label="Upload Ihop Location Image:"
                    placeholder="Choose image"
                    accept="image/*"
                    onChange={(file) => setImageFile(file)}
                />

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
                        notes === null ||
                        !hasChanges()
                    }>
                    {mode === 'add' ? 'Submit Review' : 'Update Review'}</Button>
            </Stack>
        </Modal>
    );
}