import { NavLink, useNavigate } from "react-router-dom";
import {
  BarChart3,
  BriefcaseBusiness,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
  X,
  Calendar,
  ClipboardCheck,
  Handshake,
  MessageSquare,
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// 🌐 Core Platform Navigation Links
const generalNavigation = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/hiring/dashboard",
  },
  {
    label: "Jobs",
    icon: BriefcaseBusiness,
    path: "/jobs",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    path: "/analytics",
  },
];

// 💼 New Specialized Hiring Tools
const hiringNavigation = [
  {
    label: "Interviews",
    icon: Calendar,
    path: "/hiring/interviews",
  },
  {
    label: "Evaluations",
    icon: ClipboardCheck,
    path: "/hiring/evaluations",
  },
  {
    label: "Interview Feedback", // 🎯 Added this missing entry
    icon: MessageSquare,        // Make sure MessageSquare is imported from 'lucide-react'
    path: "/hiring/feedback",   // Lowercase 'f' to match your router file exactly
  },
  {
    label: "Final Decisions",
    icon: Handshake,
    path: "/hiring/decisions",
  },
];

// ⚙️ System Profile Controls
const systemNavigation = [
  {
    label: "Profile",
    icon: User,
    path: "/hiring/profile", // 🎯 Update from "/profile"
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/hiring/settings", // 🎯 Update from "/settings"
  },
];

export default function HiringSidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Shared reusable helper layout builder for mapping link collections
  const renderNavLinks = (items: typeof generalNavigation) =>
    items.map((item) => {
      const Icon = item.icon;
      return (
        <NavLink
          key={item.label}
          to={item.path}
          onClick={onClose}
          className={({ isActive }) => `
            flex
            items-center
            gap-3
            rounded-2xl
            px-4
            py-3
            text-sm
            font-semibold
            transition-all
            duration-300
            ${
              isActive
                ? "bg-[#FFF3EC] text-[#FF5B1F]"
                : "text-slate-600 hover:bg-slate-100"
            }
          `}
        >
          <Icon className="h-5 w-5" />
          {item.label}
        </NavLink>
      );
    });

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <h1 className="text-2xl font-bold text-[#FF5B1F]">TalentFlow</h1>
          <button onClick={onClose} className="lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Wrapper Panel */}
        <nav className="flex-1 space-y-6 overflow-y-auto p-4">
          
          {/* Section 1: Core System overview */}
          <div className="space-y-1">
            <p className="px-4 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Overview
            </p>
            {renderNavLinks(generalNavigation)}
          </div>

          {/* Section 2: Dedicated Hiring Operations Module */}
          <div className="space-y-1">
            <p className="px-4 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Hiring Suite
            </p>
            {renderNavLinks(hiringNavigation)}
          </div>

          {/* Section 3: User Configurations */}
          <div className="space-y-1">
            <p className="px-4 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Management
            </p>
            {renderNavLinks(systemNavigation)}
          </div>

        </nav>

        {/* Logout Footer Container */}
        <div className="border-t border-slate-100 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-red-500 transition-all duration-300 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}