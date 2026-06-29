import { BadgeCheck } from "lucide-react";

import creativeSoftware from "@/assets/companies/creativeSoftware.png";
import dialog from "@/assets/companies/dialog.png";
import hcl from "@/assets/companies/hcl.png";
import ikman from "@/assets/companies/ikman.png";
import johnkeels from "@/assets/companies/johnkeels.png";
import mobitel from "@/assets/companies/mobitel.png";
import pickme from "@/assets/companies/pickme.png";
import syscolabs from "@/assets/companies/syscolabs.png";
import wso2 from "@/assets/companies/wso2.png";

const companies = [
  {
    name: "Creative Software",
    logo: creativeSoftware,
    className: "max-h-[70px]",
  },
  {
    name: "Dialog",
    logo: dialog,
    className: "max-h-[70px]",
  },
  {
    name: "HCL",
    logo: hcl,
    className: "max-h-[70px]",
  },
  {
    name: "Ikman",
    logo: ikman,
    className: "max-h-[70px]",
  },
  {
    name: "John Keells",
    logo: johnkeels,
    className: "max-h-[100px] max-w-[300px]",
  },
  {
    name: "Mobitel",
    logo: mobitel,
    className: "max-h-[70px]",
  },
  {
    name: "PickMe",
    logo: pickme,
    className: "max-h-[70px]",
  },
  {
    name: "Sysco LABS",
    logo: syscolabs,
    className: "max-h-[70px]",
  },
  {
    name: "WSO2",
    logo: wso2,
    className: "max-h-[70px]",
  },
];

const duplicatedCompanies = [...companies, ...companies];

export default function TrustedCompaniesSection() {
  return (
    <section className="overflow-hidden bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 text-center">
          <div
            className="
              mx-auto
              mb-6
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-[#FFF3EC]
              px-5
              py-2.5
              text-sm
              font-semibold
              text-[#FF8A5B]
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-lg
              hover:shadow-[#FF8A5B]/10
            "
          >
            <BadgeCheck className="h-4 w-4" />

            Trusted Partners
          </div>

          <h2
            className="
              text-4xl
              font-bold
              tracking-[-0.03em]
              text-[#102541]
              md:text-5xl
            "
          >
            Trusted by Sri Lanka's
            <br />

            <span className="text-[#FF8A5B]">
              Leading Organizations
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-lg
              leading-8
              text-slate-500
            "
          >
            Empowering recruitment teams across technology,
            telecommunications, enterprise and digital industries.
          </p>
        </div>

        {/* Logo Marquee */}
        <div className="group relative overflow-hidden">
          <div
            className="
              animate-marquee
              flex
              w-max
              items-center
              gap-20
              group-hover:[animation-play-state:paused]
            "
          >
            {duplicatedCompanies.map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="
                  group/logo
                  flex
                  h-[110px]
                  w-[240px]
                  items-center
                  justify-center
                "
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  draggable={false}
                  className={`
                    ${company.className}
                    w-auto
                    object-contain
                    opacity-90
                    transition-all
                    duration-500
                    ease-out
                    group-hover/logo:-translate-y-2
                    group-hover/logo:scale-110
                    group-hover/logo:rotate-1
                    group-hover/logo:opacity-100
                    group-hover/logo:drop-shadow-[0_15px_30px_rgba(15,23,42,0.18)]
                  `}
                />
              </div>
            ))}
          </div>

          {/* Left Fade */}
          <div
            className="
              pointer-events-none
              absolute
              left-0
              top-0
              h-full
              w-32
              bg-gradient-to-r
              from-white
              via-white/80
              to-transparent
            "
          />

          {/* Right Fade */}
          <div
            className="
              pointer-events-none
              absolute
              right-0
              top-0
              h-full
              w-32
              bg-gradient-to-l
              from-white
              via-white/80
              to-transparent
            "
          />
        </div>
      </div>
    </section>
  );
}