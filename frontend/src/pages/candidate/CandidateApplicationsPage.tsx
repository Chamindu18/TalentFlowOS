import { useEffect, useState } from "react";

import { applicationService } from "@/services/applicationService";
import type { Application } from "@/types/job";

import ApplicationCard from "@/components/application/ApplicationCard";

export default function CandidateApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);

      const data = await applicationService.getMyApplications();

      setApplications(data);
    } catch (error) {
      console.error(error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-lg font-medium">
        Loading applications...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          My Applications
        </h1>

        <p className="mt-2 text-slate-500">
          Track all of your submitted job applications.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
          <h2 className="text-xl font-semibold">
            No Applications Yet
          </h2>

          <p className="mt-3 text-slate-500">
            Start applying for jobs to see your application history here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {applications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
            />
          ))}
        </div>
      )}
    </div>
  );
}