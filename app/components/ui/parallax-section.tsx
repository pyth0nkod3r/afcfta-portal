import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "~/lib/utils";

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down";
  offset?: number;
}

export function ParallaxSection({
  children,
  className,
  speed = 0.5,
  direction = "up",
  offset = 0,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up" ? [offset, -100 * speed] : [-100 * speed, offset],
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  overlay?: boolean;
  overlayClassName?: string;
}

export function ParallaxImage({
  src,
  alt,
  className,
  speed = 0.3,
  overlay = false,
  overlayClassName,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="w-full h-full object-cover will-change-transform"
      />
      {overlay && (
        <div className={cn("absolute inset-0 bg-black/40", overlayClassName)} />
      )}
    </div>
  );
}
