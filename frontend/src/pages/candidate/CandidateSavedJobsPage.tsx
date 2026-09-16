import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { MapPin, Building2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { candidateApi } from "@/services/candidateApi";

import type { SavedJob } from "@/types/job";

export default function CandidateSavedJobsPage() {
  const navigate = useNavigate();

  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSavedJobs();
  }, []);

  const loadSavedJobs = async () => {
    try {
      setLoading(true);
      const response = await candidateApi.getSavedJobs();
      setSavedJobs(response.data ?? []);
    } catch (error) {
      console.error(error);
      setSavedJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUnsave = async (savedJobId: string) => {
    try {
      await candidateApi.unsaveJob(savedJobId);
      setSavedJobs((prev) => prev.filter((job) => job.savedJobId !== savedJobId));
    } catch (error) {
      console.error(error);
      alert("Failed to remove saved job.");
    }
  };

  const handleViewJob = (jobId: string) => {
    navigate(`/candidate/jobs/${jobId}`);
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-lg font-medium">
        Loading saved jobs...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Saved Jobs</h1>
        <p className="mt-2 text-slate-500">
          Jobs you've saved for later. Click to view details or remove from saved.
        </p>
      </div>

      {savedJobs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
          <h2 className="text-xl font-semibold">No Saved Jobs Yet</h2>
          <p className="mt-3 text-slate-500">
            Start saving jobs to see them here.
          </p>
          <Button
            onClick={() => navigate("/candidate/jobs")}
            className="mt-5 bg-orange-500 hover:bg-orange-600"
          >
            Browse Jobs
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {savedJobs.map((job) => (
            <div
              key={job.savedJobId}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900">{job.jobTitle}</h3>
                  <div className="mt-2 flex items-center gap-2 text-slate-600">
                    <Building2 size={16} />
                    <span>{job.companyName}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-slate-500 text-sm">
                    <MapPin size={14} />
                    <span>{job.location}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleUnsave(job.savedJobId)}
                  className="text-red-500 hover:bg-red-50"
                  aria-label="Remove from saved jobs"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="mt-6 flex items-center justify-between border-t pt-5">
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleViewJob(job.jobId)}
                    className="rounded-xl px-4 flex-1"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}