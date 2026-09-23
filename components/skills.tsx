import { Reveal } from "@/components/ui/reveal";
import { skillGroups } from "@/config/site";

/**
 * The toolkit: a lightweight, typographic skill system — label, rule, list.
 * No logo walls and no card grid.
 */
export function Toolkit() {
  return (
    <div className="toolkit">
      <p className="toolkit__head label">Toolkit</p>
      {skillGroups.map((group, index) => (
        <Reveal className="toolkit__row" key={group.title} delay={index * 0.05}>
          <span className="toolkit__label">{group.title}</span>
          <ul className="toolkit__items" aria-label={`${group.title} skills`}>
            {group.skills.map((skill) => (
              <li className="toolkit__item" key={skill}>
                {skill}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}

