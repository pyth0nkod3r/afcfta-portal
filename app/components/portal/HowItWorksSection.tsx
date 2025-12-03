import { Button } from "~/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const steps = [
  {
    number: "1",
    title: "Complete the Assessment",
    description:
      "Answer 12 questions about your business readiness for AfCFTA trade. Each question takes only seconds to answer.",
  },
  {
    number: "2",
    title: "Review Your Results",
    description:
      "Get instant feedback on your readiness score. If you score 100%, proceed directly to registration.",
  },
  {
    number: "3",
    title: "Get Guidance or Register",
    description:
      "If requirements are missing, receive detailed steps to complete them. Once ready, register and start trading.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Three simple steps to get started
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-3xl font-bold text-primary-foreground shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-base font-semibold rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              asChild
            >
              <Link to="/assessment">
                Start Your Assessment Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
