import { Bell, ChevronDown } from "lucide-react";
import React, { useState } from "react";

const AdminNavbar = ({ onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <header className="bg-white h-16 shadow flex items-center justify-between px-4 border-b border-gray-200">
      {/* Title */}
      <div className="flex items-center gap-3">
        <img
          src="
https://groundbox.in/media/loader1-OHXGJQ5F.png"
          alt="GroundBox Logo"
          className="w-20 h-16  shadow"
        />
        <span className="text-xl font-bold text-orange-500 tracking-wide">
          Ground<span className="text-green-500">Box</span> Admin
        </span>
      </div>
      {/* Actions */}
      <div className="flex items-center gap-4 relative">
        <button className="rounded-full p-2 bg-orange-50 hover:bg-orange-100 transition shadow text-orange-500">
          <Bell size={22} />
        </button>
        <button
          className="flex items-center gap-2 rounded-full p-1 bg-green-50 hover:bg-green-100 transition shadow border border-green-200"
          onClick={() => setDropdownOpen((v) => !v)}
        >
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            className="w-8 h-8 rounded-full border-2 border-green-400"
            alt="Admin"
          />
          <ChevronDown size={16} className="text-green-600" />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 top-14 bg-white border rounded-lg shadow-lg py-2 w-40 z-10 animate-fade-in">
            <button className="block w-full text-left px-4 py-2 hover:bg-green-50 text-gray-700">
              Profile
            </button>
            <button
              onClick={onLogout}
              className="block w-full text-left px-4 py-2 hover:bg-orange-50 text-orange-600 font-semibold"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminNavbar;
