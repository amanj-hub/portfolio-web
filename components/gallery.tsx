"use client";

import { Maximize2 } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Lightbox } from "@/components/ui/lightbox";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { extracurricularConfig } from "@/config/extracurricular";

type ActivityId = "ncc" | "gym" | "marathons";
type FilterId = "all" | ActivityId;

type Shot = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  activity: string;
  filter: ActivityId;
};

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ncc", label: "NCC" },
  { id: "gym", label: "Gym & fitness" },
  { id: "marathons", label: "Marathons & running" },
];

const SHOTS: Shot[] = extracurricularConfig.activities.flatMap((activity) =>
  activity.media.map((item) => ({
    src: item.src,
    alt: item.alt,
    caption: item.caption,
    width: item.width,
    height: item.height,
    activity: activity.title,
    filter: activity.id,
  })),
);

export function Gallery() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? SHOTS : SHOTS.filter((shot) => shot.filter === filter)),
    [filter],
  );

  const activeLabel = FILTERS.find((item) => item.id === filter)?.label ?? "Gallery";

  function selectFilter(next: FilterId) {
    setOpenIndex(null);
    setFilter(next);
  }

  return (
    <section id="gallery" className="section anchor" aria-labelledby="gallery-title">
      <div className="shell">
        <SectionHeading
          index="04"
          label="Gallery"
          titleId="gallery-title"
          title={
            <>
              Off the keyboard, <em className="editorial">on the ground.</em>
            </>
          }
          description="NCC training camps, distance running and daily conditioning — the discipline that sits behind the code."
        />

        <Reveal className="gallery__filters" delay={0.04}>
          {FILTERS.map((item) => {
            const count = item.id === "all" ? SHOTS.length : SHOTS.filter((shot) => shot.filter === item.id).length;
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={active ? "chip chip--active" : "chip"}
                aria-pressed={active}
                onClick={() => selectFilter(item.id)}
              >
                {item.label}
                <span className="chip__count">{String(count).padStart(2, "0")}</span>
              </button>
            );
          })}
        </Reveal>

        <div className="masonry">
          {visible.map((shot, index) => (
            <Reveal className="shot" key={shot.src} delay={Math.min(index, 5) * 0.04}>
              <button
                type="button"
                className="shot__button"
                data-cursor="image"
                onClick={() => setOpenIndex(index)}
                aria-label={`View ${shot.caption ?? shot.alt} fullscreen`}
              >
                <span className="shot__frame">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width ?? 1200}
                    height={shot.height ?? 800}
                    sizes="(max-width: 720px) 100vw, (max-width: 960px) 50vw, 32vw"
                    className="shot__img"
                  />
                  <span className="shot__scrim" aria-hidden="true" />
                  <span className="shot__view">
                    <Maximize2 size={13} aria-hidden="true" /> View
                  </span>
                </span>
                <span className="shot__plate">
                  <span className="shot__tag">{shot.activity}</span>
                  {shot.caption ? <span className="shot__caption">{shot.caption}</span> : null}
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <div className="notes">
          {extracurricularConfig.activities.map((activity, index) => (
            <Reveal className="note" key={activity.id} delay={index * 0.06}>
              <h3 className="note__title">{activity.title}</h3>
              <p className="note__badge">{activity.badge}</p>
              {activity.pillars.slice(0, 3).map((pillar) => (
                <div className="note__line" key={pillar.title}>
                  <p className="note__line-title">{pillar.title}</p>
                  <p className="note__line-text">{pillar.description}</p>
                </div>
              ))}
            </Reveal>
          ))}
        </div>
      </div>

      <Lightbox
        items={visible}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
        title={filter === "all" ? "Gallery" : activeLabel}
      />
    </section>
  );
}
