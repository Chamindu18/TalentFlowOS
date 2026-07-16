import {
  Building2,
  MapPin,
  Briefcase,
  Wallet,
} from "lucide-react";

import type { Job } from "@/types/job";

interface Props {
  job: Job;
}

export default function JobHeader({ job }: Props) {
  const salary =
    job.salaryMin && job.salaryMax
      ? `Rs. ${job.salaryMin.toLocaleString()} - Rs. ${job.salaryMax.toLocaleString()}`
      : "Negotiable";

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

        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            job.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {job.isActive ? "Now Hiring" : "Closed"}
        </span>

      </div>

    </div>
  );
}