import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="site-footer__top">
          <div className="site-footer__identity">
            <a className="site-footer__name" href="#home">{siteConfig.name}</a>
            <p className="site-footer__role">Software developer · Full-stack &amp; AI</p>
          </div>
          <div className="site-footer__socials">
            <a href={siteConfig.social.github} target="_blank" rel="noreferrer">
              <Github size={14} aria-hidden="true" /> GitHub
            </a>
            <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={14} aria-hidden="true" /> LinkedIn
            </a>
            <a href={`mailto:${siteConfig.email}`}>
              <Mail size={14} aria-hidden="true" /> Email
            </a>
          </div>
        </div>

        <div className="site-footer__middle">
          <nav className="site-footer__nav" aria-label="Footer navigation">
            {siteConfig.nav.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </nav>
          <a className="tlink" href="#home">
            Back to top <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>

        <div className="site-footer__bottom">
          <span>&copy; {year} {siteConfig.name}. All rights reserved.</span>
          <span>Built with Next.js, React &amp; TypeScript</span>
        </div>
      </div>
    </footer>
  );
}
