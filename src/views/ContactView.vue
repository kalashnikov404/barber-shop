<template>
  <div class="min-h-screen py-12">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center mb-12">
        <div class="section-tag mb-3">— Visítanos</div>
        <h1 class="font-display text-5xl text-chalk">CONTACTO</h1>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <!-- Info -->
        <div class="space-y-6">
          <div class="card-dark p-6 flex items-start gap-4">
            <span class="text-3xl">📍</span>
            <div>
              <h3 class="font-display text-chalk tracking-wide mb-1">UBICACIÓN</h3>
              <p class="text-silver text-sm font-body">Av. Insurgentes Sur 1234, Col. Roma Norte<br>Ciudad de México, CDMX, 06700</p>
            </div>
          </div>
          <div class="card-dark p-6 flex items-start gap-4">
            <span class="text-3xl">⏰</span>
            <div>
              <h3 class="font-display text-chalk tracking-wide mb-1">HORARIOS</h3>
              <div class="text-silver text-sm font-body space-y-1">
                <div class="flex justify-between gap-8"><span>Lunes – Viernes</span><span class="text-gold-400">9:00 – 20:00</span></div>
                <div class="flex justify-between gap-8"><span>Sábado</span><span class="text-gold-400">9:00 – 20:00</span></div>
                <div class="flex justify-between gap-8"><span>Domingo</span><span class="text-gold-400">10:00 – 17:00</span></div>
              </div>
            </div>
          </div>
          <div class="card-dark p-6 flex items-start gap-4">
            <span class="text-3xl">📞</span>
            <div>
              <h3 class="font-display text-chalk tracking-wide mb-1">TELÉFONO Y WHATSAPP</h3>
              <p class="text-silver text-sm font-body">+52 55 1234 5678</p>
            </div>
          </div>
          <div class="card-dark p-6 flex items-start gap-4">
            <span class="text-3xl">✉️</span>
            <div>
              <h3 class="font-display text-chalk tracking-wide mb-1">CORREO</h3>
              <p class="text-silver text-sm font-body">hola@barberkalashnikov.mx</p>
            </div>
          </div>
          <div class="flex gap-3">
            <a v-for="s in social" :key="s.label" class="w-12 h-12 flex items-center justify-center border border-smoke hover:border-gold-700 text-silver hover:text-gold-400 transition-colors text-xl">{{ s.icon }}</a>
          </div>
        </div>

        <!-- Map placeholder + form -->
        <div class="space-y-6">
          <div class="card-dark h-64 flex items-center justify-center text-center p-6">
            <div>
              <div class="text-5xl mb-3">🗺️</div>
              <p class="text-silver text-sm font-body">Mapa interactivo<br>Av. Insurgentes Sur 1234, CDMX</p>
            </div>
          </div>

          <div class="card-dark p-6">
            <h3 class="font-display text-chalk tracking-wide mb-4">ENVÍANOS UN MENSAJE</h3>
            <div class="space-y-3">
              <input v-model="form.name" class="input-dark" placeholder="Nombre" />
              <input v-model="form.email" class="input-dark" placeholder="Correo electrónico" type="email" />
              <input v-model="form.phone" class="input-dark" placeholder="Teléfono" type="tel" />
              <textarea v-model="form.message" class="input-dark resize-none" rows="4" placeholder="Tu mensaje"></textarea>
              <button @click="send" class="btn-gold w-full py-3 text-xs"><span>ENVIAR MENSAJE</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
const toast = useToast()
const form = ref({ name:'', email:'', phone:'', message:'' })
const social = [{icon:'📷',label:'Instagram'},{icon:'📘',label:'Facebook'},{icon:'🎵',label:'TikTok'},{icon:'💬',label:'WhatsApp'}]
function send() {
  toast.success('¡Mensaje enviado! Te responderemos pronto ✂️')
  form.value = { name:'', email:'', phone:'', message:'' }
}
</script>
