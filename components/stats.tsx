"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { stats } from "@/config/site";

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reducedMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      return;
    }
    const duration = 720;
    const startTime = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setCount(Math.round(value * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reducedMotion, value]);

  return <span ref={ref}>{reducedMotion ? value : count}{suffix}</span>;
}

export function Stats() {
  return (
    <section className="stats shell" aria-label="Portfolio statistics">
      <div className="stats__inner">
        {stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <strong><AnimatedNumber value={stat.value} suffix={stat.suffix} /></strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
