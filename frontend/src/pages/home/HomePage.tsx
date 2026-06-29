import CursorGlow from "@/components/common/CursorGlow";
import ScrollReveal from "@/components/common/ScrollReveal";

import FeaturesSection from "@/components/marketing/features/FeaturesSection";
import HeroSection from "@/components/marketing/HeroSection";
import Navbar from "@/components/marketing/Navbar";
import ProductShowcaseSection from "@/components/marketing/product-showcase/ProductShowcaseSection";
import TrustedCompaniesSection from "@/components/marketing/trusted-companies/TrustedCompaniesSection";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FBF4EC]">
      <CursorGlow />

      <Navbar />

      <ScrollReveal duration={0.9}>
        <HeroSection />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <TrustedCompaniesSection />
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <FeaturesSection />
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <ProductShowcaseSection />
      </ScrollReveal>
    </main>
  );
}