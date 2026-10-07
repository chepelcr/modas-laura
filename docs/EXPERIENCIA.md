# Modas Laura · Brief de experiencia

Público: personas que buscan almohaditas para bebé o fundas para el hogar, y personas interesadas en la historia familiar.

Propósito: presentar las tres líneas actuales y facilitar una consulta directa por WhatsApp. La historia de doña Vilma y el archivo familiar aportan contexto real. Sin precios, inventario, plazos ni testimonios inventados.

Recorrido: identidad → colección → origen familiar → consulta guiada → archivo → contacto. Historia y archivo tienen páginas propias con enlaces directos.

Dirección visual: editorial cálida; verde bosque, marfil, menta, rosa y celeste aprobados. Tipografía serif para títulos y sans para lectura. Composición ilustrativa aprobada en portada; fotografías reales en colección. Restauraciones claramente identificadas en archivo y comparables con originales.

UI/UX Pro Max: se revisaron las recomendaciones de jerarquía, consultas, accesibilidad, rendimiento y adaptación móvil. Los resultados automáticos de estilo no correspondían plenamente a la identidad familiar; se conservaron la paleta y el logo aprobados, y se aplicaron las reglas generales pertinentes.

Flujo premium aplicado: brief previo, tokens compartidos, componentes React, consultas de tres pasos con extremos deshabilitados, iconos y anillos sutiles, animaciones de entrada/salida, teclado, movimiento reducido, rutas directas, SEO y verificación de producción. Una sola lengua (español de Costa Rica) y un tema claro, adecuados al alcance actual. Las páginas tienen rutas propias, incluidas colección y contacto. El menú y las acciones públicas usan rutas físicas sin fragmentos.

Aceptación:
- Tres líneas actuales; almohada infantil separada como producto histórico.
- Teléfono +506 8989-0512 y correo vilmacorella@yahoo.com.
- Páginas /, /historia/, /archivo/ y /privacidad/ con título, descripción y URL canónica propios.
- Sin desplazamiento horizontal en 375, 768 y 1440 px.
- Menú móvil modal: teclado, Escape y retorno de foco.
- Consulta guiada: contador, extremos, cambios reversibles, movimiento reducido.
- Archivo: diez registros, filtros y originales.
- Sin errores de hidratación; contenido prerenderizado antes de JavaScript.
- Compilación, lint, pruebas de contenido y pruebas de navegador antes de publicar.

## Regalos corporativos y diseños personalizados

La página /regalos-corporativos/ reúne los tres estilos del catálogo original: 18 × 14, 22 × 20 y 28 × 28 cm (ancho × alto), en tela tropical y espuma de uretano. Incluye consultas por estilo y descarga del catálogo PDF con la identidad actual. La galería de la página corporativa y la página /disenos-personalizados/ permiten ver los nueve trabajos de diseños/, tanto corporativos como personalizados con nombres. Son fotografías originales, optimizadas sin restauración; no se atribuyen relaciones comerciales actuales. Se conservan las tres líneas de la colección y los diez registros del archivo histórico. Navegación y contenido disponibles en español e inglés; el PDF está identificado como español.

Los datos del catálogo y la galería viven en src/content/site.js. El PDF público se reconstruye con scripts/catalog/create_pdf.py (ReportLab y fuentes Georgia/Arial del sistema); los archivos originales permanecen intactos en diseños/.

El landing ya no incluye las secciones de regalos corporativos ni diseños personalizados. Las versiones inglesas están en /en/corporate-gifts/ y /en/personalized-designs/. Colección y contacto tienen rutas propias /coleccion/ y /contacto/ (inglés: /en/collection/ y /en/contact/). El catálogo tiene siete páginas e incluye las nueve fotografías originales de trabajos realizados, además de los tres estilos.

Revisión posterior: enlaces y URLs canónicas sin barra final, por ejemplo /regalos-corporativos. La compilación conserva las carpetas y también genera archivos HTML equivalentes para resolver las rutas sin barra; el servidor de desarrollo aplica el mismo mapeo. Las URLs de carpetas antiguas se normalizan en el navegador. El catálogo queda en seis páginas: portada, tres estilos, Interfaz y diseños con nombres. Se excluyen del PDF cinco fotografías que repetían los tres estilos; el sitio conserva las nueve fotos. Cuatro diseños usan recortes con transparencia realizados mediante ImageGen, identificados como edición con IA y con enlaces a originales. Detalle de archivos y prompt en RECORTES.md.

Cinco estilos corporativos: 1 (18 × 14 cm), 2 (22 × 20 cm), 3 (28 × 28 cm), 4 (almohada oscura, sublimado completo A4), 5 (almohada y funda con encaje, 35 × 25 cm aprox. para sublimado central o tamaño A4 para sublimado completo). Las propuestas 1–3 y la portada usan el logo de Modas Laura, sin el texto de paciente ni las letras industriales del estilo 1; son ediciones ilustrativas identificadas. Los estilos 4 y 5 usan las fotografías aportadas por el usuario con fondo eliminado y conservan el diseño de Interfaz como ejemplo de trabajo realizado. El PDF toma sus cinco estilos de src/content/site.js y dedica una página a cada uno, además de portada y diseños con nombres.

Refinamiento de imágenes corporativas: portada y estilos 1–3 muestran solo el logo horizontal de Modas Laura centrado sobre tela blanca. Se retiraron cinta celeste, flores y texto adicional. Esta versión se usa tanto en la página dedicada como en el catálogo PDF.
