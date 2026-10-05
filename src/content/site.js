export const site = {
  name: "Modas Laura",
  owner: "Vilma Corella Artavia",
  since: "1974",
  phone: "8989-0512",
  phoneInternational: "+50689890512",
  email: "vilmacorella@yahoo.com",
  canonical: "https://modas-laura.jcampos.dev/",
};
export const routeUrl = (path = "") =>
  `${import.meta.env?.BASE_URL || "/"}${path}`;
export const asset = (name) => routeUrl(`assets/${name}`);
export const whatsapp = (message) =>
  `https://wa.me/50689890512${message ? `?text=${encodeURIComponent(message)}` : ""}`;
export const products = [
  {
    id: "con-funda",
    number: "01",
    image: "con-funda.webp",
    kicker: "Con ese detalle especial.",
    title: "Almohadas con funda",
    description:
      "Almohaditas para bebé con funda y detalles de encaje. Consultá los diseños y colores disponibles.",
    alt: "Almohadita celeste con encaje blanco y una ilustración central.",
  },
  {
    id: "sencilla",
    number: "02",
    image: "sencilla.webp",
    kicker: "Color para cada pequeño mundo.",
    title: "Almohadas sencillas",
    description:
      "Una línea de almohaditas sencillas, con opciones lisas y estampadas. Preguntanos por los modelos actuales.",
    alt: "Almohada sencilla estampada con globos de colores, dentro de su empaque.",
  },
  {
    id: "funda-grande",
    number: "03",
    image: "funda-grande.webp",
    kicker: "También pensamos en el hogar.",
    title: "Fundas para almohada grande",
    description:
      "Fundas blancas y de colores para almohada grande. Consultá medidas, presentación y tonos disponibles.",
    alt: "Fotografía de archivo de una funda blanca para almohada grande, en su empaque.",
    archival: true,
  },
];
export const consultationSteps = [
  {
    id: "choose",
    icon: "pillow",
    title: "Encontrá tu línea",
    description:
      "¿Con funda, sencilla o para almohada grande? Elegí la línea que querés consultar.",
    label: "Ver colección",
    href: "#coleccion",
  },
  {
    id: "ask",
    icon: "message",
    title: "Contanos qué buscás",
    description:
      "Escribinos por WhatsApp para preguntar por modelos, colores, medidas y precios.",
    label: "Escribir por WhatsApp",
    href: whatsapp("Hola Modas Laura, quisiera consultar modelos y precios."),
  },
  {
    id: "confirm",
    icon: "check",
    title: "Confirmá los detalles",
    description:
      "Antes de comprar, confirmá con nosotros disponibilidad, características y opciones para recibir el producto.",
    label: "Consultar detalles",
    href: whatsapp(
      "Hola Modas Laura, quisiera confirmar disponibilidad y opciones de entrega.",
    ),
  },
];
export const archiveEntries = [
  {
    id: "encaje-celeste",
    category: "bebé",
    title: "Almohadita con encaje celeste",
    description:
      "Una imagen de la línea para bebé, con encaje blanco y un pequeño diseño central.",
  },
  {
    id: "encaje-amarillo",
    category: "bebé",
    title: "Encaje y estampados",
    description:
      "Almohadita amarilla con motivos infantiles y encaje alrededor.",
  },
  {
    id: "sencilla-verde",
    category: "bebé",
    title: "Almohada sencilla verde",
    description:
      "El producto y su antigua etiqueta, parte de la memoria de Modas Laura.",
  },
  {
    id: "lote-estampadas",
    category: "taller",
    title: "Un día en el taller",
    description:
      "Almohaditas estampadas, empacadas y agrupadas en el espacio de trabajo.",
  },
  {
    id: "cogeollas",
    category: "hogar",
    title: "Cogeollas de colores",
    description:
      "Una de las líneas para el hogar que formó parte de nuestra trayectoria.",
  },
  {
    id: "sabana",
    category: "bebé",
    title: "Sábanas para cuna",
    description:
      "Un juego de sábana para cuna con dos fundas, de una etapa anterior.",
  },
  {
    id: "funda-rectangular",
    category: "bebé",
    title: "Funda rectangular",
    description:
      "La presentación vertical de la antigua funda, con un detalle de encaje horizontal.",
  },
  {
    id: "almohada-infantil",
    category: "infantil",
    title: "Almohada infantil",
    description:
      "Una almohada más grande para niños. Era un producto distinto de las almohaditas para bebé.",
  },
  {
    id: "funda-blanca",
    category: "hogar",
    title: "Funda para almohada grande",
    description: "La funda blanca en su presentación histórica.",
  },
  {
    id: "funda-blanca-azul",
    category: "hogar",
    title: "Una funda en contexto",
    description:
      "Funda blanca con borde azul sobre una almohada. El peluche forma parte de la escena de la fotografía.",
  },
];
