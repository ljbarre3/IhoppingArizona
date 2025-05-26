import React, {useState} from 'react';
import { Title, Text, Container, Button } from '@mantine/core';
import { useAuth0 } from '@auth0/auth0-react';



const AdminPage: React.FC = () => {

    const { getAccessTokenSilently } = useAuth0();
    const [message, setMessage] = useState<string>("");


    const handleSecureRequest = async () => {
        try {
            const token = await getAccessTokenSilently();
            const res = await fetch('http://localhost:8080/api/admin', {

                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.status === 401) {
                setMessage("Unauthorized — please log in again.");
                return;
            }

            const data = await res.text();
            setMessage(data);
        } catch (err) {
            setMessage("Unauthorized or error calling API.");
            console.error(err);
        }
    };

    return (
        <Container>
            <Title order={2} mb="md" style={{color: "white"}}>Admin Dashboard</Title>
            <Text style={{color: "white"}}> This page is protected and should only be visible to authorized users.</Text>

            <Button mt="md" onClick={handleSecureRequest}>
                Call Protected Backend
            </Button>

            {message && (
                <Text mt="md" color="blue">
                    Response: {message}
                </Text>
            )}
        </Container>
    );
};

export default AdminPage;