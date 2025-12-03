import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const headingVariants = cva(
  "font-heading font-bold text-gray-900 dark:text-gray-50",
  {
    variants: {
      level: {
        h1: "text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight",
        h2: "text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight",
        h3: "text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-snug",
        h4: "text-lg md:text-xl lg:text-2xl xl:text-3xl leading-snug",
        h5: "text-base md:text-lg lg:text-xl xl:text-2xl leading-normal",
        h6: "text-sm md:text-base lg:text-lg xl:text-xl leading-normal",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      color: {
        default: "text-gray-900 dark:text-gray-50",
        primary: "text-primary",
        secondary: "text-secondary",
        accent: "text-accent",
        muted: "text-gray-600 dark:text-gray-400",
      },
    },
    defaultVariants: {
      level: "h2",
      align: "left",
      color: "default",
    },
  },
);

interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, "color">,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

function Heading({
  className,
  level,
  align,
  color,
  as,
  children,
  ...props
}: HeadingProps) {
  const Component = (as ?? level ?? "h2") as React.ElementType;

  return (
    <Component
      data-slot="heading"
      className={cn(headingVariants({ level, align, color }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}

const bodyVariants = cva("font-sans text-gray-700 dark:text-gray-300", {
  variants: {
    size: {
      xs: "text-xs md:text-sm leading-relaxed",
      sm: "text-sm md:text-base leading-relaxed",
      default: "text-base md:text-lg leading-relaxed",
      lg: "text-lg md:text-xl leading-relaxed",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    color: {
      default: "text-gray-700 dark:text-gray-300",
      muted: "text-gray-600 dark:text-gray-400",
      primary: "text-primary",
    },
    transform: {
      none: "",
      uppercase: "uppercase tracking-wide",
      caps: "uppercase tracking-tight text-xs md:text-sm",
    },
  },
  defaultVariants: {
    size: "default",
    weight: "normal",
    align: "left",
    color: "default",
    transform: "none",
  },
});

interface BodyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof bodyVariants> {
  as?: "p" | "span" | "div";
}

function Body({
  className,
  size,
  weight,
  align,
  color,
  transform,
  as = "p",
  children,
  ...props
}: BodyProps) {
  const Component = as as React.ElementType;

  return (
    <Component
      data-slot="body"
      className={cn(
        bodyVariants({ size, weight, align, color, transform }),
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export { Heading, Body, headingVariants, bodyVariants };
export type { HeadingProps, BodyProps };
