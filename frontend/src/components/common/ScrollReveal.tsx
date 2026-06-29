import { type ReactNode } from "react";
import { motion } from "framer-motion";

type ScrollRevealProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "left" | "right";
  className?: string;
};

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.8,
  direction = "up",
  className,
}: ScrollRevealProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case "left":
        return {
          x: -20,
          opacity: 0,
        };

      case "right":
        return {
          x: 20,
          opacity: 0,
        };

      default:
        return {
          y: 20,
          opacity: 0,
        };
    }
  };

  return (
    <div className="overflow-hidden">
      <motion.div
        className={className}
        initial={getInitialPosition()}
        whileInView={{
          x: 0,
          y: 0,
          opacity: 1,
        }}
        viewport={{
          once: true,
          amount: 0.3,
          margin: "-100px",
        }}
        transition={{
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}