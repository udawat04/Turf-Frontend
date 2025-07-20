import React from "react";
import AdminNavbar from "./AdminNavbar";
import AddCity from "./AddCity";
import AddTurf from "./AddTurf";
import ShowTurf from "./ShowTurf";

const MainScreen = ({ selectedView, onLogout }) => {
  return (
    <div className="w-full">
      <AdminNavbar onLogout={onLogout} />
      {selectedView === "/admin" && <AddCity />}
      {selectedView === "/admin/addground" && <AddTurf />}
      {selectedView === "/admin/showturfs" && <ShowTurf />}
    </div>
  );
};

export default MainScreen;
