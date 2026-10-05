# Sistema de diseño · Modas Laura

## Capas

`src/design-system/tokens.css` contiene primitivas (paleta, espacios, familias tipográficas, radios, duraciones), tokens semánticos (fondo, superficie, texto, marca, foco, borde) y tokens de componentes (botón, control y tarjeta). El resto de la interfaz consume los mismos alias semánticos. La fuente de verdad para cambios de marca es ese archivo.

## Primitivos compartidos

`src/design-system/Primitives.jsx`: Button (enlace o acción, variantes primary/light/text), IconButton (nombre accesible obligatorio), Heading, Eyebrow, Container, Card, FilterChip e Icon. Los enlaces mantienen semántica nativa; los botones de acción reciben type=button. SVG decorativos excluidos del árbol accesible. Controles con área objetivo de al menos 44 px; foco visible.

## Componentes de negocio

Header, Footer, Brand, ProductCard/ProductGrid, ConsultationSteps y ArchiveCard/ArchiveGallery. Los registros repetidos viven en `src/content/site.js`, con identificadores estables y datos de contacto compartidos. Las páginas componen estos elementos y pueden reutilizarlos en futuras secciones.

## Implementación

React + Vite, sin framework de estilos ni librería de animación adicional. CSS controla presentación y tokens; React controla menú, pasos y filtros. Hooks separados para sección activa y animaciones visibles. Las páginas se prerenderizan con React DOM Server y luego se hidratan para interacción. Las rutas físicas funcionan en GitHub Pages sin redirecciones de SPA.

## Extensiones

Agregar un primitivo aquí antes de duplicarlo en una nueva sección. Usar colores semánticos, conservar contraste, foco, teclado y movimiento reducido. No agregar una biblioteca salvo una necesidad concreta. No colocar herramientas internas en la experiencia pública. Para nuevos idiomas, agregar metadata, entradas de compilación y sitemap, además de contenido.

## Identidad familiar e idiomas

El logo aprobado usa un bebé inspirado en la foto de infancia de la mamá de José Pablo. El PNG maestro se conserva en la propuesta visual v6; el sitio sirve una copia WebP optimizada, con proporción 3:1 y fondo transparente. Portada, vista para compartir y tarjeta descargable usan el mismo emblema. La foto de referencia queda fuera del repositorio público.

LocaleProvider comparte traducciones y rutas españolas/inglesas entre componentes. ThemeProvider y los tokens semánticos definen temas claro y oscuro; el encabezado permite cambiar ambos, conservando página y preferencias. Las animaciones respetan movimiento reducido y detienen los elementos decorativos fuera de pantalla.

La variante inversa usa lettering crema y trazos menta sobre transparencia, sin recuadro. La selección de logo depende del tema mediante CSS para evitar saltos durante la hidratación. CountryFlag es una primitiva SVG reutilizable; la etiqueta accesible del enlace indica el idioma de destino.

## Cómo consultar · Disposición de la tarjeta

La distribución sigue la referencia «Cómo funciona» de Sóköl: ancho máximo de 720 px, relleno de 32 px en escritorio y 20 px en móvil, controles laterales de 44 px e icono centrado en un área de 160 px. Descripción y acción comparten una fila en escritorio; se apilan en móvil. El progreso queda centrado al pie. Se conservan las primitivas, paleta y tipografía de Modas Laura. Los tamaños se compactan en pantallas de poca altura para mantener todos los pasos visibles.

El sello de origen divide «Una historia / desde» y «Our story / since» en dos líneas para conservar margen dentro del círculo.
