import { useState } from "react";
import { Outlet } from "react-router-dom";
import RecruiterSidebar from "./RecruiterSidebar";
import HiringSidebar from "./HiringSidebar";
import Topbar from "./Topbar";
import { useAuthStore } from "@/store/auth.store";

export default function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const user = useAuthStore((state) => state.user);
    const isHiringManager = user?.role === "HiringManager";

    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            {/* FIXED SIDEBAR - Never moves */}
            <div className="fixed left-0 top-0 h-screen z-50">
                {isHiringManager ? (
                    <HiringSidebar
                        isOpen={isSidebarOpen}
                        onClose={() => setIsSidebarOpen(false)}
                    />
                ) : (
                    <RecruiterSidebar
                        isOpen={isSidebarOpen}
                        onClose={() => setIsSidebarOpen(false)}
                    />
                )}
            </div>

            {/* MAIN CONTENT - Pushes to the right */}
            <main className="ml-72 flex-1 flex flex-col min-h-screen">
                <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
                <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}