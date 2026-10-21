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
