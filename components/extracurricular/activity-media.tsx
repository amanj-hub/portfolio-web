"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, FolderPlus, Image as ImageIcon, Maximize2, X } from "lucide-react";
import type { ActivityMedia } from "@/config/extracurricular";

type ActivityMediaProps = {
  media: ActivityMedia[];
  placeholderText: string;
  folderPath: string;
  activityTitle: string;
};

export function ActivityMediaGallery({
  media,
  placeholderText,
  folderPath,
  activityTitle,
}: ActivityMediaProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const isOpen = lightboxIndex !== null && media && media.length > 0;
  const currentItem = isOpen ? media[lightboxIndex] : null;

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null || !media || media.length === 0) return;
    setLightboxIndex((prev) => (prev! + 1) % media.length);
  }, [lightboxIndex, media]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null || !media || media.length === 0) return;
    setLightboxIndex((prev) => (prev! - 1 + media.length) % media.length);
  }, [lightboxIndex, media]);

  // Handle keyboard navigation (Escape, ArrowLeft, ArrowRight) and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose, handleNext, handlePrev]);

  if (!media || media.length === 0) {
    return (
      <div className="activity-media-empty">
        <div className="activity-media-empty__icon">
          <ImageIcon size={22} aria-hidden="true" />
        </div>
        <div className="activity-media-empty__content">
          <div className="activity-media-empty__header">
            <span className="activity-media-empty__title">Photo Gallery</span>
            <span className="activity-media-empty__badge">Gallery Ready</span>
          </div>
          <p className="activity-media-empty__text">{placeholderText}</p>
        </div>
        <div className="activity-media-empty__hint" title="Configured media folder">
          <FolderPlus size={14} aria-hidden="true" />
          <code>{folderPath}</code>
        </div>
      </div>
    );
  }

  return (
    <div className="activity-gallery-container">
      <div className="activity-gallery" role="region" aria-label={`${activityTitle} Photo Gallery`}>
        {media.map((item, index) => (
          <figure
            className="activity-gallery__item"
            key={`${item.src}-${index}`}
            onClick={() => setLightboxIndex(index)}
          >
            <div className="activity-gallery__frame">
              <Image
                src={item.src}
                alt={item.alt || `${activityTitle} photograph ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="activity-gallery__image"
              />
              <div className="activity-gallery__overlay" aria-hidden="true">
                <span className="activity-gallery__zoom-badge">
                  <Maximize2 size={15} />
                  <span>View</span>
                </span>
              </div>
            </div>
            {item.caption ? (
              <figcaption className="activity-gallery__caption">{item.caption}</figcaption>
            ) : null}
          </figure>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isOpen && currentItem && (
          <motion.div
            className="activity-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${activityTitle} image lightbox`}
            onClick={handleClose}
          >
            {/* Top Bar with Counter & Close Button */}
            <div
              className="activity-lightbox__topbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="activity-lightbox__counter">
                {lightboxIndex + 1} / {media.length}
              </div>
              <button
                type="button"
                className="activity-lightbox__close-btn"
                onClick={handleClose}
                aria-label="Close fullscreen lightbox"
                title="Close (Esc)"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            {/* Main Image Area */}
            <div
              className="activity-lightbox__content"
              onClick={(e) => e.stopPropagation()}
            >
              {media.length > 1 && (
                <button
                  type="button"
                  className="activity-lightbox__nav-btn activity-lightbox__nav-btn--prev"
                  onClick={handlePrev}
                  aria-label="Previous photograph"
                  title="Previous image (Left arrow)"
                >
                  <ChevronLeft size={24} aria-hidden="true" />
                </button>
              )}

              <motion.div
                key={currentItem.src}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="activity-lightbox__image-wrapper"
              >
                {/* Responsive Next.js Image with unoptimized fallback for flexible formats */}
                <div className="activity-lightbox__frame">
                  <Image
                    src={currentItem.src}
                    alt={currentItem.alt || `${activityTitle} photograph ${lightboxIndex + 1}`}
                    width={1400}
                    height={900}
                    className="activity-lightbox__image"
                    priority
                  />
                </div>

                {currentItem.caption ? (
                  <div className="activity-lightbox__caption">
                    <p>{currentItem.caption}</p>
                  </div>
                ) : null}
              </motion.div>

              {media.length > 1 && (
                <button
                  type="button"
                  className="activity-lightbox__nav-btn activity-lightbox__nav-btn--next"
                  onClick={handleNext}
                  aria-label="Next photograph"
                  title="Next image (Right arrow)"
                >
                  <ChevronRight size={24} aria-hidden="true" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
