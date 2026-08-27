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

export function FeatureTabs({ items, duration = 2000, className }: FeatureTabsProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const rafRef = useRef<number | undefined>(undefined);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pausedRef = useRef(false);

  const prefersReducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  ).current;

  // keep a ref in sync with `paused` so the rAF loop can read it
  // without needing to restart every time it's toggled
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  // reset every bar's width whenever the active tab changes
  // (runs once per switch — cheap, and it's the only re-render this triggers)
  useEffect(() => {
    items.forEach((_, i) => {
      const bar = barRefs.current[i];
      if (!bar) return;
      if (i < active) bar.style.width = "100%";
      else if (i > active) bar.style.width = "0%";
      else bar.style.width = "0%"; // active bar starts fresh, raf loop takes over
    });
  }, [active, items.length]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let start: number | null = null;
    let elapsedAtPause = 0;

    function tick(ts: number) {
      if (pausedRef.current) {
        // freeze: remember how far we'd gotten, don't advance further
        if (start !== null) {
          elapsedAtPause = ts - start;
          start = null;
        }
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      if (start === null) start = ts - elapsedAtPause;

      const elapsed = ts - start;
      const pct = Math.min(100, (elapsed / duration) * 100);

      const bar = barRefs.current[active];
      if (bar) bar.style.width = `${pct}%`; // <- direct DOM write, no setState

      if (pct >= 100) {
        setActive((a) => (a + 1) % items.length);
        return; // effect re-runs on `active` change, fresh start
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  }, [active, duration, items.length, prefersReducedMotion]);

  function handleSelect(i: number) {
    if (i === active) return;
    setActive(i);
  }

  return (
    <div
      className={cn("grid items-stretch gap-0 md:grid-cols-2", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div role="tablist" aria-orientation="vertical" className="flex flex-col">
        {items.map((item, i) => {
          const isActive = i === active;

          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => handleSelect(i)}
              className={cn(
                "relative py-4 text-left transition-colors",
                i !== items.length - 1 && "border-b border-border",
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"
              )}
               >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-subheading font-medium">{item.label}</span>
              </div>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-7 mt-1 overflow-hidden text-base text-muted-foreground"
                  >
                    {item.description}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="absolute bottom-0 left-0 h-0.5 w-full bg-border">
                <div
                  ref={(el) => {
                    barRefs.current[i] = el;
                  }}
                  className="h-full bg-primary"
                  style={{ width: "0%" }}
                />
              </div>
            </button>
          );
        })}
      </div>

      <div className="relative bg-lemon-dim min-h-70 overflow-hidden rounded-b-4xl md:rounded-r-4xl bg-muted/40">
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