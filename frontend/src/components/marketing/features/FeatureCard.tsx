import { type LucideIcon } from "lucide-react";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
};

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  iconBg,
  iconColor,
}: FeatureCardProps) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-slate-100
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-2xl
        hover:shadow-slate-200/60
        sm:p-8
      "
    >
      {/* Glow Effect */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-white
          via-transparent
          to-[#FFF3EC]
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

      <div className="relative z-10">
        <div
          className={`
            mb-6
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-3xl
            ${iconBg}
            transition-transform
            duration-500
            group-hover:rotate-6
            group-hover:scale-110
            sm:mb-8
            sm:h-20
            sm:w-20
          `}
        >
          <Icon className={`h-8 w-8 sm:h-10 sm:w-10 ${iconColor}`} />
        </div>

        <h3
          className="
            mb-3
            text-2xl
            font-bold
            leading-tight
            text-[#102541]
            sm:mb-4
            sm:text-3xl
          "
        >
          {title}
        </h3>

        <p
          className="
            text-base
            leading-7
            text-slate-500
            sm:text-lg
            sm:leading-8
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
}