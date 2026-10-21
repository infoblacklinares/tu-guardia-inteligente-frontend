# Tu Guardia Inteligente — Frontend

**Estado:** prototipo frontend; no conectado a backend, cámaras ni sensores reales.

## Experiencias
- Sitio público: `/`
- Planes conceptuales: `/planes`
- Formulario de interés de demostración: `/interes`
- Cómo funciona: `/como-funciona`
- Principios de privacidad: `/privacidad`
- Aplicación de demostración: `/app`

## Stack
Vue 3, TypeScript, Vite, Vue Router, Pinia, Tailwind CSS y estilos responsive.

## Ejecutar
Requiere Node.js 20 o superior.

```bash
npm install
npm run dev
```

## Validar
```bash
npm run type-check
npm run build
```

## Estado funcional real
La web pública explica el producto y presenta opciones conceptuales de planes, y tiene un formulario de interés validado visualmente. La demo permite explorar eventos ficticios, abrir sus detalles, confirmar recepción, marcar un evento como resuelto y probar visualmente opciones de coordinación. Estas acciones no envían notificaciones ni persisten en un servidor.

No hay autenticación, roles efectivos, backend, dispositivos reales, compra ni formulario conectado. Los precios y alcances de planes están pendientes de validación. No se ofrece monitoreo humano 24/7 ni respuesta policial automática.

## Integración
Las vistas consumen `src/services/`; no hacen llamadas HTTP directamente. El servicio mock se sustituirá cuando Carlos confirme endpoints, autenticación y esquemas reales. No inventar endpoints.

## SEO
Se configuraron títulos/descripciones por ruta, metadatos iniciales y `public/robots.txt`. Falta confirmar dominio canónico para sitemap/canonical y evaluar prerenderizado/SSR para páginas públicas. Ver `docs/FRONTEND_ROADMAP.md`.

## Privacidad
No guardar secretos en el repositorio. Los permisos deben aplicarse en el backend, no solo ocultando elementos en Vue. Toda demo usa datos ficticios.
