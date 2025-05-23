import React from 'react';
import { Title, Text, Container } from '@mantine/core';

const AdminPage: React.FC = () => {
    console.log("Admin Page Loaded");
    return (
        <Container>
            <Title order={2} mb="md" style={{color: "white"}}>Admin Dashboard</Title>
            <Text style={{color: "white"}}> This page is protected and should only be visible to authorized users.</Text>
        </Container>
    );
};

export default AdminPage;