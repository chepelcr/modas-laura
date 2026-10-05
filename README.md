# Modas Laura

Sitio de la empresa familiar costarricense de Vilma Corella Artavia, activa desde 1974.

**Web:** https://modas-laura.jcampos.dev/

React + Vite con componentes reutilizables, sistema de diseño y páginas prerenderizadas. Colección actual, historia, archivo familiar con comparación de originales y contacto por WhatsApp/correo.

## Desarrollo

Requiere Node.js 24 (o versión compatible con Vite).

```sh
npm ci
npm run dev
npm run check
npm run build
npm run preview
```

La URL local parte de `/`, igual que el dominio personalizado. La compilación genera `dist/` y páginas físicas para historia, archivo y privacidad, compatibles con navegación directa en GitHub Pages.

## Pruebas de navegador

```sh
npx playwright install chromium
npm run build
npm run test:browser
```

`QA_BROWSER` permite usar un Chromium instalado. Las pruebas cubren hidratación, rutas, filtros, consultas, foco, menú móvil, accesibilidad automatizada, imágenes y anchuras responsive. La revisión visual complementa estas pruebas.

## Publicación

El repositorio público publica automáticamente en GitHub Pages cuando cambia `main`. El workflow ejecuta instalación, lint, pruebas de contenido y compilación antes del despliegue. Se publica solamente `dist/`.

## Edición

- `src/content/site.js`: productos, archivo, contacto y pasos de consulta.
- `src/pages/`: textos y composición de páginas.
- `src/design-system/`: tokens y primitivos compartidos.
- `src/components/`: elementos reutilizables de negocio.
- `public/assets/`: imágenes optimizadas, favicon, contacto y tarjeta.
- `docs/`: brief, sistema de diseño y evidencia de revisión.

Las imágenes del archivo restauradas con IA están identificadas y conservan una comparación con sus originales. La composición de portada es ilustrativa. La almohada infantil pertenece al archivo histórico; no es una línea vigente. Precios, modelos, medidas, disponibilidad y condiciones se consultan directamente.

Las fotografías, el logo y los contenidos de Modas Laura conservan sus derechos; un repositorio público no concede permiso de reutilización de esos materiales.
