import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar.tsx";
import Topbar from "./Topbar.tsx";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}