import { ArrowRight } from "lucide-react";

import heroImage from "@/assets/hero/heroImage.png";

import { Button } from "@/components/ui/button";

import TopMatchCard from "./cards/TopMatchCard";
import InterviewScheduleCard from "./cards/InterviewScheduleCard";
import RecruitmentOverviewCard from "./cards/RecruitmentOverviewCard";

export default function HeroSection() {
  return (
    <section
      className="
        overflow-hidden
        bg-[#FBF4EC]
        py-10
        lg:min-h-[calc(100vh-96px)]
        lg:py-0
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-7xl
          items-center
          px-4
          sm:px-6
          lg:min-h-[calc(100vh-96px)]
          lg:px-8
        "
      >
        <div
          className="
            grid
            w-full
            items-center
            gap-12
            lg:grid-cols-[42%_58%]
            lg:gap-4
          "
        >
          {/* Left Content */}
          <div
            className="
              order-2
              flex
              flex-col
              justify-center
              text-center
              lg:order-1
              lg:text-left
            "
          >
            <h1
              className="
                text-4xl
                font-bold
                leading-[0.95]
                tracking-[-0.03em]
                text-[#102541]
                sm:text-5xl
                md:text-6xl
                xl:text-[76px]
              "
            >
              Transform hiring
              <br />
              into a competitive
              <br />
              <span className="text-[#FF8A5B]">
                advantage.
              </span>
            </h1>

            <p
              className="
                mx-auto
                mt-6
                max-w-lg
                text-base
                leading-8
                text-slate-600
                sm:text-lg
                lg:mx-0
              "
            >
              Find the right talent, streamline your workflow and make
              confident hiring decisions with intelligent recruitment tools.
            </p>

            <div
              className="
                mt-8
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:justify-center
                lg:justify-start
              "
            >
              {/* Primary Button */}
              <Button
                className="
                  group
                  relative
                  h-14
                  overflow-hidden
                  rounded-full
                  bg-[#FF8A5B]
                  px-9
                  text-base
                  font-semibold
                  text-white
                  shadow-[0_10px_30px_rgba(255,138,91,0.25)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#FF7D4A]
                  hover:shadow-[0_18px_40px_rgba(255,138,91,0.35)]
                "
              >
                <span
                  className="
                    absolute
                    left-[-120%]
                    top-0
                    h-full
                    w-[60%]
                    -skew-x-12
                    bg-gradient-to-r
                    from-transparent
                    via-white/25
                    to-transparent
                    transition-all
                    duration-700
                    group-hover:left-[140%]
                  "
                />

                <span className="relative z-10 flex items-center">
                  Get Started

                  <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
              </Button>

              {/* Secondary Button */}
              <Button
                variant="outline"
                className="
                  group
                  relative
                  h-14
                  overflow-hidden
                  rounded-full
                  border-2
                  border-[#102541]
                  bg-transparent
                  px-9
                  text-base
                  font-semibold
                  text-[#102541]
                  transition-all
                  duration-300
                  hover:-translate-y-[2px]
                  hover:shadow-lg
                "
              >
                <span
                  className="
                    absolute
                    inset-y-0
                    left-0
                    w-0
                    rounded-full
                    bg-[#102541]
                    transition-all
                    duration-300
                    ease-out
                    group-hover:w-full
                  "
                />

                <span className="relative z-10 flex items-center transition-colors duration-300 group-hover:text-white">
                  Explore Features

                  <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
              </Button>
            </div>
          </div>

          {/* Right Content */}
          <div
            className="
              order-1
              relative
              flex
              items-center
              justify-center
              lg:order-2
            "
          >
            <img
              src={heroImage}
              alt="TalentFlow Recruitment Platform"
              className="
                relative
                z-10
                w-full
                max-w-[320px]
                object-contain
                sm:max-w-[450px]
                md:max-w-[600px]
                lg:max-w-[780px]
              "
            />

            {/* Floating Cards - Desktop Only */}
            <div className="absolute -left-10 top-4 z-20 hidden xl:block">
              <TopMatchCard />
            </div>

            <div className="absolute -right-8 top-20 z-20 hidden xl:block">
              <InterviewScheduleCard />
            </div>

            <div className="absolute -bottom-4 right-52 z-20 hidden xl:block">
              <RecruitmentOverviewCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}