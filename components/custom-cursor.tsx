"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * A deliberately restrained desktop-only cursor cue.
 *
 * The native cursor is only hidden while hovering an element that opts in with
 * `data-cursor="view" | "link" | "image"`. Everything else — text selection,
 * clicking, keyboard focus — keeps the default platform behaviour, so the
 * affordance never gets in the way. Disabled entirely on touch devices and when
 * the visitor prefers reduced motion.
 */
const CURSOR_LABELS: Record<string, string> = {
  view: "View",
  image: "View",
  link: "Open",
};

export function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("");

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const cursorX = useSpring(x, { stiffness: 480, damping: 38, mass: 0.3 });
  const cursorY = useSpring(y, { stiffness: 480, damping: 38, mass: 0.3 });

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    document.documentElement.classList.add("has-cursor");

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const optIn = target.closest("[data-cursor]");
      const nextLabel = optIn instanceof HTMLElement ? CURSOR_LABELS[optIn.dataset.cursor ?? ""] ?? "" : "";
      setLabel((current) => (current === nextLabel ? current : nextLabel));
      setActive((current) => (current === Boolean(optIn) ? current : Boolean(optIn)));
    };

    const onLeave = () => setActive(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [shouldReduceMotion, x, y]);

  return (
    <motion.div
      className={active ? "cursor cursor--active" : "cursor"}
      style={{ x: cursorX, y: cursorY }}
      aria-hidden="true"
    >
      <span className="cursor__ring">
        <span className="cursor__label">{label}</span>
      </span>
    </motion.div>
  );
}
