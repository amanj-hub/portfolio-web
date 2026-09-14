import { Check } from "lucide-react";
import { featuredProject } from "@/config/site";
import { Reveal } from "@/components/ui/reveal";

export function FeaturedProject() {
  return (
    <section className="section featured-section" aria-labelledby="featured-title">
      <div className="shell">
        <Reveal className="featured-project">
          <div className="featured-project__visual" aria-hidden="true">
            <div className="featured-project__chrome"><span /><span /><span /><b>recruitment.portal</b></div>
            <div className="northstar-app">
              <aside><i>r</i><span /><span /><span /><span /></aside>
              <div className="northstar-app__content">
                <div className="northstar-app__heading"><div><small>RECRUITMENT / PIPELINE</small><strong>Evaluate every candidate clearly</strong></div><b>+ New role</b></div>
                <div className="northstar-app__grid">
                  <div className="northstar-app__main-card"><small>Suitability signal</small><h4>Better context for every shortlist.</h4><div><span>Skills</span><span>Experience</span><span>Education</span></div><i /></div>
                  <div className="northstar-app__side-card"><small>Pipeline</small><strong>Active</strong><div><i /><i /><i /><i /><i /></div></div>
                  <div className="northstar-app__bottom-card"><span /><div><b>Resume review</b><small>Rule-based evaluation</small></div><em>In progress</em></div>
                </div>
              </div>
            </div>
            <div className="featured-project__label">FIELD NOTE / 01</div>
          </div>
          <article className="featured-project__body">
            <span className="eyebrow">{featuredProject.type}</span>
            <h2 id="featured-title">{featuredProject.headline}</h2>
            <p className="featured-project__summary">{featuredProject.summary}</p>
            <div className="case-study-flow">
              <div><span>Problem</span><p>{featuredProject.problem}</p></div>
              <div><span>Solution</span><p>{featuredProject.solution}</p></div>
              <div><span>Outcome</span><p>{featuredProject.outcome}</p></div>
            </div>
            <div className="featured-project__details">
              <div><span>Key features</span>{featuredProject.features.map((feature) => <p key={feature}><Check size={14} aria-hidden="true" /> {feature}</p>)}</div>
              <div><span>Stack</span><ul className="stack-list">{featuredProject.stack.map((technology) => <li key={technology}>{technology}</li>)}</ul></div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
