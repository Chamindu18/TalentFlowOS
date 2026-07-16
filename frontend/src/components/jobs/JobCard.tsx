import { MapPin, Briefcase, Clock3, Banknote, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Job } from "@/types/job";

interface JobCardProps {
  job: Job;
  onApply?: (job: Job) => void;
}

export default function JobCard({
  job,
  onApply,
}: JobCardProps) {
  const salary =
    job.salaryMin && job.salaryMax
      ? `Rs. ${job.salaryMin.toLocaleString()} - Rs. ${job.salaryMax.toLocaleString()}`
      : "Salary Negotiable";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-xl font-bold text-slate-900">
            {job.title}
          </h3>

          <div className="mt-2 flex items-center gap-2 text-slate-600">

            <Building2 size={16} />

            <span>{job.companyName}</span>

          </div>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            job.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {job.isActive ? "Open" : "Closed"}
        </span>

      </div>

      {/* Details */}

      <div className="mt-6 grid gap-3 text-sm text-slate-600">

        <div className="flex items-center gap-2">

          <MapPin size={16} />

          <span>
            {job.location || "Location not specified"}
          </span>

        </div>

        <div className="flex items-center gap-2">

          <Briefcase size={16} />

          <span>
            {job.employmentType || "Full Time"}
          </span>

        </div>

        <div className="flex items-center gap-2">

          <Clock3 size={16} />

          <span>
            {job.experienceLevel || "Any Experience"}
          </span>

        </div>

        <div className="flex items-center gap-2">

          <Banknote size={16} />

          <span>{salary}</span>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-6 flex items-center justify-between border-t pt-5">

        <div>

          <p className="text-xs text-slate-500">
            Deadline
          </p>

          <p className="font-medium">
            {job.applicationDeadline
              ? new Date(
                  job.applicationDeadline
                ).toLocaleDateString()
              : "No Deadline"}
          </p>

        </div>

        <Button
          onClick={() => onApply?.(job)}
          className="rounded-xl bg-orange-500 px-6 hover:bg-orange-600"
        >
          Apply
        </Button>

      </div>

    </div>
  );
}