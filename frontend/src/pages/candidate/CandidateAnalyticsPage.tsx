import { useState, useEffect } from 'react';
import candidateService from '../../services/candidateService';
import { toast } from 'sonner';

const CandidateAnalyticsPage = () => {
    const [analytics, setAnalytics] = useState({
        profileCompletion: 0,
        totalApplications: 0,
        totalSavedJobs: 0,
        applicationsByStatus: {} as Record<string, number>,
        recentApplications: [] as Array<{
            jobTitle: string;
            companyName: string;
            status: string;
            appliedAt: string;
        }>
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const data = await candidateService.getAnalytics();
            setAnalytics(data);
        } catch (error) {
            console.error('Failed to load analytics:', error);
            toast.error('Failed to load analytics');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="p-8 bg-gray-50 min-h-screen">
                <div className="flex items-center justify-center h-64">
                    <div className="text-gray-500">Loading analytics...</div>
                </div>
            </div>
        );
    }

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'applied':
            case 'pending':
                return 'bg-blue-100 text-blue-700';
            case 'shortlisted':
                return 'bg-green-100 text-green-700';
            case 'interview':
                return 'bg-purple-100 text-purple-700';
            case 'offer':
                return 'bg-yellow-100 text-yellow-700';
            case 'hired':
            case 'accepted':
                return 'bg-emerald-100 text-emerald-700';
            case 'rejected':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Analytics & Insights</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-700">Profile Completion</h2>
                    <p className="text-gray-500 mt-2">Your profile completeness</p>
                    <p className="text-4xl font-bold text-blue-600 mt-4">
                        {analytics.profileCompletion}%
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-700">Total Applications</h2>
                    <p className="text-gray-500 mt-2">Jobs you've applied to</p>
                    <p className="text-4xl font-bold text-green-600 mt-4">
                        {analytics.totalApplications}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-700">Saved Jobs</h2>
                    <p className="text-gray-500 mt-2">Jobs saved for later</p>
                    <p className="text-4xl font-bold text-purple-600 mt-4">
                        {analytics.totalSavedJobs}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-700">Applications by Status</h2>
                    <div className="mt-4 space-y-2">
                        {Object.entries(analytics.applicationsByStatus).length > 0 ? (
                            Object.entries(analytics.applicationsByStatus).map(([status, count]) => (
                                <div key={status} className="flex justify-between text-sm">
                                    <span className="capitalize">{status}</span>
                                    <span className="font-semibold">{count}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No applications yet</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Applications</h2>
                {analytics.recentApplications.length > 0 ? (
                    <div className="space-y-3">
                        {analytics.recentApplications.map((app, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800">{app.jobTitle}</p>
                                    <p className="text-sm text-gray-500">{app.companyName}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                                        {app.status}
                                    </span>
                                    <span className="text-sm text-gray-400">
                                        {new Date(app.appliedAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center py-8">No recent applications</p>
                )}
            </div>
        </div>
    );
};

export default CandidateAnalyticsPage;