import { ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { about, siteConfig } from "@/config/site";

export function About() {
  return (
    <section id="about" className="section section-anchor" aria-labelledby="about-title">
      <div className="shell">
        <SectionHeading
          index="01"
          eyebrow="About"
          title={<><span id="about-title">A developer who cares about</span> <em>the whole experience.</em></>}
          description="I enjoy moving between product questions and implementation details, so the finished work feels considered from first click to last request."
          align="split"
        />
        <div className="about-grid">
          <Reveal className="about-copy" delay={0.06}>
            <p className="lead-copy">{about.lead}</p>
            <p>{about.body}</p>
            <a className="text-link" href="#contact">Work with me <ArrowUpRight size={16} aria-hidden="true" /></a>
          </Reveal>
          <div className="about-aside">
            <Reveal className="profile-card" delay={0.12}>
              <Image
                src={siteConfig.profileImage}
                alt={siteConfig.profileImageAlt}
                fill
                sizes="(max-width: 760px) calc(100vw - 40px), 420px"
                className="profile-card__image"
              />
              <figcaption className="profile-card__caption"><strong>{siteConfig.name}</strong></figcaption>
            </Reveal>
            <Reveal className="currently-card" delay={0.18}>
              <div className="currently-card__head"><Sparkles size={16} aria-hidden="true" /><span>Currently</span></div>
              <div className="currently-card__rows">
                {about.currently.map((item) => (
                  <div key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
              <div className="currently-card__foot"><CheckCircle2 size={15} aria-hidden="true" /> Making room for meaningful challenges.</div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
