import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { jobService } from '../../services/jobService';
import { companyService } from '../../services/companyService';
import { toast } from 'sonner';
import type { Company, Department } from '../../types/job';

interface JobFormData {
    companyId: string;
    departmentId: string;
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
}

export const CreateJobPage: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [companiesLoading, setCompaniesLoading] = useState(true);

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<JobFormData>({
        defaultValues: {
            companyId: '',
            departmentId: '',
            title: '',
            description: '',
            responsibilities: '',
            requirements: '',
            employmentType: '',
            experienceLevel: '',
            salaryMin: 0,
            salaryMax: 0,
            location: '',
            isRemote: false,
            applicationDeadline: '',
        }
    });

    const selectedCompanyId = watch('companyId');

    useEffect(() => {
        loadCompanies();
    }, []);

    useEffect(() => {
        if (selectedCompanyId) {
            loadDepartments(selectedCompanyId);
            setValue('departmentId', '');
        } else {
            setDepartments([]);
        }
    }, [selectedCompanyId, setValue]);

    const loadCompanies = async () => {
        try {
            setCompaniesLoading(true);
            const data = await companyService.getAll();
            setCompanies(data);
            
            // Auto-select if only one company
            if (data.length === 1) {
                setValue('companyId', data[0].id);
            }
        } catch (error) {
            console.error('Error loading companies:', error);
            toast.error('Failed to load companies');
        } finally {
            setCompaniesLoading(false);
        }
    };

    const loadDepartments = async (companyId: string) => {
        try {
            const data = await companyService.getDepartments(companyId);
            setDepartments(data);
            
            // Auto-select if only one department
            if (data.length === 1) {
                setValue('departmentId', data[0].id);
            }
        } catch (error) {
            console.error('Error loading departments:', error);
            toast.error('Failed to load departments');
        }
    };

    const onSubmit = async (data: JobFormData) => {
        try {
            setLoading(true);

            // Find company and department names from selected IDs
            const selectedCompany = companies.find(c => c.id === data.companyId);
            const selectedDepartment = departments.find(d => d.id === data.departmentId);
            
            if (!selectedCompany || !selectedDepartment) {
                toast.error('Please select a valid company and department');
                return;
            }

            const payload = {
                companyName: selectedCompany.name,
                departmentName: selectedDepartment.name,
                title: data.title,
                description: data.description,
                responsibilities: data.responsibilities,
                requirements: data.requirements,
                employmentType: data.employmentType,
                experienceLevel: data.experienceLevel,
                salaryMin: data.salaryMin,
                salaryMax: data.salaryMax,
                location: data.location,
                isRemote: data.isRemote,
                applicationDeadline: data.applicationDeadline
                    ? new Date(data.applicationDeadline + "T00:00:00Z").toISOString()
                    : undefined,
            };

            console.log('Sending payload:', payload);

            await jobService.create(payload);
            
            toast.success('Job created successfully!');
            navigate('/recruiter/jobs');
        } catch (error: any) {
            console.error('Error:', error);
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

                {/* Company Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                    {companiesLoading ? (
                        <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
                            Loading companies...
                        </div>
                    ) : (
                        <select
                            {...register('companyId', { required: 'Company is required' })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Select company</option>
                            {companies.map((company) => (
                                <option key={company.id} value={company.id}>
                                    {company.name}
                                </option>
                            ))}
                        </select>
                    )}
                    {errors.companyId && <p className="text-red-500 text-sm mt-1">{errors.companyId.message}</p>}
                </div>

                {/* Department Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                    <select
                        {...register('departmentId', { required: 'Department is required' })}
                        disabled={departments.length === 0}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50"
                    >
                        <option value="">Select department</option>
                        {departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>
                                {dept.name}
                            </option>
                        ))}
                    </select>
                    {errors.departmentId && <p className="text-red-500 text-sm mt-1">{errors.departmentId.message}</p>}
                </div>

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