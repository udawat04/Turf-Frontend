import { MapPin, PlusCircle, ListOrdered, Menu, X, LogOut, User, ChevronDown } from "lucide-react";
import React, { useState } from "react";

const Sidebar = ({ toggleSidebar, isOpen, onSelect, activePath, onLogout, user }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuItems = [
    { icon: <MapPin size={22} />, text: "Add City", path: "/admin" },
    { icon: <PlusCircle size={22} />, text: "Add Turf", path: "/admin/addground" },
    { icon: <ListOrdered size={22} />, text: "Show Turfs", path: "/admin/showturfs" },
  ];

  return (
    <aside
      className={`bg-white border-r border-gray-200 shadow-lg ${isOpen ? "w-72" : "w-20"} min-h-screen flex flex-col justify-between transition-all duration-300`}
    >
      <div>
        {/* Logo & App Name */}
        <div className="flex items-center gap-3 px-6 py-6">
          <img
            src="https://groundbox.in/assets/images/logo.png"
            alt="GroundBox Logo"
            className="w-10 h-10 rounded-full shadow"
          />
          {isOpen && <span className="text-2xl font-bold tracking-wide text-orange-500">Ground<span className="text-green-500">Box</span> Admin</span>}
        </div>
        {/* Toggle Button */}
        <div className={`flex ${isOpen ? "justify-end" : "justify-center"} px-4 pb-2`}>
          <button
            onClick={toggleSidebar}
            className={`rounded-full p-2 hover:bg-orange-50 transition ${!isOpen && "rotate-180"}`}
            aria-label="Toggle sidebar"
          >
            {!isOpen ? <Menu color="#ff6600" /> : <X color="#ff6600" />}
          </button>
        </div>
        {/* Menu List */}
        <nav className="mt-6">
          <ul className="space-y-2">
            {menuItems.map(({ icon, text, path }, index) => (
              <li
                key={index}
                className={`flex items-center gap-4 px-6 py-3 rounded-lg cursor-pointer transition-all ${activePath === path ? "bg-orange-100 text-orange-600 font-semibold shadow" : "text-gray-600 hover:bg-green-50 hover:text-green-600"}`}
                onClick={() => onSelect(path)}
              >
                <span className="text-xl">{icon}</span>
                {isOpen && <span>{text}</span>}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* User Section */}
      <div className="relative px-6 py-8">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setUserMenuOpen(v => !v)}>
          <img
            src={user?.avatar || "https://randomuser.me/api/portraits/men/75.jpg"}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-green-400 shadow"
          />
          {isOpen && (
            <div className="flex flex-col">
              <span className="text-gray-800 font-semibold">{user?.name || "Admin User"}</span>
              <span className="text-xs text-gray-400">{user?.role || "Administrator"}</span>
            </div>
          )}
          <ChevronDown className={`ml-auto text-orange-500 transition-transform ${userMenuOpen ? "rotate-180" : "rotate-0"}`} size={18} />
        </div>
        {userMenuOpen && (
          <div className="absolute left-0 bottom-16 w-full bg-white rounded-lg shadow-lg py-2 z-20 animate-fade-in">
            <button className="block w-full text-left px-4 py-2 hover:bg-orange-50 text-orange-600 font-semibold" onClick={onLogout}>
              <LogOut size={18} className="inline mr-2 text-red-500" /> Logout
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
