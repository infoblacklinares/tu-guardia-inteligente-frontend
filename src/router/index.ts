import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import PlansView from '@/views/PlansView.vue'
import HowItWorksView from '@/views/HowItWorksView.vue'
import PrivacyView from '@/views/PrivacyView.vue'
import DashboardView from '@/views/DashboardView.vue'
import InterestView from '@/views/InterestView.vue'

const routes = [
  { path: '/', name: 'home', component: LandingView, meta: { title: 'Tu Guardia Inteligente | Alertas y seguridad conectada', description: 'Organiza alertas de seguridad, confirma eventos y coordina personas de confianza. Conoce Tu Guardia Inteligente y cómo funciona.' } },
  { path: '/planes', name: 'plans', component: PlansView, meta: { title: 'Planes | Tu Guardia Inteligente', description: 'Conoce las opciones de Tu Guardia Inteligente para hogares, familias y pequeños negocios. Planes y precios en etapa de definición.' } },
  { path: '/como-funciona', name: 'how-it-works', component: HowItWorksView, meta: { title: 'Cómo funciona | Tu Guardia Inteligente', description: 'Conoce el flujo de eventos, alertas, confirmación y coordinación con personas autorizadas de Tu Guardia Inteligente.' } },
  { path: '/privacidad', name: 'privacy', component: PrivacyView, meta: { title: 'Privacidad | Tu Guardia Inteligente', description: 'Conoce los principios de privacidad de Tu Guardia Inteligente: espacios privados, permisos y decisiones explícitas para compartir información.' } },
  { path: '/interes', name: 'interest', component: InterestView, meta: { title: 'Solicitar información | Tu Guardia Inteligente', description: 'Cuéntanos si te interesa Tu Guardia Inteligente para tu hogar, familia, negocio o grupo de vecinos.' } },
  { path: '/app', name: 'app', component: DashboardView, meta: { title: 'Demostración privada | Tu Guardia Inteligente', description: 'Demostración de interfaz con datos ficticios.', noindex: true } },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]
export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' }),
})
router.afterEach((to) => {
  if (typeof document === 'undefined') return
  const meta = to.meta as { title?: string; description?: string; noindex?: boolean }
  document.title = meta.title ?? 'Tu Guardia Inteligente'
  let description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
  if (!description) {
    description = document.createElement('meta')
    description.name = 'description'
    document.head.appendChild(description)
  }
  description.content = meta.description ?? 'Tu Guardia Inteligente: alertas, eventos y coordinación con personas de confianza.'
  let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
  if (!robots) {
    robots = document.createElement('meta')
    robots.name = 'robots'
    document.head.appendChild(robots)
  }
  robots.content = meta.noindex ? 'noindex, nofollow' : 'index, follow'
})
