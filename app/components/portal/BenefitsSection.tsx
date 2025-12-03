import { Globe, TrendingUp, Shield } from "lucide-react";
import { Card } from "~/components/ui/card";

const benefits = [
  {
    icon: Globe,
    title: "Continental Trade Access",
    description:
      "Join the largest free trade area in the world and access markets across 54 African countries.",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: TrendingUp,
    title: "Business Growth",
    description:
      "Expand your business reach, increase revenue streams, and build international partnerships.",
    iconBg: "bg-success/10",
    iconColor: "text-success",
  },
  {
    icon: Shield,
    title: "Compliance Support",
    description:
      "Get comprehensive guidance on meeting all regulatory requirements for cross-border trade.",
    iconBg: "bg-accent/10",
    iconColor: "text-accent-foreground",
  },
];

const BenefitsSection = () => {
  return (
    <section className="w-full py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={index}
                className="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${benefit.iconBg} mb-4`}
                >
                  <Icon className={`w-6 h-6 ${benefit.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
