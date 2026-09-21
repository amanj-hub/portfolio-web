import { BookOpen, GraduationCap } from "lucide-react";
import { education } from "@/config/site";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Education() {
  return (
    <section id="education" className="section section-anchor education-section" aria-labelledby="education-title">
      <div className="shell">
        <SectionHeading
          index="06"
          eyebrow="Education"
          title={<><span id="education-title">The foundation</span> <em>behind the build.</em></>}
          align="split"
        />
        <div className="education-list">
          {education.map((item, index) => (
            <Reveal className="education-card" delay={index * 0.07} key={`${item.degree}-${item.school}`}>
              <div className="education-card__mark"><GraduationCap size={30} strokeWidth={1.4} aria-hidden="true" /></div>
              <div className="education-card__identity"><span className="eyebrow">{String(index + 1).padStart(2, "0")} / Education</span><h3 className="education-card__degree">{item.degree}</h3><p>{item.school}</p></div>
              <div className="education-card__details"><span>{item.period}</span><p>{item.note}</p><div><BookOpen size={15} aria-hidden="true" /> {item.coursework.join(" · ")}</div></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
