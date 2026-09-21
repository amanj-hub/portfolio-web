"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownToLine, ArrowRight, Code2, Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const reveal = (delay: number) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease },
  });

  return (
    <section id="home" className="hero section-anchor" aria-labelledby="hero-title">
      <div className="shell hero__grid">
        <div className="hero__copy">
          <motion.div className="hero__status-badge" {...reveal(0.04)}>
            <span className="status-dot" aria-hidden="true" />
            <span>{siteConfig.availability}</span>
          </motion.div>

          <motion.div className="hero__title-group" {...reveal(0.12)}>
            <span className="hero__greeting">Hello, I&apos;m</span>
            <h1 id="hero-title" className="hero__name">
              {siteConfig.name}
            </h1>
            <p className="hero__role">
              Full-Stack Developer &amp; AI Builder
            </p>
          </motion.div>

          <motion.p className="hero__description" {...reveal(0.2)}>
            {siteConfig.hero.description}
          </motion.p>

          <motion.div className="hero__actions" {...reveal(0.26)}>
            <a className="button button--primary" href="#projects">
              View Projects <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a className="button button--secondary" href={siteConfig.resumeUrl} download>
              <ArrowDownToLine size={16} aria-hidden="true" /> Download résumé
            </a>
          </motion.div>

          <motion.div className="hero__socials" {...reveal(0.32)}>
            <span className="hero__socials-label">Connect</span>
            <a href={siteConfig.social.github} target="_blank" rel="noreferrer" aria-label="GitHub profile" title="GitHub">
              <Github size={17} aria-hidden="true" />
            </a>
            <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile" title="LinkedIn">
              <Linkedin size={17} aria-hidden="true" />
            </a>
            <a href={`mailto:${siteConfig.email}`} aria-label="Send email" title="Email">
              <Mail size={17} aria-hidden="true" />
            </a>
          </motion.div>
        </div>

        <motion.div
          className="hero__portrait-wrapper"
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
        >
          <div className="hero__portrait-glow" aria-hidden="true" />
          <div className="hero__portrait-frame">
            <Image
              src={siteConfig.profileImage}
              alt={siteConfig.profileImageAlt}
              width={500}
              height={580}
              priority
              className="hero__portrait-img"
            />
            <div className="hero__portrait-badge">
              <Code2 size={14} className="hero__portrait-badge-icon" aria-hidden="true" />
              <div>
                <strong>B.Tech CSE &bull; LPU</strong>
                <span>Full-Stack &bull; AI/ML &bull; MERN</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
