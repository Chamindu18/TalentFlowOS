import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/common/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 bg-slate-50">
        <Outlet />
      </main>
    </div>
  );
}