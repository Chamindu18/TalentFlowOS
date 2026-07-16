import type { Job } from "@/types/job";

interface Props {
  job: Job;
}

export default function JobDescription({ job }: Props) {
  return (
    <div className="space-y-6">

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

        <h2 className="mb-4 text-2xl font-bold">
          About this Job
        </h2>

        <p className="whitespace-pre-line leading-8 text-slate-600">
          {job.description || "No description available."}
        </p>

      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

        <h2 className="mb-4 text-2xl font-bold">
          Responsibilities
        </h2>

        <p className="whitespace-pre-line leading-8 text-slate-600">
          {job.responsibilities || "No responsibilities specified."}
        </p>

      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

        <h2 className="mb-4 text-2xl font-bold">
          Requirements
        </h2>

        <p className="whitespace-pre-line leading-8 text-slate-600">
          {job.requirements || "No requirements specified."}
        </p>

      </div>

    </div>
  );
}