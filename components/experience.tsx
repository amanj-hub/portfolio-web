import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { achievements, education, experiences } from "@/config/site";

export function Experience() {
  return (
    <section id="experience" className="section anchor" aria-labelledby="experience-title">
      <div className="shell">
        <SectionHeading
          index="03"
          label="Experience"
          titleId="experience-title"
          title="A record of making and learning."
          description="Hands-on training, certifications and the academic foundation behind the work."
        />

        <div className="xp">
          <Reveal className="xp__group">
            <p className="xp__group-head label">Experience</p>
            {experiences.map((item) => (
              <div className="row" key={`${item.period}-${item.role}`}>
                <p className="row__period">{item.period}</p>
                <div>
                  <h3 className="row__title">{item.role}</h3>
                  <p className="row__org">{item.organization}</p>
                  <p className="row__text">{item.description}</p>
                  <ul className="row__list">
                    {item.contributions.map((contribution) => (
                      <li key={contribution}>
                        <Check size={14} aria-hidden="true" />
                        {contribution}
                      </li>
                    ))}
                  </ul>
                  <ul className="stack row__stack" aria-label={`${item.role} technologies`}>
                    {item.technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal className="xp__group" delay={0.06}>
            <p className="xp__group-head label">Certifications</p>
            {achievements.map((item) => (
              <div className="row" key={item.title}>
                <p className="row__period">{item.type}</p>
                <div>
                  <h3 className="row__title">{item.title}</h3>
                  <p className="row__text">{item.description}</p>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal className="xp__group" delay={0.06}>
            <p className="xp__group-head label">Education</p>
            {education.map((item) => (
              <div className="row" key={item.degree}>
                <p className="row__period">{item.period}</p>
                <div>
                  <h3 className="row__title">{item.degree}</h3>
                  <p className="row__org">{item.school}</p>
                  <p className="row__note">
                    {item.note} &bull; {item.coursework.join(" · ")}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
