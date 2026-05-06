import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Layout from "./components/Layout"
import LandingPage from "./pages/LandingPage";
import WhatsApp from "./components/ui/WhatsApp";
import SchedulePage from "./pages/SchedulePage";
import AboutPage from "./pages/AboutPage";
import HowWorks from "./pages/HowWorks";
import ContactPage from "./pages/ContactPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ScrollToTop from "./components/ScrollToTop";
import ProfilePage from "./pages/user/ProfilePage";
import Dashboard from "./pages/admin/Dashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Protects admin dashboard route
const RequireAdminAuth = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return isAdmin ? children : <Navigate to="/admin-login" replace />;
};

const App = () => {
  const location = useLocation();
  const isAdminRoute =
    location.pathname.startsWith("/admin-login") ||
    location.pathname.startsWith("/dashboard");

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/how-it-works" element={<HowWorks />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        {/* admin part  */}
        <Route path="admin-login" element={<AdminLogin />} />
        <Route
          path="dashboard"
          element={
            <RequireAdminAuth>
              <Dashboard />
            </RequireAdminAuth>
          }
        />
      </Routes>
      {!isAdminRoute && <WhatsApp />}
      <ToastContainer />
    </>
  );
};

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;