"use client";

import { ArrowUpRight, Download, Github, Linkedin, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

type Theme = "dark" | "light";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme") as Theme | null;
    const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const nextTheme = savedTheme ?? preferredTheme;
    applyTheme(nextTheme);
    const frame = window.requestAnimationFrame(() => setTheme(nextTheme));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Sections are tall, so IntersectionObserver ratios stay far below the
    // thresholds and the indicator can stall. A rAF-throttled scroll check that
    // marks the last section past the reading line is cheap and always correct.
    const sections = siteConfig.nav
      .map(({ href }) => document.querySelector(href))
      .filter((element): element is HTMLElement => element instanceof HTMLElement)
      .sort((a, b) =>
        a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
      );

    if (!sections.length) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const readingLine = window.innerHeight * 0.34;
      let current = "";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= readingLine) current = `#${section.id}`;
      }
      setActiveSection(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    window.localStorage.setItem("portfolio-theme", nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <header className={scrolled ? "site-header site-header--scrolled" : "site-header"}>
      <div className="shell site-header__inner">
        <a className="brand" href="#home" aria-label={`${siteConfig.name}, back to top`} onClick={() => setMenuOpen(false)}>
          <span className="brand__mark" aria-hidden="true">{siteConfig.initials}</span>
          <span className="brand__name">{siteConfig.name}</span>
        </a>

        <nav className="site-nav" aria-label="Primary navigation">
          {siteConfig.nav.map((item) => (
            <a
              className={activeSection === item.href ? "site-nav__link site-nav__link--active" : "site-nav__link"}
              href={item.href}
              key={item.href}
              aria-current={activeSection === item.href ? "true" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="icon-link icon-link--social" href={siteConfig.social.github} target="_blank" rel="noreferrer" aria-label="GitHub profile" title="GitHub">
            <Github size={16} aria-hidden="true" />
          </a>
          <a className="icon-link icon-link--social" href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile" title="LinkedIn">
            <Linkedin size={16} aria-hidden="true" />
          </a>
          <button
            className="icon-link"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
          </button>
          <a className="btn btn--outline btn--sm header-resume" href={siteConfig.resumeUrl} download>
            <Download size={13} aria-hidden="true" /> Resume
          </a>
          <button
            className="menu-btn"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          >
            {menuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div className={menuOpen ? "mobile-nav mobile-nav--open" : "mobile-nav"} id="mobile-navigation">
        <nav className="mobile-nav__links" aria-label="Mobile navigation">
          {siteConfig.nav.map((item, index) => (
            <a href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>
              <span className="mobile-nav__index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <span>{item.label}</span>
              <ArrowUpRight className="mobile-nav__arrow" size={18} aria-hidden="true" />
            </a>
          ))}
        </nav>
        <div className="mobile-nav__foot">
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <div className="mobile-nav__foot-links">
            <a href={siteConfig.social.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={siteConfig.resumeUrl} download>Resume</a>
          </div>
        </div>
      </div>
    </header>
  );
}
