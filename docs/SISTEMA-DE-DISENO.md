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
