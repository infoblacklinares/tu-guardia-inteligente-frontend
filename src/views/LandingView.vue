<script setup lang="ts">
import { ArrowRight, BellRing, CheckCircle2, ChevronRight, Clock3, LockKeyhole, ShieldCheck, Users, Wifi } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
const steps = [
  { number: '01', title: 'Detectamos un evento', text: 'Sensores y dispositivos compatibles informan situaciones relevantes.' },
  { number: '02', title: 'Recibes una alerta clara', text: 'Qué ocurrió, dónde y cuándo, sin tener que mirar cámaras todo el día.' },
  { number: '03', title: 'Confirmas y coordinas', text: 'Tú o una persona autorizada puede hacerse cargo y pedir apoyo.' },
]
const benefits = [
  { icon: BellRing, title: 'Alertas con contexto', text: 'Eventos organizados para que sepas qué revisar primero.' },
  { icon: Users, title: 'Personas de confianza', text: 'Pensado para coordinar familia y, en futuras etapas, grupos vecinales o negocios.' },
  { icon: LockKeyhole, title: 'Privacidad primero', text: 'Los espacios son privados por defecto. Compartir información debe ser una decisión explícita.' },
]
</script>

<template>
<main class="public-site">
  <header class="public-header">
    <RouterLink to="/" class="public-brand"><span class="public-brand-mark"><ShieldCheck :size="22" /></span><span>Tu Guardia <b>Inteligente</b></span></RouterLink>
    <nav class="public-nav"><RouterLink to="/como-funciona">Cómo funciona</RouterLink><RouterLink to="/planes">Planes</RouterLink><RouterLink to="/app" class="public-nav-cta">Ver demostración <ArrowRight :size="15" /></RouterLink></nav>
  </header>
  <section class="landing-hero">
    <div class="landing-copy">
      <span class="public-eyebrow"><span></span> SEGURIDAD CONECTADA A TU VIDA</span>
      <h1>Tu seguridad no debería depender de <em>mirar una pantalla.</em></h1>
      <p>Tu Guardia Inteligente organiza las alertas de tus dispositivos compatibles para que puedas entender qué ocurrió, confirmar que alguien se hizo cargo y coordinar apoyo con personas de confianza.</p>
      <div class="landing-actions"><RouterLink to="/app" class="public-primary">Explorar demostración <ArrowRight :size="17" /></RouterLink><RouterLink to="/como-funciona" class="public-secondary">Conocer cómo funciona</RouterLink></div>
      <div class="landing-trust"><span><CheckCircle2 :size="16" /> Alertas y eventos organizados</span><span><LockKeyhole :size="16" /> Privacidad por defecto</span></div>
    </div>
    <div class="hero-visual">
      <div class="visual-top"><span><span class="online-dot"></span> RESUMEN DEL HOGAR</span><span class="visual-demo">DEMO</span></div>
      <div class="visual-status"><div class="visual-shield"><ShieldCheck :size="28" /></div><div><strong>Tu Guardia está contigo</strong><span>Ejemplo de experiencia, no un estado real</span></div></div>
      <div class="visual-alert"><div class="visual-alert-icon"><BellRing :size="21" /></div><div class="visual-alert-copy"><small>EVENTO DE EJEMPLO · 02:17</small><strong>Se detectó apertura de ventana</strong><span>Dormitorio · Sensor compatible</span></div><span class="visual-alert-tag">Revisar</span></div>
      <div class="visual-timeline"><span class="timeline-line"></span><div class="timeline-item"><i></i><span><b>Alerta generada</b><small>Evento recibido por el sistema</small></span><time>02:17</time></div><div class="timeline-item"><i class="timeline-green"></i><span><b>Confirmación pendiente</b><small>Una persona autorizada puede responder</small></span></div></div>
      <p class="visual-note">Interfaz ilustrativa con datos ficticios. No hay dispositivos conectados.</p>
    </div>
  </section>
  <section class="public-proof"><div><strong>Detectar</strong><span>Eventos relevantes</span></div><div><strong>Entender</strong><span>Información clara</span></div><div><strong>Coordinar</strong><span>Personas autorizadas</span></div><div><strong>Registrar</strong><span>Historial de acciones</span></div></section>
  <section class="public-section">
    <div class="section-intro"><span class="public-eyebrow">MÁS QUE UNA NOTIFICACIÓN</span><h2>Información útil. Acciones claras.</h2><p>Diseñado para que una alerta tenga un siguiente paso comprensible.</p></div>
    <div class="benefit-grid"><article v-for="benefit in benefits" :key="benefit.title" class="benefit-card"><div class="benefit-icon"><component :is="benefit.icon" :size="23" /></div><h3>{{benefit.title}}</h3><p>{{benefit.text}}</p></article></div>
  </section>
  <section class="public-section how-section">
    <div class="section-intro"><span class="public-eyebrow">ASÍ FUNCIONA</span><h2>De un evento a una respuesta organizada.</h2></div>
    <div class="steps-grid"><article v-for="step in steps" :key="step.number" class="step-card"><span>{{step.number}}</span><h3>{{step.title}}</h3><p>{{step.text}}</p></article></div>
    <div class="privacy-callout"><LockKeyhole :size="23" /><div><strong>Tus espacios son privados por defecto.</strong><p>La coordinación con familiares, vecinos o negocios requiere grupos y permisos definidos. No se publican cámaras ni videos automáticamente.</p></div></div>
  </section>
  <section class="landing-bottom-cta"><div><span class="public-eyebrow">CONOCE LA EXPERIENCIA</span><h2>Explora cómo se organiza una alerta.</h2><p>Prueba el flujo de demostración con eventos ficticios antes de decidir si encaja con lo que necesitas.</p></div><RouterLink to="/app" class="public-primary">Abrir demostración <ArrowRight :size="17" /></RouterLink></section>
  <footer class="public-footer"><RouterLink to="/" class="public-brand"><span class="public-brand-mark"><ShieldCheck :size="19" /></span><span>Tu Guardia <b>Inteligente</b></span></RouterLink><div><RouterLink to="/planes">Planes</RouterLink><RouterLink to="/como-funciona">Cómo funciona</RouterLink><RouterLink to="/privacidad">Privacidad</RouterLink></div><small>Prototipo en desarrollo · Las funciones finales dependerán de las integraciones compatibles.</small></footer>
</main>
</template>
