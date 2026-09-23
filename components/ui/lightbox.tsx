"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

export type LightboxItem = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

type LightboxProps = {
  items: LightboxItem[];
  /** Active index, or `null` when the viewer is closed. */
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  title: string;
};

/**
 * Accessible fullscreen image viewer: Escape closes, arrows step through,
 * focus moves to the close button and returns to the trigger on exit.
 */
export function Lightbox({ items, index, onClose, onIndexChange, title }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const open = index !== null && items.length > 0;

  const step = useCallback(
    (direction: number) => {
      if (index === null) return;
      onIndexChange((index + direction + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      restoreRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, step]);

  const current = index === null ? null : items[index] ?? null;
  const position = index === null ? 0 : index + 1;

  return (
    <AnimatePresence>
      {open && current ? (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} — fullscreen viewer`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          onClick={onClose}
        >
          <div className="lightbox__bar" onClick={(event) => event.stopPropagation()}>
            <p className="label">
              {title} — {position} / {items.length}
            </p>
            <button ref={closeRef} type="button" className="lightbox__close" onClick={onClose} aria-label="Close fullscreen viewer">
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="lightbox__stage" onClick={(event) => event.stopPropagation()}>
            {items.length > 1 ? (
              <button
                type="button"
                className="lightbox__nav lightbox__nav--prev"
                onClick={() => step(-1)}
                aria-label="Previous photograph"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
            ) : null}

            <motion.figure
              className="lightbox__figure"
              key={current.src}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={current.src}
                alt={current.alt}
                width={current.width ?? 1200}
                height={current.height ?? 800}
                sizes="92vw"
                className="lightbox__img"
              />
              {current.caption ? <figcaption className="lightbox__caption">{current.caption}</figcaption> : null}
            </motion.figure>

            {items.length > 1 ? (
              <button
                type="button"
                className="lightbox__nav lightbox__nav--next"
                onClick={() => step(1)}
                aria-label="Next photograph"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
