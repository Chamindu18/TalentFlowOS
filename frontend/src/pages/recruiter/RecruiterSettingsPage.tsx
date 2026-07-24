import React, { useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { toast } from 'sonner';
import {
    User,
    Bell,
    Shield,
    Palette,
    Globe,
    Lock,
    Save,
    Moon,
    Sun,
    Mail,
    Phone,
    Building,
    Briefcase,
    ChevronRight,
    LogOut,
    Sparkles,
    CheckCircle,
} from 'lucide-react';

export const RecruiterSettingsPage: React.FC = () => {
    const user = useAuthStore((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [settings, setSettings] = useState({
        companyName: '',
        department: '',
        phone: '',
        language: 'en',
        timezone: 'Asia/Colombo',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setSettings({
            ...settings,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success('Settings saved successfully! 🎉');
        } catch (error) {
            toast.error('Failed to save settings');
        } finally {
            setLoading(false);
        }
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const settingsSections = [
        {
            id: 'company',
            icon: Building,
            title: 'Company Settings',
            description: 'Manage your company and department details',
            color: 'from-indigo-500 to-blue-500',
            bg: 'bg-indigo-50',
            text: 'text-indigo-600',
        },
        {
            id: 'notifications',
            icon: Bell,
            title: 'Notifications',
            description: 'Configure how you receive notifications',
            color: 'from-purple-500 to-pink-500',
            bg: 'bg-purple-50',
            text: 'text-purple-600',
        },
        {
            id: 'appearance',
            icon: Palette,
            title: 'Appearance',
            description: 'Customize your dashboard appearance',
            color: 'from-pink-500 to-rose-500',
            bg: 'bg-pink-50',
            text: 'text-pink-600',
        },
        {
            id: 'preferences',
            icon: Globe,
            title: 'Preferences',
            description: 'Language and region settings',
            color: 'from-green-500 to-emerald-500',
            bg: 'bg-green-50',
            text: 'text-green-600',
        },
        {
            id: 'security',
            icon: Lock,
            title: 'Security',
            description: 'Manage your password and security settings',
            color: 'from-red-500 to-orange-500',
            bg: 'bg-red-50',
            text: 'text-red-600',
        },
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header with gradient */}
            <div className="mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl shadow-lg">
                        <Sparkles className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Settings
                        </h1>
                        <p className="text-gray-500 mt-1">Manage your account and application preferences</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar Navigation - Colorful */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sticky top-4">
                        <div className="space-y-1">
                            {settingsSections.map((section) => {
                                const Icon = section.icon;
                                return (
                                    <button
                                        key={section.title}
                                        onClick={() => scrollToSection(section.id)}
                                        className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left text-sm font-medium transition-all duration-200 group hover:shadow-md ${section.bg} ${section.text} hover:scale-[1.02]`}
                                    >
                                        <div className={`p-1.5 rounded-lg ${section.bg}`}>
                                            <Icon className={`w-4 h-4 ${section.text}`} />
                                        </div>
                                        <span>{section.title}</span>
                                        <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Main Settings Content */}
                <div className="lg:col-span-3">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Company Settings */}
                        <div id="company" className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl shadow-md">
                                    <Building className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">Company Settings</h2>
                                    <p className="text-sm text-gray-500">Update your company information</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={settings.companyName}
                                        onChange={handleChange}
                                        placeholder="Your company name"
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Department
                                    </label>
                                    <input
                                        type="text"
                                        name="department"
                                        value={settings.department}
                                        onChange={handleChange}
                                        placeholder="Your department"
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={settings.phone}
                                    onChange={handleChange}
                                    placeholder="+94 77 123 4567"
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white"
                                />
                            </div>
                        </div>

                        {/* Notifications */}
                        <div id="notifications" className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-md">
                                    <Bell className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                                    <p className="text-sm text-gray-500">Choose how you want to be notified</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                                    <div>
                                        <p className="font-medium text-gray-800">📧 Email Notifications</p>
                                        <p className="text-sm text-gray-500">Receive updates via email</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={emailNotifications}
                                            onChange={() => setEmailNotifications(!emailNotifications)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-purple-600 transition-all duration-200 shadow-inner">
                                            <div className={`w-4 h-4 bg-white rounded-full transition-all duration-200 absolute top-1 shadow-md ${
                                                emailNotifications ? 'left-6' : 'left-1'
                                            }`} />
                                        </div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                                    <div>
                                        <p className="font-medium text-gray-800">📱 Push Notifications</p>
                                        <p className="text-sm text-gray-500">Receive real-time alerts</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={pushNotifications}
                                            onChange={() => setPushNotifications(!pushNotifications)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-all duration-200 shadow-inner">
                                            <div className={`w-4 h-4 bg-white rounded-full transition-all duration-200 absolute top-1 shadow-md ${
                                                pushNotifications ? 'left-6' : 'left-1'
                                            }`} />
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Appearance */}
                        <div id="appearance" className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl shadow-md">
                                    <Palette className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">Appearance</h2>
                                    <p className="text-sm text-gray-500">Customize your dashboard look</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-100">
                                <div className="flex items-center gap-3">
                                    {darkMode ? (
                                        <div className="p-2 bg-gray-800 rounded-full">
                                            <Moon className="w-5 h-5 text-white" />
                                        </div>
                                    ) : (
                                        <div className="p-2 bg-yellow-400 rounded-full">
                                            <Sun className="w-5 h-5 text-white" />
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-medium text-gray-800">Dark Mode</p>
                                        <p className="text-sm text-gray-500">Switch between light and dark themes</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={darkMode}
                                        onChange={() => setDarkMode(!darkMode)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-indigo-600 transition-all duration-200 shadow-inner">
                                        <div className={`w-4 h-4 bg-white rounded-full transition-all duration-200 absolute top-1 shadow-md ${
                                            darkMode ? 'left-6' : 'left-1'
                                        }`} />
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Preferences */}
                        <div id="preferences" className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-md">
                                    <Globe className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">Preferences</h2>
                                    <p className="text-sm text-gray-500">Language and region settings</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        🌐 Language
                                    </label>
                                    <select
                                        name="language"
                                        value={settings.language}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-gray-50 focus:bg-white"
                                    >
                                        <option value="en">🇬🇧 English</option>
                                        <option value="si">🇱🇰 Sinhala</option>
                                        <option value="ta">🇱🇰 Tamil</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        🕐 Timezone
                                    </label>
                                    <select
                                        name="timezone"
                                        value={settings.timezone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-gray-50 focus:bg-white"
                                    >
                                        <option value="Asia/Colombo">🇱🇰 Sri Lanka (UTC+5:30)</option>
                                        <option value="Asia/Kolkata">🇮🇳 India (UTC+5:30)</option>
                                        <option value="Asia/Dubai">🇦🇪 Dubai (UTC+4)</option>
                                        <option value="UTC">🌍 UTC</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Security */}
                        <div id="security" className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-md">
                                    <Lock className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">Security</h2>
                                    <p className="text-sm text-gray-500">Manage your password and security</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <button
                                    type="button"
                                    className="w-full text-left px-4 py-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl hover:from-red-100 hover:to-orange-100 transition border border-red-100"
                                    onClick={() => toast.info('🔒 Change Password feature coming soon!')}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-1.5 bg-red-100 rounded-lg">
                                            <Lock className="w-4 h-4 text-red-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">Change Password</p>
                                            <p className="text-sm text-gray-500">Update your password regularly</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 ml-auto text-gray-300" />
                                    </div>
                                </button>
                                <button
                                    type="button"
                                    className="w-full text-left px-4 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl hover:from-blue-100 hover:to-cyan-100 transition border border-blue-100"
                                    onClick={() => toast.info('🔐 Two-Factor Authentication coming soon!')}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-1.5 bg-blue-100 rounded-lg">
                                            <Shield className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">Two-Factor Authentication</p>
                                            <p className="text-sm text-gray-500">Add an extra layer of security</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 ml-auto text-gray-300" />
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl hover:shadow-2xl transition-all hover:-translate-y-1 disabled:opacity-50 font-medium"
                            >
                                <Save className="w-4 h-4" />
                                {loading ? 'Saving...' : '💾 Save All Settings'}
                            </button>
                            <button
                                type="button"
                                className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};