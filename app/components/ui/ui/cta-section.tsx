import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { Section } from "~/components/ui/section";
import { Heading, Body } from "~/components/ui/typography";
import { cn } from "~/lib/utils";
import { type LucideIcon } from "lucide-react";

interface CTAAction {
  label: string;
  href: string;
  variant?: "primary" | "outline" | "secondary";
  icon?: LucideIcon;
}

interface CTASectionProps {
  badge?: {
    text: string;
    icon?: LucideIcon;
  };
  title: string;
  description: string;
  actions?: CTAAction[];
  background?: "default" | "gradient" | "muted";
  className?: string;
}

export function CTASection({
  badge,
  title,
  description,
  actions = [],
  background = "gradient",
  className,
}: CTASectionProps) {
  const backgroundClasses = {
    default: "bg-background",
    gradient: "bg-linear-to-tr from-slate-800 via-slate-800 to-slate-900",
    muted: "bg-gray-50 dark:bg-gray-900",
  };



  return (
    <Section
      className={cn(backgroundClasses[background], "py-14 sm:py-18", className)}
      container={false}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center gap-6 text-center"
        >
          {badge && (
            <div
              className={cn(
                "inline-flex items-center gap-2 px-5 py-2 rounded-full mb-2 font-semibold text-sm",
                background === "gradient"
                  ? "bg-white/10 text-white"
                  : "bg-primary/10 text-primary",
              )}
            >
              {badge.icon && <badge.icon className="w-5 h-5" aria-hidden />}
              {badge.text}
            </div>
          )}

          <Heading
            as="h2"
            level="h2"
            className={cn(
              "font-heading font-bold mb-2",
              background === "gradient" ? "text-white" : "",
            )}
          >
            {title}
          </Heading>

          <Body
            size="default"
            className={cn(
              "max-w-2xl mb-5",
              background === "gradient" ? "text-white/80" : "text-gray-600",
            )}
          >
            {description}
          </Body>

          {actions.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4">
              {actions.map((action) => (
                <Button
                  key={action.label}
                  asChild
                  variant={action.variant || "primary"}
                  size="lg"
                  className={cn(
                    "inline-flex items-center gap-2",
                    action.variant === "outline" && background === "gradient"
                      ? "border-white text-white hover:bg-white/10"
                      : "",
                  )}
                >
                  <a href={action.href}>
                    {action.icon && <action.icon className="w-5 h-5" />}
                    {action.label}
                  </a>
                </Button>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </Section>
  );
}
