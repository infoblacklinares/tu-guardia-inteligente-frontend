# Bitácora técnica — Tu Guardia Inteligente

## TGI-FE-001 — 20-10-2026
**Tipo:** scaffold frontend. **Estado:** estructura preparada; dependencias y build aún no verificados.

### Decisiones
- Vue 3 + TypeScript + Vite + Tailwind.
- Separación entre vistas, tipos y servicios.
- Datos mock separados del adaptador de datos.
- No inventar endpoints; contrato API preliminar en `API_CONTRACT.md`.
- Rotular claramente la demo y no utilizar cámaras, clips, credenciales o datos reales.

### Archivos clave
- `src/views/DashboardView.vue`: panel inicial.
- `src/types/security.ts`: tipos de sensores/eventos.
- `src/services/securityService.ts`: punto único de entrada de datos.
- `src/services/securityService.mock.ts`: datos ficticios.
- `docs/API_CONTRACT.md`: contrato preliminar.

### Errores y pruebas
- No se ha ejecutado `npm install`, `npm run type-check` ni `npm run build`; por tanto, no se afirma que compile.
- El repositorio de GitHub aún no se ha creado desde este entorno.
- No se ha conectado a un proyecto de Vercel.

### Siguiente paso
Crear repositorio GitHub privado `tu-guardia-inteligente-frontend`, subir el scaffold, instalar dependencias, corregir y registrar errores, ejecutar type-check/build y después configurar preview en Vercel.

## TGI-FE-002 — 20-10-2026 (continuación)
**Acción:** intento de instalar dependencias en entorno de trabajo.  
**Resultado:** `npm install --ignore-scripts --no-audit --no-fund` superó el límite de tiempo del entorno y fue interrumpido.  
**Causa:** no confirmada; no atribuirlo a un paquete específico sin logs adicionales.  
**Impacto:** no se pudo ejecutar `npm run type-check` ni `npm run build`; el scaffold queda sin verificación de compilación.  
**Siguiente paso:** repetir instalación en un entorno con acceso estable a npm, guardar salida completa y registrar cualquier error concreto antes de corregir.


## TGI-FE-003 — 21-10-2026 — Corrección de alias y rediseño móvil
**Solicitud:** priorizar la versión móvil y acercar el panel a la referencia visual del hogar inteligente.

**Resultados confirmados por el usuario en su equipo local (antes del rediseño v0.3):**
- `npm install` finalizó e instaló 142 paquetes; npm informó 7 vulnerabilidades (2 moderadas y 5 altas), avisos de tarballs y un aviso de aprobación de script para `esbuild`.
- `npm run build` falló inicialmente porque Vite no resolvía `@/views/DashboardView.vue`.
- Se corrigió `vite.config.ts` para declarar el alias `@`.
- El usuario confirmó después que `npm run build` terminó correctamente y mostró la carpeta `dist` (1.588 módulos transformados, 9,90 s).
- El usuario mostró la interfaz funcionando en `localhost:5173`.

**Cambios enviados directamente a GitHub por el asistente:**
- `src/views/DashboardView.vue` — rediseño del inicio con prioridad móvil, saludo, selector de hogar, estado de demostración, cámara ilustrativa, alerta, familia, sensores y navegación inferior.
- `src/styles/main.css` — estilos responsive mobile-first basados en la referencia visual.
- `vite.config.ts` — alias `@` explícito para Vite.
- Commits: `db6d110` (vista), `34cf592` (estilos), `66ff498` (alias Vite).

**Estado real tras estos cambios:** los archivos están enviados a la rama `main` de GitHub. Todavía no se ha ejecutado una compilación después de integrar el nuevo diseño; no afirmar que el rediseño v0.3 compila hasta que el usuario lo pruebe localmente. La escena de cámara es una ilustración CSS y está rotulada como demostración; no representa una cámara conectada. No hay backend ni dispositivos reales conectados.

**Siguiente paso:** en el equipo local, ejecutar `git pull origin main` y `npm run build`. Corregir cualquier error antes de desplegar. Revisar las 7 vulnerabilidades por separado, sin usar `npm audit fix --force` sin analizar el impacto.


## TGI-FE-004 — 21-10-2026 — Ajuste visual móvil v0.3.1
**Observación del usuario:** la vista móvil seguía alejándose de la referencia; en la tarjeta Cámaras el título, el enlace “Ver todas” y el chevrón aparecían apilados en varias líneas.

**Corrección enviada a GitHub:** se añadieron reglas responsive explícitas para alinear en una sola fila el encabezado de sección, el título y la acción; se corrigieron alineación de cabecera de alertas, proporciones de cámara y presentación de los paneles en móvil.

**Commit:** `48ce63b` — `fix: align mobile section headings with reference layout`.

**Pendiente de verificación:** el usuario debe actualizar su copia local y revisar en el navegador móvil. Esta modificación CSS todavía no ha sido compilada después del cambio. La escena de cámara continúa siendo ilustrativa; no es una imagen real ni un feed de cámara.


## TGI-FE-005 — 21-10-2026 — Reenfoque del producto: Guardia Inteligente
**Decisión de producto reafirmada por el usuario:** el servicio de monitoreo continuo de cámaras 24/7 queda fuera del alcance. El producto principal es el guardia inteligente: detección de eventos relevantes, alertas, confirmación/gestión, historial y avisos a personas autorizadas. Las cámaras no deben dominar la pantalla de inicio ni sugerir vigilancia en directo como servicio central.

**Cambios enviados a GitHub directamente:**
- `src/views/DashboardView.vue`: se eliminó la cámara como sección principal del inicio y se priorizaron resumen inteligente, alertas pendientes, confirmación de eventos, estado de sensores, historial y personas autorizadas.
- Navegación móvil cambiada a Inicio, Alertas, Historial y Familia.
- Texto de demostración deja explícito que no hay monitoreo 24/7 ni dispositivos reales conectados.
- `src/styles/main.css`: estilos mobile-first para resumen y tarjetas de alertas.
- Commits: `c8506a3` (vista) y `b371539` (estilos).

**Límites que se mantienen:** los datos son simulados; no hay backend/dispositivos reales conectados; no se promete respuesta automática de emergencias ni monitoreo humano permanente. Los videos del hogar son privados por defecto; cualquier compartición debe ser explícita y controlada. El soporte de clips dependerá de las capacidades reales del equipo/API y no es requisito para presentar la idea central.

**Estado:** cambios enviados a la rama `main`. Compilación y revisión visual posterior al reenfoque aún pendientes en el equipo local.
**Siguiente paso:** ejecutar `git pull origin main`, `npm run build` y probar la vista móvil. Luego validar con Carlos la viabilidad de sensores, generación de eventos, notificaciones y confirmación/escalamiento antes de conectar backend.


## TGI-FE-006 — 21-10-2026 — Corrección TypeScript por símbolos sin uso
**Error reportado por el usuario tras actualizar el reenfoque de la interfaz:** `vue-tsc -b` detectó dos errores TS6133 en `src/views/DashboardView.vue`: importación `Activity` no utilizada y variable computada `latestEvent` no utilizada.

**Corrección enviada a GitHub:** se eliminaron ambos símbolos sin uso.
**Commit:** `381f763` — `fix: remove unused dashboard imports and computed value`.
**Pendiente:** ejecutar `git pull origin main` y `npm run build` en el equipo local. No se afirma que la compilación posterior a esta corrección ya haya pasado.


## TGI-FE-007 — 21-10-2026 — Primera iteración comercial y flujo de eventos
**Objetivo:** avanzar en el frontend público y hacer que la demo explique el servicio sin centrarlo en cámaras 24/7.

**Archivos y cambios enviados a GitHub:**
- `src/views/LandingView.vue`: nueva página pública con propuesta de valor, beneficios, explicación del producto y CTA a la demo.
- `src/views/PlansView.vue`: opciones conceptuales Guardia Hogar, Guardia Familia y Guardia Negocio. No se publican precios sin validar costos y alcance.
- `src/views/HowItWorksView.vue`: recorrido de detección, alerta, confirmación, coordinación y registro.
- `src/views/PrivacyView.vue`: principios de privacidad y límites del estado actual.
- `src/router/index.ts`: rutas públicas `/`, `/planes`, `/como-funciona`, `/privacidad`; demo movida a `/app`; títulos y descripciones por ruta y marca `noindex` para la demo.
- `index.html`: idioma es-CL, metadatos iniciales y Open Graph básico.
- `src/styles/public.css`: estilo responsive mobile-first, animaciones ligeras y soporte de `prefers-reduced-motion`.
- `src/views/DashboardView.vue`: detalle de evento en modal, información de hora/dispositivo/estado/video, opción de coordinar apoyo con familia/grupo vecinal/negocio como flujo simulado y acción local para marcar resuelto.
- `src/styles/main.css`: estilos de modal y acciones accesibles.
- `public/robots.txt`: reglas básicas de rastreo para páginas públicas y exclusión de `/app`.
- `docs/FRONTEND_ROADMAP.md`: alcance, entregables, límites de la demo y lista de preparación para producción.

**Límites explícitos:** la demo continúa usando datos ficticios. Confirmación y resolución solo actualizan el estado local; las opciones de compartir no envían notificaciones. No existe login, autorización efectiva, backend, sensores reales, contratación ni envío de formularios. Las opciones de planes son conceptuales y no tienen precios aprobados.

**SEO pendiente:** metadatos dinámicos por Vue Router y OG inicial están añadidos, pero aún falta probar cómo indexa el sitio y evaluar prerenderizado/SSR para HTML comercial inicial. No se creó sitemap XML porque no se ha confirmado el dominio canónico. No afirmar que SEO está terminado.

**Validación pendiente:** el usuario confirmó compilación exitosa antes de esta iteración. No se ha ejecutado `npm run build` después de los nuevos archivos y cambios. Debe ejecutar `git pull origin main`, `npm run build` y revisar rutas en móvil.

**Commits principales:** landing `388f509`, planes `304de0e`, cómo funciona `68565a5`, privacidad `82c035f`, estilos públicos `e1e6c1b`, rutas `8d59153`, metadata `0c4ef2f`, flujo de evento `3f39f2b`, estilos del modal `f1d7a1e`, robots `7fc14dd`, roadmap `71f3d76`.


### Anexo TGI-FE-007A — Formulario de interés y acciones completas de alerta
**Cambios adicionales enviados tras el registro inicial de TGI-FE-007:**
- `src/views/InterestView.vue`: formulario visual con validación de nombre, correo y consentimiento; permite seleccionar hogar/familia/negocio/comunidad y muestra confirmación de prueba.
- `src/router/index.ts`: ruta `/interes` con metadatos propios.
- `src/views/PlansView.vue`: cada tarjeta dirige al formulario con el plan preseleccionado.
- `src/styles/public.css`: estilos responsive del formulario.
- `src/views/DashboardView.vue`: el detalle del evento permite confirmar recepción, marcar resuelto y probar opciones visuales de coordinación; el estado se mantiene solo en la sesión local.
- Commits adicionales: formulario `617cc3a`, ruta `0c96f27`, enlaces de planes `4189ec4`, estilos de formulario `bc3b77c`, acciones del modal `184e9c4`.

**Limitación del formulario:** no guarda ni transmite los datos. Se muestra un aviso explícito; no utilizar datos reales hasta conectar un endpoint seguro, definir consentimiento/privacidad y probar la recepción. La conversión comercial real sigue pendiente del backend.
