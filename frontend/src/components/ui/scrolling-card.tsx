import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "../../lib/utils";

export interface FeatureTabItem {
  /** Stable key — used by AnimatePresence to detect panel changes */
  id: string;
  label: string;
  /** Short line shown under the label while this tab is active */
  description: string;
  /** Right-hand panel content for this tab */
  content: ReactNode;
}

export interface FeatureTabsProps {
  items: FeatureTabItem[];
  /** Milliseconds each tab stays active before auto-advancing. Default 5000. */
  duration?: number;
  className?: string;
}

export function FeatureTabs({ items, duration = 5000, className }: FeatureTabsProps) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const rafRef = useRef<number | undefined>(undefined);
  const startRef = useRef<number | null>(null);
  const prefersReducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  ).current;

  useEffect(() => {
    if (prefersReducedMotion) return; // no auto-advance, no animated bar

    startRef.current = null;

    function tick(ts: number) {
      if (paused) {
        // freeze the clock while paused, resume from where we left off
        startRef.current = null;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      if (startRef.current === null) startRef.current = ts - (progress / 100) * duration;

      const elapsed = ts - startRef.current;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);

      if (pct >= 100) {
        setActive((a) => (a + 1) % items.length);
        return; // effect re-runs on `active` change and resets the clock
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, duration, items.length, paused]);

  function handleSelect(i: number) {
    if (i === active) return;
    setProgress(0);
    setActive(i);
  }

  return (
    <div
      className={cn("grid items-stretch gap-8 md:grid-cols-2", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div role="tablist" aria-orientation="vertical" className="flex flex-col">
        {items.map((item, i) => {
          const isActive = i === active;
          const barWidth = i < active ? 100 : isActive ? progress : 0;

          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => handleSelect(i)}
              className={cn(
                "relative border-b border-border py-4 text-left transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"
              )}
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-base font-medium">{item.label}</span>
              </div>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-9 mt-1 overflow-hidden text-sm text-muted-foreground"
                  >
                    {item.description}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="absolute bottom-0 left-0 h-0.5 w-full bg-border">
                <div
                  className="h-full bg-primary"
                  style={{
                    width: `${barWidth}%`,
                    transition: isActive ? "none" : "width 0.2s ease-out",
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>

      <div className="relative min-h-70 overflow-hidden rounded-xl bg-muted/40">
        <AnimatePresence mode="wait">
          <motion.div
            key={items[active].id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center p-8"
          >
            {items[active].content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}