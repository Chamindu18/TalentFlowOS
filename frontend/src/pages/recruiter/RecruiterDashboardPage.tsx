import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jobService } from '../../services/jobService';
import { applicationService } from '../../services/applicationService';
import { toast } from 'sonner';

interface DashboardStats {
    totalJobs: number;
    activeJobs: number;
    totalApplications: number;
    hiredCandidates: number;
}

const RecruiterDashboardPage: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats>({
        totalJobs: 0,
        activeJobs: 0,
        totalApplications: 0,
        hiredCandidates: 0,
    });
    const [loading, setLoading] = useState(true);
    const [recentJobs, setRecentJobs] = useState<any[]>([]);
    const [recentApplications, setRecentApplications] = useState<any[]>([]);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem('accessToken');
            if (!token) {
                console.log('No token found, redirecting to login...');
                window.location.href = '/login';
                return;
            }

            console.log('Loading dashboard data...');

            let jobs: any[] = [];
            try {
                jobs = await jobService.getAll();
                console.log('Jobs loaded:', jobs.length);
            } catch (err) {
                console.error('Error loading jobs:', err);
                jobs = [];
            }

            let applications: any[] = [];
            try {
                applications = await applicationService.getAll();
                console.log('Applications loaded:', applications.length);
            } catch (err) {
                console.error('Error loading applications:', err);
                applications = [];
            }

            const activeJobs = jobs.filter((j: any) => j.isActive);
            const hired = applications.filter((a: any) => a.status === 'Offer');

            setStats({
                totalJobs: jobs.length,
                activeJobs: activeJobs.length,
                totalApplications: applications.length,
                hiredCandidates: hired.length,
            });

            // Get latest 5 jobs (newest first)
            const sortedJobs = [...jobs].reverse();
            setRecentJobs(sortedJobs.slice(0, 5));

            // Get latest 5 applications (newest first)
            const sortedApps = [...applications].reverse();
            setRecentApplications(sortedApps.slice(0, 5));

        } catch (error) {
            console.error('Dashboard error:', error);
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading dashboard...</div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Recruiter Dashboard</h1>
                <p className="text-gray-500 mt-1">Manage your job postings and candidates</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Link to="/recruiter/jobs" className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-sm border border-blue-200 p-6 hover:shadow-md transition cursor-pointer">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-blue-700">Total Jobs</p>
                            <p className="text-3xl font-bold text-blue-900">{stats.totalJobs}</p>
                        </div>
                        <div className="bg-blue-200 rounded-full p-3">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-sm text-blue-600 mt-2 font-medium">Click to view all →</p>
                </Link>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm border border-green-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-green-700">Active Jobs</p>
                            <p className="text-3xl font-bold text-green-900">{stats.activeJobs}</p>
                        </div>
                        <div className="bg-green-200 rounded-full p-3">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <Link to="/recruiter/applications" className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-sm border border-purple-200 p-6 hover:shadow-md transition cursor-pointer">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-purple-700">Total Applications</p>
                            <p className="text-3xl font-bold text-purple-900">{stats.totalApplications}</p>
                        </div>
                        <div className="bg-purple-200 rounded-full p-3">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-sm text-purple-600 mt-2 font-medium">Click to view all →</p>
                </Link>

                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl shadow-sm border border-yellow-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-yellow-700">Hired Candidates</p>
                            <p className="text-3xl font-bold text-yellow-900">{stats.hiredCandidates}</p>
                        </div>
                        <div className="bg-yellow-200 rounded-full p-3">
                            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Jobs & Applications */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Recent Jobs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <span className="text-blue-600">📋</span> Recent Jobs
                        </h2>
                        <Link to="/recruiter/jobs" className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline">
                            View All →
                        </Link>
                    </div>
                    {recentJobs.length === 0 ? (
                        <p className="text-gray-500 text-sm">No jobs created yet.</p>
                    ) : (
                        <div className="space-y-3">
                            {recentJobs.map((job) => (
                                <div key={job.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg hover:shadow-md transition border-l-4 border-blue-400">
                                    <div>
                                        <p className="font-medium text-gray-800">{job.title}</p>
                                        <p className="text-sm text-gray-500">{job.companyName || 'N/A'}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                        job.status === 'Open' ? 'bg-green-100 text-green-700' :
                                        job.status === 'Closed' ? 'bg-red-100 text-red-700' :
                                        'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {job.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Applications */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <span className="text-purple-600">📝</span> Recent Applications
                        </h2>
                        <Link to="/recruiter/applications" className="text-sm text-purple-600 hover:text-purple-800 font-medium hover:underline">
                            View All →
                        </Link>
                    </div>
                    {recentApplications.length === 0 ? (
                        <p className="text-gray-500 text-sm">No applications received yet.</p>
                    ) : (
                        <div className="space-y-3">
                            {recentApplications.map((app) => (
                                <div key={app.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-purple-50 rounded-lg hover:shadow-md transition border-l-4 border-purple-400">
                                    <div>
                                        <p className="font-medium text-gray-800">{app.candidateName || 'Anonymous'}</p>
                                        <p className="text-sm text-gray-500">{app.jobTitle || 'Unknown Job'}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                        app.status === 'Applied' ? 'bg-blue-100 text-blue-700' :
                                        app.status === 'Shortlisted' ? 'bg-green-100 text-green-700' :
                                        app.status === 'Interview' ? 'bg-purple-100 text-purple-700' :
                                        app.status === 'Offer' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-red-100 text-red-700'
                                    }`}>
                                        {app.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                    to="/recruiter/jobs/create"
                    className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl p-6 text-center hover:from-indigo-600 hover:to-indigo-700 transition shadow-lg hover:shadow-xl"
                >
                    <h3 className="text-lg font-semibold">➕ Create New Job</h3>
                    <p className="text-indigo-100 text-sm mt-1">Post a new job opening</p>
                </Link>

                <Link
                    to="/recruiter/jobs"
                    className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl p-6 text-center hover:from-gray-200 hover:to-gray-300 transition shadow-md hover:shadow-lg"
                >
                    <h3 className="text-lg font-semibold">📋 View All Jobs</h3>
                    <p className="text-gray-500 text-sm mt-1">Manage your job postings</p>
                </Link>
            </div>
        </div>
    );
};

export default RecruiterDashboardPage;