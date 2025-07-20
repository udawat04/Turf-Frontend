import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Login from './Pages/Login'
import AdminPage from './Pages/AdminPage'
import Signup from './Pages/Signup'
import FindGround from './Pages/FindGround'
import ContactUs from './Pages/ContactUsPage'
import AboutUs from './Pages/AboutUsPage'
import AddTurf from './Components/AddTurf'
import ShowTurf from './Components/ShowTurf'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from './Components/ProtectedRoute'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/grounds" element={<FindGround />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes for Admin */}
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
      </Routes>
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
}

export default App