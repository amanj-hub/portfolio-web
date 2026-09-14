import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  action?: { label: string; href: string };
  align?: "left" | "split";
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  action,
  align = "left",
}: SectionHeadingProps) {
  return (
    <Reveal className={align === "split" ? "section-heading section-heading--split" : "section-heading"}>
      <div className="section-marker" aria-hidden="true">
        <span>{index}</span>
        <span className="section-marker__line" />
        <span>{eyebrow}</span>
      </div>
      <div className="section-heading__content">
        <div>
          <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
        </div>
        {action ? (
          <a className="text-link" href={action.href}>
            {action.label}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </Reveal>
  );
}
