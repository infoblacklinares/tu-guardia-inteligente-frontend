# Contrato preliminar de integración API

**Estado:** borrador; no representa la API existente de Carlos.

## Reglas
- Las vistas consumen `src/services/`; no hacen HTTP directamente.
- No inventar endpoints reales; acordarlos con el backend antes de integrarlos.
- Los secretos no deben almacenarse en variables `VITE_*`.
- La autorización debe validarse en el servidor para cada recurso privado.
- Los datos de demostración deben mantenerse separados de los datos reales.

## Recursos candidatos para conversar
- `GET /events` — eventos visibles para el usuario.
- `GET /sensors` — sensores visibles para el usuario.
- `POST /events/{id}/acknowledgement` — confirmar recepción.
- `GET /events/{id}/clip` — URL controlada de un clip compatible, si existe.
- `GET /groups` — grupos comunitarios autorizados.
- `POST /groups/{id}/alerts` — publicar un aviso voluntario en un grupo.

Estos endpoints son ejemplos, no funciones existentes confirmadas.

## Esquema conceptual
```ts
interface SecurityEvent {
  id: string; deviceId: string; title: string; description: string;
  kind: 'door_open' | 'window_open' | 'motion_detected' | 'device_offline' | 'other';
  occurredAt: string; status: 'new' | 'acknowledged' | 'resolved'; clipAvailable: boolean;
}
```

## Pendiente de acordar
Autenticación, IDs, permisos por hogar/negocio/comunidad, retención de clips, paginación, filtros, errores y caducidad de enlaces.
