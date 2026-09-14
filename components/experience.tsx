import { ArrowUpRight, Check } from "lucide-react";
import { experiences } from "@/config/site";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Experience() {
  return (
    <section id="experience" className="section section-anchor experience-section" aria-labelledby="experience-title">
      <div className="shell">
        <SectionHeading
          index="04"
          eyebrow="Experience"
          title={<><span id="experience-title">A record of</span> <em>making and learning.</em></>}
          description="Hands-on experience building full-stack applications and strengthening backend and AI-enabled development skills."
          align="split"
        />
        <div className="timeline">
          {experiences.map((experience, index) => (
            <Reveal className="timeline-item" delay={index * 0.09} key={`${experience.period}-${experience.role}`}>
              <div className="timeline-item__period"><span>{String(index + 1).padStart(2, "0")}</span><strong>{experience.period}</strong></div>
              <article className="timeline-item__content">
                <div className="timeline-item__title"><h3>{experience.role}</h3><span>{experience.organization}</span></div>
                <p>{experience.description}</p>
                <ul className="timeline-item__contributions">
                  {experience.contributions.map((contribution) => <li key={contribution}><Check size={14} aria-hidden="true" />{contribution}</li>)}
                </ul>
                <ul className="stack-list" aria-label={`${experience.role} technologies`}>
                  {experience.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="experience-note"><span>Looking for the next signal.</span><a className="text-link" href="#contact">Start a conversation <ArrowUpRight size={16} aria-hidden="true" /></a></Reveal>
      </div>
    </section>
  );
}
