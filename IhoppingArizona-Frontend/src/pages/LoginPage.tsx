import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Loader, Center, Text } from "@mantine/core";

const LoginPage = () => {
    const { loginWithRedirect } = useAuth0();

    useEffect(() => {
        loginWithRedirect();
    }, [loginWithRedirect]);

    return (
        <Center style={{ height: '80vh', flexDirection: 'column' }}>
            <Loader size="lg" />
            <Text mt="md">Redirecting to login...</Text>
        </Center>
    );
};

export default LoginPage;