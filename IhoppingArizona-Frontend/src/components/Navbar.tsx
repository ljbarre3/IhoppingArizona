import { Container, Group, Title, Button, useMantineTheme} from "@mantine/core";

export default function Navbar() {
    const theme = useMantineTheme();

    return (
        <Container size="lg" py="md">
            <Title order={1} text-align="center">
                <span style={{ color: theme.colors.customBlue[8] }}>IHOP</span><span style={{ color: theme.colors.customRed[6] }}>ping Arizona</span> {/* IHOP Red */}
            </Title>
            <Group justify="center">
                <Button style={{ color: theme.colors.customBlue[8] }} variant="subtle">Map</Button>
                <Button style={{ color: theme.colors.customBlue[8] }} variant="subtle">About Our Journey</Button>
                <Button style={{ color: theme.colors.customBlue[8] }} variant="subtle">Contact Us</Button>
            </Group>
        </Container>
    );
}