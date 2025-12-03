import { motion } from "framer-motion";
import { durations, easings } from "./animations";

/**
 * Common animation configurations for consistent motion across components
 */

/**
 * Get optimized animation settings based on device capabilities
 */
export function getOptimizedAnimationSettings() {
  // Return default settings for SSR
  if (typeof window === "undefined") {
    return {
      enableAnimations: true,
      enableParallax: true,
      enableComplexAnimations: true,
      staggerDelay: 0.1,
      animationDuration: 0.6,
    };
  }

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // Check device performance indicators
  const isLowEndDevice = navigator.hardwareConcurrency <= 2;
  const isSlowConnection =
    (navigator as unknown as { connection?: { effectiveType: string } })
      .connection &&
    (navigator as unknown as { connection?: { effectiveType: string } })
      .connection?.effectiveType === "slow-2g";

  return {
    enableAnimations: !prefersReducedMotion,
    enableParallax: !prefersReducedMotion && !isLowEndDevice,
    enableComplexAnimations:
      !prefersReducedMotion && !isLowEndDevice && !isSlowConnection,
    staggerDelay: isLowEndDevice ? 0.05 : 0.1,
    animationDuration: isLowEndDevice ? 0.3 : 0.6,
  };
}

// Standard reveal animation for sections
export const createRevealAnimation = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: {
    duration: durations.normal,
    ease: easings.smooth,
    delay,
  },
});

// Staggered children animation
export const createStaggeredAnimation = (
  staggerDelay = 0.1,
  childDelay = 0.1,
) => ({
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.3 },
  variants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: childDelay,
      },
    },
  },
});

// Individual staggered item animation
export const staggeredItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easings.smooth,
    },
  },
};

// Hero section animation
export const createHeroAnimation = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.6 },
  transition: { duration: 0.6, delay },
});

// Card grid animation
export const createCardAnimation = (index: number, baseDelay = 0.2) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: {
    duration: durations.normal,
    delay: baseDelay + index * 0.1,
    ease: easings.smooth,
  },
});

// CTA section animation
export const createCTAAnimation = () => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: 0.7 },
});

/**
 * Higher-order component for consistent animations
 */
export function AnimatedSection({
  children,
  delay = 0,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  [key: string]: unknown;
}) {
  return (
    <motion.div
      className={className}
      {...createRevealAnimation(delay)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Animated container for staggered children
 */
export function StaggeredContainer({
  children,
  staggerDelay = 0.1,
  childDelay = 0.1,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  staggerDelay?: number;
  childDelay?: number;
  className?: string;
  [key: string]: unknown;
}) {
  return (
    <motion.div
      className={className}
      {...createStaggeredAnimation(staggerDelay, childDelay)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
