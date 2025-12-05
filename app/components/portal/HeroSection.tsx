import { Button } from "~/components/ui/button";
import { ArrowRight, Smile } from "lucide-react";
import { Link } from "react-router";

const HeroSection = () => {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
            AfCFTA Readiness Survey
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Before you register, please complete this 12-question readiness
            assessment. It helps us determine if your business is fully prepared
            to participate in AfCFTA trade.
          </p>

          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-highlight border border-accent/20 shadow-sm">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent">
              <Smile className="w-6 h-6 text-accent-foreground" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-highlight-foreground">
                Required Score
              </p>
              <p className="text-2xl font-bold text-accent-foreground">70%</p>
            </div>
          </div>

          <div className="pt-4">
            <Button
              size="lg"
              className="px-8 py-6 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link to="/assessment">
                Begin Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
