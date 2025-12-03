import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "~/lib/utils";
import { revealVariants, staggerContainer } from "~/lib/animations";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?:
    | "reveal"
    | "stagger"
    | "fade"
    | "slideUp"
    | "slideLeft"
    | "slideRight";
  delay?: number;
  once?: boolean;
}

const variants = {
  reveal: revealVariants,
  stagger: staggerContainer,
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  },
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  },
  slideRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  },
};

export function AnimatedSection({
  children,
  className,
  variant = "reveal",
  delay = 0,
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={variants[variant]}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
