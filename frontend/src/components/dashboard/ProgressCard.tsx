interface Props {
  percentage: number;
}

export default function ProgressCard({
  percentage,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold">
        Profile Completion
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Complete your profile to improve job matches.
      </p>

      <div className="mt-6 h-3 w-full rounded-full bg-slate-200">
        <div
          className="h-3 rounded-full bg-orange-500 transition-all"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm text-slate-500">
          Completion
        </span>

        <span className="font-semibold">
          {percentage}%
        </span>
      </div>
    </div>
  );
}