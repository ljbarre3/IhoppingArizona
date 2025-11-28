import React, {useState} from "react";
import {Box, Button, Grid, Stack, Text, Textarea, TextInput, Title, Notification} from "@mantine/core";
import DOMPurify from "dompurify";



const ContactUsPage: React.FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [feedback, setFeedback] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const baseUrl = import.meta.env.VITE_BACKEND_URL;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (firstName === '' || lastName === '' || email === '' || feedback === '') {
            setError('All Fields are required');
            setLoading(false);
            return;
        }

        try {
            const sanitizedFirstName = sanitizeText(firstName);
            const sanitizedLastName = sanitizeText(lastName);
            const sanitizedEmail = sanitizeText(email);
            const sanitizedFeedback = sanitizeText(feedback);

            const payload = {
                firstName: sanitizedFirstName,
                lastName: sanitizedLastName,
                email: sanitizedEmail,
                feedback: sanitizedFeedback,
            }

            console.log(payload);
            const res = await fetch(`${baseUrl}/api/contact/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                throw new Error('Failed to send message');
            }

            setSuccess(true);
            setFirstName('');
            setLastName('');
            setEmail('');
            setFeedback('');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    const sanitizeText = (input: string | null | undefined): string => {
        return DOMPurify.sanitize(input ?? '', {
            ALLOWED_TAGS: [],
            ALLOWED_ATTR: [],
        }).trim();
    };

    return (
        <div style={{ marginTop: "4rem" }}>
            <Grid
                justify="center"
                align="stretch"
                gutter="xl"
                style={{ maxWidth: 1000, margin: "0 auto" }}
            >
                <Grid.Col
                    span={{ base: 12, md: 5 }}
                    order={{ base: 0, md: 1 }}
                    style={{
                        alignContent: "center",
                        marginTop: "1rem",
                    }}
                >
                    <Stack gap="md" style={{ marginLeft: "1rem" }}>
                        <div>
                            <Title
                                style={{
                                    color: "white",
                                    opacity: 0.87,
                                    textAlign: "center",
                                    marginBottom: "1.5rem",
                                }}
                            >
                                Contact Us
                            </Title>
                            <Text
                                style={{
                                    color: "white",
                                    opacity: 0.87,
                                    marginBottom: "1.5rem",
                                }}
                            >
                                Have questions, feedback, or just want to connect?
                                <br />
                                <br />
                                Fill out the form below and we’ll get back to you as soon as
                                we’ve cleared our next plate of pancakes. Thanks for joining us
                                on this journey!
                            </Text>
                        </div>
                    </Stack>
                </Grid.Col>
                <Grid.Col
                    span={{ base: 12, md: 7 }}
                    order={{ base: 1, md: 0 }}
                >
                    <form onSubmit={handleSubmit}>
                        <Stack gap="xl" align="stretch" style={{ marginRight: "1rem" }}>
                            <Grid gutter={20}>
                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                    <TextInput
                                        label="First Name:"
                                        labelProps={{
                                            style: { color: "white", opacity: 0.87 },
                                        }}
                                        size="sm"
                                        radius="md"
                                        placeholder="Your first name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.currentTarget.value)}
                                    />
                                </Grid.Col>

                                <Grid.Col
                                    span={{ base: 12, sm: 6 }}
                                    style={{ borderRight: "solid 2px #057dc4" }}
                                >
                                    <TextInput
                                        label="Last Name:"
                                        labelProps={{
                                            style: { color: "white", opacity: 0.87 },
                                        }}
                                        size="sm"
                                        radius="md"
                                        placeholder="Your last name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.currentTarget.value)}
                                    />
                                </Grid.Col>

                                <Grid.Col
                                    span={12}
                                    style={{ borderRight: "solid 2px #057dc4" }}
                                >
                                    <TextInput
                                        label="Email Address:"
                                        labelProps={{
                                            style: { color: "white", opacity: 0.87 },
                                        }}
                                        size="sm"
                                        radius="md"
                                        placeholder="Your Email Address"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.currentTarget.value)}
                                    />
                                </Grid.Col>

                                <Grid.Col
                                    span={12}
                                    style={{ borderRight: "solid 2px #057dc4" }}
                                >
                                    <Textarea
                                        label="Please Share your Thoughts?"
                                        labelProps={{
                                            style: { color: "white", opacity: 0.87 },
                                        }}
                                        radius="md"
                                        size="md"
                                        autosize
                                        minRows={4}
                                        maxRows={10}
                                        placeholder="Your thoughts here"
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.currentTarget.value)}
                                    />
                                </Grid.Col>

                                <Grid.Col
                                    span={12}
                                    style={{
                                        borderRight: "solid 2px #057dc4",
                                        display: "flex",
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <Button
                                        radius="md"
                                        w={{ base: "100%", sm: "50%" }}
                                        type="submit"
                                        loading={loading}
                                    >
                                        Submit
                                    </Button>
                                </Grid.Col>
                            </Grid>
                        </Stack>
                    </form>
                </Grid.Col>
            </Grid>
            <Grid
                justify="center"
                style={{ maxWidth: 800, margin: "1.5rem auto 0 auto" }}
            >
                <Grid.Col span={12}>
                    {success && (
                        <Box mb="sm">
                            <Notification color="green" onClose={() => setSuccess(false)}>
                                Message sent successfully!
                            </Notification>
                        </Box>
                    )}

                    {error && (
                        <Box>
                            <Notification color="red" onClose={() => setError(null)}>
                                {error}
                            </Notification>
                        </Box>
                    )}
                </Grid.Col>
            </Grid>
        </div>
    );
};

export default ContactUsPage;
