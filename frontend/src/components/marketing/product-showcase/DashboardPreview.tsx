import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

import dashboardPreview from "@/assets/product-showcase/dashboardPreview.png";

import ProductStats from "./ProductStats";

export default function DashboardPreview() {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [5, -5]),
    {
      stiffness: 120,
      damping: 20,
      mass: 0.5,
    },
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-5, 5]),
    {
      stiffness: 120,
      damping: 20,
      mass: 0.5,
    },
  );

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (
      window.innerWidth < 1024 ||
      !containerRef.current
    ) {
      return;
    }

    const rect =
      containerRef.current.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="relative">
      {/* Orange Glow */}
      <div
        className="
          absolute
          -bottom-8
          -right-8
          h-48
          w-48
          rounded-full
          bg-[#FF8A5B]/10
          blur-3xl
          sm:h-64
          sm:w-64
          lg:h-72
          lg:w-72
        "
      />

      {/* Dashboard Card */}
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1200,
        }}
        className="
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-[#F5E9DF]
          bg-white
          p-3
          shadow-[0_25px_60px_rgba(15,23,42,0.08)]
          transition-all
          duration-500
          hover:-translate-y-1
          hover:shadow-[0_40px_90px_rgba(15,23,42,0.12)]
          sm:rounded-[32px]
          sm:p-4
          lg:rounded-[40px]
          lg:cursor-pointer
        "
      >
        <img
          src={dashboardPreview}
          alt="TalentFlow Dashboard"
          draggable={false}
          className="
            w-full
            rounded-[20px]
            object-cover
            select-none
            sm:rounded-[24px]
            lg:rounded-[28px]
          "
        />
      </motion.div>

      {/* Stats */}
      <div className="mt-6 sm:mt-8 lg:-mt-10">
        <ProductStats />
      </div>
    </div>
  );
}