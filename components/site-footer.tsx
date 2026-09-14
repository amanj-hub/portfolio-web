import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="shell site-footer__top">
        <a className="brand" href="#home" aria-label={`${siteConfig.name}, home`}><span className="brand__mark">{siteConfig.initials}</span><span className="brand__name">{siteConfig.name}</span></a>
        <p>Building practical full-stack and AI-powered applications.</p>
        <a className="footer-availability" href="#contact"><span className="status-dot" aria-hidden="true" /> {siteConfig.availability} <ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>
      <div className="shell site-footer__middle">
        <nav aria-label="Footer navigation">{siteConfig.nav.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
        <div><a href={siteConfig.social.github} target="_blank" rel="noreferrer"><Github size={17} aria-hidden="true" /> GitHub</a><a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} aria-hidden="true" /> LinkedIn</a></div>
      </div>
      <div className="shell site-footer__bottom"><span>© {year} {siteConfig.name}. All rights reserved.</span><span>Designed & built with Next.js.</span></div>
    </footer>
  );
}
