import { ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";

const channels = [
  { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}`, icon: Mail, external: false, download: false },
  { label: "GitHub", value: "github.com/amanj-hub", href: siteConfig.social.github, icon: Github, external: true, download: false },
  { label: "LinkedIn", value: "Aman Kumar", href: siteConfig.social.linkedin, icon: Linkedin, external: true, download: false },
  { label: "Résumé", value: "PDF · one page", href: siteConfig.resumeUrl, icon: Download, external: false, download: true },
];

export function Contact() {
  return (
    <section id="contact" className="section anchor" aria-labelledby="contact-title">
      <div className="shell">
        <SectionHeading
          index="05"
          label="Contact"
          titleId="contact-title"
          title={
            <span className="contact__title">
              Let&apos;s build <em className="editorial">something.</em>
            </span>
          }
          align="left"
        />

        <div className="contact__grid">
          <Reveal>
            <p className="contact__lede">
              Have an idea, opportunity, or project worth discussing? Send a note and I&apos;ll get back to you.
            </p>
            <ul className="contact__links">
              {channels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <li key={channel.label}>
                    <a
                      className="contact__link"
                      href={channel.href}
                      {...(channel.external ? { target: "_blank", rel: "noreferrer" } : {})}
                      {...(channel.download ? { download: true } : {})}
                    >
                      <span className="contact__link-label">
                        <Icon size={13} aria-hidden="true" style={{ display: "inline", marginRight: 8, verticalAlign: "-2px" }} />
                        {channel.label}
                      </span>
                      <span className="contact__link-value">{channel.value}</span>
                      <ArrowUpRight className="contact__chev" size={16} aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal className="contact__form" delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
