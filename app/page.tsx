import { About } from "@/components/about";
import { Achievements } from "@/components/achievements";
import { BackToTop } from "@/components/back-to-top";
import { Contact } from "@/components/contact";
import { Education } from "@/components/education";
import { ExtraCurricular } from "@/components/extracurricular";
import { Experience } from "@/components/experience";
import { FeaturedProject } from "@/components/featured-project";
import { GitHubActivity } from "@/components/github-activity";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { SiteFooter } from "@/components/site-footer";
import { Skills } from "@/components/skills";
import { Stats } from "@/components/stats";

export default function Home() {
  return (
    <>
      <main id="main-content">
        <Hero />
        <Stats />
        <About />
        <Skills />
        <FeaturedProject />
        <Projects />
        <Experience />
        <Achievements />
        <Education />
        <ExtraCurricular />
        <GitHubActivity />
        <Contact />
      </main>
      <SiteFooter />
      <BackToTop />
    </>
  );
}
