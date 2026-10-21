<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Activity, Bell, CheckCircle2, CircleAlert, House, ShieldCheck, Store, Users, WifiOff } from 'lucide-vue-next'
import type { DashboardSnapshot, EventStatus, SecurityEvent } from '@/types/security'
import { getDashboardSnapshot } from '@/services/securityService'
const snapshot = ref<DashboardSnapshot | null>(null)
const loading = ref(true)
const error = ref('')
const selectedArea = ref<'home' | 'business' | 'community'>('home')
const acknowledged = ref<string[]>([])
onMounted(async () => { try { snapshot.value = await getDashboardSnapshot() } catch (e) { error.value = e instanceof Error ? e.message : 'No se pudo cargar la demo.' } finally { loading.value = false } })
const activeEvents = computed(() => snapshot.value?.events.filter(e => effectiveStatus(e) !== 'resolved') ?? [])
const offlineSensors = computed(() => snapshot.value?.sensors.filter(s => s.status === 'offline').length ?? 0)
function effectiveStatus(event: SecurityEvent): EventStatus { return acknowledged.value.includes(event.id) && event.status === 'new' ? 'acknowledged' : event.status }
function acknowledge(event: SecurityEvent) { if (!acknowledged.value.includes(event.id)) acknowledged.value.push(event.id) }
function statusLabel(status: string) { return ({ armed:'Activo', disarmed:'Desactivado', offline:'Sin conexión', unknown:'Desconocido', new:'Nueva', acknowledged:'Recibida', resolved:'Resuelta' } as Record<string,string>)[status] ?? status }
function timeLabel(value: string) { return new Intl.DateTimeFormat('es-CL',{hour:'2-digit',minute:'2-digit'}).format(new Date(value)) }
</script>
<template>
<div class="app-shell">
  <aside class="sidebar"><div class="brand"><div class="brand-mark"><ShieldCheck :size="24"/></div><div><strong>Tu Guardia</strong><span>Inteligente</span></div></div><div class="workspace-label">ESPACIO DE DEMOSTRACIÓN</div>
    <nav class="nav-list" aria-label="Navegación principal"><button class="nav-item" :class="{active:selectedArea==='home'}" @click="selectedArea='home'"><House :size="18"/> Hogar</button><button class="nav-item" :class="{active:selectedArea==='business'}" @click="selectedArea='business'"><Store :size="18"/> Negocio <span class="soon">Demo</span></button><button class="nav-item" :class="{active:selectedArea==='community'}" @click="selectedArea='community'"><Users :size="18"/> Comunidad <span class="soon">Demo</span></button></nav>
    <div class="sidebar-note"><ShieldCheck :size="18"/><p><strong>Privacidad primero</strong><br/>Tus cámaras y grabaciones son privadas por defecto.</p></div><div class="sidebar-footer">Prototipo v0.1 · Sin conexión a dispositivos</div>
  </aside>
  <main class="main-content"><header class="topbar"><div><p class="eyebrow">CENTRO DE SEGURIDAD</p><h1>{{ selectedArea==='home'?'Resumen del hogar':selectedArea==='business'?'Espacio de negocio':'Red comunitaria' }}</h1></div><div class="top-actions"><span class="demo-pill">● MODO DEMOSTRACIÓN</span><button class="avatar" aria-label="Perfil de demostración">TG</button></div></header>
    <div v-if="selectedArea!=='home'" class="notice-panel"><Users :size="22"/><div><strong>{{selectedArea==='business'?'Módulo de negocio en diseño':'Módulo comunidad en diseño'}}</strong><p>Esta sección está reservada para una etapa posterior. No hay grupos ni dispositivos reales conectados.</p></div></div>
    <div v-if="loading" class="loading-card">Cargando datos de demostración…</div><div v-else-if="error" class="error-card"><CircleAlert :size="20"/><span>{{error}}</span></div>
    <template v-else-if="snapshot && selectedArea==='home'">
      <section class="privacy-banner"><div class="privacy-icon"><ShieldCheck :size="23"/></div><div><strong>Tu hogar es privado</strong><p>Solo tú y las personas autorizadas pueden acceder a los eventos de este espacio.</p></div><span class="privacy-lock">Privado por defecto</span></section>
      <section class="stats-grid"><article class="stat-card"><div class="stat-top"><span>Sensores registrados</span><Activity :size="18"/></div><strong class="stat-number">{{snapshot.sensors.length}}</strong><span class="stat-foot">Datos de ejemplo</span></article><article class="stat-card"><div class="stat-top"><span>Eventos pendientes</span><Bell :size="18"/></div><strong class="stat-number">{{activeEvents.length}}</strong><span class="stat-foot">Requieren revisión</span></article><article class="stat-card"><div class="stat-top"><span>Dispositivos sin conexión</span><WifiOff :size="18"/></div><strong class="stat-number">{{offlineSensors}}</strong><span class="stat-foot">Según datos simulados</span></article></section>
      <section class="content-grid"><article class="panel"><div class="panel-heading"><div><h2>Estado de sensores</h2><p>Estado ilustrativo; no son lecturas reales.</p></div><span class="tiny-tag">{{snapshot.sensors.length}} dispositivos</span></div><div v-for="sensor in snapshot.sensors" :key="sensor.id" class="sensor-row"><div class="sensor-icon"><Activity :size="19"/></div><div class="sensor-info"><strong>{{sensor.name}}</strong><span>{{sensor.locationLabel}}</span></div><span class="status-chip" :class="sensor.status">{{statusLabel(sensor.status)}}</span></div><div class="panel-bottom">Los estados reales dependerán de la integración del dispositivo.</div></article>
      <article class="panel"><div class="panel-heading"><div><h2>Actividad reciente</h2><p>Eventos de muestra para probar el flujo.</p></div><span class="tiny-tag">{{snapshot.events.length}} eventos</span></div><div v-for="event in snapshot.events" :key="event.id" class="event-row"><div class="event-symbol" :class="effectiveStatus(event)"><CircleAlert v-if="effectiveStatus(event)==='new'" :size="18"/><CheckCircle2 v-else :size="18"/></div><div class="event-copy"><div class="event-title-line"><strong>{{event.title}}</strong><time>{{timeLabel(event.occurredAt)}}</time></div><p>{{event.description}}</p><div class="event-meta"><span class="status-chip" :class="effectiveStatus(event)">{{statusLabel(effectiveStatus(event))}}</span><span v-if="event.clipAvailable" class="clip-label">Clip de ejemplo disponible</span><span v-else class="clip-label muted">Sin clip vinculado</span></div><button v-if="event.status==='new' && !acknowledged.includes(event.id)" class="ack-button" @click="acknowledge(event)">Marcar como recibida</button></div></div></article></section>
      <p class="disclaimer">Prototipo de interfaz con datos ficticios. No supervisa una propiedad real, no envía alertas y no está conectado a cámaras ni sensores.</p>
    </template>
  </main>
</div>
</template>
