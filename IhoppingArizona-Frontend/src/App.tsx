import LandingPage from "./pages/LandingPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage.tsx";
import {Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute.tsx";
import AboutJourneyPage from "./pages/AboutJourneyPage.tsx";
import ContactUsPage from "./pages/ContactUsPage.tsx";

function App() {
  return (
      <>
          <Navbar />
          <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/admin" element= {
                  <PrivateRoute>
                    <AdminPage />
                  </PrivateRoute>}
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/Our-Journey" element={<AboutJourneyPage />} />
              <Route path="/Contact-Us" element={<ContactUsPage/>} />
          </Routes>
      </>
  )
}

export default App
