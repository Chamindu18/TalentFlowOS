import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { toast } from 'sonner';
import {
    User,
    Mail,
    Phone,
    Building,
    Briefcase,
    Save,
    Edit3,
    Camera,
} from 'lucide-react';

export const RecruiterProfilePage: React.FC = () => {
    const user = useAuthStore((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        department: '',
        bio: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                phone: '',
                company: '',
                department: '',
                bio: '',
            });
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success('Profile updated successfully! 🎉');
            setIsEditing(false);
        } catch (error) {
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const initials = `${formData.firstName[0] || ''}${formData.lastName[0] || ''}`.toUpperCase();

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">👤 Recruiter Profile</h1>
                <p className="text-gray-500 mt-1">Manage your personal information and settings</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Cover Image */}
                <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
                    <div className="absolute -bottom-12 left-8">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-white p-1 shadow-xl">
                                <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                                    {initials || '👤'}
                                </div>
                            </div>
                            <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1.5 rounded-full shadow-lg hover:bg-indigo-700 transition">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Profile Info */}
                <div className="pt-16 px-8 pb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {formData.firstName} {formData.lastName}
                            </h2>
                            <p className="text-gray-500 flex items-center gap-1">
                                <Briefcase className="w-4 h-4" />
                                {user?.role || 'Recruiter'}
                            </p>
                        </div>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="mt-3 md:mt-0 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all hover:-translate-y-0.5"
                        >
                            <Edit3 className="w-4 h-4" />
                            {isEditing ? 'Cancel' : 'Edit Profile'}
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                            <p className="text-sm text-blue-600 font-medium">Jobs Posted</p>
                            <p className="text-2xl font-bold text-blue-900">12</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                            <p className="text-sm text-green-600 font-medium">Active Jobs</p>
                            <p className="text-2xl font-bold text-green-900">8</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                            <p className="text-sm text-purple-600 font-medium">Total Applications</p>
                            <p className="text-2xl font-bold text-purple-900">45</p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* First Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                    <User className="w-4 h-4 text-indigo-500" />
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full px-4 py-2.5 rounded-xl border transition-all ${
                                        isEditing
                                            ? 'border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                                            : 'border-gray-100 bg-gray-50 text-gray-500'
                                    }`}
                                />
                            </div>

                            {/* Last Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                    <User className="w-4 h-4 text-indigo-500" />
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full px-4 py-2.5 rounded-xl border transition-all ${
                                        isEditing
                                            ? 'border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                                            : 'border-gray-100 bg-gray-50 text-gray-500'
                                    }`}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                <Mail className="w-4 h-4 text-indigo-500" />
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                disabled
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 text-gray-500"
                            />
                            <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                <Phone className="w-4 h-4 text-indigo-500" />
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                disabled={!isEditing}
                                placeholder="+94 77 123 4567"
                                className={`w-full px-4 py-2.5 rounded-xl border transition-all ${
                                    isEditing
                                        ? 'border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                                        : 'border-gray-100 bg-gray-50 text-gray-500'
                                }`}
                            />
                        </div>

                        {/* Company and Department */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                    <Building className="w-4 h-4 text-indigo-500" />
                                    Company
                                </label>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    placeholder="Your company name"
                                    className={`w-full px-4 py-2.5 rounded-xl border transition-all ${
                                        isEditing
                                            ? 'border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                                            : 'border-gray-100 bg-gray-50 text-gray-500'
                                    }`}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                    <Briefcase className="w-4 h-4 text-indigo-500" />
                                    Department
                                </label>
                                <input
                                    type="text"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    placeholder="Your department"
                                    className={`w-full px-4 py-2.5 rounded-xl border transition-all ${
                                        isEditing
                                            ? 'border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                                            : 'border-gray-100 bg-gray-50 text-gray-500'
                                    }`}
                                />
                            </div>
                        </div>

                        {/* Bio */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Bio / About
                            </label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                disabled={!isEditing}
                                rows={3}
                                placeholder="Tell us about yourself..."
                                className={`w-full px-4 py-2.5 rounded-xl border transition-all ${
                                    isEditing
                                        ? 'border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                                        : 'border-gray-100 bg-gray-50 text-gray-500'
                                }`}
                            />
                        </div>

                        {/* Save Button */}
                        {isEditing && (
                            <div className="pt-4 border-t border-gray-200 flex gap-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all hover:-translate-y-0.5 disabled:opacity-50"
                                >
                                    <Save className="w-4 h-4" />
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};