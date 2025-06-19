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
            const res = await fetch(`${baseUrl}:8080/api/contact/submit`, {
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
        <div style={{marginTop:"4Rem"}} >
        <Grid justify="center" >
            <Grid.Col span={4} >
                <form onSubmit={handleSubmit}>
                    <Stack gap={"50"} align="center" style={{marginRight:"2rem"}}>
                    <Grid gutter={20} >
                        <Grid.Col span={6} >
                            <TextInput
                                label={"First Name:"}
                                labelProps={{ style:
                                        {color: "white", opacity: 0.87}}}
                                size={"sm"}
                                radius={"md"}
                                placeholder={"Your first name"}
                                value={firstName}
                                onChange={(e) => setFirstName(e.currentTarget.value)}
                            >
                            </TextInput>
                        </Grid.Col>

                        <Grid.Col span={6} style={{borderRight:"solid 2px #057dc4"}}>
                            <TextInput
                                label={"Last Name:"}
                                labelProps={{ style:
                                        {color: "white", opacity: 0.87}}}
                                size={"sm"}
                                radius={"md"}
                                placeholder={"Your last name"}
                                value={lastName}
                                onChange={(e) => setLastName(e.currentTarget.value)}
                            >
                            </TextInput>
                        </Grid.Col>


                        <Grid.Col span={12} style={{borderRight:"solid 2px #057dc4"}}>
                            <TextInput
                                label={"Email Address:"}
                                labelProps={{ style:
                                        {color: "white", opacity: 0.87}}}
                                size={"sm"}
                                radius={"md"}
                                placeholder={"Your Email Address"}
                                type={"email"}
                                value={email}
                                onChange={(e) => setEmail(e.currentTarget.value)}
                            >
                            </TextInput>
                        </Grid.Col>
                        <Grid.Col span={12} style={{borderRight:"solid 2px #057dc4"}}>
                            <Textarea
                                label={"Please Share your Thoughts?"}
                                labelProps={{ style:
                                        {color: "white", opacity: 0.87}}}
                                radius={"md"}
                                size={"xl"}
                                autosize
                                minRows={4}
                                maxRows={10}
                                placeholder={"Your thoughts here"}
                                value={feedback}
                                onChange={(e) => setFeedback(e.currentTarget.value)}
                            >
                            </Textarea>
                        </Grid.Col>
                        <Grid.Col span={8} offset={4} style={{borderRight:"solid 2px #057dc4"}}>
                            <Button radius={"md"} w={"50%"} type="submit" loading={loading}>Submit</Button>
                        </Grid.Col>
                    </Grid>
                    </Stack>
                    </form>
            </Grid.Col>
            <Grid.Col span={3} style={{alignContent: "center"}}>
                <Stack gap={"50"} style={{marginLeft: "2Rem"}} >
                    <div>
                        <Title style={{color: "white",
                            opacity: .87, textAlign: "center", marginBottom: "1.5Rem"}}>Contact Us</Title>
                        <Text style={{color: "white",
                            opacity: .87, marginBottom: "1.5Rem"}}> Have questions, feedback, or just want to connect?
                            <span><br/> <br/></span>
                            Fill out the form to the left and we’ll get back to you as soon as we’ve cleared our next plate of pancakes.
                            Thanks for joining us on this journey!
                        </Text>
                    </div>
                </Stack>
            </Grid.Col>
        </Grid>
        <Grid justify="center">
            <Grid.Col span={2} offset={3}>
                {success && (
                    <Box>
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
            <Grid.Col span={6}>
            </Grid.Col>
        </Grid>

        </div>
    );
};

export default ContactUsPage;