import type { DashboardSnapshot } from '@/types/security'
import { getMockDashboard } from './securityService.mock'
// Único punto de entrada de datos para las vistas. No inventar endpoints.
export async function getDashboardSnapshot(): Promise<DashboardSnapshot> {
  const mode = import.meta.env.VITE_DATA_MODE ?? 'mock'
  if (mode === 'api') throw new Error('La API real aún no está configurada. Usa VITE_DATA_MODE=mock.')
  return getMockDashboard()
}
