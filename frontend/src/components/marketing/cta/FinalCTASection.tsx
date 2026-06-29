import { ArrowRight, Rocket, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function FinalCTASection() {
  return (
    <section className="bg-[#FFFDFB] px-6 py-20 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div
          className="
            relative
            overflow-hidden
            rounded-[40px]
            bg-gradient-to-br
            from-[#FF7A45]
            via-[#FF8A5B]
            to-[#FFA270]
            px-6
            py-16
            text-white
            shadow-[0_40px_100px_rgba(255,138,91,0.25)]
            sm:px-10
            lg:px-20
            lg:py-24
          "
        >
          {/* Background Decorations */}
          <div
            className="
              absolute
              -left-32
              bottom-[-120px]
              h-[320px]
              w-[320px]
              rounded-full
              bg-white/10
            "
          />

          <div
            className="
              absolute
              -right-24
              top-[-80px]
              h-[260px]
              w-[260px]
              rounded-full
              bg-white/10
            "
          />

          <div
            className="
              absolute
              left-12
              top-24
              grid
              grid-cols-5
              gap-3
              opacity-20
            "
          >
            {Array.from({ length: 20 }).map((_, index) => (
              <div
                key={index}
                className="h-1.5 w-1.5 rounded-full bg-white"
              />
            ))}
          </div>

          <div
            className="
              absolute
              bottom-16
              right-16
              hidden
              grid-cols-5
              gap-3
              opacity-20
              lg:grid
            "
          >
            {Array.from({ length: 20 }).map((_, index) => (
              <div
                key={index}
                className="h-1.5 w-1.5 rounded-full bg-white"
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Badge */}
            <div
              className="
                mx-auto
                mb-8
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-white/15
                px-6
                py-3
                text-sm
                font-semibold
                backdrop-blur-md
              "
            >
              <Rocket className="h-4 w-4" />

              Get Started Today
            </div>

            {/* Heading */}
            <h2
              className="
                text-4xl
                font-bold
                tracking-[-0.04em]
                sm:text-5xl
                lg:text-7xl
              "
            >
              Ready to build
              <br />

              better teams?
            </h2>

            {/* Description */}
            <p
              className="
                mx-auto
                mt-8
                max-w-3xl
                text-lg
                leading-8
                text-white/90
                lg:text-xl
              "
            >
              Join organizations across Sri Lanka using TalentFlow OS
              to streamline recruitment, discover top talent and make
              smarter hiring decisions.
            </p>

            {/* CTA Button */}
            <div className="mt-12">
              <Button
                asChild
                className="
                  group
                  h-16
                  rounded-full
                  bg-white
                  px-10
                  text-lg
                  font-semibold
                  text-[#FF8A5B]
                  shadow-xl
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#FFF8F4]
                "
              >
                <Link
                  to="/register"
                  className="flex items-center gap-3"
                >
                  Get Started

                  <ArrowRight
                    className="
                      h-5
                      w-5
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div
              className="
                mt-12
                flex
                flex-col
                items-center
                justify-center
                gap-6
                text-sm
                font-medium
                text-white/95
                sm:flex-row
                sm:flex-wrap
              "
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />

                No credit card required
              </div>

              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />

                Setup in minutes
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />

                Enterprise-grade security
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}