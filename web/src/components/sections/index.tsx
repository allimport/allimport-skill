/**
 * Landing sections — SCAFFOLD ONLY.
 *
 * The first-scroll transition (Hero → universe) lands the user on a stage
 * framed by the brackets. These stubs reserve the structure and anchors for
 * the sections to come; none carry content yet. Each will be built as its
 * own component, mounted inside <SectionsScaffold /> in order.
 */

function Slot({ id }: { id: string }) {
  return <section id={id} className="section-slot" aria-hidden />;
}

export function Historia() {
  return <Slot id="historia" />;
}

export function ComoFunciona() {
  return <Slot id="como-funciona" />;
}

export function Productos() {
  return <Slot id="productos" />;
}

export function Comparativa() {
  return <Slot id="comparativa" />;
}

export function Testimonios() {
  return <Slot id="testimonios" />;
}

export function CtaFinal() {
  return <Slot id="cta-final" />;
}

export default function SectionsScaffold() {
  return (
    <div className="sections-root">
      <Historia />
      <ComoFunciona />
      <Productos />
      <Comparativa />
      <Testimonios />
      <CtaFinal />
    </div>
  );
}
