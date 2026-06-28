import Navbar from "@/components/marketing/Navbar";
import HeroSection from "@/components/marketing/HeroSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FBF4EC]">
      <Navbar />

      <HeroSection />
    </main>
  );
}