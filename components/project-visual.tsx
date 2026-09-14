import type { Project } from "@/config/site";

export function ProjectVisual({ project }: { project: Project }) {
  const visualLabels = {
    orbit: "WORKFLOW / 01",
    ledger: "LEGAL / 02",
    pulse: "KNOWLEDGE / 03",
  } as const;

  return (
    <div className={`project-visual project-visual--${project.visual} project-visual--${project.accent}`} aria-hidden="true">
      <div className="project-visual__bar"><span /><span /><span /></div>
      {project.visual === "orbit" ? (
        <div className="orbit-screen">
          <div className="orbit-screen__sidebar"><i /><i /><i /><i /></div>
          <div className="orbit-screen__main">
            <div className="orbit-screen__heading"><span /> <span /></div>
            <div className="orbit-screen__card orbit-screen__card--large"><div className="orbit-ring"><b /></div><span>Weekly velocity</span><strong>78%</strong></div>
            <div className="orbit-screen__cards"><div /><div /><div /></div>
          </div>
          <div className="project-visual__tag">{visualLabels[project.visual]}</div>
        </div>
      ) : null}
      {project.visual === "ledger" ? (
        <div className="ledger-screen">
          <div className="ledger-screen__header"><span>LegalBot India</span><i>Hinglish support</i></div>
          <div className="ledger-screen__amount"><small>ASK A QUESTION</small><strong>Your rights, explained.</strong><span>Text and voice guidance</span></div>
          <div className="ledger-screen__chart"><i /><i /><i /><i /><i /><i /><i /></div>
          <div className="ledger-screen__rows"><span /><span /><span /></div>
          <div className="project-visual__tag">{visualLabels[project.visual]}</div>
        </div>
      ) : null}
      {project.visual === "pulse" ? (
        <div className="pulse-screen">
          <div className="pulse-screen__top"><span>Knowledge insights</span><b>AI recommendations</b></div>
          <div className="pulse-screen__metric"><span>Find</span><i>relevant lessons</i><small>From projects and learning resources</small></div>
          <div className="pulse-screen__wave"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
          <div className="pulse-screen__list"><span /><span /><span /><span /></div>
          <div className="project-visual__tag">{visualLabels[project.visual]}</div>
        </div>
      ) : null}
    </div>
  );
}
