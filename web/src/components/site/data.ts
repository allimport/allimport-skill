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

export interface Product {
  id: string;
  name: string;
  tag: string;
  price: number;
  blurb: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "remera",
    name: "Remera Argentina",
    tag: "Indumentaria",
    price: 45000,
    blurb: "Calidad jugador. La misma que mirás en la tele, en tu ropero.",
  },
  {
    id: "tws",
    name: "Auriculares TWS Pro",
    tag: "Audio",
    price: 32000,
    blurb: "Cancelación de ruido y estuche de carga. Idénticos al original.",
  },
  {
    id: "battery",
    name: "Batería Magnética 5000mAh",
    tag: "Energía",
    price: 35000,
    blurb: "Se pega al teléfono y carga sin cables. Fina, liviana, premium.",
  },
  {
    id: "cable-lightning",
    name: "Cargador USB-C a Lightning + 20W",
    tag: "Carga",
    price: 28000,
    blurb: "Carga rápida real. Cable reforzado y adaptador incluido.",
  },
  {
    id: "cable-usbc",
    name: "Cargador USB-C a USB-C + 20W",
    tag: "Carga",
    price: 28000,
    blurb: "Para Android y notebooks. Potencia completa, precio justo.",
  },
  {
    id: "parlante",
    name: "Parlante Bluetooth RGB",
    tag: "Audio",
    price: 35000,
    blurb: "Sonido potente y luces reactivas. Resistente, portátil, fuerte.",
  },
  {
    id: "vaper",
    name: "Vaper Elf Bar",
    tag: "Lifestyle",
    price: 35000,
    blurb: "Sabores intensos, larga duración. Descartable y listo para usar.",
  },
];

export function formatPrice(n: number): string {
  return "$" + n.toLocaleString("es-AR");
}

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
