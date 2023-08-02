import { Sidebar, Navbar, Dashboard } from "../components";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";

const AdminPanel = () => {
  const { showSidebar, setShowSidebar } = useAppContext();
  return (
    <div className="flex flex-row">
      {<Sidebar showSidebar={showSidebar} />}
      <div className="w-full h-screen overflow-y-scroll">
        <Navbar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
