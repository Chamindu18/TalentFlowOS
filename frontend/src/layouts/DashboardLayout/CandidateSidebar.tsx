import { NavLink, useNavigate } from "react-router-dom";
import { BarChart3, BriefcaseBusiness, LayoutDashboard, LogOut, Settings, User, X } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}


const navigation = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/candidate/dashboard" },
  { label: "Jobs", icon: BriefcaseBusiness, path: "/candidate/jobs" },
  { label: "Analytics", icon: BarChart3, path: "/candidate/analytics" },
  { label: "Profile", icon: User, path: "/candidate/profile" },
  { label: "Settings", icon: Settings, path: "/candidate/settings" },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={onClose} />}
      <aside className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <h1 className="text-2xl font-bold text-[#FF5B1F]">TalentFlow</h1>
          <button onClick={onClose} className="lg:hidden"><X className="h-5 w-5" /></button>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                    isActive ? "bg-[#FFF3EC] text-[#FF5B1F]" : "text-slate-600 hover:bg-slate-100"
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-slate-100 p-4">
          <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-red-500 transition-all hover:bg-red-50">
            <LogOut className="h-5 w-5" /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}