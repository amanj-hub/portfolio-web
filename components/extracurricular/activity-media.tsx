"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, FolderPlus, Image as ImageIcon, Maximize2, X } from "lucide-react";
import type { ActivityMedia } from "@/config/extracurricular";

export type ImageOrientation = "portrait" | "landscape" | "square";

type ActivityMediaProps = {
  media: ActivityMedia[];
  placeholderText: string;
  folderPath: string;
  activityTitle: string;
};

function GalleryCard({
  item,
  index,
  activityTitle,
  onOpenLightbox,
}: {
  item: ActivityMedia;
  index: number;
  activityTitle: string;
  onOpenLightbox: (index: number) => void;
}) {
  const [orientation, setOrientation] = useState<ImageOrientation>("landscape");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const applyDimensions = useCallback((naturalWidth: number, naturalHeight: number) => {
    if (!naturalWidth || !naturalHeight) return;
    const ratio = naturalWidth / naturalHeight;
    if (ratio > 1.05) {
      setOrientation("landscape");
    } else if (ratio < 0.95) {
      setOrientation("portrait");
    } else {
      setOrientation("square");
    }
    setIsLoaded(true);
  }, []);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    applyDimensions(naturalWidth, naturalHeight);
  };

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      applyDimensions(imgRef.current.naturalWidth, imgRef.current.naturalHeight);
    }
  }, [applyDimensions, item.src]);

  return (
    <figure
      className={`activity-gallery__item activity-gallery__item--${orientation}`}
      data-orientation={orientation}
      onClick={() => onOpenLightbox(index)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpenLightbox(index);
        }
      }}
      aria-label={`View ${item.caption || item.alt || activityTitle} in full screen`}
    >
      <div className="activity-gallery__frame">
        <Image
          ref={imgRef}
          src={item.src}
          alt={item.alt || `${activityTitle} photograph ${index + 1}`}
          width={1200}
          height={800}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`activity-gallery__image ${isLoaded ? "activity-gallery__image--loaded" : ""}`}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            objectFit: "contain",
          }}
          onLoad={handleImageLoad}
          priority={index < 2}
          unoptimized
        />

        <div className="activity-gallery__overlay" aria-hidden="true">
          <span className="activity-gallery__zoom-badge">
            <Maximize2 size={15} />
            <span>View</span>
          </span>
          <span className="activity-gallery__orientation-badge">
            {orientation.charAt(0).toUpperCase() + orientation.slice(1)}
          </span>
        </div>
      </div>

      {item.caption ? (
        <figcaption className="activity-gallery__caption">
          {item.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function ActivityMediaGallery({
  media,
  placeholderText,
  folderPath,
  activityTitle,
}: ActivityMediaProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const numColumns = useMemo(() => {
    if (!media || media.length === 0) return 1;
    if (media.length === 1) return 1;

    // Mobile: 1 column (< 640px)
    if (windowWidth !== null && windowWidth < 640) return 1;

    // Tablet: 2 columns (< 1024px)
    if (windowWidth !== null && windowWidth < 1024) return Math.min(2, media.length);

    // Desktop: up to 3 columns
    return Math.min(3, media.length);
  }, [media, windowWidth]);

  // Distribute items into masonry columns
  const columns = useMemo(() => {
    if (!media || media.length === 0) return [];
    const cols: { item: ActivityMedia; originalIndex: number }[][] = Array.from(
      { length: numColumns },
      () => []
    );

    media.forEach((item, idx) => {
      const colTarget = idx % numColumns;
      cols[colTarget].push({ item, originalIndex: idx });
    });

    return cols;
  }, [media, numColumns]);

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
      <div
        className={`activity-gallery-masonry activity-gallery-masonry--cols-${numColumns}`}
        role="region"
        aria-label={`${activityTitle} Photo Gallery`}
      >
        {columns.map((colItems, colIdx) => (
          <div className="activity-gallery-masonry__col" key={`col-${colIdx}`}>
            {colItems.map(({ item, originalIndex }) => (
              <GalleryCard
                key={`${item.src}-${originalIndex}`}
                item={item}
                index={originalIndex}
                activityTitle={activityTitle}
                onOpenLightbox={setLightboxIndex}
              />
            ))}
          </div>
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
                <div className="activity-lightbox__frame">
                  <Image
                    src={currentItem.src}
                    alt={currentItem.alt || `${activityTitle} photograph ${lightboxIndex + 1}`}
                    width={1600}
                    height={1200}
                    className="activity-lightbox__image"
                    priority
                    unoptimized
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
