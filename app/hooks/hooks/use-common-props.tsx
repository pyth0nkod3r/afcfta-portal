import { useMemo } from "react";
import { cn } from "~/lib/utils";

/**
 * Custom hook for managing common component props and derived states
 */

interface UseCommonPropsOptions {
  className?: string;
  variant?: string;
  size?: string;
  disabled?: boolean;
}

export function useCommonProps({
  className,
  variant,
  size,
  disabled,
}: UseCommonPropsOptions) {
  const computedClassName = useMemo(() => {
    return cn(
      // Base classes can be added here
      className,
      disabled && "opacity-50 pointer-events-none",
    );
  }, [className, disabled]);

  return {
    className: computedClassName,
    "data-variant": variant,
    "data-size": size,
    "data-disabled": disabled,
  };
}

/**
 * Hook for managing responsive grid classes
 */
export function useResponsiveGrid(columns: number | "auto" = "auto") {
  return useMemo(() => {
    const baseClasses = "grid gap-6";

    switch (columns) {
      case 1:
        return cn(baseClasses, "grid-cols-1");
      case 2:
        return cn(baseClasses, "md:grid-cols-2");
      case 3:
        return cn(baseClasses, "md:grid-cols-2 lg:grid-cols-3");
      case 4:
        return cn(baseClasses, "md:grid-cols-2 lg:grid-cols-4");
      case "auto":
      default:
        return cn(
          baseClasses,
          "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        );
    }
  }, [columns]);
}

/**
 * Hook for managing background variants
 */
export function useBackgroundVariant(
  variant: "light" | "dark" | "gradient" | "muted" = "light",
) {
  return useMemo(() => {
    const variants = {
      light: {
        container: "bg-white dark:bg-gray-950",
        text: "text-gray-900 dark:text-gray-50",
        textMuted: "text-gray-600 dark:text-gray-400",
      },
      dark: {
        container: "bg-gray-900 dark:bg-gray-950",
        text: "text-white",
        textMuted: "text-gray-300",
      },
      gradient: {
        container: "bg-linear-to-tr from-slate-800 via-slate-800 to-slate-900",
        text: "text-white",
        textMuted: "text-white/80",
      },
      muted: {
        container: "bg-gray-50 dark:bg-gray-900",
        text: "text-gray-900 dark:text-gray-50",
        textMuted: "text-gray-600 dark:text-gray-400",
      },
    };

    return variants[variant];
  }, [variant]);
}
