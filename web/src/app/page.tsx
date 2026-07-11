import IntroExperience from "@/components/intro/IntroExperience";
import Hero from "@/components/site/Hero";
import SectionsScaffold from "@/components/sections";
import { waLink } from "@/components/site/data";

export default function Home() {
  return (
    <main>
      <a href="#productos" className="skip-link">Ir al catálogo</a>

      {/* Fixed living scene: the frozen 3D Intro is the brand hero */}
      <IntroExperience />

      {/* Hero: a sibling overlay over the Intro idle — promise + one CTA,
          gone before the first scroll opens the world. Never touches intro/*. */}
      <Hero />

      {/* One screen of pure Intro, then the transition drives the reframe */}
      <div className="scroll-space" aria-hidden />

      {/* Solid content that scrolls up over the fixed canvas */}
      <div className="content">
        <SectionsScaffold />
      </div>

      {/* Sticky reach button (mobile): always one tap from WhatsApp */}
      <a
        className="sticky-wa"
        href={waLink("Hola All Import! Quiero hacer una consulta.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden>
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.1 8.1 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3c-.3-.4 0-.6.1-.8l.4-.5c.1-.2.2-.3.3-.5v-.5c0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5 0-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7a11 11 0 0 0 4.2 3.7c.6.3 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.2Z" />
        </svg>
      </a>
    </main>
  );
}
