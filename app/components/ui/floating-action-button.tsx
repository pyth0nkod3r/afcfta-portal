import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";
import { useSmoothScroll } from "~/hooks/use-smooth-scroll";

interface FloatingActionButtonProps {
  showAfter?: number;
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  position?: "bottom-right" | "bottom-left" | "bottom-center";
}

export function FloatingActionButton({
  showAfter = 300,
  className,
  icon = <ArrowUp className="w-5 h-5" />,
  onClick,
  position = "bottom-right",
}: FloatingActionButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollToTop } = useSmoothScroll();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > showAfter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [showAfter]);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      scrollToTop();
    }
  };

  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "bottom-center": "bottom-6 left-1/2 transform -translate-x-1/2",
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className={cn(
            "fixed z-50 p-3 bg-primary text-white rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            positionClasses[position],
            className,
          )}
          onClick={handleClick}
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
            },
          }}
          exit={{
            opacity: 0,
            scale: 0,
            y: 20,
            transition: {
              duration: 0.2,
            },
          }}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.9 }}
        >
          {icon}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
