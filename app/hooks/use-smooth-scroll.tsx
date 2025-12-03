import { useCallback } from "react";

interface SmoothScrollOptions {
  offset?: number;
  duration?: number;
  behavior?: ScrollBehavior;
}

export function useSmoothScroll() {
  const scrollToElement = useCallback(
    (elementId: string, options: SmoothScrollOptions = {}) => {
      const { offset = 80, behavior = "smooth" } = options;

      const element = document.getElementById(elementId);
      if (!element) return;

      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior,
      });
    },
    [],
  );

  const scrollToTop = useCallback((options: SmoothScrollOptions = {}) => {
    const { behavior = "smooth" } = options;

    window.scrollTo({
      top: 0,
      behavior,
    });
  }, []);

  const scrollToSection = useCallback(
    (selector: string, options: SmoothScrollOptions = {}) => {
      const { offset = 80, behavior = "smooth" } = options;

      const element = document.querySelector(selector);
      if (!element) return;

      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior,
      });
    },
    [],
  );

  return {
    scrollToElement,
    scrollToTop,
    scrollToSection,
  };
}
