import Navbar from "@/components/marketing/Navbar";
import HeroSection from "@/components/marketing/HeroSection";
import TrustedCompaniesSection from "@/components/marketing/trusted-companies/TrustedCompaniesSection";
import FeaturesSection from "@/components/marketing/features/FeaturesSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FBF4EC]">
      <Navbar />

      <HeroSection />

      <TrustedCompaniesSection />

      <FeaturesSection />
    </main>
  );
}