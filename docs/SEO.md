# SEO técnico e indexación

El sitio público se publica en `https://modas-laura.jcampos.dev`. La biblioteca privada tiene otro dominio, acceso autenticado y `noindex`; no se incluye en el sitemap público.

## Cobertura

- Dieciocho documentos físicos prerenderizados: ocho páginas en español y sus ocho equivalentes en inglés, más dos páginas 404 con `noindex`.
- Las dieciséis páginas indexables abarcan inicio, colección, contacto, historia, archivo, regalos corporativos, diseños personalizados y privacidad.
- Cada documento tiene título y descripción propios, URL canónica absoluta sin parámetros y enlaces recíprocos `es-CR`, `en` y `x-default`.
- Open Graph y Twitter incluyen título, descripción, imagen absoluta de 1200 × 630 y texto alternativo. El logo y los iconos son archivos públicos locales.
- JSON-LD describe la organización con los datos existentes de `src/content/site.js`. No se declaran precios, valoraciones, reseñas, horarios ni disponibilidad no documentados.
- `public/robots.txt` permite rastrear el sitio y anuncia `public/sitemap.xml`. El sitemap contiene las dieciséis canónicas, sin duplicados, versiones `.html`, barras finales adicionales ni páginas 404.
- Privacidad explica preferencias locales, analítica anónima propia, sesiones por pestaña, visitantes estimados y retención aproximada de noventa días en AWS. No hay SDK publicitario ni credenciales privadas en el cliente.

## Fuente de rutas y verificaciones

`src/i18n/routes.js` comparte la lista de rutas entre la navegación, Vite y la prerenderización. Al agregar una página, hay que crear sus dos documentos de entrada, registrar ambas rutas y actualizar el sitemap.

`npm run check` verifica los metadatos de las dieciocho entradas. `npm run build` ejecuta también `scripts/verify-seo.mjs` después de prerenderizar: comprueba contenido HTML real, un título principal por documento, equivalentes físicos para las rutas limpias, enlaces y anclas locales, imágenes, canónicas, idiomas, datos estructurados y cobertura del sitemap. Un fallo detiene la compilación.

Después de publicar, comprobar respuestas HTTP reales: las dieciséis rutas públicas, `robots.txt`, `sitemap.xml` y las imágenes compartidas deben responder correctamente; una URL inexistente debe devolver 404 y el documento de error debe conservar `noindex`. Revisar también que ninguna cabecera del alojamiento agregue `X-Robots-Tag: noindex` a páginas públicas. Las comprobaciones de archivos locales no sustituyen esta revisión del alojamiento.

## Lo que requiere acceso a buscadores

Verificar la propiedad del dominio en Google Search Console y Bing Webmaster Tools, registrar el sitemap y revisar la inspección de URLs y los informes de indexación requiere acceso a esas cuentas. El código no crea verificaciones de propiedad ni simula envíos. No se afirma que el sitio esté indexado: cumplir los requisitos técnicos o publicar un sitemap no garantiza indexación ni posiciones.

Referencias oficiales: [versiones localizadas y enlaces recíprocos](https://developers.google.com/search/docs/specialty/international/localized-versions), [requisitos técnicos de Google](https://developers.google.com/search/docs/essentials/technical), [crear y enviar un sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
