import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Common styling utilities for consistent design patterns
 */

// Container classes for consistent max-width and padding
export const containerClasses =
  "mx-auto w-full max-w-[1440px] px-6 lg:px-10 xl:px-12";

// Common gradient backgrounds
export const gradientBackgrounds = {
  primary: "bg-linear-to-br from-primary/90 via-primary/80 to-background/85",
  dark: "bg-linear-to-tr from-slate-800 via-slate-800 to-slate-900",
  surface: "bg-surface",
} as const;

// Hero background pattern
export const heroBackgroundPattern = (
  imageUrl = "/images/hero-placeholder.png",
) => ({
  backgroundImage: `url('${imageUrl}')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
});

// Common button styles for CTAs
export const ctaButtonStyles = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  outline: "border border-white/20 text-white hover:bg-white/10",
  secondary: "bg-white text-primary hover:bg-gray-100",
} as const;

// Grid responsive classes
export const gridResponsive = {
  two: "grid gap-6 md:grid-cols-2",
  three: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
  four: "grid gap-6 md:grid-cols-2 lg:grid-cols-4",
  auto: "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
} as const;

// Common spacing classes
export const spacing = {
  section: "py-12 md:py-16 lg:py-20",
  sectionLg: "py-16 md:py-20 lg:py-24",
  hero: "py-16 sm:py-24 lg:py-36",
  container: "px-4 sm:px-6 lg:px-8",
} as const;

// Text color utilities for different backgrounds
export const textColors = {
  onDark: "text-white",
  onLight: "text-gray-900 dark:text-gray-50",
  muted: "text-gray-600 dark:text-gray-400",
  mutedOnDark: "text-white/80",
} as const;
