# Tu Guardia Inteligente — Frontend

**Estado:** scaffold inicial; no conectado a backend, cámaras ni sensores reales.

## Stack
Vue 3, TypeScript, Vite, Vue Router, Pinia y Tailwind CSS.

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

## Estructura
- `src/views/`: páginas.
- `src/components/`: componentes reutilizables.
- `src/types/`: contratos TypeScript.
- `src/services/`: origen de datos mock y futuro adaptador API.
- `docs/BITACORA.md`: registro técnico del repositorio.
- `docs/API_CONTRACT.md`: contrato de integración preliminar.

## Regla de integración
Las vistas consumen `src/services/`; no hacen llamadas HTTP directamente. El servicio mock se sustituirá cuando Carlos confirme endpoints, autenticación y esquemas reales.

## Privacidad
No guardar secretos en el repositorio. Los permisos deben aplicarse en el backend, no solo ocultando elementos en Vue. Toda demo usa datos ficticios.
