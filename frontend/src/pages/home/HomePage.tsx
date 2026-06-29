import ScrollReveal from "@/components/common/ScrollReveal";
import FeaturesSection from "@/components/marketing/features/FeaturesSection";
import HeroSection from "@/components/marketing/HeroSection";
import Navbar from "@/components/marketing/Navbar";
import TrustedCompaniesSection from "@/components/marketing/trusted-companies/TrustedCompaniesSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FBF4EC]">
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
    </main>
  );
}