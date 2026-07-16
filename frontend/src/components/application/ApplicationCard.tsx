import { CalendarDays, Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import type { Application } from "@/types/job";
import ApplicationStatusBadge from "./ApplicationStatusBadge";

interface Props {
  application: Application;
}

export default function ApplicationCard({
  application,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-xl font-bold">
            {application.jobTitle}
          </h2>

          <div className="mt-2 flex items-center gap-2 text-slate-500">

            <Building2 size={16} />

            {application.companyName}

          </div>

        </div>

        <ApplicationStatusBadge
          status={application.status}
        />

      </div>

      <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">

        <CalendarDays size={16} />

        Applied on{" "}
        {new Date(
          application.appliedAt
        ).toLocaleDateString()}

      </div>

      <div className="mt-6 flex justify-end">

        <Button
          variant="outline"
          className="rounded-xl"
        >
          View Details

          <ArrowRight
            size={18}
            className="ml-2"
          />

        </Button>

      </div>

    </div>
  );
}