import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { useIntersectionObserver } from "~/hooks/use-intersection-observer";

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  className,
  prefix = "",
  suffix = "",
  decimals = 0,
}: AnimatedCounterProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [hasStarted, setHasStarted] = useState(false);
  const spring = useSpring(from, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const display = useTransform(spring, (current) =>
    (
      Math.round(current * Math.pow(10, decimals)) / Math.pow(10, decimals)
    ).toFixed(decimals),
  );

  useEffect(() => {
    if (isIntersecting && !hasStarted) {
      setHasStarted(true);
      spring.set(to);
    }
  }, [isIntersecting, hasStarted, spring, to]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isIntersecting ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: duration, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </motion.span>
  );
}
