import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import TestimonialCard from "./TestimonialCard";
import { testimonials } from "./testimonials.data";

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getVisibleCards = () => {
    if (window.innerWidth >= 1280) {
      return 3;
    }

    if (window.innerWidth >= 768) {
      return 2;
    }

    return 1;
  };

  const [visibleCards, setVisibleCards] =
    useState(getVisibleCards());

  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(getVisibleCards());
    };

    window.addEventListener(
      "resize",
      handleResize,
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize,
      );
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((previous) =>
        previous >=
        testimonials.length - visibleCards
          ? 0
          : previous + 1,
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [visibleCards]);

  const handlePrevious = () => {
    setCurrentIndex((previous) =>
      previous <= 0
        ? testimonials.length - visibleCards
        : previous - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((previous) =>
      previous >= testimonials.length - visibleCards
        ? 0
        : previous + 1,
    );
  };

  return (
    <div className="relative">
      {/* Navigation */}
      <div className="mb-10 flex items-center justify-center gap-4">
        <button
          onClick={handlePrevious}
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-slate-200
            bg-white
            text-[#102541]
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-[#FF8A5B]
            hover:text-[#FF8A5B]
            hover:shadow-lg
          "
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={handleNext}
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-slate-200
            bg-white
            text-[#102541]
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-[#FF8A5B]
            hover:text-[#FF8A5B]
            hover:shadow-lg
          "
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Cards */}
      <div className="overflow-hidden">
        <div
          className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
          {testimonials
            .slice(
              currentIndex,
              currentIndex + visibleCards,
            )
            .map((testimonial) => (
              <TestimonialCard
                key={testimonial.name}
                {...testimonial}
              />
            ))}
        </div>
      </div>

      {/* Dots */}
      <div className="mt-10 flex justify-center gap-3">
        {Array.from({
          length:
            testimonials.length -
            visibleCards +
            1,
        }).map((_, index) => (
          <button
            key={index}
            onClick={() =>
              setCurrentIndex(index)
            }
            className={`
              h-3
              rounded-full
              transition-all
              duration-300
              ${
                currentIndex === index
                  ? "w-10 bg-[#FF8A5B]"
                  : "w-3 bg-slate-300 hover:bg-slate-400"
              }
            `}
          />
        ))}
      </div>
    </div>
  );
}