import { Heart, Users } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import TestimonialsCarousel from "./TestimonialsCarousel";

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="bg-[#FFFDFB] py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center lg:mb-20">
          <div
            className="
              mx-auto
              mb-6
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#FFE4D7]
              bg-white
              px-5
              py-2.5
              text-sm
              font-semibold
              text-[#FF8A5B]
              shadow-sm
              transition-all
              duration-300
              hover:scale-105
            "
          >
            <Heart className="h-4 w-4 fill-current" />

            Customer Stories
          </div>

          <h2
            className="
              text-4xl
              font-bold
              tracking-[-0.04em]
              text-[#102541]
              md:text-5xl
              lg:text-6xl
            "
          >
            Loved by recruitment teams
            <br />

            <span className="text-[#FF8A5B]">
              across Sri Lanka
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-8
              max-w-3xl
              text-lg
              leading-8
              text-slate-500
            "
          >
            See how leading organizations
            are transforming their hiring
            process and building
            high-performing teams with
            TalentFlow OS.
          </p>
        </div>

        {/* Testimonials */}
        <TestimonialsCarousel />

        {/* Bottom CTA */}
        <div
          className="
            mx-auto
            mt-20
            flex
            flex-col
            items-center
            justify-between
            gap-8
            rounded-[36px]
            border
            border-slate-100
            bg-white
            p-8
            shadow-[0_20px_60px_rgba(15,23,42,0.06)]
            transition-all
            duration-300
            hover:shadow-[0_30px_80px_rgba(255,138,91,0.08)]
            lg:flex-row
            lg:px-12
          "
        >
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <div
              className="
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-[#FFF3EC]
                text-[#FF8A5B]
              "
            >
              <Users className="h-10 w-10" />
            </div>

            <div className="text-center lg:text-left">
              <h3
                className="
                  text-2xl
                  font-bold
                  text-[#102541]
                "
              >
                Join 500+ organizations
                already hiring better
              </h3>

              <p className="mt-2 text-slate-500">
                Transform your recruitment
                process today.
              </p>
            </div>
          </div>

          <Button
            asChild
            className="
              h-14
              rounded-full
              bg-[#FF8A5B]
              px-10
              text-base
              font-semibold
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-[#FF7A45]
            "
          >
            <Link to="/register">
              Get Started Free
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}