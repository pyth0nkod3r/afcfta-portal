import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const sectionVariants = cva("w-full", {
  variants: {
    spacing: {
      none: "py-0",
      sm: "py-8 md:py-12",
      default: "py-12 md:py-16 lg:py-20",
      lg: "py-16 md:py-20 lg:py-24",
      xl: "py-20 md:py-24 lg:py-32",
    },
    padding: {
      none: "px-0",
      sm: "px-4 md:px-6",
      default: "px-4 md:px-6 lg:px-8",
      lg: "px-6 md:px-8 lg:px-12",
    },
    background: {
      default: "bg-transparent",
      subtle: "bg-surface",
      primary: "bg-primary text-white",
      muted: "bg-gray-50 dark:bg-neutral-900",
    },
  },
  defaultVariants: {
    spacing: "default",
    padding: "default",
    background: "default",
  },
});

interface SectionProps
  extends React.ComponentProps<"section">,
    VariantProps<typeof sectionVariants> {
  container?: boolean;
  containerClassName?: string;
}

function Section({
  className,
  spacing,
  padding,
  background,
  container = true,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      data-slot="section"
      className={cn(
        sectionVariants({ spacing, padding, background }),
        className,
      )}
      {...props}
    >
      {container ? (
        <div
          className={cn(
            "mx-auto w-full max-w-(--container-max) px-4 sm:px-6 lg:px-8",
            containerClassName,
          )}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}

export { Section, sectionVariants };
export type { SectionProps };
