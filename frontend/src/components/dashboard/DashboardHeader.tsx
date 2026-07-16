import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

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
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-orange-500 p-8 text-white shadow-xl">

      {/* Background decoration */}
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-orange-300/20 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        <div className="max-w-2xl">

          <div className="mb-4 flex items-center gap-2 text-orange-200">

            <Sparkles className="h-5 w-5" />

            <span className="text-sm font-semibold uppercase tracking-widest">
              TalentFlow Dashboard
            </span>

          </div>

          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            {title}
          </h1>

          <p className="mt-4 max-w-xl text-lg leading-8 text-slate-200">
            {description}
          </p>

        </div>

        {buttonText && (
          <Button
            onClick={onButtonClick}
            className="h-12 rounded-xl bg-white px-6 text-slate-900 shadow-lg transition-all hover:scale-105 hover:bg-orange-100"
          >
            {buttonText}

            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}

      </div>

    </div>
  );
}