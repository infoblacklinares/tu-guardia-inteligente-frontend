<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Activity, Bell, Camera, CheckCircle2, ChevronDown, ChevronRight, CircleAlert, ClipboardList, House, Play, Plus, Settings, ShieldCheck, Store, Users, Wifi } from 'lucide-vue-next'
import type { DashboardSnapshot, EventStatus, SecurityEvent } from '@/types/security'
import { getDashboardSnapshot } from '@/services/securityService'

const snapshot = ref<DashboardSnapshot | null>(null)
const loading = ref(true)
const error = ref('')
const selectedArea = ref<'home' | 'business' | 'community'>('home')
const acknowledged = ref<string[]>([])
const mobileSection = ref<'home' | 'cameras' | 'events' | 'family'>('home')

onMounted(async () => {
  try { snapshot.value = await getDashboardSnapshot() }
  catch (e) { error.value = e instanceof Error ? e.message : 'No se pudo cargar la demo.' }
  finally { loading.value = false }
})

const activeEvents = computed(() => snapshot.value?.events.filter(e => effectiveStatus(e) !== 'resolved') ?? [])
const offlineSensors = computed(() => snapshot.value?.sensors.filter(s => s.status === 'offline').length ?? 0)
const highlightedEvent = computed(() => snapshot.value?.events.find(e => effectiveStatus(e) === 'new') ?? snapshot.value?.events[0])
function effectiveStatus(event: SecurityEvent): EventStatus { return acknowledged.value.includes(event.id) && event.status === 'new' ? 'acknowledged' : event.status }
function acknowledge(event: SecurityEvent) { if (!acknowledged.value.includes(event.id)) acknowledged.value.push(event.id) }
function statusLabel(status: string) { return ({ armed:'Activo', disarmed:'Desactivado', offline:'Sin conexión', unknown:'Desconocido', new:'Nueva', acknowledged:'Recibida', resolved:'Resuelta' } as Record<string,string>)[status] ?? status }
function timeLabel(value: string) { return new Intl.DateTimeFormat('es-CL',{hour:'2-digit',minute:'2-digit'}).format(new Date(value)) }
function selectArea(area: 'home' | 'business' | 'community') { selectedArea.value = area; mobileSection.value = 'home' }
</script>

<template>
<div class="app-shell mobile-first-shell">
  <aside class="sidebar">
    <div class="brand"><div class="brand-mark"><ShieldCheck :size="24" /></div><div><strong>Tu Guardia</strong><span>Inteligente</span></div></div>
    <div class="workspace-label">ESPACIO DE DEMOSTRACIÓN</div>
    <nav class="nav-list" aria-label="Navegación principal">
      <button class="nav-item" :class="{active:selectedArea==='home'}" @click="selectArea('home')"><House :size="18" /> Hogar</button>
      <button class="nav-item" :class="{active:selectedArea==='business'}" @click="selectArea('business')"><Store :size="18" /> Negocio <span class="soon">Demo</span></button>
      <button class="nav-item" :class="{active:selectedArea==='community'}" @click="selectArea('community')"><Users :size="18" /> Comunidad <span class="soon">Demo</span></button>
    </nav>
    <div class="sidebar-note"><ShieldCheck :size="18" /><p><strong>Privacidad primero</strong><br />Tus cámaras y grabaciones son privadas por defecto.</p></div>
    <div class="sidebar-footer">Prototipo · Datos simulados</div>
  </aside>

  <main class="main-content mobile-first-content">
    <header class="topbar mobile-hero">
      <div class="greeting"><p class="eyebrow desktop-eyebrow">CENTRO DE SEGURIDAD</p><h1>{{ selectedArea==='home'?'Buenos días, Willson':selectedArea==='business'?'Espacio de negocio':'Red comunitaria' }}</h1><p class="welcome-subtitle">Tu hogar, más seguro hoy</p></div>
      <div class="top-actions"><span class="demo-pill"><span class="demo-dot"></span> MODO DEMOSTRACIÓN</span><button class="icon-button notification-button" aria-label="Notificaciones"><Bell :size="21" /><i></i></button><button class="settings-button" aria-label="Configuración"><Settings :size="22" /></button><button class="avatar" aria-label="Perfil de demostración">TG</button></div>
    </header>

    <div v-if="selectedArea!=='home'" class="notice-panel"><Users :size="22" /><div><strong>{{selectedArea==='business'?'Módulo de negocio en diseño':'Módulo comunidad en diseño'}}</strong><p>Esta sección se habilitará en una etapa posterior. No hay dispositivos reales conectados.</p></div></div>
    <div v-if="loading" class="loading-card">Cargando datos de demostración…</div>
    <div v-else-if="error" class="error-card"><CircleAlert :size="20" /><span>{{error}}</span></div>

    <template v-else-if="snapshot && selectedArea==='home'">
      <div class="home-status-row">
        <section class="home-selector"><div class="home-selector-icon"><House :size="22" /></div><div class="home-selector-copy"><strong>Mi casa <span>· Linares</span></strong><small>Espacio privado</small></div><ChevronDown :size="18" class="selector-chevron" /></section>
        <section class="protection-status" :class="offlineSensors ? 'needs-attention' : ''"><ShieldCheck :size="27" /><div><strong>{{offlineSensors ? 'REVISAR DISPOSITIVOS' : 'CASA PROTEGIDA'}}</strong><span>{{offlineSensors ? offlineSensors+' sensor(es) sin conexión' : 'Estado de demostración'}}</span></div></section>
      </div>

      <section v-if="mobileSection==='home' || mobileSection==='cameras'" class="camera-section panel">
        <div class="section-heading"><div class="heading-title"><Camera :size="22" /><h2>Cámaras</h2></div><button class="text-action" @click="mobileSection='cameras'">Ver todas ({{snapshot.sensors.length}}) <ChevronRight :size="17" /></button></div>
        <div class="camera-placeholder"><div class="camera-scene"><span class="camera-live-tag"><i></i> VISTA DE DEMO</span><div class="camera-scene-caption"><strong>Entrada principal</strong><span>Mi casa · Linares</span></div><span class="camera-scene-play"><Play :size="17" /> Vista ilustrativa</span></div><p class="camera-disclaimer">Imagen decorativa de demostración. No hay cámaras conectadas ni vídeo en directo.</p></div>
      </section>

      <section v-if="highlightedEvent && (mobileSection==='home' || mobileSection==='events')" class="alert-feature">
        <div class="alert-topline"><div class="alert-heading-icon"><CircleAlert :size="25" /></div><div class="alert-heading-copy"><span class="eyebrow">ALERTA DE DEMOSTRACIÓN</span><h2>{{ highlightedEvent.title }}</h2></div><span class="alert-badge">{{statusLabel(effectiveStatus(highlightedEvent))}}</span></div>
        <p class="alert-description">{{highlightedEvent.description}}</p>
        <div class="alert-event-footer"><div class="event-time"><span>Evento de ejemplo · {{timeLabel(highlightedEvent.occurredAt)}}</span><strong>{{highlightedEvent.clipAvailable ? 'Clip de ejemplo disponible' : 'Sin vídeo vinculado'}}</strong></div></div>
        <button v-if="highlightedEvent.status==='new' && !acknowledged.includes(highlightedEvent.id)" class="primary-action" @click="acknowledge(highlightedEvent)"><Play :size="17" /> Revisar evento <ChevronRight :size="19" /></button>
        <div v-else class="acknowledged-note"><CheckCircle2 :size="17" /> Evento recibido en esta sesión de demostración</div>
      </section>

      <section v-if="mobileSection==='home' || mobileSection==='family'" class="family-panel panel">
        <div class="section-heading"><div class="heading-title"><Users :size="22" /><h2>Tu familia</h2></div><button class="text-action" @click="mobileSection='family'">Administrar <ChevronRight :size="17" /></button></div>
        <div class="family-members">
          <div class="family-person"><span class="person-avatar avatar-blue">W</span><strong>Willson</strong><small>Admin · demo</small></div>
          <div class="family-person"><span class="person-avatar avatar-rose">M</span><strong>Mamá</strong><small>Puede ver · demo</small></div>
          <div class="family-person"><span class="person-avatar avatar-green">C</span><strong>Carlos</strong><small>Puede ver · demo</small></div>
          <button class="add-person" @click="mobileSection='family'"><Plus :size="23" /><span>Agregar</span><small>Familiar</small></button>
        </div>
        <p class="privacy-caption">Personas ilustrativas. La gestión real de usuarios y permisos aún no está implementada.</p>
      </section>

      <button v-if="mobileSection==='home'" class="sensor-summary panel" @click="mobileSection='events'"><span class="sensor-summary-icon" :class="offlineSensors ? 'offline' : ''"><Wifi :size="23" /></span><span class="sensor-summary-copy"><strong>Sensores conectados</strong><span>{{snapshot.sensors.length - offlineSensors}} de {{snapshot.sensors.length}} activos · Estado simulado</span></span><ChevronRight :size="21" class="sensor-summary-chevron" /></button>

      <section v-if="mobileSection==='home' || mobileSection==='events'" class="details-grid">
        <article class="panel sensor-panel"><div class="panel-heading"><div><h2>Estado de sensores</h2><p>Datos de ejemplo, no lecturas reales.</p></div><span class="tiny-tag">{{snapshot.sensors.length}} dispositivos</span></div><div v-for="sensor in snapshot.sensors" :key="sensor.id" class="sensor-row"><div class="sensor-icon"><Activity :size="19" /></div><div class="sensor-info"><strong>{{sensor.name}}</strong><span>{{sensor.locationLabel}}</span></div><span class="status-chip" :class="sensor.status">{{statusLabel(sensor.status)}}</span></div></article>
        <article class="panel activity-panel"><div class="panel-heading"><div><h2>Actividad reciente</h2><p>Eventos de muestra para probar el flujo.</p></div><span class="tiny-tag">{{snapshot.events.length}} eventos</span></div><div v-for="event in snapshot.events" :key="event.id" class="event-row"><div class="event-symbol" :class="effectiveStatus(event)"><CircleAlert v-if="effectiveStatus(event)==='new'" :size="18" /><CheckCircle2 v-else :size="18" /></div><div class="event-copy"><div class="event-title-line"><strong>{{event.title}}</strong><time>{{timeLabel(event.occurredAt)}}</time></div><p>{{event.description}}</p><div class="event-meta"><span class="status-chip" :class="effectiveStatus(event)">{{statusLabel(effectiveStatus(event))}}</span><span v-if="event.clipAvailable" class="clip-label">Clip de ejemplo</span><span v-else class="clip-label muted">Sin clip vinculado</span></div><button v-if="event.status==='new' && !acknowledged.includes(event.id)" class="ack-button" @click="acknowledge(event)">Marcar como recibida</button></div></div></article>
      </section>
      <p class="disclaimer">Prototipo con datos ficticios. No supervisa propiedades ni está conectado a cámaras o sensores reales.</p>
    </template>
  </main>
  <nav class="mobile-nav" aria-label="Navegación móvil"><button :class="{active:mobileSection==='home'}" @click="mobileSection='home'"><House :size="21" /><span>Inicio</span></button><button :class="{active:mobileSection==='cameras'}" @click="mobileSection='cameras'"><Camera :size="21" /><span>Cámaras</span></button><button :class="{active:mobileSection==='events'}" @click="mobileSection='events'"><ClipboardList :size="21" /><span>Eventos</span><i v-if="activeEvents.length" class="nav-alert-dot"></i></button><button :class="{active:mobileSection==='family'}" @click="mobileSection='family'"><Users :size="21" /><span>Familia</span></button></nav>
</div>
</template>
