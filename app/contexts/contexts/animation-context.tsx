import { createContext, useContext, useEffect, useState } from "react";
import { getOptimizedAnimationSettings } from "~/lib/animation-utils";

interface AnimationSettings {
  enableAnimations: boolean;
  enableParallax: boolean;
  enableComplexAnimations: boolean;
  staggerDelay: number;
  animationDuration: number;
}

interface AnimationContextType extends AnimationSettings {
  updateSettings: (settings: Partial<AnimationSettings>) => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined,
);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AnimationSettings>(() =>
    getOptimizedAnimationSettings(),
  );

  useEffect(() => {
    // Re-evaluate settings on client-side hydration
    setSettings(getOptimizedAnimationSettings());

    // Update settings when device capabilities change
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setSettings(getOptimizedAnimationSettings());
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const updateSettings = (newSettings: Partial<AnimationSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <AnimationContext.Provider value={{ ...settings, updateSettings }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimationSettings() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error(
      "useAnimationSettings must be used within an AnimationProvider",
    );
  }
  return context;
}
