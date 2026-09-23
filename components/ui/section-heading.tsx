import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

type SectionHeadingProps = {
  /** The editorial section number, e.g. `02`. */
  index: string;
  /** The uppercase section label, e.g. `Selected work`. */
  label: string;
  title: ReactNode;
  description?: string;
  titleId?: string;
  align?: "left" | "split";
  wide?: boolean;
};

export function SectionHeading({
  index,
  label,
  title,
  description,
  titleId,
  align = "split",
  wide = false,
}: SectionHeadingProps) {
  return (
    <Reveal className={align === "split" ? "section-head section-head--split" : "section-head"}>
      <p className="section-head__label">
        <span className="label label--accent">{index}</span>
        <span className="label">{label}</span>
      </p>
      <h2 className={wide ? "section-head__title section-head__title--wide" : "section-head__title"} id={titleId}>
        {title}
      </h2>
      {description ? <p className="section-head__desc">{description}</p> : null}
    </Reveal>
  );
}
