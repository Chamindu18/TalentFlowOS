import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { jobService } from "@/services/jobService";

import type { Job } from "@/types/job";

import JobHeader from "@/components/job-details/JobHeader";
import JobDescription from "@/components/job-details/JobDescription";
import ApplyCard from "@/components/job-details/ApplyCard";

export default function CandidateJobDetailsPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [job, setJob] = useState<Job | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadJob(id);
    }
  }, [id]);

  const loadJob = async (jobId: string) => {
    try {
      setLoading(true);

      const data = await jobService.getById(jobId);

      setJob(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-lg">
        Loading job...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-4">

        <h2 className="text-2xl font-bold">
          Job not found
        </h2>

        <Button
          onClick={() => navigate("/candidate/jobs")}
        >
          Back to Jobs
        </Button>

      </div>
    );
  }

  return (
    <div className="space-y-8">

      <Button
        variant="outline"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />

        Back

      </Button>

      <JobHeader job={job} />

      <div className="grid gap-8 lg:grid-cols-3">

        <div className="lg:col-span-2">

          <JobDescription job={job} />

        </div>

        <div>

          <ApplyCard jobId={job.id} />

        </div>

      </div>

    </div>
  );
}