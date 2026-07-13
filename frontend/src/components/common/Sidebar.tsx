import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Briefcase,
    FileText,
    Users,
    Settings,
    BarChart3,
    User,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Menu,
    X
} from 'lucide-react';

interface SidebarProps {
    isCollapsed?: boolean;
    onToggle?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
    isCollapsed = false,
    onToggle,
}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
    };

    const navItems = [
        {
            path: '/recruiter/dashboard',
            icon: LayoutDashboard,
            label: 'Dashboard',
        },
        {
            path: '/recruiter/jobs',
            icon: Briefcase,
            label: 'Jobs',
        },
        {
            path: '/recruiter/applications',
            icon: FileText,
            label: 'Applications',
        },
        {
            path: '/recruiter/candidates',
            icon: Users,
            label: 'Candidates',
        },
        {
            path: '/settings',
            icon: Settings,
            label: 'Settings',
        },

        {  path: "/profile",
        icon: User,
        label: "Profile",
        },

        {
        path: "/recruiter/analytics",
        icon: BarChart3,
        label: "Analytics",
    },



    ];

    const isActive = (path: string) => {
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <aside
                className={`hidden lg:flex flex-col bg-white border-r border-gray-200 h-screen sticky top-0 transition-all duration-300 ${
                    isCollapsed ? 'w-20' : 'w-64'
                }`}
            >
                {/* Logo */}
                <div className={`flex items-center h-16 px-4 border-b border-gray-200 ${isCollapsed ? 'justify-center' : ''}`}>
                    {!isCollapsed ? (
                        <span className="text-xl font-bold text-indigo-600">TalentFlow</span>
                    ) : (
                        <span className="text-xl font-bold text-indigo-600">TF</span>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4 px-3">
                    <ul className="space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.path);

                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                                            active
                                                ? 'bg-indigo-50 text-indigo-600'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        } ${isCollapsed ? 'justify-center' : ''}`}
                                    >
                                        <Icon className={`w-5 h-5 ${active ? 'text-indigo-600' : ''}`} />
                                        {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Logout */}
                <div className="border-t border-gray-200 p-3">
                    <button
                        onClick={handleLogout}
                        className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 ${
                            isCollapsed ? 'justify-center' : ''
                        }`}
                    >
                        <LogOut className="w-5 h-5" />
                        {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
                    </button>
                </div>

                {/* Toggle Button */}
                <button
                    onClick={onToggle}
                    className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:shadow-lg transition"
                >
                    {isCollapsed ? (
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                    ) : (
                        <ChevronLeft className="w-4 h-4 text-gray-600" />
                    )}
                </button>
            </aside>

            {/* Mobile Hamburger Button */}
            <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition"
            >
                <Menu className="w-6 h-6 text-gray-700" />
            </button>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Drawer */}
            <div
                className={`lg:hidden fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transition-transform duration-300 ${
                    isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
                    <span className="text-xl font-bold text-indigo-600">TalentFlow</span>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-1 rounded-lg hover:bg-gray-100 transition"
                    >
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4 px-3">
                    <ul className="space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.path);

                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                                            active
                                                ? 'bg-indigo-50 text-indigo-600'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                    >
                                        <Icon className={`w-5 h-5 ${active ? 'text-indigo-600' : ''}`} />
                                        <span className="text-sm font-medium">{item.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Logout */}
                <div className="border-t border-gray-200 p-3">
                    <button
                        onClick={() => {
                            handleLogout();
                            setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;