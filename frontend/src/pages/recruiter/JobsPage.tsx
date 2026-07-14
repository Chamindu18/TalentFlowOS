import React, {
  useState,
  useEffect,
} from "react";

import { Link } from "react-router-dom";

import { jobService } from "../../services/jobService";

import type { Job } from "../../types/job";

import { toast } from "sonner";

export const JobsPage: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {
        try {
            setLoading(true);
            console.log('Fetching jobs...');

            const data = await jobService.getAll();
            console.log('Jobs data:', data);

            setJobs(data);
        } catch (error) {
            console.error('Error loading jobs:', error);

            toast.error('Failed to load jobs');
            
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            try {
                await jobService.delete(id);
                toast.success('Job deleted successfully');
                loadJobs();
            } catch (error) {
                toast.error('Failed to delete job');
            }
        }
    };

    const handleClose = async (id: string) => {
        try {
            await jobService.close(id);
            toast.success('Job closed successfully');
            loadJobs();
        } catch (error) {
            toast.error('Failed to close job');
        }
    };

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.companyName?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus ? job.status === filterStatus : true;
        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading jobs...</div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Jobs</h1>
                    <p className="text-gray-500 mt-1">Manage your job postings</p>
                </div>
                <Link
                    to="/recruiter/jobs/create"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                    + Create Job
                </Link>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-wrap gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 min-w-[200px]"
                />
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="">All Status</option>
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                    <option value="Paused">Paused</option>
                </select>
                <button
                    onClick={loadJobs}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                    Refresh
                </button>
            </div>

            {/* Jobs Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Title</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Company</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Department</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Location</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Applications</th>
                            <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredJobs.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                                    No jobs found. Create your first job posting!
                                </td>
                            </tr>
                        ) : (
                            filteredJobs.map((job) => (
                                <tr key={job.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <Link
                                            to={`/recruiter/jobs/${job.id}`}
                                            className="text-indigo-600 hover:text-indigo-800 font-medium"
                                        >
                                            {job.title}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">{job.companyName}</td>
                                    <td className="px-6 py-4 text-gray-700">{job.departmentName}</td>
                                    <td className="px-6 py-4 text-gray-700">
                                        {job.isRemote ? 'Remote' : job.location || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${job.status === 'Open' ? 'bg-green-100 text-green-800' :
                                                job.status === 'Closed' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {job.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">{job.applicationCount}</td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <Link
                                            to={`/recruiter/jobs/edit/${job.id}`}
                                            className="text-blue-600 hover:text-blue-800 text-sm"
                                        >
                                            Edit
                                        </Link>
                                        {job.status === 'Open' && (
                                            <button
                                                onClick={() => handleClose(job.id)}
                                                className="text-yellow-600 hover:text-yellow-800 text-sm"
                                            >
                                                Close
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(job.id)}
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