import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CandidateDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5007/api/candidate/dashboard', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setData(response.data);
            } catch (err) {
                console.error("Dashboard error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    if (loading) return <div className="p-6">Loading Dashboard...</div>;
    if (!data) return <div className="p-6">Error loading data.</div>;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Candidate Dashboard</h1>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-700">Profile Completion</h2>
                    <p className="text-4xl font-bold text-blue-600 mt-4">{data.profileCompletion}%</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-700">Total Applications</h2>
                    <p className="text-4xl font-bold text-green-600 mt-4">{data.totalApplications}</p>
                </div>
            </div>

            {/* Recent Applications Table */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Applications</h2>
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-gray-500 border-b">
                            <th className="pb-3">Job Title</th>
                            <th className="pb-3">Company</th>
                            <th className="pb-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.recentApplications && data.recentApplications.length > 0 ? (
                            data.recentApplications.map((app, index) => (
                                <tr key={index} className="border-b last:border-0">
                                    <td className="py-4">{app.jobTitle}</td>
                                    <td className="py-4">{app.companyName}</td>
                                    <td className="py-4 font-medium text-blue-600">{app.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="py-4 text-center text-gray-400">No applications found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CandidateDashboard;