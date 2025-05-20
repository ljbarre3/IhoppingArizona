## IHOPping Arizona

**IHOPping Arizona** is a full-stack web application built to document a journey across the state of Arizona to visit and review every IHOP restaurant. This project is both a personal adventure log and a technical showcase — blending creative storytelling with professional-level development across the frontend and backend.

---

## Project Overview

- **Frontend:** Built with **React + TypeScript**, styled using **Mantine UI**, and powered by **Vite** for fast builds. It features a custom-themed landing page and an interactive map using the **Google Maps JavaScript API**.
- **Backend:** Powered by **Java Spring Boot**, using **PostgreSQL** for data persistence and **RabbitMQ** for future automation/messaging features.

The application tracks visited IHOP locations, provides visual feedback, and shows what our reviews of those locations are.

---

## Key Features

- Interactive map of IHOP locations in Arizona with custom styles and animated UI transitions
- Review logging for each IHOP location, showing which ones have been visited
- Sidebar info panel that overlays restaurant details on the map
- Custom theming with color palettes based on IHOP branding
- Full-stack architecture integrating Spring Boot APIs and a React frontend in a clean monorepo structure

---

## Project Structure
 
<pre>ihopping-arizona/
├── IhoppingArizona-Frontend/ # React + TypeScript + Mantine + Vite
│ ├── public/
│ ├── src/
│ ├── package.json
│ └── vite.config.ts
├── IhoppingArizona-Backend/ # Java Spring Boot + PostgreSQL + RabbitMQ
│ ├── src/
│ ├── build.gradle
│ └── application.properties
└── README.md</pre>

## Contributing
This is a personal capstone-style project, but contributions or feature suggestions are welcome.
