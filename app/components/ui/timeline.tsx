import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const timelineVariants = cva("relative", {
  variants: {
    orientation: {
      vertical: "flex flex-col gap-8 md:gap-10",
      horizontal:
        "flex w-full flex-row items-stretch gap-6 overflow-x-auto pb-8 md:gap-8",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

type TimelineStatus = "completed" | "current" | "upcoming";

interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  date?: string;
  status?: TimelineStatus;
  icon?: React.ReactNode;
}

interface TimelineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineVariants> {
  items: TimelineItem[];
  mobileOrientation?: "vertical" | "horizontal";
}

const statusStyles: Record<TimelineStatus, string> = {
  completed: "border-primary bg-primary text-white",
  current: "border-accent bg-accent ring-4 ring-accent/20 text-white",
  upcoming:
    "border-gray-300 bg-white text-gray-900 dark:bg-neutral-900 dark:text-gray-100",
};

function Timeline({
  className,
  orientation = "vertical",
  mobileOrientation = "vertical",
  items,
  ...props
}: TimelineProps) {
  const [isMobile, setIsMobile] = React.useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const effectiveOrientation =
    isMobile && mobileOrientation ? mobileOrientation : orientation;

  return (
    <div
      data-slot="timeline"
      className={cn(
        timelineVariants({ orientation: effectiveOrientation }),
        className,
      )}
      {...props}
    >
      {effectiveOrientation === "horizontal"
        ? renderHorizontalTimeline(items)
        : renderVerticalTimeline(items)}
    </div>
  );
}

function renderVerticalTimeline(items: TimelineItem[]) {
  return (
    <div className="relative pl-8 md:pl-12">
      <div className="absolute left-3 top-0 h-full w-px bg-gray-200 dark:bg-gray-700 md:left-5" />
      {items.map((item, index) => (
        <TimelineItemVertical
          key={item.id}
          item={item}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
}

function TimelineItemVertical({
  item,
  isLast,
}: {
  item: TimelineItem;
  isLast: boolean;
}) {
  const status = item.status ?? "upcoming";

  return (
    <div
      data-slot="timeline-item"
      className={cn("relative pb-8", isLast && "pb-0")}
    >
      <div
        className={cn(
          "absolute left-3 top-1 flex size-6 items-center justify-center rounded-full border-2 transition-transform md:left-5 md:size-8",
          statusStyles[status],
        )}
      >
        {item.icon ? (
          <span className="text-xs md:text-sm">{item.icon}</span>
        ) : null}
      </div>

      <div className="ml-10 space-y-2 md:ml-14">
        {item.date && (
          <span className="block text-xs font-semibold uppercase tracking-wide text-primary md:text-sm">
            {item.date}
          </span>
        )}
        <h3 className="font-heading text-lg font-semibold text-gray-900 dark:text-gray-50 md:text-xl">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 md:text-base">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}

function renderHorizontalTimeline(items: TimelineItem[]) {
  return (
    <div className="flex w-full min-w-0 gap-6 md:gap-8 items-stretch">
      {items.map((item, index) => (
        <TimelineItemHorizontal
          key={item.id}
          item={item}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
}

function TimelineItemHorizontal({
  item,
  isLast,
}: {
  item: TimelineItem;
  isLast: boolean;
}) {
  const status = item.status ?? "upcoming";

  return (
    <div
      data-slot="timeline-item"
      className="relative flex w-full min-w-[220px] flex-col"
    >
      {!isLast && (
        <div className="absolute left-[calc(50%+1.5rem)] top-6 hidden h-px w-[calc(100%-3rem+1.5rem+1.5rem)] bg-gray-200 dark:bg-gray-700 md:block md:left-[calc(50%+2rem)] md:top-6 md:w-[calc(100%-4rem+2rem+2rem)]" />
      )}

      <div
        className={cn(
          "mb-4 flex size-10 items-center justify-center rounded-full border-2 transition-transform md:size-12",
          statusStyles[status],
        )}
      >
        {item.icon ? <span className="text-sm">{item.icon}</span> : null}
      </div>

      <div className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-neutral-900 h-full">
        {item.date && (
          <span className="text-xs font-semibold uppercase tracking-wide text-primary md:text-sm">
            {item.date}
          </span>
        )}
        <h3 className="font-heading text-base font-semibold text-gray-900 dark:text-gray-50 md:text-lg">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 md:text-base">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}

export { Timeline };
export type { TimelineProps, TimelineItem, TimelineStatus };
