import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Briefcase,
    FileText,
    Users,
    User,
    Settings,
    BarChart3,
    LogOut,
    X
} from "lucide-react";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const navItems = [
    {
        path: "/recruiter/dashboard",
        icon: LayoutDashboard,
        label: "Dashboard",
    },
    {
        path: "/recruiter/jobs",
        icon: Briefcase,
        label: "Jobs",
    },
    {
        path: "/recruiter/applications",
        icon: FileText,
        label: "Applications",
    },
    {
        path: "/recruiter/candidates",
        icon: Users,
        label: "Candidates",
    },
    {
        path: "/recruiter/analytics",
        icon: BarChart3,
        label: "Analytics",
    },
    {
        path: "/recruiter/profile",
        icon: User,
        label: "Profile",
    },
    {
        path: "/settings",
        icon: Settings,
        label: "Settings",
    },
];

export default function RecruiterSidebar({ isOpen, onClose }: SidebarProps) {
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar - Fixed top to bottom */}
            <aside
                className={`fixed left-0 top-0 z-50 h-screen w-72 bg-white shadow-xl transition-transform duration-300 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } lg:sticky lg:top-0 lg:translate-x-0`}
            >
                {/* Header */}
                <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
                    <span className="text-xl font-bold text-indigo-600">TalentFlow</span>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-lg hover:bg-gray-100 transition lg:hidden"
                    >
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                {/* Navigation - Takes remaining space */}
                <nav className="flex-1 overflow-y-auto py-4 px-3">
                    <ul className="space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <li key={item.path}>
                                    <NavLink
                                        to={item.path}
                                        onClick={onClose}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                                                isActive
                                                    ? "bg-indigo-50 text-indigo-600"
                                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                            }`
                                        }
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="text-sm font-medium">{item.label}</span>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Logout - Stays at bottom */}
                <div className="border-t border-gray-200 p-3">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}