import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { ASSETS } from "~/lib/constants";
import { type LucideIcon } from "lucide-react";

interface HeroAction {
  label: string;
  href: string;
  variant?: "primary" | "outline" | "secondary";
  icon?: LucideIcon;
}

interface HeroStat {
  icon: LucideIcon;
  value: string;
  label: string;
  description?: string;
}

interface PageHeroProps {
  badge?: {
    text: string;
    icon?: LucideIcon;
  };
  title: string;
  description: string;
  actions?: HeroAction[];
  stats?: HeroStat[];
  backgroundImage?: string;
  subtitle?: string;
  className?: string;
  id?: string;
}

export function PageHero({
  badge,
  title,
  subtitle,
  description,
  actions = [],
  stats = [],
  backgroundImage = ASSETS.heroImage,
  className,
  id,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-surface text-white bg-cover bg-center",
        className,
      )}
      style={{ backgroundImage: `url('${backgroundImage}')` }}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-background/85" />

      <div className="relative container mx-auto px-4 py-16 sm:py-24 lg:py-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            {badge && (
              <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                {badge.icon && (
                  <badge.icon className="mr-2 size-4" aria-hidden />
                )}
                {badge.text}
              </span>
            )}
            <h1
              id={id ? `${id}-heading` : undefined}
              className="text-3xl font-heading font-bold leading-tight sm:text-4xl lg:text-5xl xl:text-6xl"
            >
              {title}
            </h1>
            {subtitle && (
              <p className="text-xl text-white/90 sm:text-2xl font-medium">
                {subtitle}
              </p>
            )}
            <p className="max-w-2xl text-base text-white/80 sm:text-lg">
              {description}
            </p>
          </div>

          {/* Stats Grid */}
          {stats.length > 0 && (
            <div
              className={cn(
                "grid gap-4 max-w-2xl",
                stats.length === 2 && "sm:grid-cols-2",
                stats.length === 3 && "sm:grid-cols-3",
                stats.length >= 4 && "sm:grid-cols-2 lg:grid-cols-4",
              )}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-white/10 rounded-lg p-4 text-center"
                >
                  <stat.icon className="size-8 mx-auto mb-2 text-accent" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                  {stat.description && (
                    <div className="text-xs text-white/60 mt-1">
                      {stat.description}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          {actions.length > 0 && (
            <div className="flex gap-4 flex-wrap">
              {actions.map((action) => (
                <Button
                  key={action.label}
                  variant={action.variant || "primary"}
                  size="lg"
                  asChild
                  className={cn(
                    "inline-flex items-center gap-2",
                    action.variant === "outline" &&
                      "bg-white/10 border-white/20 text-white hover:bg-white/20",
                  )}
                >
                  <a href={action.href}>
                    {action.icon && <action.icon className="size-4" />}
                    {action.label}
                  </a>
                </Button>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
