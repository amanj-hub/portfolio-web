import { ArrowUpRight, Check, Github } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { featuredProject, projects, repositoryHighlights, siteConfig } from "@/config/site";

const featuredLinks = projects.find((project) => project.name === featuredProject.name);
const supportingProjects = projects.filter((project) => project.name !== featuredProject.name);

export function Work() {
  return (
    <section id="work" className="section anchor" aria-labelledby="work-title">
      <div className="shell">
        <SectionHeading
          index="02"
          label="Selected work"
          titleId="work-title"
          wide
          title="A few things I've built."
          description="Full-stack and AI-powered applications built to remove friction from real workflows."
        />

        <article className="featured" aria-labelledby="featured-project-title">
          <Reveal className="featured__media" variant="image">
            <Image
              src={featuredProject.image}
              alt={featuredProject.imageAlt}
              width={1376}
              height={768}
              sizes="(max-width: 1364px) 100vw, 1300px"
              className="featured__img"
            />
          </Reveal>

          <div className="featured__grid">
            <Reveal>
              <p className="label label--accent">{featuredProject.type}</p>
              <h3 className="featured__title" id="featured-project-title">
                {featuredProject.name}
              </h3>
              <p className="featured__lede">{featuredProject.summary}</p>
              <ul className="stack featured__stack" aria-label="Featured project technology stack">
                {featuredProject.stack.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
              {featuredLinks?.liveUrl || featuredLinks?.githubUrl ? (
                <div className="featured__links">
                  {featuredLinks?.liveUrl ? (
                    <a className="btn btn--primary btn--sm" href={featuredLinks.liveUrl} target="_blank" rel="noreferrer">
                      Live demo <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  ) : null}
                  {featuredLinks?.githubUrl ? (
                    <a className="btn btn--outline btn--sm" href={featuredLinks.githubUrl} target="_blank" rel="noreferrer">
                      <Github size={14} aria-hidden="true" /> Source
                    </a>
                  ) : null}
                </div>
              ) : null}
            </Reveal>

            <Reveal className="case" delay={0.08}>
              <div className="case__row">
                <span className="case__num">01</span>
                <div>
                  <p className="case__label">Problem</p>
                  <p className="case__text">{featuredProject.problem}</p>
                </div>
              </div>
              <div className="case__row">
                <span className="case__num">02</span>
                <div>
                  <p className="case__label">Solution</p>
                  <p className="case__text">{featuredProject.solution}</p>
                </div>
              </div>
              <div className="case__row">
                <span className="case__num">03</span>
                <div>
                  <p className="case__label">Features</p>
                  <ul className="case__features">
                    {featuredProject.features.map((feature) => (
                      <li key={feature}>
                        <Check size={14} aria-hidden="true" /> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="case__row">
                <span className="case__num">04</span>
                <div>
                  <p className="case__label">Technology</p>
                  <p className="case__text">{featuredProject.stack.join(" · ")}</p>
                </div>
              </div>
              <div className="case__row">
                <span className="case__num">05</span>
                <div>
                  <p className="case__label">Outcome</p>
                  <p className="case__text">{featuredProject.outcome}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </article>

        <div className="bento">
          {supportingProjects.map((project, index) => {
            const primaryLink = project.liveUrl ?? project.githubUrl;
            return (
              <Reveal
                className={index === 0 ? "bento__item" : "bento__item bento__item--narrow"}
                delay={index * 0.08}
                key={project.name}
              >
                <div className="bento__media" data-cursor="view">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.imageAlt ?? project.name}
                      width={1376}
                      height={768}
                      sizes="(max-width: 1140px) 100vw, 56vw"
                      className="bento__img"
                    />
                  ) : null}
                  <span className="bento__scrim" aria-hidden="true" />
                  <span className="bento__num">
                    {String(index + 2).padStart(2, "0")} / {project.eyebrow}
                  </span>
                  <span className="bento__view">
                    View project <ArrowUpRight size={13} aria-hidden="true" />
                  </span>
                </div>
                <div className="bento__body">
                  {/* Overlay link lives outside the heading so it does not pollute the
                      heading's accessible name; `inset: 0` still resolves against
                      the card, keeping the whole tile clickable. */}
                  {primaryLink ? (
                    <a
                      className="bento__name-link"
                      href={primaryLink}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.name} — ${project.liveUrl ? "open live demo" : "open source code"}`}
                    />
                  ) : null}
                  <div className="bento__title-row">
                    <h3 className="bento__name">{project.name}</h3>
                    <ArrowUpRight className="bento__arrow" size={20} aria-hidden="true" />
                  </div>
                  <p className="bento__desc">{project.shortDescription || project.description}</p>
                  <ul className="stack bento__stack" aria-label={`${project.name} technologies`}>
                    {project.stack.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                  <div className="bento__links">
                    {project.liveUrl ? (
                      <a className="tlink" href={project.liveUrl} target="_blank" rel="noreferrer">
                        Live demo <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    ) : null}
                    {project.githubUrl ? (
                      <a className="tlink" href={project.githubUrl} target="_blank" rel="noreferrer">
                        <Github size={14} aria-hidden="true" /> Source code
                      </a>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="repos" delay={0.05}>
          <div className="repos__head">
            <p className="label">More on GitHub</p>
            <a className="tlink" href={siteConfig.social.github} target="_blank" rel="noreferrer">
              All repositories <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
          {repositoryHighlights.map((repository) => (
            <a className="repo" href={repository.url} target="_blank" rel="noreferrer" key={repository.name}>
              <div>
                <p className="repo__name">{repository.name}</p>
                <p className="repo__desc">{repository.description}</p>
              </div>
              <div className="repo__meta">
                <span>{repository.language}</span>
                <ArrowUpRight className="repo__arrow" size={15} aria-hidden="true" />
              </div>
            </a>
          ))}
        </Reveal>

      </div>
    </section>
  );
}
