import React, { useState, useEffect } from 'react';
import { jobService } from '../../services/jobService';
import { applicationService } from '../../services/applicationService';
import { toast } from 'sonner';
import {
    TrendingUp,
    Users,
    Briefcase,
    FileText,
    CheckCircle,
    Clock,
    XCircle,
    BarChart3,
    Activity,
} from 'lucide-react';

export const RecruiterAnalyticsPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalJobs: 0,
        activeJobs: 0,
        closedJobs: 0,
        totalApplications: 0,
        shortlisted: 0,
        hired: 0,
        rejected: 0,
        interview: 0,
    });
    const [recentActivity, setRecentActivity] = useState<any[]>([]);

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        try {
            setLoading(true);

            let jobs: any[] = [];
            let applications: any[] = [];

            try {
                jobs = await jobService.getAll();
            } catch (err) {
                console.error('Error loading jobs:', err);
            }

            try {
                applications = await applicationService.getAll();
            } catch (err) {
                console.error('Error loading applications:', err);
            }

            const activeJobs = jobs.filter((j: any) => j.isActive);
            const closedJobs = jobs.filter((j: any) => j.status === 'Closed');

            const shortlisted = applications.filter((a: any) => a.status === 'Shortlisted');
            const hired = applications.filter((a: any) => a.status === 'Offer');
            const rejected = applications.filter((a: any) => a.status === 'Rejected');
            const interview = applications.filter((a: any) => a.status === 'Interview');

            setStats({
                totalJobs: jobs.length,
                activeJobs: activeJobs.length,
                closedJobs: closedJobs.length,
                totalApplications: applications.length,
                shortlisted: shortlisted.length,
                hired: hired.length,
                rejected: rejected.length,
                interview: interview.length,
            });

            // Combine recent jobs and applications for activity feed
            const recentJobs = jobs.slice(0, 3).map((j: any) => ({
                type: 'job',
                title: j.title,
                status: j.status,
                date: j.createdAt,
                company: j.companyName,
            }));

            const recentApps = applications.slice(0, 3).map((a: any) => ({
                type: 'application',
                title: a.jobTitle,
                status: a.status,
                date: a.appliedAt,
                candidate: a.candidateName,
            }));

            const combined = [...recentJobs, ...recentApps]
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 5);

            setRecentActivity(combined);

        } catch (error) {
            toast.error('Failed to load analytics');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading analytics...</div>
            </div>
        );
    }

    const statCards = [
        {
            label: 'Total Jobs',
            value: stats.totalJobs,
            icon: Briefcase,
            color: 'from-blue-500 to-blue-600',
            bg: 'bg-blue-50',
            text: 'text-blue-600',
        },
        {
            label: 'Active Jobs',
            value: stats.activeJobs,
            icon: CheckCircle,
            color: 'from-green-500 to-green-600',
            bg: 'bg-green-50',
            text: 'text-green-600',
        },
        {
            label: 'Total Applications',
            value: stats.totalApplications,
            icon: FileText,
            color: 'from-purple-500 to-purple-600',
            bg: 'bg-purple-50',
            text: 'text-purple-600',
        },
        {
            label: 'Shortlisted',
            value: stats.shortlisted,
            icon: Users,
            color: 'from-indigo-500 to-indigo-600',
            bg: 'bg-indigo-50',
            text: 'text-indigo-600',
        },
        {
            label: 'Interview Stage',
            value: stats.interview,
            icon: Activity,
            color: 'from-yellow-500 to-yellow-600',
            bg: 'bg-yellow-50',
            text: 'text-yellow-600',
        },
        {
            label: 'Hired',
            value: stats.hired,
            icon: TrendingUp,
            color: 'from-emerald-500 to-emerald-600',
            bg: 'bg-emerald-50',
            text: 'text-emerald-600',
        },
        {
            label: 'Rejected',
            value: stats.rejected,
            icon: XCircle,
            color: 'from-red-500 to-red-600',
            bg: 'bg-red-50',
            text: 'text-red-600',
        },
        {
            label: 'Closed Jobs',
            value: stats.closedJobs,
            icon: Clock,
            color: 'from-gray-500 to-gray-600',
            bg: 'bg-gray-50',
            text: 'text-gray-600',
        },
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">📊 Analytics</h1>
                <p className="text-gray-500 mt-1">Track your recruitment performance and insights</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {statCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={card.label}
                            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">{card.label}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                                </div>
                                <div className={`${card.bg} rounded-xl p-3`}>
                                    <Icon className={`w-5 h-5 ${card.text}`} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                        <span className="text-xs text-gray-400">Last 5 updates</span>
                    </div>
                    {recentActivity.length === 0 ? (
                        <p className="text-gray-500 text-sm">No recent activity</p>
                    ) : (
                        <div className="space-y-3">
                            {recentActivity.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                                >
                                    <div>
                                        <p className="font-medium text-gray-800">
                                            {item.type === 'job' ? '📋' : '📝'} {item.title}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {item.type === 'job' ? item.company : item.candidate}
                                        </p>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        item.status === 'Open' || item.status === 'Applied' ? 'bg-blue-100 text-blue-700' :
                                        item.status === 'Shortlisted' ? 'bg-green-100 text-green-700' :
                                        item.status === 'Interview' ? 'bg-purple-100 text-purple-700' :
                                        item.status === 'Offer' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-red-100 text-red-700'
                                    }`}>
                                        {item.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick Stats */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Hiring Pipeline</h2>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Applications</span>
                                <span className="font-medium">{stats.totalApplications}</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full">
                                <div
                                    className="h-2 bg-blue-500 rounded-full"
                                    style={{ width: `${Math.min(100, stats.totalApplications)}%` }}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Shortlisted</span>
                                <span className="font-medium">{stats.shortlisted}</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full">
                                <div
                                    className="h-2 bg-green-500 rounded-full"
                                    style={{ width: `${Math.min(100, stats.totalApplications > 0 ? (stats.shortlisted / stats.totalApplications) * 100 : 0)}%` }}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Interview</span>
                                <span className="font-medium">{stats.interview}</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full">
                                <div
                                    className="h-2 bg-yellow-500 rounded-full"
                                    style={{ width: `${Math.min(100, stats.totalApplications > 0 ? (stats.interview / stats.totalApplications) * 100 : 0)}%` }}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Hired</span>
                                <span className="font-medium">{stats.hired}</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full">
                                <div
                                    className="h-2 bg-emerald-500 rounded-full"
                                    style={{ width: `${Math.min(100, stats.totalApplications > 0 ? (stats.hired / stats.totalApplications) * 100 : 0)}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-3 bg-green-50 rounded-xl">
                                <p className="text-xs text-green-600 font-medium">Success Rate</p>
                                <p className="text-lg font-bold text-green-700">
                                    {stats.totalApplications > 0
                                        ? Math.round((stats.hired / stats.totalApplications) * 100)
                                        : 0}%
                                </p>
                            </div>
                            <div className="text-center p-3 bg-blue-50 rounded-xl">
                                <p className="text-xs text-blue-600 font-medium">Active Jobs</p>
                                <p className="text-lg font-bold text-blue-700">{stats.activeJobs}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="bg-indigo-600 text-white rounded-xl p-4 text-center hover:bg-indigo-700 transition">
                    <Briefcase className="w-6 h-6 mx-auto mb-2" />
                    <p className="font-medium">View All Jobs</p>
                    <p className="text-indigo-100 text-sm">Manage your job postings</p>
                </button>
                <button className="bg-purple-600 text-white rounded-xl p-4 text-center hover:bg-purple-700 transition">
                    <Users className="w-6 h-6 mx-auto mb-2" />
                    <p className="font-medium">View Candidates</p>
                    <p className="text-purple-100 text-sm">See all candidates</p>
                </button>
                <button className="bg-green-600 text-white rounded-xl p-4 text-center hover:bg-green-700 transition">
                    <FileText className="w-6 h-6 mx-auto mb-2" />
                    <p className="font-medium">View Applications</p>
                    <p className="text-green-100 text-sm">Review applications</p>
                </button>
            </div>
        </div>
    );
};