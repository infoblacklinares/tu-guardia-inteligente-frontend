<script setup lang="ts">
import { ArrowRight, BellRing, CheckCircle2, ClipboardList, LockKeyhole, ShieldCheck, Users, Wifi } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
const flow=[
 {n:'01',title:'Se detecta un evento',text:'Un sensor o dispositivo compatible informa una actividad. La app distingue la hora, el dispositivo y el estado reportado.'},
 {n:'02',title:'La alerta explica qué pasó',text:'Recibes un resumen comprensible. Si no existe video compatible, el evento sigue visible con la información disponible.'},
 {n:'03',title:'Alguien confirma recepción',text:'Una persona autorizada puede indicar que está revisando el evento. Recibir una alerta no significa que la situación esté resuelta.'},
 {n:'04',title:'Se coordina apoyo si hace falta',text:'Según las reglas configuradas, se puede avisar a otro familiar o compartir una alerta con un grupo autorizado.'},
 {n:'05',title:'Queda un registro',text:'El historial ayuda a entender qué ocurrió y quién confirmó o cerró el evento.'},
]
</script>
<template><main class="public-site"><header class="public-header"><RouterLink to="/" class="public-brand"><span class="public-brand-mark"><ShieldCheck :size="22" /></span><span>Tu Guardia <b>Inteligente</b></span></RouterLink><nav class="public-nav"><RouterLink to="/como-funciona" class="nav-current">Cómo funciona</RouterLink><RouterLink to="/planes">Planes</RouterLink><RouterLink to="/app" class="public-nav-cta">Ver demostración <ArrowRight :size="15" /></RouterLink></nav></header>
<section class="plans-hero"><span class="public-eyebrow">DEL EVENTO A LA COORDINACIÓN</span><h1>No se trata de mirar cámaras todo el día.</h1><p>Tu Guardia Inteligente está pensado para ayudarte a entender eventos relevantes, confirmar quién se hace cargo y coordinar a personas autorizadas.</p></section>
<section class="flow-list"><article v-for="step in flow" :key="step.n" class="flow-step"><span class="flow-number">{{step.n}}</span><div><h2>{{step.title}}</h2><p>{{step.text}}</p></div></article></section>
<section class="plans-disclaimer"><LockKeyhole :size="22" /><div><strong>Privacidad y límites claros</strong><p>Los espacios son privados por defecto. No se comparte video automáticamente. Las notificaciones reales, los tiempos de escalamiento y las integraciones deberán probarse antes de ofrecerlos como funciones disponibles.</p></div></section>
<section class="landing-bottom-cta"><div><span class="public-eyebrow">PRUÉBALO</span><h2>Explora el flujo de alertas.</h2><p>La demostración usa datos ficticios y no está conectada a dispositivos.</p></div><RouterLink to="/app" class="public-primary">Abrir demostración <ArrowRight :size="17" /></RouterLink></section>
<footer class="public-footer"><RouterLink to="/" class="public-brand"><span class="public-brand-mark"><ShieldCheck :size="19" /></span><span>Tu Guardia <b>Inteligente</b></span></RouterLink><div><RouterLink to="/planes">Planes</RouterLink><RouterLink to="/como-funciona">Cómo funciona</RouterLink><RouterLink to="/privacidad">Privacidad</RouterLink></div><small>Prototipo en desarrollo · Sin monitoreo humano 24/7.</small></footer></main></template>