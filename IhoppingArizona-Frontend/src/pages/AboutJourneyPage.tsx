import React from "react";
import {Box, Grid, Image, Stack, Text, Title, useMantineTheme} from "@mantine/core";



const AboutJourneyPage: React.FC = () => {
    const theme = useMantineTheme();

    return (
        <Box style={{ marginBottom: "5rem", marginTop: "2Rem", width: "99%" }}>
        <Stack gap={"xl"}  >
            <Grid>
            <Grid.Col style={{textAlign: "left", color: "white", opacity: .87, boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.3)',
                borderTopLeftRadius: "1Rem",
                borderBottomLeftRadius: "1Rem",
                borderTopRightRadius: "1Rem",
                borderBottomRightRadius: "1Rem",
                }} span={8} offset={2}>
                <Box style={{position: "relative", marginLeft: "5rem", marginRight: "5rem"}}>
                <Title style={{textAlign: "center", marginBottom: "2Rem"}}>Our Journey To Arizona's <span style={{ color: theme.colors.customBlue[8] }}><b>IHOP</b></span>s</Title>
                    <Text size="xl">Nestled between the neighborhoods where many of our closest friends lived, there stood a single <span style={{ color: theme.colors.customBlue[8] }}><b>IHOP</b></span> — a quiet yet enduring presence throughout our high school and college years. It began as a convenient meeting spot, a place where we could sit down after a long day, share pancakes, and laugh into the late hours of the night.
                    <span><br/><br/></span>
                        Over time, that simple tradition grew into something more meaningful. That <span style={{ color: theme.colors.customBlue[8] }}><b>IHOP</b></span> became a symbol — a constant in the midst of change, a warm booth where friendships were rekindled, stories were told, and memories were made. It wasn’t just about the food (though the pancakes always hit the spot); it was about the connection, the comfort, and the shared joy of being together.
                    <span><br/><br/></span>
                        Now, we've set out on a mission not only to relive those moments but to honor them — by visiting all 43 <span style={{ color: theme.colors.customBlue[8] }}><b>IHOP</b></span> locations across Arizona. Each visit is a celebration of friendship, of time well spent, and of a tradition that reminds us where we’ve been and who we’ve shared it with.
                    <span><br/><br/></span>
                        This journey is our way of commemorating something small that came to mean a great deal. A tribute to the friendships that shaped us — and the pancakes that brought us back together, again and again.</Text>
                </Box>
            </Grid.Col>
        </Grid>
            <Grid>
            <Grid.Col span={4} offset={2} style={{boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.3)',
                borderTopLeftRadius: "1Rem",
                borderBottomLeftRadius: "1Rem",
            }}>
                <Image
                    src={"/src/assets/Levi_Selfie2.jpg"}
                     alt={"Picture of Levi"}
                    height={"600"}
                       radius={"md"}
                    style={{boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.3)', overflow: "hidden", objectFit: "cover"}}
                >
                </Image>
            </Grid.Col>
            <Grid.Col span={4} style={{boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.3)',
                borderTopRightRadius: "1Rem",
                borderBottomRightRadius: "1Rem",
                color: "white",
                opacity: .87,
                display: "flex",
                alignItems: "center",
            }}>
                <Box style={{margin: "1rem"}}>
                <Title>
                    Levi Barrett
                </Title>
                <Title order={4} style={{marginBottom: "2rem"}}>
                    Website Developer / <span style={{ color: theme.colors.customBlue[8] }}><b>IHOP</b></span> Connoisseur
                </Title>
                <Text size="xl">Most of the people that know me in my life know at least one thing about me. I love <span style={{ color: theme.colors.customBlue[8] }}><b>IHOP</b></span>. I have been a huge fan of the restaurant and their food
                for years now. Finally I have found a good way to show both of my passions in life, Programming and <span style={{ color: theme.colors.customBlue[8] }}><b>IHOP</b></span>. I built the website as a full stack application
                to bolster my resume but also to explore programming in a fun and unique way. Not driven by assignments and deadlines, but measured in joy and pancakes.</Text>
                </Box>
            </Grid.Col>
            </Grid>
            <Grid>
            <Grid.Col span={4} offset={2}
                style={{
                boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.3)',
                borderTopLeftRadius: "1Rem",
                borderBottomLeftRadius: "1Rem",
                color: "white",
                opacity: .87,
                display: "flex",
                alignItems: "center",
            }}>
                <Box style={{margin: "1rem"}}>
                    <Title>
                        Austin Roberts
                    </Title>
                    <Title order={4} style={{marginBottom: "2rem"}}>
                        <span style={{ color: theme.colors.customBlue[8] }}><b>IHOP</b></span> Connoisseur
                    </Title>
                    <Text size="xl">Hi, I'm Austin Roberts. I'm currently working towards my degree in Construction Management. When I'm not on the job site or in the office,
                     I'm usually at <span style={{ color: theme.colors.customBlue[8] }}><b>IHOP</b></span>. I enjoy spending time in the mountains being out in nature and trying new things.
                        My favorite of those new things being unexplored <span style={{ color: theme.colors.customBlue[8] }}><b>IHOP</b></span> locations of course.</Text>
                </Box>
            </Grid.Col>
            <Grid.Col span={4} style={{boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.3)',
                borderTopRightRadius: "1Rem",
                borderBottomRightRadius: "1Rem",
            }}>
                <Image
                    src={"/src/assets/Levi_Selfie2.jpg"}
                    alt={"Picture of Austin"}
                    height={"600"}
                    radius={"md"}
                    style={{boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.3)', overflow: "hidden", objectFit: "cover"}}
                >
                </Image>
            </Grid.Col>
        </Grid>
        </Stack>
        </Box>
    );

};

export default AboutJourneyPage;