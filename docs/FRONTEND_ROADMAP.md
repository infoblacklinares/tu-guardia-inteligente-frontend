# Frontend roadmap — Tu Guardia Inteligente

**Estado:** plan vivo de frontend. Las funciones marcadas como demostración no son operaciones reales.

## Principios de producto
- El producto principal es la gestión inteligente de eventos y alertas, no la vigilancia continua de cámaras.
- Sin prometer monitoreo humano 24/7, respuesta policial automática ni prevención garantizada.
- Espacios privados por defecto. Compartir con familia, vecinos o negocios requiere una acción explícita y permisos.
- Las pantallas deben distinguir evento detectado, recepción confirmada y evento resuelto.
- El frontend trabaja primero con datos simulados; no inventa endpoints. Integrar con el backend solo después de acordar contrato con Carlos.

## Entregado en esta iteración
- Sitio público en `/` con propuesta de valor, beneficios y explicación del servicio.
- Página `/planes` con opciones conceptuales Hogar, Familia y Negocio; no publica precios no validados.
- Página `/como-funciona` con el flujo de detección a registro.
- Página `/privacidad` con principios y límites, indicando que la implementación técnica está pendiente.
- Aplicación demo en `/app`, separada de la web comercial.
- Metadatos de título/descripción por ruta y OG básico en el HTML inicial.
- `public/robots.txt` permite páginas públicas y excluye `/app`.
- Flujo demo de detalles del evento, confirmación local, marcar resuelto y opciones visuales para coordinar apoyo. No envía notificaciones reales ni persiste en backend.
- Animaciones cortas, estilos responsive y respeto por `prefers-reduced-motion`.

## Pendiente antes de producción
1. Ejecutar `npm run build` después de estos commits y corregir cualquier error.
2. Probar en teléfonos reales y teclado/lector de pantalla; verificar el modal en móvil, foco, escape y retorno de foco.
3. Definir dominio canónico para sitemap XML, canonical URLs, Open Graph URL e integración con Search Console.
4. Evaluar prerenderizado/SSR para que las páginas comerciales tengan HTML indexable desde el servidor. La metadata actual por Vue Router se actualiza en cliente; no garantiza por sí sola el mejor rastreo SEO.
5. Construir formulario de interés con consentimiento y backend de captación antes de recibir leads reales.
6. Definir precios, límites, compatibilidad y contenido final de cada plan; actualmente son opciones conceptuales.
7. Validar contrato API con Carlos: autenticación, eventos, ACK, resolución, permisos por hogar/grupo/negocio, notificaciones, errores, retención y auditoría.
8. Reemplazar los estados locales por llamadas API solo tras confirmar endpoints y esquemas.
9. Definir reglas de escalamiento y tiempos; no mostrar que se envió ayuda hasta recibir confirmación real.
10. Revisar dependencias y las 7 vulnerabilidades reportadas por npm antes de publicar.

## Matriz de verdad para la demo
- Estado de sensores/eventos: datos ficticios.
- Confirmar recepción y marcar resuelto: estado local de la sesión.
- Compartir a familia/grupo/negocio: demostración visual; no envía mensajes.
- Login, roles y autorización: no implementados.
- Backend y dispositivos: no conectados.
- Precios y contratación: no disponibles.
