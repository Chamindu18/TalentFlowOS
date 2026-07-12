import { useState } from "react";
import { Outlet } from "react-router-dom";

// 🔄 Import BOTH sidebars now
import Sidebar from "./Sidebar"; 
import HiringSidebar from "./HiringSidebar"; 
import Topbar from "./Topbar";

// 🔐 Import your auth store to read who is currently logged in
import { useAuthStore } from "@/store/auth.store";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 🕵️‍♂️ Extract the current logged-in user object from your state store
  const user = useAuthStore((state) => state.user);

  // 🎯 Check if the user explicitly matches your Hiring Manager role profile
  const isHiringManager = user?.role === "HiringManager";

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      
      {/* 🔄 Dynamic Role Swap logic */}
      {isHiringManager ? (
        <HiringSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      ) : (
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}

      <main className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="flex-1 p-4 lg:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}