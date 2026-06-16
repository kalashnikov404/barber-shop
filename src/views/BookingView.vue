<template>
  <div class="min-h-screen py-12">
    <div class="max-w-5xl mx-auto px-4">

      <!-- Header -->
      <div class="text-center mb-12">
        <div class="section-tag mb-3">— Agenda en Línea</div>
        <h1 class="font-display text-5xl text-chalk">RESERVA <span class="text-gold-gradient">TU CITA</span></h1>
      </div>

      <!-- Progress steps -->
      <div class="flex items-center justify-center mb-12 overflow-x-auto pb-2">
        <div v-for="(s, i) in steps" :key="s.n" class="flex items-center">
          <div class="flex flex-col items-center gap-1 min-w-[60px]">
            <div class="w-10 h-10 flex items-center justify-center font-display text-sm transition-all duration-300"
              :class="booking.step > s.n ? 'bg-gold-500 text-ink' : booking.step === s.n ? 'step-active text-gold-400 bg-steel' : 'bg-edge text-ash border border-smoke'"
              :style="booking.step > s.n ? '' : ''">
              <span v-if="booking.step > s.n">✓</span>
              <span v-else>{{ s.n }}</span>
            </div>
            <div class="text-[9px] tracking-widest text-silver uppercase font-body text-center whitespace-nowrap">{{ s.label }}</div>
          </div>
          <div v-if="i < steps.length-1" class="w-10 h-px mx-1 flex-shrink-0" :style="booking.step > s.n ? 'background:#D4A017' : 'background:#2C2C2C'"></div>
        </div>
      </div>

      <!-- STEP 1: Services -->
      <div v-if="booking.step === 1">
        <h2 class="font-display text-2xl text-chalk mb-2">ELIGE TUS SERVICIOS</h2>
        <p class="text-silver font-body text-sm mb-6">Puedes seleccionar múltiples servicios. Se realizarán en el mismo turno.</p>

        <!-- Category filter -->
        <div class="flex flex-wrap gap-2 mb-6">
          <button @click="activeCategory='all'" class="px-4 py-2 text-xs font-display tracking-widest uppercase transition-all"
            :class="activeCategory==='all' ? 'bg-gold-500 text-ink' : 'border border-smoke text-silver hover:border-gold-700 hover:text-gold-400'">
            TODOS
          </button>
          <button v-for="cat in categories" :key="cat" @click="activeCategory=cat" class="px-4 py-2 text-xs font-display tracking-widest uppercase transition-all"
            :class="activeCategory===cat ? 'bg-gold-500 text-ink' : 'border border-smoke text-silver hover:border-gold-700 hover:text-gold-400'">
            {{ cat }}
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          <div v-for="s in filteredServices" :key="s.id"
            :class="['service-card', booking.isServiceSelected(s.id) ? 'selected' : '']"
            @click="booking.toggleService(s)">
            <div class="flex items-start justify-between mb-3">
              <span class="text-3xl">{{ s.icon }}</span>
              <div class="flex items-center gap-2">
                <div v-if="s.popular" class="badge-blood text-[8px]">POPULAR</div>
                <div v-if="booking.isServiceSelected(s.id)" class="w-5 h-5 flex items-center justify-center bg-gold-500 text-ink text-xs font-bold">✓</div>
              </div>
            </div>
            <h3 class="font-display text-lg text-chalk tracking-wide mb-1">{{ s.name }}</h3>
            <p class="text-silver text-xs font-body leading-relaxed mb-4">{{ s.desc }}</p>
            <div class="flex items-center justify-between">
              <span class="font-display text-xl text-gold-400">${{ s.price }} <span class="text-silver text-xs font-body">MXN</span></span>
              <span class="text-silver text-xs">⏱ {{ s.duration }} min</span>
            </div>
          </div>
        </div>

        <!-- Summary bar -->
        <div v-if="booking.selectedServices.length > 0" class="card-gold-border p-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="text-xs text-silver mb-1 tracking-widest">SELECCIONADOS: {{ booking.selectedServices.length }} servicio(s)</div>
            <div class="flex flex-wrap gap-2">
              <span v-for="s in booking.selectedServices" :key="s.id" class="badge-gold text-[9px]">{{ s.name }}</span>
            </div>
          </div>
          <div class="text-right flex-shrink-0">
            <div class="text-xs text-silver mb-0.5">Total · {{ booking.totalDuration }} min</div>
            <div class="font-display text-2xl text-gold-400">${{ booking.totalPrice }} <span class="text-sm text-silver">MXN</span></div>
          </div>
        </div>

        <button @click="booking.step=2" :disabled="booking.selectedServices.length===0" class="btn-gold w-full py-4 text-sm"
          :class="booking.selectedServices.length===0 ? 'opacity-30 cursor-not-allowed' : ''">
          <span>SIGUIENTE: ELIGE TU BARBERO →</span>
        </button>
      </div>

      <!-- STEP 2: Barber -->
      <div v-else-if="booking.step === 2">
        <h2 class="font-display text-2xl text-chalk mb-2">ELIGE TU BARBERO</h2>
        <p class="text-silver font-body text-sm mb-6">O elige "Sin preferencia" para asignar al siguiente disponible.</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <!-- Sin preferencia -->
          <div class="card-dark p-6 cursor-pointer transition-all duration-300 flex items-center gap-5"
            :class="booking.selectedBarber?.id==='any' ? 'border-gold-500' : 'hover:border-smoke'"
            @click="booking.selectedBarber={id:'any',name:'Sin preferencia'}">
            <div class="w-16 h-16 flex items-center justify-center font-display text-2xl text-silver bg-edge flex-shrink-0">?</div>
            <div>
              <h3 class="font-display text-lg text-chalk">Sin Preferencia</h3>
              <p class="text-silver text-xs font-body">El barbero disponible más próximo te atenderá</p>
            </div>
            <div v-if="booking.selectedBarber?.id==='any'" class="ml-auto text-gold-400 text-xl">✓</div>
          </div>

          <!-- Barbers -->
          <div v-for="b in booking.barbers" :key="b.id"
            class="card-dark p-6 cursor-pointer transition-all duration-300 flex items-center gap-5"
            :class="booking.selectedBarber?.id===b.id ? 'border-gold-500' : 'hover:border-smoke'"
            @click="booking.selectedBarber=b">
            <div class="w-16 h-16 rounded-full flex items-center justify-center font-display text-xl text-gold-400 bg-edge flex-shrink-0">{{ b.avatar_initial }}</div>
            <div class="flex-1">
              <h3 class="font-display text-lg text-chalk leading-tight">{{ b.name }}</h3>
              <div class="text-gold-600 text-[10px] tracking-widest uppercase mb-1">{{ b.specialty }}</div>
              <div class="flex items-center gap-3 text-xs text-silver font-body">
                <span>⭐ {{ b.rating }}</span><span>·</span><span>{{ b.reviews }} reseñas</span><span>·</span><span>{{ b.exp }}</span>
              </div>
            </div>
            <div v-if="booking.selectedBarber?.id===b.id" class="text-gold-400 text-xl">✓</div>
          </div>
        </div>

        <div class="flex gap-3">
          <button @click="booking.step=1" class="btn-outline-gold px-8 py-4 text-xs">← ATRÁS</button>
          <button @click="booking.step=3" :disabled="!booking.selectedBarber" class="btn-gold flex-1 py-4 text-sm"
            :class="!booking.selectedBarber ? 'opacity-30 cursor-not-allowed' : ''">
            <span>SIGUIENTE: ELIGE LA FECHA →</span>
          </button>
        </div>
      </div>

      <!-- STEP 3: Date -->
      <div v-else-if="booking.step === 3">
        <h2 class="font-display text-2xl text-chalk mb-2">ELIGE LA FECHA</h2>
        <p class="text-silver font-body text-sm mb-6">Selecciona el día que mejor te convenga.</p>

        <div class="card-dark p-6 mb-6 max-w-md">
          <!-- Calendar header -->
          <div class="flex items-center justify-between mb-5">
            <button @click="prevMonth" class="w-8 h-8 flex items-center justify-center text-silver hover:text-gold-400 transition-colors text-lg">‹</button>
            <div class="font-display text-chalk tracking-widest">{{ monthLabel }}</div>
            <button @click="nextMonth" class="w-8 h-8 flex items-center justify-center text-silver hover:text-gold-400 transition-colors text-lg">›</button>
          </div>

          <!-- Day labels -->
          <div class="grid grid-cols-7 mb-2">
            <div v-for="d in dayLabels" :key="d" class="cal-day text-[10px] tracking-widest text-silver uppercase font-body">{{ d }}</div>
          </div>

          <!-- Calendar grid -->
          <div class="grid grid-cols-7">
            <div v-for="(day, i) in calendarDays" :key="i"
              :class="['cal-day', day===null?'':'cursor-pointer', isToday(day)?'cal-today':'', isSelected(day)?'cal-selected':'', isPast(day)||day===null?'cal-disabled':'']"
              @click="day && !isPast(day) && selectDate(day)">
              {{ day || '' }}
            </div>
          </div>
        </div>

        <div v-if="booking.selectedDate" class="badge-gold mb-6 inline-flex">
          📅 Seleccionaste: {{ formatDate(booking.selectedDate) }}
        </div>

        <div class="flex gap-3">
          <button @click="booking.step=2" class="btn-outline-gold px-8 py-4 text-xs">← ATRÁS</button>
          <button @click="booking.step=4" :disabled="!booking.selectedDate" class="btn-gold flex-1 py-4 text-sm"
            :class="!booking.selectedDate ? 'opacity-30 cursor-not-allowed' : ''">
            <span>SIGUIENTE: ELIGE EL HORARIO →</span>
          </button>
        </div>
      </div>

      <!-- STEP 4: Time -->
      <div v-else-if="booking.step === 4">
        <h2 class="font-display text-2xl text-chalk mb-2">ELIGE EL HORARIO</h2>
        <p class="text-silver font-body text-sm mb-6">
          {{ formatDate(booking.selectedDate) }} · {{ booking.selectedBarber?.name }}
          <span class="text-gold-400 ml-2">Duración aprox: {{ booking.totalDuration }} min</span>
        </p>

        <div class="mb-4 flex items-center gap-4 text-xs font-body">
          <div class="flex items-center gap-2"><div class="w-3 h-3 border border-gold-500"></div> Disponible</div>
          <div class="flex items-center gap-2"><div class="w-3 h-3 bg-gold-500"></div> Seleccionado</div>
          <div class="flex items-center gap-2"><div class="w-3 h-3 bg-edge border border-edge"></div> Ocupado</div>
        </div>

        <!-- Morning -->
        <div class="mb-6">
          <div class="section-tag text-xs mb-3">MAÑANA (09:00–13:00)</div>
          <div class="grid grid-cols-4 sm:grid-cols-6 gap-2">
            <div v-for="slot in morningSlots" :key="slot.time"
              :class="['time-slot', slot.taken?'slot-taken':'', booking.selectedTime===slot.time?'slot-selected':'']"
              @click="!slot.taken && (booking.selectedTime=slot.time)">
              {{ slot.time }}
            </div>
          </div>
        </div>

        <!-- Afternoon -->
        <div class="mb-8">
          <div class="section-tag text-xs mb-3">TARDE (13:00–20:00)</div>
          <div class="grid grid-cols-4 sm:grid-cols-6 gap-2">
            <div v-for="slot in afternoonSlots" :key="slot.time"
              :class="['time-slot', slot.taken?'slot-taken':'', booking.selectedTime===slot.time?'slot-selected':'']"
              @click="!slot.taken && (booking.selectedTime=slot.time)">
              {{ slot.time }}
            </div>
          </div>
        </div>

        <div class="flex gap-3">
          <button @click="booking.step=3" class="btn-outline-gold px-8 py-4 text-xs">← ATRÁS</button>
          <button @click="booking.step=5" :disabled="!booking.selectedTime" class="btn-gold flex-1 py-4 text-sm"
            :class="!booking.selectedTime ? 'opacity-30 cursor-not-allowed' : ''">
            <span>SIGUIENTE: TUS DATOS →</span>
          </button>
        </div>
      </div>

      <!-- STEP 5: Client details -->
      <div v-else-if="booking.step === 5">
        <h2 class="font-display text-2xl text-chalk mb-2">TUS DATOS</h2>
        <p class="text-silver font-body text-sm mb-6">Para confirmar y enviarte el recordatorio de tu cita.</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="section-tag text-[9px] mb-2 block">NOMBRE COMPLETO *</label>
            <input v-model="booking.clientName" class="input-dark" placeholder="Tu nombre completo" />
          </div>
          <div>
            <label class="section-tag text-[9px] mb-2 block">TELÉFONO *</label>
            <input v-model="booking.clientPhone" class="input-dark" placeholder="55 1234 5678" type="tel" />
          </div>
          <div class="md:col-span-2">
            <label class="section-tag text-[9px] mb-2 block">CORREO ELECTRÓNICO</label>
            <input v-model="booking.clientEmail" class="input-dark" placeholder="tu@email.com" type="email" />
          </div>
          <div class="md:col-span-2">
            <label class="section-tag text-[9px] mb-2 block">NOTAS ADICIONALES (opcional)</label>
            <textarea v-model="booking.notes" class="input-dark resize-none" rows="3" placeholder="Ej. referencia de foto, preferencias especiales..."></textarea>
          </div>
        </div>

        <div class="flex gap-3">
          <button @click="booking.step=4" class="btn-outline-gold px-8 py-4 text-xs">← ATRÁS</button>
          <button @click="booking.step=6" :disabled="!booking.clientName || !booking.clientPhone" class="btn-gold flex-1 py-4 text-sm"
            :class="(!booking.clientName||!booking.clientPhone) ? 'opacity-30 cursor-not-allowed' : ''">
            <span>SIGUIENTE: MÉTODO DE PAGO →</span>
          </button>
        </div>
      </div>

      <!-- STEP 6: Payment -->
      <div v-else-if="booking.step === 6">
        <h2 class="font-display text-2xl text-chalk mb-2">MÉTODO DE PAGO</h2>
        <p class="text-silver font-body text-sm mb-6">Paga ahora en línea o en efectivo al llegar a tu cita.</p>

        <!-- Summary -->
        <div class="card-gold-border p-6 mb-6">
          <div class="section-tag text-xs mb-4">RESUMEN DE TU CITA</div>
          <div class="space-y-2 mb-4">
            <div v-for="s in booking.selectedServices" :key="s.id" class="flex justify-between text-sm font-body">
              <span class="text-silver">{{ s.icon }} {{ s.name }}</span>
              <span class="text-chalk">${{ s.price }}</span>
            </div>
          </div>
          <div class="gold-line-full mb-4"></div>
          <div class="flex justify-between items-center">
            <div class="text-silver text-sm font-body">{{ booking.selectedBarber?.name }} · {{ formatDate(booking.selectedDate) }} {{ booking.selectedTime }}</div>
            <div class="font-display text-2xl text-gold-400">${{ booking.totalPrice }} MXN</div>
          </div>
        </div>

        <!-- Payment options -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div @click="booking.paymentMethod='cash'" class="card-dark p-6 cursor-pointer transition-all duration-300"
            :class="booking.paymentMethod==='cash' ? 'border-gold-500 bg-gold-500/5' : 'hover:border-smoke'">
            <div class="flex items-center gap-3 mb-3">
              <span class="text-3xl">💵</span>
              <div :class="['w-5 h-5 rounded-full border-2 flex items-center justify-center', booking.paymentMethod==='cash' ? 'border-gold-400' : 'border-ash']">
                <div v-if="booking.paymentMethod==='cash'" class="w-2.5 h-2.5 rounded-full bg-gold-400"></div>
              </div>
            </div>
            <h3 class="font-display text-lg text-chalk mb-1">Pago en Efectivo</h3>
            <p class="text-silver text-xs font-body">Paga al llegar a la barbería. Tu lugar queda reservado sin cargo.</p>
          </div>

          <div @click="booking.paymentMethod='online'" class="card-dark p-6 cursor-pointer transition-all duration-300"
            :class="booking.paymentMethod==='online' ? 'border-gold-500 bg-gold-500/5' : 'hover:border-smoke'">
            <div class="flex items-center gap-3 mb-3">
              <span class="text-3xl">💳</span>
              <div :class="['w-5 h-5 rounded-full border-2 flex items-center justify-center', booking.paymentMethod==='online' ? 'border-gold-400' : 'border-ash']">
                <div v-if="booking.paymentMethod==='online'" class="w-2.5 h-2.5 rounded-full bg-gold-400"></div>
              </div>
            </div>
            <h3 class="font-display text-lg text-chalk mb-1">Pago en Línea</h3>
            <p class="text-silver text-xs font-body">Tarjeta, Mercado Pago o transferencia. Confirmación inmediata.</p>
          </div>
        </div>

        <!-- Online payment form -->
        <div v-if="booking.paymentMethod==='online'" class="card-dark p-6 mb-6 space-y-3">
          <div class="section-tag text-[9px] mb-3">DATOS DE TARJETA (Mercado Pago seguro)</div>
          <input class="input-dark" placeholder="Número de tarjeta" maxlength="19" />
          <div class="grid grid-cols-2 gap-3">
            <input class="input-dark" placeholder="MM/AA" maxlength="5" />
            <input class="input-dark" placeholder="CVV" maxlength="4" type="password" />
          </div>
          <input class="input-dark" placeholder="Nombre en la tarjeta" />
          <div class="flex items-center gap-2 text-xs text-silver font-body">
            <span>🔒</span> Pago cifrado · Procesado por Mercado Pago
          </div>
        </div>

        <div class="flex gap-3">
          <button @click="booking.step=5" class="btn-outline-gold px-8 py-4 text-xs">← ATRÁS</button>
          <button @click="confirmBooking" :disabled="booking.loading" class="btn-gold flex-1 py-4 text-sm">
            <span v-if="!booking.loading">✂️ CONFIRMAR RESERVA — ${{ booking.totalPrice }} MXN</span>
            <span v-else class="flex items-center gap-2 justify-center"><span class="animate-spin">✂️</span> Procesando...</span>
          </button>
        </div>
      </div>

      <!-- STEP 7: Confirmation -->
      <div v-else-if="booking.step === 7" class="text-center py-10">
        <div class="text-8xl mb-6 animate-float">✅</div>
        <div class="badge-gold mb-4 justify-center">¡RESERVA CONFIRMADA!</div>
        <h2 class="font-display text-4xl text-chalk mb-2">¡TODO LISTO!</h2>
        <p class="text-silver font-body mb-8 max-w-md mx-auto">Tu cita ha sido registrada. Te esperamos en Barber Shop Kalashnikov.</p>

        <div class="card-gold-border p-8 max-w-md mx-auto mb-8 text-left">
          <div class="section-tag text-xs mb-4">DETALLES DE TU CITA</div>
          <div class="space-y-3 text-sm font-body">
            <div class="flex justify-between"><span class="text-silver">Folio</span><span class="text-gold-400 font-bold font-display">{{ booking.bookingId }}</span></div>
            <div class="flex justify-between"><span class="text-silver">Barbero</span><span class="text-chalk">{{ booking.selectedBarber?.name }}</span></div>
            <div class="flex justify-between"><span class="text-silver">Fecha</span><span class="text-chalk">{{ formatDate(booking.selectedDate) }}</span></div>
            <div class="flex justify-between"><span class="text-silver">Hora</span><span class="text-chalk">{{ booking.selectedTime }}</span></div>
            <div class="flex justify-between"><span class="text-silver">Duración</span><span class="text-chalk">~{{ booking.totalDuration }} min</span></div>
            <div class="flex justify-between"><span class="text-silver">Pago</span><span class="text-chalk">{{ booking.paymentMethod==='cash' ? '💵 Efectivo al llegar' : '✅ Pagado en línea' }}</span></div>
          </div>
          <div class="gold-line-full my-4"></div>
          <div class="flex justify-between font-display text-lg"><span class="text-silver">Total</span><span class="text-gold-400">${{ booking.totalPrice }} MXN</span></div>
        </div>

        <div class="flex gap-3 justify-center">
          <router-link to="/" @click="booking.reset()" class="btn-outline-gold px-8 py-3 text-xs">VOLVER AL INICIO</router-link>
          <button @click="booking.reset(); booking.step=1" class="btn-gold px-8 py-3 text-xs"><span>NUEVA CITA</span></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useBookingStore } from '@/stores/booking'
import { useServicesStore } from '@/stores/services'

const booking = useBookingStore()
const servicesStore = useServicesStore()

const services = servicesStore.defaultCatalog
const categories = servicesStore.categories
const activeCategory = ref('all')

const steps = [
  { n:1, label:'Servicios' }, { n:2, label:'Barbero' }, { n:3, label:'Fecha' },
  { n:4, label:'Horario' }, { n:5, label:'Datos' }, { n:6, label:'Pago' }, { n:7, label:'Listo' }
]
const dayLabels = ['Do','Lu','Ma','Mi','Ju','Vi','Sá']

const filteredServices = computed(() =>
  activeCategory.value === 'all' ? services : services.filter(s => s.category === activeCategory.value)
)

// Calendar
const today = new Date()
const currentMonth = ref(today.getMonth())
const currentYear = ref(today.getFullYear())
const monthNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
const monthLabel = computed(() => `${monthNames[currentMonth.value]} ${currentYear.value}`)

const calendarDays = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay()
  const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
  const days = []
  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let d = 1; d <= daysInMonth; d++) days.push(d)
  return days
})

function prevMonth() {
  if (currentMonth.value === 0) { currentMonth.value = 11; currentYear.value-- }
  else currentMonth.value--
}
function nextMonth() {
  if (currentMonth.value === 11) { currentMonth.value = 0; currentYear.value++ }
  else currentMonth.value++
}
function isToday(day) {
  return day === today.getDate() && currentMonth.value === today.getMonth() && currentYear.value === today.getFullYear()
}
function isSelected(day) {
  if (!day || !booking.selectedDate) return false
  const d = new Date(booking.selectedDate)
  return day === d.getDate() && currentMonth.value === d.getMonth() && currentYear.value === d.getFullYear()
}
function isPast(day) {
  if (!day) return true
  const d = new Date(currentYear.value, currentMonth.value, day)
  d.setHours(0,0,0,0)
  const t = new Date(); t.setHours(0,0,0,0)
  return d < t
}
function selectDate(day) {
  booking.selectedDate = new Date(currentYear.value, currentMonth.value, day).toISOString().split('T')[0]
}
function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('es-MX', { weekday:'long', year:'numeric', month:'long', day:'numeric' })
}

const morningSlots = computed(() => booking.timeSlots.filter(s => {
  const h = parseInt(s.time.split(':')[0])
  return h >= 9 && h < 13
}))
const afternoonSlots = computed(() => booking.timeSlots.filter(s => {
  const h = parseInt(s.time.split(':')[0])
  return h >= 13
}))

async function confirmBooking() {
  await booking.createAppointment()
}
</script>
