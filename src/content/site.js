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
    image: "con-funda-presentacion.webp",
    illustrative: true,
    kicker: "Con ese detalle especial.",
    title: "Almohadas con funda",
    description:
      "Almohaditas para bebé con funda y detalles de encaje. Consultá los diseños y colores disponibles.",
    alt: "Composición de tres almohaditas con funda rosa, blanca y celeste, separadas y con encaje blanco.",
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
    href: "coleccion/",
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

export const logoHistory = [
  {
    id: "primeras-etiquetas",
    stage: "Primeras etiquetas",
    title: "El primer bebé",
    image: "logo-historico-bebe.webp",
    alt: "Bebé dibujado en azul, sostenido por una tela anudada: símbolo de las primeras etiquetas.",
    description:
      "El bebé ya acompañaba nuestras etiquetas. Este símbolo fue reconstruido digitalmente a partir de una fotografía del archivo familiar.",
    note: "Reconstrucción digital de una etiqueta histórica.",
  },
  {
    id: "logo-circular",
    stage: "Una etapa posterior",
    title: "El sello circular",
    image: "logo-historico-circular-transparente.webp",
    alt: "Logo circular verde de Modas Laura con un bebé y la frase Hecho en Costa Rica.",
    description:
      "El bebé tomó color dentro de un sello verde, acompañado por el nombre Modas Laura y la frase Hecho en Costa Rica.",
    note: "Logo conservado del archivo familiar.",
  },
  {
    id: "logo-actual",
    stage: "Hoy",
    title: "Una identidad familiar",
    image: "logo.webp",
    darkImage: "logo-dark.svg",
    alt: "Logo actual de Modas Laura: bebé entre almohaditas con encaje y el nombre de la marca.",
    description:
      "El logo actual conserva al bebé y el encaje, con una inspiración especial: una fotografía familiar de infancia. Una nueva imagen para la misma historia.",
    note: "Nuestra identidad actual · Desde 1974.",
  },
];

export const corporateCatalog = {
  pdf: "catalogo-corporativo-modas-laura.pdf",
  material: "Tela tropical y espuma de uretano",
  styles: [
    {
      id: "estilo-1",
      title: "Estilo 1",
      name: "Almohadita clásica",
      size: "18 × 14 cm",
      image: "disenos/estilo-1-modas-laura.png",
      alt: "Propuesta ilustrativa del estilo 1, 18 × 14 cm, con el logo de Modas Laura.",
      originalImage: "disenos/catalogo-10.webp",
      illustrative: true,
      measurementLabel: "Ancho × alto",
      description: "Tela tropical y espuma de uretano",
    },
    {
      id: "estilo-2",
      title: "Estilo 2",
      name: "Almohadita mediana",
      size: "22 × 20 cm",
      image: "disenos/estilo-2-modas-laura.png",
      alt: "Propuesta ilustrativa del estilo 2, 22 × 20 cm, con el logo de Modas Laura.",
      originalImage: "disenos/catalogo-18.webp",
      illustrative: true,
      measurementLabel: "Ancho × alto",
      description: "Tela tropical y espuma de uretano",
    },
    {
      id: "estilo-3",
      title: "Estilo 3",
      name: "Almohadita con borde",
      size: "28 × 28 cm",
      image: "disenos/estilo-3-modas-laura.png",
      alt: "Propuesta ilustrativa del estilo 3, 28 × 28 cm, con el logo de Modas Laura.",
      originalImage: "disenos/catalogo-19.webp",
      illustrative: true,
      measurementLabel: "Ancho × alto",
      description: "Tela tropical y espuma de uretano",
    },
    {
      id: "estilo-4",
      title: "Estilo 4",
      name: "Almohada oscura",
      size: "A4",
      measurementLabel: "Sublimado completo",
      description: "Almohada oscura con sublimado completo en formato A4.",
      image: "disenos/estilo-4-sin-fondo.png",
      originalImage: "disenos/estilo-4-original.jpg",
      backgroundRemoved: true,
      alt: "Almohada oscura del estilo 4 con diseño de Interfaz, ejemplo de sublimado completo.",
    },
    {
      id: "estilo-5",
      title: "Estilo 5",
      name: "Almohada con encaje",
      size: "35 × 25 cm aprox.",
      measurementLabel: "Almohada y funda con encaje",
      description:
        "Sublimado central: 35 × 25 cm aprox. Sublimado completo: tamaño A4.",
      image: "disenos/estilo-5-sin-fondo.png",
      originalImage: "disenos/estilo-5-original.jpg",
      backgroundRemoved: true,
      alt: "Almohada y funda con encaje del estilo 5, con sublimado central de Interfaz.",
    },
  ],
  coverImage: "disenos/portada-modas-laura.png",
};
export const customDesigns = [
  ...corporateCatalog.styles.slice(0, 3).map((style) => ({
    id: style.id,
    image: style.image,
    title: style.alt,
    catalog: false,
    illustrative: true,
  })),
  {
    id: "img_20240422_093353381_hdr_ae",
    image: "disenos/IMG_20240422_093353381_HDR_AE-sin-fondo.png",
    title: "Almohaditas con identidad de marca",
    catalog: true,
    originalImage: "disenos/IMG_20240422_093353381_HDR_AE.webp",
    backgroundRemoved: true,
  },
  {
    id: "img_20231221_100737100_ae",
    image: "disenos/IMG_20231221_100737100_AE-sin-fondo.png",
    title: "Almohaditas con nombres",
    catalog: true,
    originalImage: "disenos/IMG_20231221_100737100_AE.webp",
    backgroundRemoved: true,
  },
  {
    id: "img_20241112_152448724",
    image: "disenos/IMG_20241112_152448724-sin-fondo.png",
    title: "Diseño con nombre y encaje",
    catalog: true,
    originalImage: "disenos/IMG_20241112_152448724.webp",
    backgroundRemoved: true,
  },
  {
    id: "img_20250729_180729126",
    image: "disenos/IMG_20250729_180729126-sin-fondo.png",
    title: "Diseños con nombres y mariposas",
    catalog: true,
    originalImage: "disenos/IMG_20250729_180729126.webp",
    backgroundRemoved: true,
  },
];
