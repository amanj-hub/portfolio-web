import { About } from "@/components/about";
import { BackToTop } from "@/components/back-to-top";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Gallery } from "@/components/gallery";
import { Hero } from "@/components/hero";
import { IdentityStrip } from "@/components/identity-strip";
import { SiteFooter } from "@/components/site-footer";
import { Work } from "@/components/work";

export default function Home() {
  return (
    <>
      <main id="main-content">
        <Hero />
        <IdentityStrip />
        <About />
        <Work />
        <Experience />
        <Gallery />
        <Contact />
      </main>
      <SiteFooter />
      <BackToTop />
    </>
  );
}
