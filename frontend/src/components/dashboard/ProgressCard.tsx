import {
  CheckCircle2,
  Circle,
  User,
} from "lucide-react";

interface Props {
  percentage: number;
}

export default function ProgressCard({
  percentage,
}: Props) {
  const completed = percentage >= 100;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">

        <div className="flex items-center justify-between">

          <div>

            <h3 className="text-xl font-bold">
              Profile Completion
            </h3>

            <p className="mt-1 text-sm text-orange-100">
              Complete your profile to attract recruiters.
            </p>

          </div>

          <div className="rounded-2xl bg-white/20 p-3">

            <User className="h-7 w-7" />

          </div>

        </div>

      </div>

      {/* Body */}
      <div className="p-6">

        <div className="mb-3 flex items-end justify-between">

          <span className="text-sm font-medium text-slate-500">
            Completion Progress
          </span>

          <span className="text-3xl font-bold text-orange-600">
            {percentage}%
          </span>

        </div>

        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">

          <div
            className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-700"
            style={{
              width: `${percentage}%`,
            }}
          />

        </div>

        <div className="mt-8 space-y-4">

          <ChecklistItem
            label="Personal Information"
            completed={percentage >= 20}
          />

          <ChecklistItem
            label="Resume Uploaded"
            completed={percentage >= 40}
          />

          <ChecklistItem
            label="Skills Added"
            completed={percentage >= 60}
          />

          <ChecklistItem
            label="Experience Added"
            completed={percentage >= 80}
          />

          <ChecklistItem
            label="Education Added"
            completed={completed}
          />

        </div>

        {!completed && (

          <div className="mt-8 rounded-xl bg-orange-50 p-4">

            <p className="text-sm text-orange-700">

              Complete your profile to increase visibility to recruiters and improve your chances of being shortlisted.

            </p>

          </div>

        )}

      </div>

    </div>
  );
}

interface ChecklistItemProps {
  label: string;
  completed: boolean;
}

function ChecklistItem({
  label,
  completed,
}: ChecklistItemProps) {
  return (
    <div className="flex items-center gap-3">

      {completed ? (
        <CheckCircle2 className="h-5 w-5 text-green-500" />
      ) : (
        <Circle className="h-5 w-5 text-slate-300" />
      )}

      <span
        className={
          completed
            ? "font-medium text-slate-900"
            : "text-slate-500"
        }
      >
        {label}
      </span>

    </div>
  );
}