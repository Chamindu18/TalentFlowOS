import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface RecentApplication {
    jobTitle: string;
    companyName: string;
    status: string;
}

interface DashboardData {
    profileCompletion: number;
    totalApplications: number;
    recentApplications: RecentApplication[];
}

const CandidateDashboardPage = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            
            const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
            
            
            const response = await axios.get('http://localhost:5007/api/Candidate/dashboard', {
    headers: { Authorization: `Bearer ${token}` }
});

            console.log("Dashboard Data:", response.data);
            setData(response.data);
            setError(null);
        } catch (err: any) {
            console.error("Dashboard error:", err.response?.data || err);
           
            setError(err.response?.status === 403 ? "You are not authorized to view this." : "Failed to load data from the system.");
        } finally {
            setLoading(false);
        }
    };
    fetchDashboardData();
}, []);

    if (loading) return <div className="p-10 text-center text-lg">Loading Dashboard...</div>;
    
    if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Candidate Dashboard</h1>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 font-medium">Profile Completion</h3>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-4xl font-bold text-blue-600">{data?.profileCompletion || 0}%</span>
                        <div className="w-full ml-4 bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${data?.profileCompletion || 0}%` }}></div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 font-medium">Total Applications</h3>
                    <p className="text-4xl font-bold text-green-600 mt-4">{data?.totalApplications || 0}</p>
                </div>
            </div>

            {/* Recent Applications Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">Recent Applications</h2>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-4 text-gray-600">Job Title</th>
                            <th className="p-4 text-gray-600">Company</th>
                            <th className="p-4 text-gray-600">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.recentApplications && data.recentApplications.length > 0 ? (
                            data.recentApplications.map((app, index) => (
                                <tr key={index} className="border-t border-gray-100">
                                    <td className="p-4 font-medium text-gray-800">{app.jobTitle}</td>
                                    <td className="p-4 text-gray-600">{app.companyName}</td>
                                    <td className="p-4">
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                            {app.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="p-8 text-center text-gray-500">No applications found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CandidateDashboardPage;