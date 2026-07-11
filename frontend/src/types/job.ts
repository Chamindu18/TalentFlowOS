

export interface Company {
    id: string;
    name: string;
    description?: string;
    industry?: string;
    city?: string;
    country?: string;
}

export interface Department {
    id: string;
    companyId: string;
    name: string;
    description?: string;
}

export interface Job {
    id: string;
    companyId: string;
    departmentId: string;
    title: string;
    description?: string;
    responsibilities?: string;
    requirements?: string;
    employmentType?: string;
    experienceLevel?: string;
    salaryMin?: number;
    salaryMax?: number;
    location?: string;
    isRemote: boolean;
    applicationDeadline?: string;
    isActive: boolean;
    status?: string;
    companyName: string;
    departmentName: string;
    applicationCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateJobRequest {
    companyName: string;      
    departmentName: string;
    title: string;
    description?: string;
    responsibilities?: string;
    requirements?: string;
    employmentType?: string;
    experienceLevel?: string;
    salaryMin?: number;
    salaryMax?: number;
    location?: string;
    isRemote: boolean;
    applicationDeadline?: string;
}

export interface UpdateJobRequest {
    companyId: string;
    departmentId: string;
    title: string;
    description?: string;
    responsibilities?: string;
    requirements?: string;
    employmentType?: string;
    experienceLevel?: string;
    salaryMin?: number;
    salaryMax?: number;
    location?: string;
    isRemote: boolean;
    applicationDeadline?: string;
    isActive: boolean;
    status?: string;
}

export interface Application {
    id: string;
    candidateId: string;
    jobId: string;
    status?: string;
    appliedAt: string;
    coverLetter?: string;
    candidateName: string;
    jobTitle: string;
    companyName: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateApplicationRequest {
    jobId: string;
    coverLetter?: string;
}

export interface UpdateApplicationStatusRequest {
    status: string;
}