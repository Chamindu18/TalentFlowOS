import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BriefcaseBusiness,
  MapPin,
} from "lucide-react";

interface Props {
    title: string;
    company: string;
    location: string;
    buttonText?: string;
    onClick?: () => void;
}

export default function JobCard({
  title,
  company,
  location,
  buttonText,
  onClick
}: Props) {
  return (
    <div
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-orange-300
        hover:shadow-xl
      "
    >
      <div className="flex items-start gap-4">

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-orange-100
            transition-colors
            duration-300
            group-hover:bg-orange-500
          "
        >
          <BriefcaseBusiness
            className="
              h-7
              w-7
              text-orange-600
              transition-colors
              duration-300
              group-hover:text-white
            "
          />
        </div>

        <div className="flex-1">

          <h3 className="text-lg font-bold text-slate-900">
            {title}
          </h3>

          <p className="mt-1 font-medium text-slate-600">
            {company}
          </p>

          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">

            <MapPin className="h-4 w-4" />

            {location}

          </div>

        </div>

      </div>

      <Button
        onClick={onClick}
        className="
          mt-6
          w-full
          rounded-xl
          bg-orange-500
          transition-all
          hover:bg-orange-600
        "
      >
        {buttonText}

        <ArrowRight className="ml-2 h-4 w-4" />

      </Button>

    </div>
  );
}