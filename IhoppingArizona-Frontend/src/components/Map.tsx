import {APIProvider, Map, AdvancedMarker} from '@vis.gl/react-google-maps';
import {Button, Container, Paper} from "@mantine/core";
import { useState } from "react";

const ihopMarkerIcon = "/src/assets/icons8-pancake-stack-48.png";


const mapWrapperStyle: React.CSSProperties = {
    width: "100%",
    height: "800px",
    position: "relative", // ✅ Allows sidebar to be positioned within this div
    overflow: "hidden",
};

const mapContainerStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
};

const sidebarStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    right: 0,
    width: "50%", // ✅ Sidebar is limited to the map div
    height: "100%",
    backgroundColor: "#ffffff",
    padding: "20px",
    boxShadow: "-2px 0px 10px rgba(0, 0, 0, 0.1)",
    zIndex: 10,
    transition: "transform 0.3s ease-in-out",
    transform: "translateX(100%)", // ✅ Starts hidden
};

const center = {
    lat: 34.0489, //Center of Arizona
    lng: -111.093,
};

const ihopLocations = [
    { lat: 33.46184467434575, lng: -112.16970427916937 }, // 51st Ave and the I-10
    { lat: 33.63917152288028, lng: -112.35443101668382 }, // Bell Rd and Towne Center Dr
    { lat: 33.475394663127545, lng: -112.22003505524115 }, // 75th and West Encanto Blvd
    { lat: 33.32046744314331, lng: -111.97531910975655}, // I-10 and Ray rd
    { lat: 33.56511149064939, lng: -112.28770528920981 }, // Olive and 107th Ave
    { lat: 33.71173561286699, lng: -112.27415425968385}, // Happy Valley road and lake pleasant pkwy
    { lat: 33.06549202826899, lng: -112.04709123718631}, // East Edison Road and the Maricopa Rd
    { lat: 33.43679030073408, lng: -111.72018619297903}, // Brown Rd and higley road
    { lat: 35.208186762570044, lng: -111.61037111398267}, // Route 66 and 4th Street flagstaff
    { lat: 33.47519424055215, lng: -111.9865860741758} // Oak St and 44th Street

];

export default function GoogleMap() {
    const [selectedIHOP, setSelectedIHOP] = useState<{ lat: number; lng: number } | null>(null);

    return (
        <Container size="xl" my="xl" style={{ display: "flex", justifyContent: "center" }}>
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <div style={mapWrapperStyle}>
                    <Map style={mapContainerStyle} defaultCenter={center} defaultZoom={7} mapId="your-map-style-id">
                        {ihopLocations.map((location, index) => (
                            <AdvancedMarker
                                key={index}
                                position={location}
                                onClick={() => setSelectedIHOP(location)}
                            >
                                <img src={ihopMarkerIcon} alt="IHOP Marker" width={40} height={40} />
                            </AdvancedMarker>
                        ))}
                    </Map>

                    <div
                        style={{
                            ...sidebarStyle,
                            transform: selectedIHOP ? "translateX(0%)" : "translateX(100%)"
                        }}
                    >
                        <Paper style={{ padding: "20px" }}>
                            <h2>IHOP Information</h2>
                            <p><strong>Latitude:</strong> {selectedIHOP?.lat}</p>
                            <p><strong>Longitude:</strong> {selectedIHOP?.lng}</p>
                            <Button onClick={() => setSelectedIHOP(null)} color="red" mt="md">
                                Close
                            </Button>
                        </Paper>
                    </div>
                </div>
            </APIProvider>
        </Container>
    );
}
