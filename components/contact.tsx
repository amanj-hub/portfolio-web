import { ArrowUpRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";

export function Contact() {
  return (
    <section id="contact" className="section section-anchor contact-section" aria-labelledby="contact-title">
      <div className="shell">
        <Reveal className="contact-panel">
          <div className="contact-panel__intro">
            <p className="eyebrow"><span className="status-dot" aria-hidden="true" /> Start a conversation</p>
            <h2 id="contact-title">Let&apos;s build something <em>great.</em></h2>
            <p>{siteConfig.contact.description}</p>
            <a className="contact-email" href={`mailto:${siteConfig.email}`}><Mail size={17} aria-hidden="true" /> {siteConfig.email} <ArrowUpRight size={16} aria-hidden="true" /></a>
            <p className="contact-location"><MapPin size={16} aria-hidden="true" /> {siteConfig.location}</p>
            <div className="contact-panel__socials">
              <a href={siteConfig.social.github} target="_blank" rel="noreferrer"><Github size={17} aria-hidden="true" /> GitHub</a>
              <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} aria-hidden="true" /> LinkedIn</a>
            </div>
          </div>
          <div className="contact-panel__form"><ContactForm /></div>
        </Reveal>
      </div>
    </section>
  );
}
