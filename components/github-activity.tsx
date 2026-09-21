import { ArrowUpRight, Github } from "lucide-react";
import { repositoryHighlights, siteConfig } from "@/config/site";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const contributionPattern = Array.from({ length: 140 }, (_, index) => {
  const row = Math.floor(index / 20);
  const column = index % 20;
  return (column * 7 + row * 3 + column * row) % 7;
});

export function GitHubActivity() {
  return (
    <section className="section github-section" aria-labelledby="github-title">
      <div className="shell">
        <SectionHeading
          index="08"
          eyebrow="Open source"
          title={<><span id="github-title">A habit of</span> <em>building in public.</em></>}
          description="A selection of public work, with a lightweight activity preview that keeps the page fast and API-free."
          action={{ label: "Visit GitHub", href: siteConfig.social.github }}
          align="split"
        />
        <Reveal className="github-panel">
          <div className="github-panel__overview">
            <div className="github-panel__profile"><div className="github-panel__avatar">{siteConfig.initials}</div><div><span>github.com / amanj-hub</span><strong>Full-stack and AI-powered projects in progress.</strong></div></div>
            <a className="button button--ghost" href={siteConfig.social.github} target="_blank" rel="noreferrer"><Github size={17} aria-hidden="true" /> Follow the work <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
          <div className="contribution-wrap">
            <div className="contribution-wrap__label"><span>Contribution activity <small>placeholder preview</small></span><span>Less <i /><i /><i /><i /><i /> More</span></div>
            <div className="contribution-grid" role="img" aria-label="Illustrative contribution activity grid, not live GitHub data">
              {contributionPattern.map((level, index) => <span className={`contribution contribution--${level}`} key={index} />)}
            </div>
          </div>
          <div className="repository-list">
            {repositoryHighlights.map((repository) => (
              <a href={repository.url} target="_blank" rel="noreferrer" key={repository.name}>
                <div><strong>{repository.name}</strong><p>{repository.description}</p></div>
                <div className="repository-list__meta"><span><i />{repository.language}</span><ArrowUpRight size={14} aria-hidden="true" /></div>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
