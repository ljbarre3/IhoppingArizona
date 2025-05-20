import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider, createTheme} from "@mantine/core";
import App from './App.tsx'
import '@mantine/core/styles.css';
import "./styles/background.pcss";

const theme = createTheme({
    colors: {
        customBlue: [
            "#e6f8ff",
            "#d1edfe",
            "#a2d9fa",
            "#70c4f7",
            "#4bb2f5",
            "#36a7f4",
            "#29a1f5",
            "#1b8cdb",
            "#057dc4", //Ihop Blue
            "#006cae"
        ],
        customRed: [
            "#ffe9eb",
            "#ffd3d4",
            "#f7a5a8",
            "#f07378",
            "#eb4a4f",
            "#e83036",
            "#e72128", //Ihop Red
            "#ce131c",
            "#b80b17",
            "#a10011"
        ],

    },
    primaryColor: "customBlue", // Change this to customize the primary color
    fontFamily: "Inter, sans-serif", // Custom font
    headings: { fontFamily: "Poppins, sans-serif" }, // Headings font
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <MantineProvider theme={theme} defaultColorScheme="light">
          <App />
      </MantineProvider>
  </StrictMode>,
)
