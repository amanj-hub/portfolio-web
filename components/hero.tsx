"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import { siteConfig } from "@/config/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const portraitRef = useRef<HTMLDivElement>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 120, damping: 22, mass: 0.4 });
  const springY = useSpring(pointerY, { stiffness: 120, damping: 22, mass: 0.4 });
  const shiftX = useTransform(springX, [-1, 1], [-9, 9]);
  const shiftY = useTransform(springY, [-1, 1], [-7, 7]);

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (shouldReduceMotion || event.pointerType !== "mouse") return;
    const bounds = portraitRef.current?.getBoundingClientRect();
    if (!bounds) return;
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  /** Sequenced intro: label, title, description, actions, portrait. */
  const step = (delay: number, duration = 0.7) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration, delay, ease: EASE },
  });

  return (
    <section
      id="home"
      className="hero anchor"
      aria-labelledby="hero-title"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="grid-bg" aria-hidden="true" />
      <div className="shell hero__inner">
        <div className="hero__copy">
          <motion.p className="hero__eyebrow" {...step(0.05, 0.6)}>
            <span className="hero__eyebrow-bar" aria-hidden="true" />
            <span className="label label--accent">{siteConfig.name} / Software Developer</span>
          </motion.p>

          <h1 className="hero__title" id="hero-title">
            <motion.span className="hero__title-line" {...step(0.14)}>
              Building digital
            </motion.span>
            <motion.span className="hero__title-line" {...step(0.2)}>
              products that
            </motion.span>
            <motion.span className="hero__title-line" {...step(0.26)}>
              solve <span className="hero__title-accent">real problems.</span>
            </motion.span>
          </h1>

          <motion.p className="hero__desc" {...step(0.36)}>
            {siteConfig.hero.description}
          </motion.p>

          <motion.div className="hero__actions" {...step(0.44)}>
            <a className="btn btn--primary" href="#work">
              View work <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a className="btn btn--outline" href={siteConfig.resumeUrl} download>
              <Download size={15} aria-hidden="true" /> Download resume
            </a>
          </motion.div>

          <motion.div className="hero__socials" {...step(0.52)}>
            <a className="hero__social" href={siteConfig.social.github} target="_blank" rel="noreferrer">
              <Github size={15} aria-hidden="true" /> GitHub
            </a>
            <a className="hero__social" href={siteConfig.social.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={15} aria-hidden="true" /> LinkedIn
            </a>
            <a className="hero__social" href={`mailto:${siteConfig.email}`}>
              <Mail size={15} aria-hidden="true" /> Email
            </a>
          </motion.div>
        </div>

        <motion.div
          className="hero__portrait"
          ref={portraitRef}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
        >
          <span className="hero__glow" aria-hidden="true" />
          <span className="hero__plate" aria-hidden="true" />
          <motion.div className="hero__frame" style={{ x: shiftX, y: shiftY }}>
            <Image
              src={siteConfig.profileImage}
              alt={siteConfig.profileImageAlt}
              width={835}
              height={1024}
              preload
              sizes="(max-width: 960px) 420px, 440px"
              className="hero__img"
            />
          </motion.div>
          <span className="hero__chip hero__chip--top">
            <MapPin size={11} aria-hidden="true" /> Based in India
          </span>
          <span className="hero__chip hero__chip--bottom">
            <span className="dot dot--live" aria-hidden="true" /> Open to opportunities
          </span>
          <p className="hero__caption label">B.Tech CSE &bull; Lovely Professional University</p>
        </motion.div>
      </div>
    </section>
  );
}
