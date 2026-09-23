import { ArrowUpRight, MapPin } from "lucide-react";
import { Toolkit } from "@/components/skills";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { about, education } from "@/config/site";

const facts = [
  { label: about.currently[0].label, value: about.currently[0].value },
  { label: "Education", value: `${education[0].school} · ${education[0].period}` },
  { label: "Focus", value: "Full-stack engineering with applied AI" },
  { label: "Interests", value: "NCC, distance running and fitness" },
  { label: "Location", value: "Bihar, India" },
];

export function About() {
  return (
    <section id="about" className="section anchor" aria-labelledby="about-title">
      <div className="shell">
        <SectionHeading
          index="01"
          label="About"
          titleId="about-title"
          title={
            <>
              A developer who cares about <em className="editorial">the whole experience.</em>
            </>
          }
          description="I move between product thinking and implementation, so the finished work feels considered from the first click to the last request."
        />

        <div className="about__grid">
          <Reveal>
            <p className="about__statement">{about.lead}</p>
          </Reveal>
          <Reveal className="about__text" delay={0.08}>
            <p className="about__lead">{about.body}</p>
            <p>
              Right now I am going deeper into generative AI, REST API design and backend systems, while staying close
              to the interface where the experience is actually felt.
            </p>
            <div>
              <a className="tlink" href="#contact">
                Work with me <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal className="facts" delay={0.05}>
          {facts.map((fact) => (
            <div className="fact" key={fact.label}>
              <span className="label">{fact.label}</span>
              <span className="fact__value">
                {fact.label === "Location" ? (
                  <>
                    <MapPin size={12} aria-hidden="true" style={{ display: "inline", marginRight: 6, color: "var(--accent)" }} />
                    {fact.value}
                  </>
                ) : (
                  fact.value
                )}
              </span>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <Toolkit />
        </Reveal>
      </div>
    </section>
  );
}
