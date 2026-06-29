import Navbar from "@/components/marketing/Navbar";
import HeroSection from "@/components/marketing/HeroSection";
import TrustedCompaniesSection from "@/components/marketing/trusted-companies/TrustedCompaniesSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FBF4EC]">
      <Navbar />

      <HeroSection />

      <TrustedCompaniesSection />
    </main>
  );
}