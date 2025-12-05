import Header from "~/components/portal/Header";
import HeroSection from "~/components/portal/HeroSection";
import BenefitsSection from "~/components/portal/BenefitsSection";
import HowItWorksSection from "~/components/portal/HowItWorksSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-cyan-100">
      <Header />
      <HeroSection />
      <BenefitsSection />
      <HowItWorksSection />
    </div>
  );
}
