import React, {
    useState,
    useEffect,
} from "react";

import toast from "react-hot-toast";

import { applicationService } from "../../services/applicationService";
import type { Application } from "../../types/job";

export const ApplicationsPage: React.FC = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('');

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {
        try {
            setLoading(true);
            const data = await applicationService.getAll();
            setApplications(data);
        } catch (error) {
            toast.error('Failed to load applications');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleShortlist = async (id: string) => {
        try {
            await applicationService.shortlist(id);
            toast.success('Candidate shortlisted successfully');
            loadApplications();
        } catch (error) {
            toast.error('Failed to shortlist candidate');
        }
    };

    const handleUpdateStatus = async (id: string, status: string) => {
        try {
            await applicationService.updateStatus(id, { status });
            toast.success(`Application status updated to ${status}`);
            loadApplications();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this application?')) {
            try {
                await applicationService.delete(id);
                toast.success('Application deleted successfully');
                loadApplications();
            } catch (error) {
                toast.error('Failed to delete application');
            }
        }
    };

    const filteredApplications = applications.filter(app => {
        return filterStatus ? app.status === filterStatus : true;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading applications...</div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
                    <p className="text-gray-500 mt-1">Manage candidate applications</p>
                </div>
                <button
                    onClick={loadApplications}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                    Refresh
                </button>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="">All Status</option>
                    <option value="Applied">Applied</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Candidate</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Job</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Company</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Applied Date</th>
                            <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredApplications.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                    No applications found.
                                </td>
                            </tr>
                        ) : (
                            filteredApplications.map((app) => (
                                <tr key={app.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-gray-700">{app.candidateName}</td>
                                    <td className="px-6 py-4 text-gray-700">{app.jobTitle}</td>
                                    <td className="px-6 py-4 text-gray-700">{app.companyName}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            app.status === 'Applied' ? 'bg-blue-100 text-blue-800' :
                                            app.status === 'Shortlisted' ? 'bg-green-100 text-green-800' :
                                            app.status === 'Interview' ? 'bg-purple-100 text-purple-800' :
                                            app.status === 'Offer' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">
                                        {new Date(app.appliedAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        {app.status === 'Applied' && (
                                            <button
                                                onClick={() => handleShortlist(app.id)}
                                                className="text-green-600 hover:text-green-800 text-sm"
                                            >
                                                Shortlist
                                            </button>
                                        )}
                                        {app.status !== 'Rejected' && app.status !== 'Offer' && (
                                            <select
                                                onChange={(e) => handleUpdateStatus(app.id, e.target.value)}
                                                className="text-sm border border-gray-300 rounded px-2 py-1"
                                                defaultValue=""
                                            >
                                                <option value="">Update Status</option>
                                                <option value="Applied">Applied</option>
                                                <option value="Shortlisted">Shortlisted</option>
                                                <option value="Interview">Interview</option>
                                                <option value="Offer">Offer</option>
                                                <option value="Rejected">Rejected</option>
                                            </select>
                                        )}
                                        <button
                                            onClick={() => handleDelete(app.id)}
                                            className="text-red-600 hover:text-red-800 text-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};