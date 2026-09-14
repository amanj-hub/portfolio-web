import { BookOpen, GraduationCap } from "lucide-react";
import { education } from "@/config/site";
import { Reveal } from "@/components/ui/reveal";

export function Education() {
  return (
    <section className="section education-section" aria-labelledby="education-title">
      <div className="shell">
        <div className="education-list">
          {education.map((item, index) => (
            <Reveal className="education-card" delay={index * 0.07} key={`${item.degree}-${item.school}`}>
              <div className="education-card__mark"><GraduationCap size={30} strokeWidth={1.4} aria-hidden="true" /></div>
              <div className="education-card__identity"><span className="eyebrow">{String(index + 6).padStart(2, "0")} / Education</span><h2 id={index === 0 ? "education-title" : undefined}>{item.degree}</h2><p>{item.school}</p></div>
              <div className="education-card__details"><span>{item.period}</span><p>{item.note}</p><div><BookOpen size={15} aria-hidden="true" /> {item.coursework.join(" · ")}</div></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
