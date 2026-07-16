import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import JobCard from "@/components/jobs/JobCard";
import JobSearchBar from "@/components/jobs/JobSearchBar";
import JobFilter from "@/components/jobs/JobFilter";
import JobEmptyState from "@/components/jobs/JobEmptyState";

import { jobService } from "@/services/jobService";
import type { Job } from "@/types/job";

export default function CandidateJobsPage() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);

      const data = await jobService.getAllJobs();

      setJobs(data ?? []);
    } catch (error) {
      console.error(error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = useMemo(() => {
  return jobs.filter((job) => {
    const searchTerm = search.trim().toLowerCase();

    const matchesSearch =
      searchTerm === "" ||
      job.title.toLowerCase().includes(searchTerm) ||
      job.companyName.toLowerCase().includes(searchTerm) ||
      (job.location ?? "").toLowerCase().includes(searchTerm);

    const employment =
      (job.employmentType ?? "")
        .toLowerCase()
        .replace("-", " ");

    let matchesFilter = true;

    switch (filter) {
      case "Remote":
        matchesFilter = job.isRemote;
        break;

      case "On-site":
        matchesFilter = !job.isRemote;
        break;

      case "Full Time":
        matchesFilter = employment.includes("full");
        break;

      case "Part Time":
        matchesFilter = employment.includes("part");
        break;

      case "Internship":
        matchesFilter =
          employment.includes("intern");
        break;

      default:
        matchesFilter = true;
    }

    return matchesSearch && matchesFilter;
  });
}, [jobs, search, filter]);

  const handleApply = (job: Job) => {
    navigate(`/candidate/jobs/${job.id}`);
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-lg font-medium">
        Loading jobs...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold text-slate-900">
          Browse Jobs
        </h1>

        <p className="mt-2 text-slate-500">
          Find opportunities that match your skills and interests.
        </p>

      </div>

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

  <div>

    <h1 className="text-3xl font-bold">
      Browse Jobs
    </h1>

    <p className="mt-2 text-slate-500">
      Discover opportunities tailored to your career goals.
    </p>

  </div>

  <div className="rounded-xl bg-orange-50 px-5 py-3">

    <p className="text-sm text-slate-500">
      Available Jobs
    </p>

    <h2 className="text-2xl font-bold text-orange-600">
      {filteredJobs.length}
    </h2>

  </div>

</div>

      <JobSearchBar
        value={search}
        onChange={setSearch}
      />

      <JobFilter
        filter={filter}
        onChange={setFilter}
      />

      {filteredJobs.length === 0 ? (
        <JobEmptyState />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onApply={handleApply}
            />
          ))}
        </div>
      )}
    </div>
  );
}