import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import AdminPage from "./Pages/AdminPage";
import FindGround from "./Pages/FindGround";
import ContactUs from "./Pages/ContactUsPage";
import AboutUs from "./Pages/AboutUsPage";
import AddTurf from "./Components/AddTurf";
import ShowTurf from "./Components/ShowTurf";
import UserProfile from "./Components/UserProfile";
import AdminManagement from "./Components/AdminManagement";
import ProtectedRoute from "./Components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TurfDetails from "./Pages/TurfDetails";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!token ? <Signup /> : <Navigate to="/" />}
        />

        {/* Public Routes (Require Login) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/grounds"
          element={
            <ProtectedRoute>
              <FindGround />
            </ProtectedRoute>
          }
        />
        <Route
          path="/grounds/:id"
          element={
            <ProtectedRoute>
              <TurfDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <ContactUs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <AboutUs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes (Login + Admin Role Required) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/addground"
          element={
            <ProtectedRoute role="admin">
              <AddTurf />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/showturfs"
          element={
            <ProtectedRoute role="admin">
              <ShowTurf />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/management"
          element={
            <ProtectedRoute role="admin">
              <AdminManagement />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Toast Notification */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
};

export default App;
