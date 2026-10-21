export type SensorKind = 'door' | 'window' | 'motion' | 'other'
export type SensorStatus = 'armed' | 'disarmed' | 'offline' | 'unknown'
export type EventStatus = 'new' | 'acknowledged' | 'resolved'
export type EventKind = 'door_open' | 'window_open' | 'motion_detected' | 'device_offline' | 'other'
export interface SecuritySensor { id: string; name: string; kind: SensorKind; status: SensorStatus; locationLabel: string; lastUpdatedAt: string }
export interface SecurityEvent { id: string; deviceId: string; title: string; description: string; kind: EventKind; occurredAt: string; status: EventStatus; clipAvailable: boolean; source: 'mock' | 'api' }
export interface DashboardSnapshot { sensors: SecuritySensor[]; events: SecurityEvent[]; source: 'mock' | 'api' }
