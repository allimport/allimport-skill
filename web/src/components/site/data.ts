/**
 * Brand + catalog data. Single source of truth for the landing.
 *
 * Product names are trademark-safe descriptions (not "AirPods"/"JBL"/etc.)
 * to protect the business from brand-infringement takedowns; the buyer
 * already knows these are premium replicas.
 */

export const WHATSAPP = "5493517383945";
export const INSTAGRAM_URL = "https://instagram.com/allimport.cba";
export const INSTAGRAM_HANDLE = "@allimport.cba";
export const CITY = "Córdoba, Argentina";

export function waLink(text: string): string {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
}

export function formatPrice(n: number): string {
  return "$" + n.toLocaleString("es-AR");
}

/**
 * Availability. Honest states only — no numeric stock counters, no fake
 * scarcity (doc 10 §9). `scarcity` is a free-text note set ONLY when true.
 */
export type ProductState = "disponible" | "ingresando" | "proximo";

export const STATE_LABEL: Record<ProductState, string> = {
  disponible: "Disponible para entrega inmediata",
  ingresando: "Ingresando",
  proximo: "Próximo ingreso",
};

export const STATE_CTA: Record<ProductState, string> = {
  disponible: "Hablemos por WhatsApp",
  ingresando: "Reservalo por WhatsApp",
  proximo: "Avisame cuando llegue",
};

export interface Product {
  id: string;
  name: string;
  tag: string;
  price: number;
  blurb: string;
  state: ProductState;
  /** Up to three concrete claims the buyer can verify in hand. */
  facts: string[];
  sizes?: string[];
  variants?: { label: string; options: string[] };
  /** Honest scarcity note — set only when it is actually true. */
  scarcity?: string;
  /** Gallery paths under /products/{id}/ — empty until real photos land. */
  images: string[];
}

/**
 * Deck order IS the curation (doc 10 §7): shirts anchor (highest desire),
 * then Apple accessories, then audio, then energy/charge, then lifestyle.
 */
export const PRODUCTS: Product[] = [
  {
    id: "remera",
    name: "Camiseta Argentina",
    tag: "Indumentaria",
    price: 45000,
    blurb: "Calidad jugador. La misma que mirás en la tele, en tu ropero.",
    state: "disponible",
    facts: [
      "Tela y costuras calidad jugador — tocala antes de pagar",
      "Escudo y detalles bordados, no estampados",
      "La revisás en mano, con tiempo",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "/products/remera/01.webp",
      "/products/remera/02.webp",
      "/products/remera/03.webp",
      "/products/remera/04.webp",
    ],
  },
  {
    id: "remera-messi",
    name: "Camiseta Messi 10",
    tag: "Indumentaria",
    price: 45000,
    blurb: "La número 10. Con el nombre que todos quieren en la espalda.",
    state: "disponible",
    facts: [
      "Nombre y número bordados — no estampados",
      "Misma tela calidad jugador que la selección",
      "La revisás en mano antes de pagar",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "/products/remera-messi/01.webp",
      "/products/remera-messi/02.webp",
      "/products/remera-messi/03.webp",
      "/products/remera-messi/04.webp",
    ],
  },
  {
    id: "tws",
    name: "Auriculares TWS Pro",
    tag: "Audio",
    price: 32000,
    blurb: "Cancelación de ruido y estuche de carga. Idénticos al original.",
    state: "disponible",
    facts: [
      "Cancelación de ruido activa — probala en el encuentro",
      "Estuche con carga inalámbrica",
      "Emparejamiento instantáneo al abrir",
    ],
    images: [
      "/products/tws/01.webp",
      "/products/tws/02.webp",
      "/products/tws/03.webp",
      "/products/tws/04.webp",
      "/products/tws/05.webp",
      "/products/tws/06.webp",
    ],
  },
  {
    id: "combo",
    name: "Kit iPhone Premium",
    tag: "Accesorios",
    price: 55000,
    blurb: "Todo junto, listo para usar. Cable Lightning, cubo 20W y más.",
    state: "disponible",
    facts: [
      "Kit completo — sin comprar nada por separado",
      "Carga rápida real de 20W incluida",
      "Lo revisás en mano antes de pagar",
    ],
    images: [
      "/products/combo/01.webp",
      "/products/combo/02.webp",
      "/products/combo/03.webp",
      "/products/combo/04.webp",
    ],
  },
  {
    id: "parlante",
    name: "Parlante Bluetooth RGB",
    tag: "Audio",
    price: 35000,
    blurb: "Sonido potente y luces reactivas. Resistente, portátil, fuerte.",
    state: "disponible",
    facts: [
      "Sonido que sorprende para el tamaño — escuchalo en mano",
      "Luces RGB que siguen la música",
      "Batería para toda la juntada",
    ],
    images: [
      "/products/parlante/01.webp",
      "/products/parlante/02.webp",
      "/products/parlante/03.webp",
      "/products/parlante/04.webp",
      "/products/parlante/05.webp",
      "/products/parlante/06.webp",
    ],
  },
  {
    id: "battery",
    name: "Batería Magnética 5000mAh",
    tag: "Energía",
    price: 35000,
    blurb: "Se pega al teléfono y carga sin cables. Fina, liviana, premium.",
    state: "disponible",
    facts: [
      "Se adhiere sola al teléfono — probalo en el momento",
      "5000mAh: un ciclo completo de carga",
      "Fina y liviana, entra en cualquier bolsillo",
    ],
    images: [
      "/products/battery/01.webp",
      "/products/battery/02.webp",
      "/products/battery/03.webp",
      "/products/battery/04.webp",
      "/products/battery/05.webp",
    ],
  },
  {
    id: "cable-lightning",
    name: "Cargador USB-C a Lightning + 20W",
    tag: "Carga",
    price: 28000,
    blurb: "Carga rápida real. Cable reforzado y adaptador incluido.",
    state: "disponible",
    facts: [
      "Carga rápida real de 20W",
      "Cable trenzado reforzado",
      "Cubo incluido, listo para usar",
    ],
    images: [
      "/products/cable-lightning/01.webp",
      "/products/cable-lightning/02.webp",
      "/products/cable-lightning/03.webp",
      "/products/cable-lightning/04.webp",
      "/products/cable-lightning/05.webp",
    ],
  },
  {
    id: "cable-usbc",
    name: "Cargador USB-C a USB-C + 20W",
    tag: "Carga",
    price: 28000,
    blurb: "Para Android y notebooks. Potencia completa, precio justo.",
    state: "disponible",
    facts: [
      "Carga rápida real de 20W",
      "Para Android y notebooks",
      "Cable reforzado + cubo incluido",
    ],
    images: [
      "/products/cable-usbc/01.webp",
      "/products/cable-usbc/02.webp",
      "/products/cable-usbc/03.webp",
      "/products/cable-usbc/04.webp",
      "/products/cable-usbc/05.webp",
    ],
  },
  {
    id: "vaper",
    name: "Vaper Descartable Premium",
    tag: "Lifestyle",
    price: 35000,
    blurb: "Sabores intensos, larga duración. Descartable y listo para usar.",
    state: "disponible",
    facts: [
      "Sellado de fábrica — lo abrís vos",
      "Larga duración real",
      "Consultá sabores disponibles",
    ],
    images: [
      "/products/vaper/01.webp",
      "/products/vaper/02.webp",
      "/products/vaper/03.webp",
      "/products/vaper/04.webp",
      "/products/vaper/05.webp",
    ],
  },
];

/**
 * Pre-built WhatsApp inquiry: the conversation starts specific (product,
 * price, size/variant), so the user types nothing and the seller answers
 * with certainty. The ask adapts to the availability state.
 */
export function productInquiry(
  p: Product,
  sel?: { size?: string; variant?: string },
): string {
  const parts = [`Hola! Me interesa: ${p.name} (${formatPrice(p.price)})`];
  if (sel?.size) parts.push(`talle ${sel.size}`);
  if (sel?.variant) parts.push(sel.variant);
  const ask =
    p.state === "proximo"
      ? "¿Me avisás cuando llegue?"
      : p.state === "ingresando"
        ? "¿Me lo reservás?"
        : "¿Cuándo lo puedo ver?";
  return `${parts.join(", ")}. ${ask}`;
}

export const ASK_CARD_MESSAGE = "Hola! Busco algo que no está en el catálogo: ";

export interface Step {
  n: string;
  title: string;
  text: string;
}

export const STEPS: Step[] = [
  {
    n: "01",
    title: "Escribís",
    text: "Nos mandás mensaje por WhatsApp y te decimos qué hay y cuánto sale.",
  },
  {
    n: "02",
    title: "Coordinamos",
    text: "Elegís el punto de encuentro en Córdoba y el día que te queda cómodo.",
  },
  {
    n: "03",
    title: "Ves y pagás",
    text: "Revisás el producto en mano. Recién ahí pagás. Sin riesgo, sin vueltas.",
  },
];

export interface Compare {
  label: string;
  tienda: string;
  allimport: string;
}

export const COMPARE: Compare[] = [
  { label: "Precio", tienda: "Inflado por local y marca", allimport: "Precio de importación" },
  { label: "Antes de pagar", tienda: "Pagás y después ves", allimport: "Ves el producto en mano" },
  { label: "Trato", tienda: "Un número más en la fila", allimport: "Trato personal, cara a cara" },
  { label: "Entrega", tienda: "Vas vos al local", allimport: "Nos encontramos donde te quede" },
];

export interface Testimonial {
  name: string;
  text: string;
}

export const TESTIMONIALS: Testimonial[] = [
  { name: "Meli", text: "Pensé que era trucho y me lo dieron en la mano antes de pagar. Calidad real." },
  { name: "Fran", text: "Me ahorré una locura con los auriculares. Andan igual que los originales." },
  { name: "Nico", text: "Nos juntamos en el centro, vi todo, pagué tranquilo. Ya le compré dos veces." },
  { name: "Cami", text: "La remera es idéntica a la del jugador. No lo podía creer por lo que salió." },
];
