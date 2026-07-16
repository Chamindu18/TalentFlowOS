interface Props {
  status?: string;
}

export default function ApplicationStatusBadge({
  status,
}: Props) {
  const value = status?.toLowerCase() ?? "applied";

  const styles: Record<string, string> = {
    applied: "bg-blue-100 text-blue-700",
    shortlisted: "bg-purple-100 text-purple-700",
    interview: "bg-yellow-100 text-yellow-700",
    accepted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    reviewing: "bg-orange-100 text-orange-700",
    "in review": "bg-orange-100 text-orange-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[value] ?? "bg-slate-100 text-slate-700"
      }`}
    >
      {status ?? "Applied"}
    </span>
  );
}