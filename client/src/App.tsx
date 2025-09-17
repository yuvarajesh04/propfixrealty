import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProjectDetails from "./components/ProjectDetails";
import ShowAllLocation from "./pages/ShowAllLocation";
import ProjectsPage from "./pages/Projects";
import FindByCityDataWrapper from "./mediator/City";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import AllProjectsPage from "./pages/AllProjectsPage";
import Login from "./pages/Admin/Login";
import AOS from "aos";
import "aos/dist/aos.css";
import { SpeedInsights } from "@vercel/speed-insights/react";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import AddNewProject from "./pages/Admin/AddNewProject";

function AppContent() {
  const location = useLocation();

  React.useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/projects/:category/:slug" element={<ProjectDetails />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/show-all-projects" element={<AllProjectsPage />} />
          <Route path="/show-all-locations" element={<ShowAllLocation />} />
          <Route path="/projects-in/:city" element={<FindByCityDataWrapper />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact-us" element={<Contact />}/>

          {/* Admin Routes */}
          <Route path="/admin" element={<Login />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/add-project" element={<AddNewProject />} />
          </Route>

          {/* 404 Page */}
          <Route
            path="*"
            element={
              <div className="container text-center py-5 my-5">
                <h1>Page Not Found</h1>
                <p>The page you are looking for does not exist.</p>
              </div>
            }
          />
        </Routes>
      </div>

      {/* Hide footer on login page */}
      {location.pathname !== "/admin" && <Footer />}

      <SpeedInsights route={location.pathname} />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
