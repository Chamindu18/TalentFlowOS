import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function SectionCard({
  title,
  children,
}: Props) {
  return (
    <section
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-5">

        <div>

          <h2 className="text-xl font-bold text-slate-900">
            {title}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest information and updates
          </p>

        </div>

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-orange-100
            text-orange-600
            transition-all
            duration-300
            group-hover:bg-orange-500
            group-hover:text-white
          "
        >
          <ChevronRight className="h-5 w-5" />
        </div>

      </div>

      {/* Body */}

      <div className="p-6">

        {children}

      </div>

    </section>
  );
}