
import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import MainScreen from "../Components/MainScreen";
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const [selectedView, setSelectedView] = useState("/admin"); // default view
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();
    // Example user info (replace with real user data)
    const user = {
      name: "Admin User",
      role: "Administrator",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg"
    };
    const handleLogout = () => {
      // Clear session/token (customize as needed)
      localStorage.clear();
      sessionStorage.clear();
      navigate('/login');
    };
    const sidebarWidth = isSidebarOpen ? 288 : 80; // 72px or 20px (Tailwind w-72/w-20)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex">
        <div
          style={{ width: sidebarWidth }}
          className="h-screen fixed top-0 left-0 z-30"
        >
          <Sidebar
            isOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            onSelect={setSelectedView}
            activePath={selectedView}
            onLogout={handleLogout}
            user={user}
          />
        </div>
        <main className="flex-1" style={{ marginLeft: sidebarWidth }}>
          <MainScreen selectedView={selectedView} onLogout={handleLogout} />
        </main>
      </div>
    );
}

export default AdminPage;