<template>
  <div class="min-h-screen py-12">
    <div class="max-w-4xl mx-auto px-4">
      <div class="flex items-center justify-between mb-10">
        <div>
          <div class="section-tag mb-3">— Tu Historial</div>
          <h1 class="font-display text-4xl text-chalk">MIS <span class="text-gold-gradient">CITAS</span></h1>
        </div>
        <router-link to="/reservar" class="btn-gold text-xs px-6 py-3"><span>+ NUEVA CITA</span></router-link>
      </div>

      <!-- Tabs -->
      <div class="flex gap-2 mb-8">
        <button @click="tab='upcoming'" class="px-5 py-2.5 text-xs font-display tracking-widest uppercase transition-all" :class="tab==='upcoming' ? 'bg-gold-500 text-ink' : 'border border-smoke text-silver'">PRÓXIMAS</button>
        <button @click="tab='past'" class="px-5 py-2.5 text-xs font-display tracking-widest uppercase transition-all" :class="tab==='past' ? 'bg-gold-500 text-ink' : 'border border-smoke text-silver'">HISTORIAL</button>
      </div>

      <div class="space-y-4">
        <div v-for="apt in filteredAppointments" :key="apt.id" class="card-dark p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
          <div class="w-16 h-16 flex items-center justify-center text-3xl flex-shrink-0" style="background:#1A1A1A;border:1px solid #2C2C2C">{{ apt.icon }}</div>
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <span :class="statusBadge(apt.status)">{{ statusLabel(apt.status) }}</span>
            </div>
            <h3 class="font-display text-lg text-chalk">{{ apt.services.join(' + ') }}</h3>
            <p class="text-silver text-sm font-body">💈 {{ apt.barber }} · 📅 {{ apt.date }} · 🕐 {{ apt.time }}</p>
          </div>
          <div class="text-right flex-shrink-0">
            <div class="font-display text-xl text-gold-400">${{ apt.price }} MXN</div>
            <div class="text-silver text-xs">{{ apt.payment === 'cash' ? '💵 Efectivo' : '✅ Pagado' }}</div>
          </div>
          <button v-if="tab==='upcoming' && apt.status!=='cancelled'" @click="cancel(apt)" class="btn-outline-gold text-xs px-4 py-2 flex-shrink-0">Cancelar</button>
        </div>

        <div v-if="filteredAppointments.length === 0" class="text-center py-20">
          <div class="text-5xl mb-4">📅</div>
          <p class="text-silver font-body mb-6">{{ tab==='upcoming' ? 'No tienes citas próximas' : 'Aún no tienes historial' }}</p>
          <router-link to="/reservar" class="btn-gold px-8 py-3 text-xs"><span>RESERVAR MI PRIMERA CITA</span></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const tab = ref('upcoming')

const demoAppointments = ref([
  { id:1, icon:'💈', services:['Skin Fade','Arreglo de Barba'], barber:'Aleksei Volkov', date:'20 jun 2026', time:'14:00', price:320, payment:'online', status:'confirmed', type:'upcoming' },
  { id:2, icon:'✂️', services:['Corte Clásico'], barber:'Ivan Petrov', date:'25 jun 2026', time:'11:30', price:150, payment:'cash', status:'pending_payment', type:'upcoming' },
  { id:3, icon:'👑', services:['Paquete VIP'], barber:'Aleksei Volkov', date:'2 may 2026', time:'16:00', price:550, payment:'online', status:'completed', type:'past' },
  { id:4, icon:'🪒', services:['Afeitado Clásico'], barber:'Dmitri Morozov', date:'15 abr 2026', time:'10:00', price:150, payment:'cash', status:'completed', type:'past' },
])

const filteredAppointments = computed(() => demoAppointments.value.filter(a => a.type === tab.value))

function statusBadge(s) { return { confirmed:'badge-gold', pending_payment:'badge-blood', completed:'badge-gold', cancelled:'badge-blood' }[s] }
function statusLabel(s) { return { confirmed:'✓ Confirmada', pending_payment:'⏳ Pendiente de pago', completed:'✓ Completada', cancelled:'✗ Cancelada' }[s] }

function cancel(apt) {
  apt.status = 'cancelled'
  toast.info('Cita cancelada')
}
</script>
