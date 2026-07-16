import { useState } from "react";
import { Outlet } from "react-router-dom";

import CandidateSidebar from "./CandidateSidebar";
import Sidebar from "./Sidebar";
import HiringSidebar from "./HiringSidebar";
import Topbar from "./Topbar";

import { useAuthStore } from "@/store/auth.store";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const user = useAuthStore((state) => state.user);
  const role = user?.role;

  const renderSidebar = () => {
    switch (role) {
      case "Candidate":
        return (
          <CandidateSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        );

      case "Recruiter":
        return (
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        );

      case "HiringManager":
        return (
          <HiringSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        );

      case "Admin":
        return (
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        );

      default:
        return (
          <CandidateSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {renderSidebar()}

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}