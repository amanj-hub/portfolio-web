import Image from "next/image";
import { ArrowUpRight, Check, Github } from "lucide-react";
import { featuredProject, projects } from "@/config/site";
import { Reveal } from "@/components/ui/reveal";

export function FeaturedProject() {
  // Pull links from the matching project entry
  const matchingProject = projects.find((p) => p.name === featuredProject.name);
  const githubUrl = matchingProject?.githubUrl;
  const liveUrl = matchingProject?.liveUrl;

  return (
    <section className="section featured-section" aria-labelledby="featured-title">
      <div className="shell">
        <Reveal className="featured-project">
          <div className="featured-project__visual" aria-hidden="true">
            <div className="featured-project__chrome">
              <span />
              <span />
              <span />
              <b>talentflow.recruitment.portal</b>
            </div>
            <div className="featured-project__viewport">
              <Image
                src={featuredProject.image}
                alt={featuredProject.imageAlt}
                width={1100}
                height={620}
                className="featured-project__img"
                sizes="(max-width: 1100px) 100vw, 55vw"
              />
            </div>
            <div className="featured-project__label">FLAGSHIP WORK / 01</div>
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
            {(githubUrl || liveUrl) && (
              <div className="featured-project__links">
                {liveUrl ? (
                  <a className="button button--small button--primary" href={liveUrl} target="_blank" rel="noreferrer">
                    Live Demo <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                ) : null}
                {githubUrl ? (
                  <a className="button button--small button--secondary" href={githubUrl} target="_blank" rel="noreferrer">
                    <Github size={14} aria-hidden="true" /> Source Code
                  </a>
                ) : null}
              </div>
            )}
          </article>
        </Reveal>
      </div>
    </section>
  );
}
