import { Award, BrainCircuit, Database, ShieldCheck } from "lucide-react";
import { achievements } from "@/config/site";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const icons = { Award, BrainCircuit, Database, ShieldCheck } as const;

export function Achievements() {
  return (
    <section id="achievements" className="section section-anchor achievements-section" aria-labelledby="achievements-title">
      <div className="shell">
        <SectionHeading
          index="05"
          eyebrow="Certifications"
          title={<><span id="achievements-title">Proof of</span> <em>curiosity in motion.</em></>}
          description="A compact place for the work and communities that have helped shape how I build."
          align="split"
        />
        <div className="achievement-grid">
          {achievements.map((achievement, index) => {
            const Icon = icons[achievement.icon];
            return (
              <Reveal className="achievement-card" delay={index * 0.06} key={achievement.title}>
                <div className="achievement-card__top"><Icon size={20} strokeWidth={1.5} aria-hidden="true" /><span>{achievement.type}</span></div>
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
