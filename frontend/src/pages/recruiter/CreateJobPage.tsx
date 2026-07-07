import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { jobService } from '../../services/jobService';
import { toast } from 'sonner';

interface JobFormData {
    title: string;
    description: string;
    responsibilities: string;
    requirements: string;
    employmentType: string;
    experienceLevel: string;
    salaryMin: number;
    salaryMax: number;
    location: string;
    isRemote: boolean;
    applicationDeadline: string;
    companyId: string;
    departmentId: string;
}

export const CreateJobPage: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<JobFormData>();

    const onSubmit = async (data: JobFormData) => {
        try {
            setLoading(true);
            await jobService.create(data);
            toast.success('Job created successfully!');
            navigate('/recruiter/jobs');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to create job');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Create New Job</h1>
                <p className="text-gray-500 mt-1">Post a new job opening</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                    <input
                        {...register('title', { required: 'Title is required' })}
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="e.g. Senior Software Engineer"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        {...register('description')}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        placeholder="Job description..."
                    />
                </div>

                {/* Responsibilities */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Responsibilities</label>
                    <textarea
                        {...register('responsibilities')}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        placeholder="Key responsibilities..."
                    />
                </div>

                {/* Requirements */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
                    <textarea
                        {...register('requirements')}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        placeholder="Required skills and qualifications..."
                    />
                </div>

                {/* Employment Type and Experience Level */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                        <select
                            {...register('employmentType')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select type</option>
                            <option value="FullTime">Full Time</option>
                            <option value="PartTime">Part Time</option>
                            <option value="Internship">Internship</option>
                            <option value="Contract">Contract</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                        <select
                            {...register('experienceLevel')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select level</option>
                            <option value="Junior">Junior</option>
                            <option value="Mid">Mid Level</option>
                            <option value="Senior">Senior</option>
                        </select>
                    </div>
                </div>

                {/* Salary Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Salary</label>
                        <input
                            {...register('salaryMin', { valueAsNumber: true })}
                            type="number"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            placeholder="e.g. 50000"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Salary</label>
                        <input
                            {...register('salaryMax', { valueAsNumber: true })}
                            type="number"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            placeholder="e.g. 100000"
                        />
                    </div>
                </div>

                {/* Location and Remote */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                            {...register('location')}
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            placeholder="e.g. Colombo"
                        />
                    </div>
                    <div className="flex items-center mt-6">
                        <input
                            {...register('isRemote')}
                            type="checkbox"
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label className="ml-2 text-sm text-gray-700">Remote Position</label>
                    </div>
                </div>

                {/* Application Deadline */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Application Deadline</label>
                    <input
                        {...register('applicationDeadline')}
                        type="date"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Note: Company and Department selection will be added once we have those APIs */}

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-4 border-t border-gray-200">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create Job'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/recruiter/jobs')}
                        className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};