import { ArrowUpRight, Github } from "lucide-react";
import { projects, siteConfig } from "@/config/site";
import { ProjectVisual } from "@/components/project-visual";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Projects() {
  return (
    <section id="projects" className="section section-anchor projects-section" aria-labelledby="projects-title">
      <div className="shell">
        <SectionHeading
          index="03"
          eyebrow="Selected work"
          title={<><span id="projects-title">Projects with a point</span> <em>of view.</em></>}
          description="Full-stack and AI-powered applications engineered to solve real-world workflows with precision."
          action={{ label: "See all repositories", href: siteConfig.social.github }}
          align="split"
        />
        <div className="project-list">
          {projects.map((project, index) => (
            <Reveal className="project-row" delay={index * 0.08} key={project.name}>
              <ProjectVisual project={project} />
              <article className="project-row__body">
                <div className="project-row__meta">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{project.eyebrow}</span>
                </div>
                <h3>{project.name}</h3>
                <p className="project-row__desc">{project.shortDescription || project.description}</p>
                <ul className="stack-list" aria-label={`${project.name} technologies`}>
                  {project.stack.map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
                <div className="project-row__links">
                  {project.liveUrl ? (
                    <a className="button button--small button--primary" href={project.liveUrl} target="_blank" rel="noreferrer">
                      Live Demo <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  ) : null}
                  {project.githubUrl ? (
                    <a className="button button--small button--secondary" href={project.githubUrl} target="_blank" rel="noreferrer">
                      <Github size={14} aria-hidden="true" /> Source Code
                    </a>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
