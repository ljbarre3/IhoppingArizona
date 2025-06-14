import {APIProvider, Map, AdvancedMarker} from '@vis.gl/react-google-maps';
import {Button, Container, Paper, Title, Text, Progress} from "@mantine/core";
// @ts-expect-error Error is needed for future development.
import {useState, useEffect, JSX} from "react";
import PancakeReview from '../components/PancakeReview';
// @ts-expect-error Error is needed for future development.
import {FinalPancakeStack} from '../components/FinalPancakeStack';

const ihopMarkerIcon = "/src/assets/icons8-pancake-stack-48.png";



const mapWrapperStyle: React.CSSProperties = {
    width: "100%",
    height: "800px",
    position: "relative",
    overflow: "hidden",
    paddingBottom: "2rem",
};

const mapContainerStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
};

const sidebarStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    right: 0,
    width: "50%",
    height: "100%",
    backgroundColor: "#ffffff",
    padding: "20px",
    boxShadow: "-2px 0px 10px rgba(0, 0, 0, 0.1)",
    zIndex: 10,
    transition: "transform 0.3s ease-in-out",
    transform: "translateX(100%)",
};

const center = {
    lat: 34.0489, //Center of Arizona
    lng: -111.093,
};

type IhopLocation = {
    id: number;
    address: string;
    nickname?: string;
    latitude: number;
    longitude: number;
    mainReview?: MainReview | null;
}

type MainReview = {
    locationRating: number;
    atmosphereRating: number;
    qualityRating: number;
    costRating: number;
    serviceRating: number;
    finalScore: number;
}

export default function GoogleMap() {
    const [ihopLocations, setIhopLocations] = useState<IhopLocation[]>([]);
    const [selectedIhopLocation, setSelectedIhopLocation] = useState<IhopLocation | null>(null);


    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const res = await fetch('http://localhost:8080/api/admin/ihopLocation/list/with-main-reviews', {});
                if (!res.ok) throw new Error('Failed to fetch IHOP locations');
                const data: IhopLocation[] = await res.json();
                const formatted = data.map((loc) => ({
                    id: loc.id,
                    latitude: loc.latitude,
                    longitude: loc.longitude,
                    address: loc.address,
                    nickname: loc.nickname,
                    mainReview: loc.mainReview ?? null,
                }));
                setIhopLocations(formatted);
            } catch (err) {
                console.error('Error loading locations:', err);
            }
        };

        fetchLocations();
    }, []);

    {/*function getFinalPancakeEmoji (percent: number) : JSX.Element {
        switch (true) {
            case percent < 25:
                return <img src="/src/assets/25percent.svg" alt={"Sad Pancake"} height={32} />;
            case percent < 50:
                return <img src="/src/assets/50percent.svg" alt={"Neutral Pancake"} height={32}/>;
            case percent < 75:
                return <img src="/src/assets/75percent.svg" alt={"Good Pancake"} height={32}/>;
            case percent < 90:
                return <img src="/src/assets/90percent.svg" alt={"Better Pancake"} height={32}/>;
            default:
                return <img src="/src/assets/BestPancake.svg" alt={"Best Pancake"} height={32}/>;
        }
    }*/}

    const renderSyrupScore = () => {
        if (!selectedIhopLocation || !selectedIhopLocation.mainReview) return null;
        const percent = Math.round((selectedIhopLocation.mainReview.finalScore / 43) * 100);

        return (
            <div style={{ position: 'relative', width: '100%' }}>
            <Progress
                size="lg"
                value = {Math.round((selectedIhopLocation.mainReview.finalScore / 43) * 100)}
                color={"#eca24d"}>
            </Progress>
            <img
                src="/src/assets/maple-syrup.png"
                alt="Syrup Bottle"
                style = {{
                    position: "absolute",
                    top: '-8px',
                    height: '24px',
                    left: `calc(${percent}% - 12px)`,
                    transition: 'left 0.3s ease',
                }}
            />
        </div>
        )
    }

    return (
        <Container size="xl" my="xl" style={{ display: "flex", justifyContent: "center" }}>
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <div style={mapWrapperStyle}>
                    <Map style={mapContainerStyle} defaultCenter={center} defaultZoom={7} mapId="your-map-style-id">
                        {ihopLocations.map((location) => (
                            <AdvancedMarker
                                key={location.id}
                                position={{lat: location.latitude, lng: location.longitude}}
                                onClick={() => setSelectedIhopLocation(location)}
                            >
                                <img
                                    src={ihopMarkerIcon}
                                    alt="IHOP Marker"
                                    width={40}
                                    height={40}
                                    style={{
                                        filter: location.mainReview ? 'none' : 'grayscale(100%)',
                                    }}
                                />
                            </AdvancedMarker>
                        ))}
                    </Map>

                    <div
                        style={{
                            ...sidebarStyle,
                            transform: selectedIhopLocation ? "translateX(0%)" : "translateX(100%)"
                        }}
                    >
                        <Paper p="lg">
                            <Text fw={700} fz="lg">{selectedIhopLocation?.address}</Text>
                            <Text fz="sm" c="dimmed" mb="md">{selectedIhopLocation?.nickname || 'Unnamed Location'}</Text>
                            {selectedIhopLocation?.mainReview ? (
                                <>
                                    <Title order={4} mb="xs">Overall Score: {`${Math.round((selectedIhopLocation.mainReview.finalScore / 43) * 100)}%`} ({selectedIhopLocation.mainReview.finalScore}/43)</Title>

                                    {renderSyrupScore()}
                                    {/*<FinalPancakeStack finalScore={selectedIhopLocation.mainReview.finalScore}></FinalPancakeStack> */}

                                    {[
                                        { label: "Location", value: selectedIhopLocation.mainReview.locationRating, max: 3 },
                                        { label: "Atmosphere", value: selectedIhopLocation.mainReview.atmosphereRating },
                                        { label: "Quality", value: selectedIhopLocation.mainReview.qualityRating },
                                        { label: "Cost", value: selectedIhopLocation.mainReview.costRating },
                                        { label: "Service", value: selectedIhopLocation.mainReview.serviceRating },
                                    ].map(({ label, value, max = 10 }) => (
                                        <div key={label} style={{ marginBottom: 16 }}>
                                            <Text fw={600}>{label} ({value}/{max})</Text>
                                            <PancakeReview count={value} max={max} size={30} />
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <Text c="gray">No review yet for this location.</Text>
                            )}

                            <Button onClick={() => setSelectedIhopLocation(null)} color="red" fullWidth mt="xl">
                                Close
                            </Button>
                        </Paper>
                    </div>
                </div>
            </APIProvider>
        </Container>
    );
}
