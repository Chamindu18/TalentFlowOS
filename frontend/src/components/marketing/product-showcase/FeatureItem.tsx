import { type LucideIcon } from "lucide-react";

type FeatureItemProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  iconColor: string;
};

export default function FeatureItem({
  icon: Icon,
  title,
  description,
  color,
  iconColor,
}: FeatureItemProps) {
  return (
    <div className="group relative flex gap-6">
      {/* Timeline Dot */}
      <div
        className="
          relative
          z-10
          hidden
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          border-4
          border-[#FCFAF8]
          bg-white
          shadow-md
          lg:flex
        "
      >
        <div className="h-3 w-3 rounded-full bg-[#FF8A5B]" />
      </div>

      {/* Feature Card */}
      <div
        className="
          flex-1
          rounded-[28px]
          bg-white
          p-6
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
        "
      >
        <div className="flex items-start gap-5">
          <div
            className={`
              ${color}
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              transition-transform
              duration-300
              group-hover:scale-110
              group-hover:rotate-6
            `}
          >
            <Icon
              className={`h-7 w-7 ${iconColor}`}
            />
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#102541]">
              {title}
            </h3>

            <p className="mt-3 leading-7 text-slate-500">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}