import { useState, useEffect } from 'react';
import { jobService } from '../../services/jobService'; 

const CandidateJobsPage = () => {
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const data = await jobService.getAllJobs();
                console.log("Fetched Jobs:", data); 
                setJobs(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Error loading jobs:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    if (loading) return <div className="p-10 text-center text-xl">Loading Jobs...</div>;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-8">Available Jobs</h1>
            {jobs.length === 0 ? (
                <p>No jobs found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {jobs.map((job: any) => (
                        <div key={job.id} className="p-6 bg-white rounded-xl shadow border">
                            <h2 className="text-xl font-bold">{job.title || "No Title"}</h2>
                            <p className="text-gray-500 mb-4">{job.companyName || "Unknown Company"}</p>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded">Apply Now</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default CandidateJobsPage;