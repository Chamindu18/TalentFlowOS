import { Quote, Star } from "lucide-react";

type TestimonialCardProps = {
  name: string;
  role: string;
  company: string;
  companyLogo: string;
  image: string;
  review: string;
};

export default function TestimonialCard({
  name,
  role,
  company,
  companyLogo,
  image,
  review,
}: TestimonialCardProps) {
  return (
    <div
      className="
        group
        flex
        min-h-[420px]
        w-full
        max-w-[380px]
        flex-col
        justify-between
        rounded-[32px]
        border
        border-slate-100
        bg-white
        p-8
        shadow-[0_20px_60px_rgba(15,23,42,0.06)]
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-[0_30px_80px_rgba(255,138,91,0.12)]
      "
    >
      {/* Top Content */}
      <div>
        {/* Stars + Quote */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className="h-4 w-4 fill-[#FF8A5B] text-[#FF8A5B]"
              />
            ))}
          </div>

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-[#FFF3EC]
              text-[#FF8A5B]
              transition-all
              duration-300
              group-hover:rotate-12
              group-hover:scale-110
            "
          >
            <Quote className="h-5 w-5" />
          </div>
        </div>

        {/* Review */}
        <p
          className="
            text-[17px]
            leading-8
            text-slate-600
          "
        >
          {review}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-8">
        <div className="mb-6 h-px bg-slate-100" />

        <div className="flex items-center gap-4">
          <img
            src={image}
            alt={name}
            draggable={false}
            className="
              h-14
              w-14
              rounded-full
              object-cover
              ring-2
              ring-[#FFF3EC]
            "
          />

          <div>
            <h3
              className="
                text-lg
                font-bold
                text-[#102541]
              "
            >
              {name}
            </h3>

            <p
              className="
                text-sm
                text-slate-500
              "
            >
              {role}
            </p>
          </div>
        </div>

        {/* Company Logo */}
        <div className="mt-8 flex items-center justify-center">
          <img
            src={companyLogo}
            alt={company}
            draggable={false}
            className="
              h-10
              w-auto
              object-contain
              opacity-80
              transition-all
              duration-300
              group-hover:scale-105
              group-hover:opacity-100
            "
          />
        </div>
      </div>
    </div>
  );
}