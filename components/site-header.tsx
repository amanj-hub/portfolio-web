"use client";

import { Github, Linkedin, Menu, Moon, Sun, X } from "lucide-react";
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
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = siteConfig.nav
      .map(({ href }) => document.querySelector(href))
      .filter((element): element is HTMLElement => element instanceof HTMLElement);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(`#${visible.target.id}`);
      },
      { rootMargin: "-20% 0px -68% 0px", threshold: [0.05, 0.2, 0.45] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
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

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className={scrolled ? "site-header site-header--scrolled" : "site-header"}>
      <div className="shell site-header__inner">
        <a className="brand" href="#home" aria-label={`${siteConfig.name}, home`} onClick={closeMenu}>
          <span className="brand__mark">{siteConfig.initials}</span>
          <span className="brand__name">{siteConfig.name}</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {siteConfig.nav.map((item) => (
            <a
              className={activeSection === item.href ? "nav-link nav-link--active" : "nav-link"}
              href={item.href}
              key={item.href}
              aria-current={activeSection === item.href ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a
            className="icon-button header-social-link"
            href={siteConfig.social.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            title="GitHub"
          >
            <Github size={16} aria-hidden="true" />
          </a>
          <a
            className="icon-button header-social-link"
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            title="LinkedIn"
          >
            <Linkedin size={16} aria-hidden="true" />
          </a>
          <button className="icon-button theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
            {theme === "dark" ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
          </button>
          <a className="header-cta" href={siteConfig.resumeUrl} download aria-label="Download résumé">
            Résumé
          </a>
          <button
            className="icon-button menu-button"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div className={menuOpen ? "mobile-nav mobile-nav--open" : "mobile-nav"} id="mobile-navigation">
        <nav className="mobile-nav__links" aria-label="Mobile navigation">
          {siteConfig.nav.map((item, index) => (
            <a href={item.href} key={item.href} onClick={closeMenu}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mobile-nav__footer">
          <span>{siteConfig.location}</span>
          <div>
            <a href={siteConfig.social.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
    </header>
  );
}
