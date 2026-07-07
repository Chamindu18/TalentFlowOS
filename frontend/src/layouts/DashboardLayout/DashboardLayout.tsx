import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() =>
          setIsSidebarOpen(false)
        }
      />

      <main className="flex min-w-0 flex-1 flex-col">
        <Topbar
          onMenuClick={() =>
            setIsSidebarOpen(true)
          }
        />

        <div className="flex-1 p-4 lg:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}