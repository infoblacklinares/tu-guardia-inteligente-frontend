<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Bell, CheckCircle2, ChevronDown, ChevronRight, CircleAlert, ClipboardList, House, Settings, ShieldCheck, Store, Users, Wifi, WifiOff } from 'lucide-vue-next'
import type { DashboardSnapshot, EventStatus, SecurityEvent } from '@/types/security'
import { getDashboardSnapshot } from '@/services/securityService'

const snapshot = ref<DashboardSnapshot | null>(null)
const loading = ref(true)
const error = ref('')
const selectedArea = ref<'home' | 'business' | 'community'>('home')
const acknowledged = ref<string[]>([])
const resolved = ref<string[]>([])
const selectedEvent = ref<SecurityEvent | null>(null)
const shareNotice = ref(false)
const mobileSection = ref<'home' | 'alerts' | 'history' | 'family'>('home')

onMounted(async () => {
  try { snapshot.value = await getDashboardSnapshot() }
  catch (e) { error.value = e instanceof Error ? e.message : 'No se pudo cargar la demo.' }
  finally { loading.value = false }
})

const activeEvents = computed(() => snapshot.value?.events.filter(e => effectiveStatus(e) !== 'resolved') ?? [])
const newEvents = computed(() => activeEvents.value.filter(e => effectiveStatus(e) === 'new'))
const offlineSensors = computed(() => snapshot.value?.sensors.filter(s => s.status === 'offline').length ?? 0)
function effectiveStatus(event: SecurityEvent): EventStatus { if (resolved.value.includes(event.id)) return 'resolved'; return acknowledged.value.includes(event.id) && event.status === 'new' ? 'acknowledged' : event.status }
function acknowledge(event: SecurityEvent) { if (!acknowledged.value.includes(event.id)) acknowledged.value.push(event.id) }
function resolveEvent(event: SecurityEvent) { if (!resolved.value.includes(event.id)) resolved.value.push(event.id); selectedEvent.value = null }
function shareDemo() { shareNotice.value = true }
function openEvent(event: SecurityEvent) { selectedEvent.value = event; shareNotice.value = false }
function statusLabel(status: string) { return ({ armed:'Activo', disarmed:'Desactivado', offline:'Sin conexión', unknown:'Desconocido', new:'Nueva', acknowledged:'Recibida', resolved:'Resuelta' } as Record<string,string>)[status] ?? status }
function timeLabel(value: string) { return new Intl.DateTimeFormat('es-CL',{hour:'2-digit',minute:'2-digit'}).format(new Date(value)) }
function selectArea(area: 'home' | 'business' | 'community') { selectedArea.value = area; mobileSection.value = 'home' }
</script>

<template>
<div class="app-shell mobile-first-shell guardia-shell">
  <aside class="sidebar">
    <div class="brand"><div class="brand-mark"><ShieldCheck :size="24" /></div><div><strong>Tu Guardia</strong><span>Inteligente</span></div></div>
    <div class="workspace-label">ESPACIO DE DEMOSTRACIÓN</div>
    <nav class="nav-list" aria-label="Navegación principal">
      <button class="nav-item" :class="{active:selectedArea==='home'}" @click="selectArea('home')"><House :size="18" /> Hogar</button>
      <button class="nav-item" :class="{active:selectedArea==='business'}" @click="selectArea('business')"><Store :size="18" /> Negocio <span class="soon">Demo</span></button>
      <button class="nav-item" :class="{active:selectedArea==='community'}" @click="selectArea('community')"><Users :size="18" /> Comunidad <span class="soon">Demo</span></button>
    </nav>
    <div class="sidebar-note"><ShieldCheck :size="18" /><p><strong>Prevención inteligente</strong><br />Alertas útiles, confirmación de eventos y privacidad primero.</p></div>
    <div class="sidebar-footer">Prototipo · Datos simulados</div>
  </aside>

  <main class="main-content mobile-first-content">
    <header class="topbar mobile-hero">
      <div class="greeting"><p class="eyebrow desktop-eyebrow">TU GUARDIA INTELIGENTE</p><h1>{{ selectedArea==='home'?'Buenos días, Willson':selectedArea==='business'?'Guardia para tu negocio':'Guardia comunitaria' }}</h1><p class="welcome-subtitle">Lo importante, a tiempo. Sin vigilar cámaras todo el día.</p></div>
      <div class="top-actions"><span class="demo-pill"><span class="demo-dot"></span> MODO DEMOSTRACIÓN</span><button class="icon-button notification-button" aria-label="Notificaciones" @click="mobileSection='alerts'"><Bell :size="21" /><i v-if="newEvents.length"></i></button><button class="settings-button" aria-label="Configuración"><Settings :size="22" /></button><button class="avatar" aria-label="Perfil de demostración">TG</button></div>
    </header>

    <div v-if="selectedArea!=='home'" class="notice-panel"><Users :size="22" /><div><strong>{{selectedArea==='business'?'Guardia inteligente para negocio':'Guardia inteligente comunitaria'}}</strong><p>Este módulo está en etapa de diseño. No hay dispositivos ni usuarios reales conectados.</p></div></div>
    <div v-if="loading" class="loading-card">Cargando datos de demostración…</div>
    <div v-else-if="error" class="error-card"><CircleAlert :size="20" /><span>{{error}}</span></div>

    <template v-else-if="snapshot && selectedArea==='home'">
      <div class="home-status-row">
        <section class="home-selector"><div class="home-selector-icon"><House :size="22" /></div><div class="home-selector-copy"><strong>Mi casa <span>· Linares</span></strong><small>Espacio privado</small></div><ChevronDown :size="18" class="selector-chevron" /></section>
        <section class="protection-status" :class="offlineSensors ? 'needs-attention' : ''"><ShieldCheck :size="27" /><div><strong>{{offlineSensors ? 'REVISAR DISPOSITIVOS' : 'GUARDIA ACTIVO · DEMO'}}</strong><span>{{offlineSensors ? offlineSensors+' sensor(es) sin conexión' : 'Estado de ejemplo'}}</span></div></section>
      </div>

      <section v-if="mobileSection==='home'" class="guard-summary panel">
        <div class="guard-summary-icon"><ShieldCheck :size="27" /></div>
        <div class="guard-summary-copy"><span class="eyebrow">RESUMEN INTELIGENTE</span><h2>{{newEvents.length ? 'Hay eventos que revisar' : 'Todo tranquilo por ahora'}}</h2><p>{{newEvents.length ? newEvents.length+' evento(s) necesitan tu atención.' : 'No hay alertas nuevas en los datos de demostración.'}} Tu Guardia prioriza los eventos; no requiere mirar cámaras continuamente.</p></div>
      </section>

      <section v-if="mobileSection==='home' || mobileSection==='alerts'" class="alerts-panel panel">
        <div class="section-heading"><div class="heading-title"><Bell :size="22" /><h2>{{mobileSection==='alerts'?'Alertas':'Eventos que requieren atención'}}</h2></div><button v-if="mobileSection==='home'" class="text-action" @click="mobileSection='alerts'">Ver todas ({{activeEvents.length}}) <ChevronRight :size="17" /></button></div>
        <div v-if="activeEvents.length===0" class="empty-state"><CheckCircle2 :size="24" /><strong>No hay alertas pendientes</strong><span>Los eventos nuevos aparecerán aquí.</span></div>
        <article v-for="event in activeEvents" :key="event.id" class="smart-event" :class="'event-'+effectiveStatus(event)">
          <div class="smart-event-icon"><CircleAlert v-if="effectiveStatus(event)==='new'" :size="22" /><CheckCircle2 v-else :size="22" /></div>
          <div class="smart-event-body">
            <div class="smart-event-heading"><div><span class="event-kicker">{{effectiveStatus(event)==='new'?'REQUIERE ATENCIÓN':'ESTADO DEL EVENTO'}}</span><h3>{{event.title}}</h3></div><time>{{timeLabel(event.occurredAt)}}</time></div>
            <p>{{event.description}}</p>
            <button class="secondary-action" @click="openEvent(event)">Ver detalles del evento</button>
            <div class="event-meta"><span class="status-chip" :class="effectiveStatus(event)">{{statusLabel(effectiveStatus(event))}}</span><span class="clip-label muted">{{event.clipAvailable ? 'Referencia de clip demo' : 'Sin vídeo asociado'}}</span></div>
            <button v-if="event.status==='new' && !acknowledged.includes(event.id)" class="primary-action" @click="acknowledge(event)"><CheckCircle2 :size="17" /> Marcar como recibida <ChevronRight :size="18" /></button>
            <div v-else class="acknowledged-note"><CheckCircle2 :size="16" /> Evento recibido en esta sesión de demostración</div>
          </div>
        </article>
      </section>

      <section v-if="mobileSection==='home'" class="sensor-summary panel" @click="mobileSection='history'"><span class="sensor-summary-icon" :class="offlineSensors ? 'offline' : ''"><component :is="offlineSensors ? WifiOff : Wifi" :size="23" /></span><span class="sensor-summary-copy"><strong>Estado de sensores</strong><span>{{snapshot.sensors.length-offlineSensors}} de {{snapshot.sensors.length}} activos · Datos simulados</span></span><span class="sensor-summary-alert" v-if="offlineSensors">{{offlineSensors}} sin conexión</span><ChevronRight :size="21" class="sensor-summary-chevron" /></section>

      <section v-if="mobileSection==='home' || mobileSection==='history'" class="panel history-panel">
        <div class="panel-heading"><div><h2>Historial de eventos</h2><p>Registro de muestra de la actividad detectada.</p></div><span class="tiny-tag">{{snapshot.events.length}} eventos</span></div>
        <div v-for="event in snapshot.events" :key="event.id" class="event-row"><div class="event-symbol" :class="effectiveStatus(event)"><CircleAlert v-if="effectiveStatus(event)==='new'" :size="18" /><CheckCircle2 v-else :size="18" /></div><div class="event-copy"><div class="event-title-line"><strong>{{event.title}}</strong><time>{{timeLabel(event.occurredAt)}}</time></div><p>{{event.description}}</p><div class="event-meta"><span class="status-chip" :class="effectiveStatus(event)">{{statusLabel(effectiveStatus(event))}}</span></div></div></div>
      </section>

      <section v-if="mobileSection==='home' || mobileSection==='family'" class="family-panel panel">
        <div class="section-heading"><div class="heading-title"><Users :size="22" /><h2>Personas autorizadas</h2></div><button class="text-action" @click="mobileSection='family'">Administrar <ChevronRight :size="17" /></button></div>
        <div class="family-members"><div class="family-person"><span class="person-avatar avatar-blue">W</span><strong>Willson</strong><small>Admin · demo</small></div><div class="family-person"><span class="person-avatar avatar-rose">M</span><strong>Mamá</strong><small>Puede ver · demo</small></div><div class="family-person"><span class="person-avatar avatar-green">C</span><strong>Carlos</strong><small>Puede ver · demo</small></div><div class="family-count"><Users :size="22" /><strong>3 personas</strong><small>de ejemplo</small></div></div>
        <p class="privacy-caption">Personas ilustrativas. La gestión real de usuarios y permisos aún no está implementada.</p>
      </section>

      <p class="disclaimer">Prototipo con datos ficticios. No ofrece monitoreo 24/7, no está conectado a dispositivos reales y no reemplaza servicios de emergencia.</p>
    </template>
  </main>

  <Transition name="modal-fade">
    <div v-if="selectedEvent" class="event-modal-backdrop" @click.self="selectedEvent=null">
      <section class="event-modal" role="dialog" aria-modal="true" aria-labelledby="event-modal-title">
        <div class="event-modal-header"><span class="event-modal-icon"><CircleAlert :size="23" /></span><button class="modal-close" aria-label="Cerrar detalles" @click="selectedEvent=null">×</button></div>
        <span class="event-kicker">DETALLE DEL EVENTO · DEMOSTRACIÓN</span>
        <h2 id="event-modal-title">{{selectedEvent.title}}</h2>
        <p class="modal-description">{{selectedEvent.description}}</p>
        <div class="event-detail-list"><div><span>Hora del evento</span><strong>{{timeLabel(selectedEvent.occurredAt)}}</strong></div><div><span>Dispositivo</span><strong>{{snapshot?.sensors.find(s=>s.id===selectedEvent.deviceId)?.name ?? 'Dispositivo de ejemplo'}}</strong></div><div><span>Estado</span><strong>{{statusLabel(effectiveStatus(selectedEvent))}}</strong></div><div><span>Video</span><strong>{{selectedEvent.clipAvailable?'Referencia de clip demo':'No hay video asociado'}}</strong></div></div>
        <div class="modal-info-note"><ShieldCheck :size="18" /><p>Evento ficticio. Confirmar recepción no significa que la situación esté resuelta ni que se haya enviado ayuda real.</p></div>
        <h3 class="share-title">Coordinar apoyo</h3><p class="share-copy">En el servicio final podrás avisar a personas autorizadas. Prueba el flujo visual; no se enviará ninguna notificación.</p>
        <div class="share-options"><button @click="shareDemo"><Users :size="17" /> Familia</button><button @click="shareDemo"><House :size="17" /> Grupo vecinal</button><button @click="shareDemo"><Store :size="17" /> Negocio</button></div>
        <div v-if="shareNotice" class="share-confirmation"><CheckCircle2 :size="17" /> Acción simulada. No se ha enviado una notificación real.</div>
        <div class="modal-footer"><button class="secondary-action" @click="selectedEvent=null">Cerrar</button><button v-if="effectiveStatus(selectedEvent)==='new'" class="primary-action" @click="acknowledge(selectedEvent)"><CheckCircle2 :size="17" /> Ya estoy revisando</button><button v-if="effectiveStatus(selectedEvent)!=='resolved'" class="primary-action" @click="resolveEvent(selectedEvent)"><CheckCircle2 :size="17" /> Marcar como resuelta</button></div>
      </section>
    </div>
  </Transition>
  <nav class="mobile-nav" aria-label="Navegación móvil">
    <button :class="{active:mobileSection==='home'}" @click="mobileSection='home'"><House :size="21" /><span>Inicio</span></button>
    <button :class="{active:mobileSection==='alerts'}" @click="mobileSection='alerts'"><Bell :size="21" /><span>Alertas</span><i v-if="newEvents.length" class="nav-alert-dot"></i></button>
    <button :class="{active:mobileSection==='history'}" @click="mobileSection='history'"><ClipboardList :size="21" /><span>Historial</span></button>
    <button :class="{active:mobileSection==='family'}" @click="mobileSection='family'"><Users :size="21" /><span>Familia</span></button>
  </nav>
</div>
</template>
