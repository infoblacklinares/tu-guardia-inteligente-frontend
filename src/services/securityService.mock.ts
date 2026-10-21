import type { DashboardSnapshot } from '@/types/security'
export async function getMockDashboard(): Promise<DashboardSnapshot> {
  return {
    source: 'mock',
    sensors: [
      { id: 'sensor-demo-01', name: 'Puerta principal', kind: 'door', status: 'armed', locationLabel: 'Acceso principal', lastUpdatedAt: '2026-10-20T21:40:00-03:00' },
      { id: 'sensor-demo-02', name: 'Ventana living', kind: 'window', status: 'armed', locationLabel: 'Living', lastUpdatedAt: '2026-10-20T21:38:00-03:00' },
      { id: 'sensor-demo-03', name: 'Sensor patio', kind: 'motion', status: 'offline', locationLabel: 'Patio', lastUpdatedAt: '2026-10-20T20:55:00-03:00' }
    ],
    events: [
      { id: 'event-demo-01', deviceId: 'sensor-demo-01', title: 'Apertura de puerta', description: 'Evento ficticio registrado en el acceso principal.', kind: 'door_open', occurredAt: '2026-10-20T21:42:00-03:00', status: 'new', clipAvailable: false, source: 'mock' },
      { id: 'event-demo-02', deviceId: 'sensor-demo-03', title: 'Dispositivo sin conexión', description: 'El sensor de ejemplo no informa un estado reciente.', kind: 'device_offline', occurredAt: '2026-10-20T20:55:00-03:00', status: 'acknowledged', clipAvailable: false, source: 'mock' },
      { id: 'event-demo-03', deviceId: 'sensor-demo-02', title: 'Ventana revisada', description: 'Evento de ejemplo marcado como resuelto.', kind: 'window_open', occurredAt: '2026-10-20T19:10:00-03:00', status: 'resolved', clipAvailable: true, source: 'mock' }
    ]
  }
}
