import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      return;
    }

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const animate = () => {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${
          currentX - 100
        }px, ${currentY - 100}px, 0)`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="
        pointer-events-none
        fixed
        left-0
        top-0
        z-[999]
        hidden
        h-[200px]
        w-[200px]
        rounded-full
        bg-[#FF8A5B]/20
        blur-[40px]
        mix-blend-multiply
        lg:block
      "
    />
  );
}