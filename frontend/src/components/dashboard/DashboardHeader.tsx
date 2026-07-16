import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function DashboardHeader({
  title,
  description,
  buttonText,
  onButtonClick,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm lg:flex-row lg:items-center">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          {title}
        </h1>

        <p className="mt-2 text-slate-500">
          {description}
        </p>
      </div>

      {buttonText && (
        <Button
          onClick={onButtonClick}
          className="rounded-xl bg-orange-500 px-6 hover:bg-orange-600"
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}