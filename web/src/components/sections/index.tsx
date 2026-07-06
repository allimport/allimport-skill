import Reveal from "@/components/site/Reveal";
import Catalog from "@/components/site/Catalog";
import {
  STEPS,
  COMPARE,
  TESTIMONIALS,
  waLink,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  CITY,
} from "@/components/site/data";

const WA_ICON = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.1 8.1 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3c-.3-.4 0-.6.1-.8l.4-.5c.1-.2.2-.3.3-.5v-.5c0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5 0-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7a11 11 0 0 0 4.2 3.7c.6.3 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.2Z" />
  </svg>
);

/* Trust — first confidence signals, right after the intro. */
function Trust() {
  const items = [
    "Ves el producto antes de pagar",
    "Entrega en mano en Córdoba",
    "+50 entregas hechas",
    "Trato personal, cara a cara",
  ];
  return (
    <section id="trust" className="sec sec-trust">
      <Reveal className="trust-row">
        {items.map((t) => (
          <span className="trust-item" key={t}>
            {t}
          </span>
        ))}
      </Reveal>
    </section>
  );
}

/* Historia — a face and an intention behind the brand. */
function Historia() {
  return (
    <section id="historia" className="sec sec-narrow">
      <Reveal as="p" className="eyebrow">
        Quiénes somos
      </Reveal>
      <Reveal as="h2" className="h2" delay={80}>
        Empezó por una bronca simple: pagar de más por lo mismo.
      </Reveal>
      <Reveal as="p" className="lead" delay={160}>
        Veíamos productos importados que en Córdoba costaban el doble, o que
        directamente no llegaban. Así nació All Import: traer lo que todos
        quieren, al precio que nadie ofrece, y ponerlo en tu mano para que lo
        veas antes de pagar. Sin locales caros, sin intermediarios, sin riesgo.
        Somos personas reales, no una página.
      </Reveal>
    </section>
  );
}

/* Cómo funciona — the risk-free mechanism in three steps. */
function ComoFunciona() {
  return (
    <section id="como-funciona" className="sec">
      <Reveal as="p" className="eyebrow">
        Cómo funciona
      </Reveal>
      <Reveal as="h2" className="h2" delay={80}>
        Tres pasos. Cero riesgo.
      </Reveal>
      <div className="steps">
        {STEPS.map((s, i) => (
          <Reveal className="step" key={s.n} delay={120 + i * 90}>
            <span className="step-n">{s.n}</span>
            <h3 className="step-t">{s.title}</h3>
            <p className="step-x">{s.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* Productos — the catalog deck ("La Vitrina"). Spec: docs 10 + brief. */
function Productos() {
  return <Catalog />;
}

/* Comparativa — justify the desire rationally. */
function Comparativa() {
  return (
    <section id="comparativa" className="sec">
      <Reveal as="p" className="eyebrow">
        Por qué acá
      </Reveal>
      <Reveal as="h2" className="h2" delay={80}>
        Tienda física vs. All Import.
      </Reveal>
      <Reveal className="compare" delay={140}>
        <div className="compare-head">
          <span />
          <span className="compare-col compare-them">Tienda física</span>
          <span className="compare-col compare-us">All Import</span>
        </div>
        {COMPARE.map((c) => (
          <div className="compare-row" key={c.label}>
            <span className="compare-label">{c.label}</span>
            <span className="compare-col compare-them">{c.tienda}</span>
            <span className="compare-col compare-us">{c.allimport}</span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

/* Testimonios — social proof, near the end. */
function Testimonios() {
  return (
    <section id="testimonios" className="sec">
      <Reveal as="p" className="eyebrow">
        Lo que dicen
      </Reveal>
      <Reveal as="h2" className="h2" delay={80}>
        Ya confiaron. Y volvieron.
      </Reveal>
      <div className="quotes">
        {TESTIMONIALS.map((t, i) => (
          <Reveal className="quote" key={t.name} delay={60 + (i % 2) * 90}>
            <p className="quote-x">“{t.text}”</p>
            <p className="quote-n">— {t.name}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* Punto de encuentro — makes the human delivery tangible. */
function Encuentro() {
  return (
    <section id="encuentro" className="sec sec-narrow">
      <Reveal as="p" className="eyebrow">
        Punto de encuentro
      </Reveal>
      <Reveal as="h2" className="h2" delay={80}>
        Sin envíos. Nos vemos en Córdoba.
      </Reveal>
      <Reveal as="p" className="lead" delay={160}>
        Vos elegís el punto y el horario. Llegamos con el producto, lo revisás
        con tus manos y, si te convence, lo pagás. Todo en persona, en tu
        ciudad. Así de simple, así de seguro.
      </Reveal>
    </section>
  );
}

/* CTA Final — one easy step. */
function CtaFinal() {
  return (
    <section id="cta-final" className="sec sec-cta">
      <Reveal as="h2" className="h2 h2-big" delay={0}>
        Escribinos. El resto es fácil.
      </Reveal>
      <Reveal className="cta-row" delay={120}>
        <a
          className="btn btn-primary"
          href={waLink("Hola All Import! Quiero hacer una consulta.")}
          target="_blank"
          rel="noopener noreferrer"
        >
          {WA_ICON} Hablemos por WhatsApp
        </a>
        <a
          className="btn btn-ghost"
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {INSTAGRAM_HANDLE}
        </a>
      </Reveal>
    </section>
  );
}

/* Footer — brand presence + minimal contact. */
function Footer() {
  return (
    <footer id="footer" className="footer">
      <span className="footer-brand">All Import</span>
      <span className="footer-meta">
        {CITY} · {INSTAGRAM_HANDLE}
      </span>
    </footer>
  );
}

export default function SectionsScaffold() {
  return (
    <div className="sections-root">
      <Trust />
      <Historia />
      <ComoFunciona />
      <Productos />
      <Comparativa />
      <Testimonios />
      <Encuentro />
      <CtaFinal />
      <Footer />
    </div>
  );
}
