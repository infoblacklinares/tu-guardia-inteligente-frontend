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
