import { Database, LayoutPanelTop, Server, Wrench } from "lucide-react";
import { skillGroups } from "@/config/site";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const icons = {
  Layout: LayoutPanelTop,
  Server,
  Database,
  Wrench,
} as const;

export function Skills() {
  return (
    <section id="skills" className="section section-anchor skills-section" aria-labelledby="skills-title">
      <div className="shell">
        <SectionHeading
          index="02"
          eyebrow="Skills"
          title={<><span id="skills-title">Fluent across the stack,</span> <em>focused on the outcome.</em></>}
          description="I choose tools for their fit—not for their novelty—and use them to create work that stays legible to people and maintainable for teams."
          align="split"
        />
        <div className="capability-lanes">
          {skillGroups.map((group, index) => {
            const Icon = icons[group.icon];
            return (
              <Reveal className="capability-lane" delay={index * 0.05} key={group.title}>
                <div className="capability-lane__title">
                  <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                  <h3>{group.title}</h3>
                </div>
                <div className="skill-list">
                  {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
