<template>
  <div class="min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-4">
      <div class="mb-8">
        <div class="section-tag mb-3">— Control Total</div>
        <h1 class="font-display text-4xl text-chalk">PANEL DE <span class="text-gold-gradient">ADMINISTRACIÓN</span></h1>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div v-for="s in stats" :key="s.label" class="card-dark p-5 text-center">
          <div class="text-2xl mb-1">{{ s.icon }}</div>
          <div class="font-display text-2xl text-gold-400">{{ s.value }}</div>
          <div class="text-silver text-xs tracking-widest uppercase">{{ s.label }}</div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex gap-2 mb-8 overflow-x-auto pb-1">
        <button v-for="t in tabs" :key="t.key" @click="activeTab=t.key"
          class="px-5 py-2.5 text-xs font-display tracking-widest uppercase transition-all whitespace-nowrap"
          :class="activeTab===t.key ? 'bg-gold-500 text-ink' : 'border border-smoke text-silver hover:border-gold-700'">
          {{ t.icon }} {{ t.label }}
        </button>
      </div>

      <!-- Appointments -->
      <div v-if="activeTab==='citas'" class="card-dark p-6">
        <div class="flex items-center justify-between mb-5">
          <h2 class="font-display text-lg text-chalk">CITAS DE HOY</h2>
          <input v-model="searchApt" class="input-dark w-56" placeholder="Buscar cliente..." />
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="text-silver text-xs border-b border-smoke tracking-widest uppercase">
                <th class="text-left py-3 px-3">Hora</th>
                <th class="text-left py-3 px-3">Cliente</th>
                <th class="text-left py-3 px-3">Servicio</th>
                <th class="text-left py-3 px-3">Barbero</th>
                <th class="text-left py-3 px-3">Pago</th>
                <th class="text-left py-3 px-3">Estado</th>
                <th class="text-right py-3 px-3">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="a in todayAppointments" :key="a.id" class="border-b border-smoke/50 hover:bg-steel/40 transition-colors">
                <td class="py-3 px-3 font-display text-gold-400">{{ a.time }}</td>
                <td class="py-3 px-3 text-chalk text-sm">{{ a.client }}</td>
                <td class="py-3 px-3 text-silver text-sm">{{ a.service }}</td>
                <td class="py-3 px-3 text-silver text-sm">{{ a.barber }}</td>
                <td class="py-3 px-3"><span :class="a.payment==='cash'?'badge-blood':'badge-gold'" class="text-[9px]">{{ a.payment==='cash'?'EFECTIVO':'PAGADO' }}</span></td>
                <td class="py-3 px-3"><span class="badge-gold text-[9px]">{{ a.status }}</span></td>
                <td class="py-3 px-3 text-right">
                  <button class="text-xs text-gold-400 hover:text-gold-300">Ver →</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Barbers -->
      <div v-else-if="activeTab==='barberos'" class="card-dark p-6">
        <div class="flex items-center justify-between mb-5">
          <h2 class="font-display text-lg text-chalk">EQUIPO DE BARBEROS</h2>
          <button class="btn-gold text-xs px-5 py-2"><span>+ NUEVO BARBERO</span></button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-for="b in booking.barbers" :key="b.id" class="card-dark p-5 flex items-center gap-4">
            <div class="w-12 h-12 rounded-full flex items-center justify-center font-display text-gold-400" style="background:#1A1A1A;border:1px solid #2C2C2C">{{ b.avatar_initial }}</div>
            <div class="flex-1">
              <div class="font-bold text-sm text-chalk">{{ b.name }}</div>
              <div class="text-silver text-xs">{{ b.specialty }}</div>
            </div>
            <span class="badge-gold text-[9px]">ACTIVO</span>
          </div>
        </div>
      </div>

      <!-- Services -->
      <div v-else-if="activeTab==='servicios'" class="card-dark p-6">
        <div class="flex items-center justify-between mb-5">
          <h2 class="font-display text-lg text-chalk">CATÁLOGO DE SERVICIOS</h2>
          <button class="btn-gold text-xs px-5 py-2"><span>+ NUEVO SERVICIO</span></button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="text-silver text-xs border-b border-smoke tracking-widest uppercase">
                <th class="text-left py-3 px-3">Servicio</th>
                <th class="text-left py-3 px-3">Categoría</th>
                <th class="text-left py-3 px-3">Precio</th>
                <th class="text-left py-3 px-3">Duración</th>
                <th class="text-right py-3 px-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="s in servicesStore.defaultCatalog" :key="s.id" class="border-b border-smoke/50 hover:bg-steel/40 transition-colors">
                <td class="py-3 px-3 text-chalk text-sm flex items-center gap-2"><span>{{ s.icon }}</span>{{ s.name }}</td>
                <td class="py-3 px-3 text-silver text-sm">{{ s.category }}</td>
                <td class="py-3 px-3 font-display text-gold-400">${{ s.price }}</td>
                <td class="py-3 px-3 text-silver text-sm">{{ s.duration }} min</td>
                <td class="py-3 px-3 text-right">
                  <button class="text-xs text-gold-400 hover:text-gold-300 mr-3">Editar</button>
                  <button class="text-xs text-blood-400 hover:text-blood-300">Pausar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Schedule blocking -->
      <div v-else-if="activeTab==='horarios'" class="card-dark p-6 space-y-5">
        <h2 class="font-display text-lg text-chalk">HORARIOS Y BLOQUEOS</h2>
        <p class="text-silver text-sm font-body">Bloquea fechas u horarios específicos (vacaciones, días festivos, mantenimiento).</p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="section-tag text-[9px] mb-2 block">FECHA A BLOQUEAR</label>
            <input type="date" class="input-dark" />
          </div>
          <div>
            <label class="section-tag text-[9px] mb-2 block">BARBERO</label>
            <select class="select-dark">
              <option>Todos</option>
              <option v-for="b in booking.barbers" :key="b.id">{{ b.name }}</option>
            </select>
          </div>
          <div>
            <label class="section-tag text-[9px] mb-2 block">MOTIVO</label>
            <input class="input-dark" placeholder="Ej. Vacaciones" />
          </div>
        </div>
        <button class="btn-gold text-xs px-6 py-3"><span>+ AGREGAR BLOQUEO</span></button>

        <div class="gold-line-full my-4"></div>
        <div class="text-silver text-sm">Próximos bloqueos:</div>
        <div class="flex items-center justify-between p-3 bg-steel">
          <span class="text-chalk text-sm">25 dic 2026 — Todos los barberos — Navidad</span>
          <button class="text-blood-400 text-xs">Eliminar</button>
        </div>
      </div>

      <!-- Config -->
      <div v-else class="card-dark p-6 space-y-5">
        <h2 class="font-display text-lg text-chalk">CONFIGURACIÓN GENERAL</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label class="section-tag text-[9px] mb-2 block">NOMBRE DEL NEGOCIO</label><input class="input-dark" value="Barber Shop Kalashnikov" /></div>
          <div><label class="section-tag text-[9px] mb-2 block">TELÉFONO</label><input class="input-dark" value="+52 55 1234 5678" /></div>
          <div><label class="section-tag text-[9px] mb-2 block">HORA DE APERTURA</label><input type="time" class="input-dark" value="09:00" /></div>
          <div><label class="section-tag text-[9px] mb-2 block">HORA DE CIERRE</label><input type="time" class="input-dark" value="20:00" /></div>
        </div>
        <div class="flex items-center gap-3 p-4 bg-steel">
          <input type="checkbox" checked class="w-5 h-5 accent-yellow-600" />
          <span class="text-sm font-body text-silver">Requerir pago anticipado para servicios &gt; $400 MXN</span>
        </div>
        <button class="btn-gold text-xs px-6 py-3"><span>GUARDAR CONFIGURACIÓN</span></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useBookingStore } from '@/stores/booking'
import { useServicesStore } from '@/stores/services'

const booking = useBookingStore()
const servicesStore = useServicesStore()
const activeTab = ref('citas')
const searchApt = ref('')

const tabs = [
  { key:'citas', label:'Citas', icon:'📅' },
  { key:'barberos', label:'Barberos', icon:'💈' },
  { key:'servicios', label:'Servicios', icon:'✂️' },
  { key:'horarios', label:'Horarios', icon:'⏰' },
  { key:'config', label:'Configuración', icon:'⚙️' },
]

const stats = [
  { icon:'📅', value:'18', label:'Citas Hoy' },
  { icon:'💰', value:'$5,240', label:'Ingresos Hoy' },
  { icon:'👤', value:'1,248', label:'Clientes' },
  { icon:'⭐', value:'4.9', label:'Rating Prom.' },
]

const todayAppointments = ref([
  { id:1, time:'09:00', client:'Carlos Mendoza', service:'Skin Fade', barber:'Aleksei', payment:'online', status:'Confirmada' },
  { id:2, time:'09:30', client:'Roberto Sánchez', service:'Corte + Barba', barber:'Ivan', payment:'cash', status:'Confirmada' },
  { id:3, time:'10:30', client:'Luis Hernández', service:'Paquete VIP', barber:'Dmitri', payment:'online', status:'Confirmada' },
  { id:4, time:'12:00', client:'Fernando Ruiz', service:'Corte Clásico', barber:'Ivan', payment:'cash', status:'Pendiente' },
  { id:5, time:'14:00', client:'Arturo Salinas', service:'Afeitado Clásico', barber:'Aleksei', payment:'online', status:'Confirmada' },
])
</script>
