"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownToLine, ArrowRight, Github, Linkedin, Mail } from "lucide-react";
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
          <motion.p className="eyebrow hero__availability" {...reveal(0.04)}>
            <span className="status-dot" aria-hidden="true" />
            {siteConfig.availability}
          </motion.p>
          <motion.p className="hero__intro" {...reveal(0.1)}>
            Hi, I&apos;m <strong>{siteConfig.name}</strong>
          </motion.p>
          <motion.h1 id="hero-title" {...reveal(0.16)}>
            {siteConfig.hero.headline.split(" building ")[0]} <span>building {siteConfig.hero.headline.split(" building ")[1]}</span>
          </motion.h1>
          <motion.p className="hero__description" {...reveal(0.24)}>
            {siteConfig.hero.description}
          </motion.p>
          <motion.div className="hero__actions" {...reveal(0.3)}>
            <a className="button button--primary" href="#projects">
              View Projects <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="button button--secondary" href={siteConfig.resumeUrl} download>
              <ArrowDownToLine size={17} aria-hidden="true" /> Download résumé
            </a>
          </motion.div>
          <motion.div className="hero__socials" {...reveal(0.36)}>
            <span>Elsewhere</span>
            <a href={siteConfig.social.github} target="_blank" rel="noreferrer" aria-label="GitHub profile"><Github size={18} aria-hidden="true" /></a>
            <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><Linkedin size={18} aria-hidden="true" /></a>
            <a href={`mailto:${siteConfig.email}`} aria-label="Send email"><Mail size={18} aria-hidden="true" /></a>
          </motion.div>
        </div>

        <motion.div
          className="topology"
          aria-hidden="true"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease }}
        >
          <div className="topology__chrome">
            <span>STACK / 01</span>
            <span><i /> system online</span>
          </div>
          <div className="topology__canvas">
            <svg viewBox="0 0 620 440" className="topology__svg" preserveAspectRatio="xMidYMid meet">
              <path className="topology__link" d="M146 118H243M375 118H467M467 144V230M467 279H375M243 279H146M146 253V144" />
              <path className="topology__link topology__link--inner" d="M165 131L292 238L449 131" />
              <path className="topology__signal" d="M146 118H243M375 118H467M467 144V230M467 279H375" />
              <circle className="topology__ping" cx="467" cy="255" r="4" />
              <g className="topology__node topology__node--active"><rect x="52" y="82" width="94" height="62" rx="9" /><text x="70" y="108">IDEA</text><text x="70" y="126">/ UX</text></g>
              <g className="topology__node"><rect x="243" y="82" width="132" height="62" rx="9" /><text x="261" y="108">INTERFACE</text><text x="261" y="126">React · JS</text></g>
              <g className="topology__node"><rect x="467" y="82" width="105" height="62" rx="9" /><text x="485" y="108">SERVICES</text><text x="485" y="126">Node · APIs</text></g>
              <g className="topology__node"><rect x="467" y="230" width="105" height="62" rx="9" /><text x="485" y="256">AI / ML</text><text x="485" y="274">Gemini</text></g>
              <g className="topology__node"><rect x="243" y="230" width="132" height="62" rx="9" /><text x="261" y="256">DATA / API</text><text x="261" y="274">MongoDB</text></g>
              <g className="topology__node"><rect x="52" y="230" width="94" height="62" rx="9" /><text x="70" y="256">RELEASE</text><text x="70" y="274">Ship</text></g>
              <g className="topology__annotation"><rect x="88" y="340" width="155" height="31" rx="7" /><text x="102" y="360">design.system ↗</text></g>
              <g className="topology__annotation topology__annotation--right"><rect x="376" y="340" width="145" height="31" rx="7" /><text x="391" y="360">status: shipping</text></g>
            </svg>
            <div className="topology__code"><span>const</span> outcome = practical + useful</div>
          </div>
          <div className="topology__caption"><span>BUILD TOPOLOGY</span><span>01 / 01</span></div>
        </motion.div>
      </div>
    </section>
  );
}
