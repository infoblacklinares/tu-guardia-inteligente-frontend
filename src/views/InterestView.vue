<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowLeft, CheckCircle2, Send, ShieldCheck } from 'lucide-vue-next'
import { RouterLink, useRoute } from 'vue-router'
const route = useRoute()
const plans = ['Guardia Hogar','Guardia Familia','Guardia Negocio','Quiero orientación']
const selectedPlan = ref(typeof route.query.plan === 'string' && plans.includes(route.query.plan) ? route.query.plan : 'Quiero orientación')
const fullName = ref('')
const email = ref('')
const contact = ref('')
const useCase = ref('hogar')
const consent = ref(false)
const submitted = ref(false)
const formError = ref('')
const canSubmit = computed(() => fullName.value.trim().length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()) && consent.value)
function submitDemo() {
  if (!canSubmit.value) { formError.value = 'Completa tu nombre, un correo válido y acepta que usemos estos datos para contactarte cuando exista un canal habilitado.'; return }
  formError.value = ''
  submitted.value = true
}
</script>
<template>
<main class="public-site"><header class="public-header"><RouterLink to="/" class="public-brand"><span class="public-brand-mark"><ShieldCheck :size="22" /></span><span>Tu Guardia <b>Inteligente</b></span></RouterLink><nav class="public-nav"><RouterLink to="/planes">Planes</RouterLink><RouterLink to="/como-funciona">Cómo funciona</RouterLink></nav></header>
<section class="lead-layout">
  <div class="lead-copy"><span class="public-eyebrow">CONVERSEMOS SOBRE LO QUE NECESITAS</span><h1>Cuéntanos qué quieres proteger.</h1><p>Estamos validando el servicio y su compatibilidad técnica. Esta pantalla permite probar el flujo de interés, pero aún no envía ni guarda solicitudes.</p><div class="lead-assurance"><CheckCircle2 :size="18" /><span>Sin compromiso de compra.</span></div><div class="lead-assurance"><ShieldCheck :size="18" /><span>Los espacios y eventos deben ser privados por defecto.</span></div></div>
  <section class="lead-card">
    <div v-if="!submitted">
      <h2>Solicitar información</h2><p class="lead-intro">Déjanos los datos mínimos para saber qué experiencia te interesa.</p>
      <form @submit.prevent="submitDemo" novalidate>
        <label for="lead-name">Nombre</label><input id="lead-name" v-model="fullName" autocomplete="name" placeholder="Tu nombre" required />
        <label for="lead-email">Correo electrónico</label><input id="lead-email" v-model="email" type="email" autocomplete="email" placeholder="tu@correo.cl" required />
        <label for="lead-contact">Teléfono (opcional)</label><input id="lead-contact" v-model="contact" autocomplete="tel" inputmode="tel" placeholder="+56 9..." />
        <label for="lead-plan">¿Qué te interesa?</label><select id="lead-plan" v-model="selectedPlan"><option v-for="plan in plans" :key="plan">{{plan}}</option></select>
        <label for="lead-use">¿Para quién sería?</label><select id="lead-use" v-model="useCase"><option value="hogar">Mi hogar</option><option value="familia">Mi familia</option><option value="negocio">Mi negocio</option><option value="comunidad">Un grupo de vecinos</option></select>
        <label class="lead-consent"><input v-model="consent" type="checkbox" required /><span>Acepto que me contacten cuando exista un canal habilitado para responder esta solicitud.</span></label>
        <p v-if="formError" class="lead-error" role="alert">{{formError}}</p>
        <button class="public-primary lead-submit" type="submit">Probar formulario <Send :size="16" /></button>
      </form>
      <p class="lead-demo-note">DEMO: no se envía ni almacena información. No uses datos sensibles.</p>
    </div>
    <div v-else class="lead-success" role="status"><span><CheckCircle2 :size="30" /></span><h2>Flujo de formulario completado</h2><p>Los campos se validaron correctamente. Esta es solo una prueba visual: la solicitud no fue enviada ni guardada porque todavía falta conectar el backend.</p><button class="public-secondary" @click="submitted=false">Volver al formulario</button><RouterLink to="/" class="lead-back"><ArrowLeft :size="15" /> Volver al inicio</RouterLink></div>
  </section>
</section>
<footer class="public-footer"><RouterLink to="/" class="public-brand"><span class="public-brand-mark"><ShieldCheck :size="19" /></span><span>Tu Guardia <b>Inteligente</b></span></RouterLink><div><RouterLink to="/planes">Planes</RouterLink><RouterLink to="/como-funciona">Cómo funciona</RouterLink><RouterLink to="/privacidad">Privacidad</RouterLink></div><small>Formulario de demostración · No se envían datos.</small></footer>
</main>
</template>