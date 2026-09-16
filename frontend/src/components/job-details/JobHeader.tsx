import {
  Building2,
  MapPin,
  Briefcase,
  Wallet,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";

import type { Job, SavedJob } from "@/types/job";
import { candidateApi } from "@/services/candidateApi";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  job: Job & { isSaved?: boolean };
}

export default function JobHeader({ job }: Props) {
  const salary =
    job.salaryMin && job.salaryMax
      ? `Rs. ${job.salaryMin.toLocaleString()} - Rs. ${job.salaryMax.toLocaleString()}`
      : "Negotiable";

  const [isSaved, setIsSaved] = useState(job.isSaved ?? false);
  const [savedJobId, setSavedJobId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSaveToggle = async () => {
    if (saving) return;
    setSaving(true);
    try {
      if (isSaved && savedJobId) {
        await candidateApi.unsaveJob(savedJobId);
        setIsSaved(false);
        setSavedJobId(null);
      } else {
        await candidateApi.saveJob(job.id);
        // Fetch the saved job to get the savedJobId
        const response = await candidateApi.getSavedJobs();
        const savedJobs = (response.data ?? []) as SavedJob[];
        const saved = savedJobs.find((sj) => sj.jobId === job.id);
        if (saved) {
          setSavedJobId(saved.savedJobId);
        }
        setIsSaved(true);
      }
    } catch (error) {
      console.error("Failed to save/unsave job:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

      <div className="flex items-start justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            {job.title}
          </h1>

          <div className="mt-3 flex flex-wrap gap-6 text-slate-500">

            <span className="flex items-center gap-2">
              <Building2 size={18} />
              {job.companyName}
            </span>

            <span className="flex items-center gap-2">
              <MapPin size={18} />
              {job.location}
            </span>

            <span className="flex items-center gap-2">
              <Briefcase size={18} />
              {job.employmentType}
            </span>

            <span className="flex items-center gap-2">
              <Wallet size={18} />
              {salary}
            </span>

          </div>

        </div>

        <div className="flex items-center gap-3">
          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              job.isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {job.isActive ? "Now Hiring" : "Closed"}
          </span>
          <Button
            variant={isSaved ? "default" : "outline"}
            onClick={handleSaveToggle}
            disabled={saving}
            className="rounded-xl px-4"
            aria-label={isSaved ? "Remove from saved jobs" : "Save job"}
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="mr-2 h-4 w-4" />
                Saved
              </>
            ) : (
              <>
                <Bookmark className="mr-2 h-4 w-4" />
                Save
              </>
            )}
          </Button>
        </div>

      </div>

    </div>
  );
}