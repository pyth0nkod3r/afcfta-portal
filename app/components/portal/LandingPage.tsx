import Header from "~/components/portal/Header";
import HeroSection from "~/components/portal/HeroSection";
import BenefitsSection from "~/components/portal/BenefitsSection";
import HowItWorksSection from "~/components/portal/HowItWorksSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <BenefitsSection />
      <HowItWorksSection />
    </div>
  );
}
