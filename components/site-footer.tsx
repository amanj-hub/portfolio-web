import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="shell site-footer__top">
        <div>
          <a className="brand" href="#home" aria-label={`${siteConfig.name}, home`}>
            <span className="brand__mark">{siteConfig.initials}</span>
            <span className="brand__name">{siteConfig.name}</span>
          </a>
          <p className="site-footer__tagline">
            Computer Science student &bull; Full-stack developer building practical AI-powered solutions.
          </p>
        </div>
        <a className="footer-availability" href="#contact">
          <span className="status-dot" aria-hidden="true" /> {siteConfig.availability} <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
      <div className="shell site-footer__middle">
        <nav aria-label="Footer navigation">
          {siteConfig.nav.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>
        <div className="site-footer__links">
          <a href={siteConfig.social.github} target="_blank" rel="noreferrer">
            <Github size={15} aria-hidden="true" /> GitHub
          </a>
          <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer">
            <Linkedin size={15} aria-hidden="true" /> LinkedIn
          </a>
          <a href={`mailto:${siteConfig.email}`} aria-label={`Email ${siteConfig.name}`}>
            <Mail size={15} aria-hidden="true" /> {siteConfig.email}
          </a>
        </div>
      </div>
      <div className="shell site-footer__bottom">
        <span>&copy; {year} {siteConfig.name}. All rights reserved.</span>
        <span>Crafted with Next.js, React, and TypeScript.</span>
      </div>
    </footer>
  );
}
