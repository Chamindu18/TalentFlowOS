import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  company: string;
  location: string;
}

export default function JobCard({
  title,
  company,
  location,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 p-5 shadow-sm transition-all hover:shadow-md">
      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-slate-600">
        {company}
      </p>

      <p className="text-sm text-slate-500">
        {location}
      </p>

      <Button className="mt-5 w-full rounded-xl bg-orange-500 hover:bg-orange-600">
        Apply Now
      </Button>
    </div>
  );
}