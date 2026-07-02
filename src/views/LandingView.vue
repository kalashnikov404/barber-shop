<template>
  <div>
    <!-- ═══════════════════════════════════════
         HERO
    ═══════════════════════════════════════ -->
    <section class="relative min-h-screen flex items-center overflow-hidden">
      <!-- Background grid pattern -->
      <div class="absolute inset-0" style="background-image:linear-gradient(rgba(212,160,23,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(212,160,23,0.03) 1px,transparent 1px);background-size:80px 80px;"></div>
      <!-- Gold radial glow -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full" style="background:radial-gradient(circle,rgba(212,160,23,0.06) 0%,transparent 70%);"></div>
      <!-- Blood accent -->
      <div class="absolute top-0 right-0 w-96 h-96 rounded-full" style="background:radial-gradient(circle,rgba(225,29,29,0.05) 0%,transparent 60%);"></div>

      <div class="max-w-7xl mx-auto px-4 py-24 w-full relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <!-- Badge -->
            <div class="badge-gold mb-8 animate-slide-up inline-flex" style="animation-delay:0s">
              <span class="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse-gold"></span>
              CDMX · Est. 2018 · Citas disponibles
            </div>

            <h1 class="font-display text-6xl sm:text-7xl md:text-8xl leading-none mb-6 animate-slide-up" style="animation-delay:0.1s">
              <span class="text-chalk block">EL CORTE</span>
              <span class="text-gold-gradient block">PERFECTO</span>
              <span class="text-chalk block text-4xl sm:text-5xl">EMPIEZA AQUÍ</span>
            </h1>

            <p class="text-silver font-body text-lg leading-relaxed max-w-md mb-10 animate-slide-up" style="animation-delay:0.2s">
              Barbería de élite en el corazón de la Ciudad de México. Precisión artesanal, estilo sin concesiones, experiencia que trasciende el corte.
            </p>

            <div class="flex flex-wrap gap-4 animate-slide-up" style="animation-delay:0.3s">
              <router-link to="/reservar" class="btn-gold text-sm px-10 py-4">
                <span>✂️ RESERVAR CITA</span>
              </router-link>
              <router-link to="/servicios" class="btn-outline-gold text-sm px-10 py-4">
                VER SERVICIOS
              </router-link>
            </div>

            <!-- Trust badges -->
            <div class="flex gap-6 mt-12 animate-slide-up" style="animation-delay:0.4s">
              <div v-for="t in trustBadges" :key="t.label" class="text-center">
                <div class="font-display text-2xl text-gold-400">{{ t.value }}</div>
                <div class="text-xs text-silver tracking-widest uppercase font-body">{{ t.label }}</div>
              </div>
            </div>
          </div>

          <!-- Hero visual -->
          <div class="hidden lg:flex items-center justify-center relative">
            <!-- Spinning outer ring -->
            <div class="absolute w-[420px] h-[420px] rounded-full animate-barber-spin" style="border:1px solid rgba(212,160,23,0.15);"></div>
            <div class="absolute w-[360px] h-[360px] rounded-full" style="border:1px dashed rgba(212,160,23,0.08);animation:spin 15s linear infinite reverse;"></div>

            <!-- Center card -->
            <div class="relative z-10 card-gold-border p-10 text-center w-72">
<div class="relative">
  <img
    src="@/assets/gallery/main.jpg"
    class="w-[420px] h-[520px] object-cover rounded-lg"
  >

  <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
</div>

              <div class="font-display tracking-[0.2em] text-3xl text-gold-400 mb-1">KALASHNIKOV</div>
              <div class="text-[10px] tracking-[0.5em] text-silver uppercase mb-6">Barber Shop</div>
              <div class="gold-line-full mb-6"></div>
              <div class="grid grid-cols-2 gap-3">
                <div v-for="feat in heroFeatures" :key="feat.icon" class="text-center p-2">
                  <div class="text-xl mb-1">{{ feat.icon }}</div>
                  <div class="text-[10px] text-silver tracking-wider">{{ feat.label }}</div>
                </div>
              </div>
            </div>

            <!-- Floating tags -->
            <div class="absolute -top-4 right-4 badge-gold animate-float" style="animation-delay:0.5s">⭐ 4.9 / 5</div>
            <div class="absolute bottom-8 -left-8 badge-blood animate-float" style="animation-delay:1s">🔥 Trending</div>
          </div>
        </div>
      </div>

      <!-- Bottom scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse-gold">
        <div class="text-[9px] tracking-[0.4em] text-silver uppercase">Scroll</div>
        <div class="w-px h-10" style="background:linear-gradient(to bottom, #D4A017, transparent)"></div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         SERVICES PREVIEW
    ═══════════════════════════════════════ -->
    <section class="py-24">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div class="section-tag mb-3">— Catálogo Completo</div>
            <h2 class="font-display text-5xl text-chalk">NUESTROS <span class="text-gold-gradient">SERVICIOS</span></h2>
          </div>
          <router-link to="/servicios" class="btn-outline-gold text-xs">VER TODOS LOS SERVICIOS →</router-link>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="s in featuredServices" :key="s.id" class="service-card">
            <div class="flex items-start justify-between mb-4">
              <span class="text-4xl">{{ s.icon }}</span>
              <div v-if="s.popular" class="badge-blood text-[9px]">POPULAR</div>
            </div>
            <h3 class="font-display text-xl text-chalk mb-2 tracking-wide">{{ s.name }}</h3>
            <p class="text-silver text-sm font-body leading-relaxed mb-5">{{ s.desc }}</p>
            <div class="flex items-center justify-between">
              <div>
                <span class="font-display text-2xl text-gold-400">${{ s.price }}</span>
                <span class="text-silver text-xs ml-1">MXN</span>
              </div>
              <span class="text-silver text-xs font-body">⏱ {{ s.duration }} min</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         BOOKING CTA
    ═══════════════════════════════════════ -->
    <section class="py-24 relative overflow-hidden" style="background:linear-gradient(135deg,#111111,#1A1A1A)">
      <div class="absolute inset-0" style="background:radial-gradient(ellipse at center,rgba(212,160,23,0.05) 0%,transparent 70%)"></div>
      <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32" style="background:linear-gradient(to bottom,transparent,#D4A017,transparent)"></div>
      <div class="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-32" style="background:linear-gradient(to bottom,transparent,#D4A017,transparent)"></div>

      <div class="max-w-4xl mx-auto px-4 text-center relative z-10">
        <div class="text-6xl mb-6 animate-float">💈</div>
        <div class="section-tag mb-4">— Agenda en Línea</div>
        <h2 class="font-display text-5xl md:text-6xl text-chalk mb-6">RESERVA TU <br><span class="text-gold-gradient">CITA AHORA</span></h2>
        <p class="text-silver font-body max-w-xl mx-auto mb-10 leading-relaxed">Elige tu servicio, selecciona a tu barbero, escoge fecha y hora. Paga en línea o en efectivo el día de tu cita.</p>

        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-10 max-w-2xl mx-auto">
          <div v-for="step in bookingSteps" :key="step.n" class="card-dark p-4 text-center">
            <div class="font-display text-3xl text-gold-400 mb-1">{{ step.n }}</div>
            <div class="text-xl mb-2">{{ step.icon }}</div>
            <div class="text-silver text-xs tracking-wider">{{ step.label }}</div>
          </div>
        </div>

        <router-link to="/reservar" class="btn-gold text-sm px-14 py-5 animate-glow-gold">
          <span>✂️ RESERVAR MI CITA</span>
        </router-link>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         BARBERS PREVIEW
    ═══════════════════════════════════════ -->
    <section class="py-24">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-14">
          <div class="section-tag mb-3">— El Equipo</div>
          <h2 class="font-display text-5xl text-chalk">MAESTROS DEL <span class="text-gold-gradient">FILO</span></h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="b in barbers" :key="b.id" class="card-dark p-8 text-center group hover:border-gold-700 transition-all duration-300">
         <div
  class="w-28 h-28 rounded-full mx-auto overflow-hidden mb-6 border-2 border-gold-500 shadow-lg"
>
  <img
    :src="b.image"
    :alt="b.name"
    class="w-full h-full object-cover"
  >
</div>

            <h3 class="font-display text-xl text-chalk tracking-wide mb-1">{{ b.name }}</h3>
            <div class="section-tag text-xs mb-3">{{ b.specialty }}</div>
            <div class="text-silver text-sm font-body mb-4">{{ b.exp }} de experiencia</div>
            <div class="flex items-center justify-center gap-2 mb-5">
              <span class="text-gold-400">⭐</span>
              <span class="font-display text-gold-400">{{ b.rating }}</span>
              <span class="text-silver text-sm">({{ b.reviews }} reseñas)</span>
            </div>
            <router-link to="/reservar" class="btn-outline-gold w-full justify-center text-xs py-2.5">Reservar con él</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         GALLERY PREVIEW
    ═══════════════════════════════════════ -->
    <section class="py-24" style="background:#111">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div class="section-tag mb-3">— El Trabajo Habla</div>
            <h2 class="font-display text-5xl text-chalk">GALERÍA <span class="text-gold-gradient">DE ARTE</span></h2>
          </div>
          <router-link to="/galeria" class="btn-outline-gold text-xs">VER GALERÍA COMPLETA →</router-link>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div v-for="g in galleryPreview" :key="g.id"
             class="overflow-hidden cursor-pointer group relative rounded-lg"
            style="min-height:180px">
           <div
  class="relative overflow-hidden"
  :style="`min-height:${g.tall ? '380px' : '180px'}`"
>
  <img
    :src="g.image"
    :alt="g.style"
  class="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
      :style="`min-height:${g.tall ? '380px' : '180px'}`"
  />

  <div
    class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
  ></div>

  <div
    class="absolute inset-0 flex items-end justify-start p-4"
  >
    <span
      class="text-white font-display tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      {{ g.style }}
    </span>
  </div>
</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         REVIEWS
    ═══════════════════════════════════════ -->
    <section class="py-24">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-14">
          <div class="section-tag mb-3">— Lo Que Dicen</div>
          <h2 class="font-display text-5xl text-chalk">CLIENTES <span class="text-gold-gradient">SATISFECHOS</span></h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="r in reviews" :key="r.name" class="card-dark p-6">
            <div class="flex items-center gap-1 mb-4">
              <span v-for="i in 5" :key="i" class="text-gold-400 text-sm">⭐</span>
            </div>
            <p class="text-silver font-body text-sm leading-relaxed mb-5 italic">"{{ r.text }}"</p>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full flex items-center justify-center font-display text-gold-400" style="background:#1A1A1A;border:1px solid #3A3A3A">{{ r.initial }}</div>
              <div>
                <div class="font-body font-bold text-chalk text-sm">{{ r.name }}</div>
                <div class="text-silver text-xs">{{ r.barbero }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         INFO STRIP
    ═══════════════════════════════════════ -->
    <section class="py-16 border-t border-b border-smoke" style="background:#111">
      <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        <div v-for="info in infoStrip" :key="info.label">
          <div class="text-3xl mb-3">{{ info.icon }}</div>
          <div class="font-display text-chalk tracking-wide mb-1">{{ info.label }}</div>
          <div class="text-silver text-sm font-body">{{ info.value }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useBookingStore } from '@/stores/booking'
import { useServicesStore } from '@/stores/services'
import skinfade from '@/assets/gallery/skinfade.jpg'
import altofade from '@/assets/gallery/altofade.jpg'
import fadeuve from '@/assets/gallery/fadeuve.jpg'



import clasico from '@/assets/gallery/clasico.jpg'
import clasicodos from '@/assets/gallery/clasicodos.jpg'
import clasicotres from '@/assets/gallery/clasicotres.jpg'



import barba from '@/assets/gallery/barba.jpg'
import barbados from '@/assets/gallery/barbados.jpg'
import barbatres from '@/assets/gallery/barbatres.jpg'



import diseño from '@/assets/gallery/diseño.jpg'



import transformacion1 from '@/assets/gallery/fadeba.jpg'
import transformacion2 from '@/assets/gallery/clean.jpeg'
import transformacion3 from '@/assets/gallery/longclean.png'


const booking = useBookingStore()
const servicesStore = useServicesStore()

const barbers = booking.barbers

const featuredServices = servicesStore.defaultCatalog.filter(s => s.popular).slice(0,6)

const trustBadges = [
  { value:'+5,000', label:'Clientes' },
  { value:'4.9★', label:'Rating' },
  { value:'6', label:'Años' },
  { value:'3', label:'Barberos' },
]

const heroFeatures = [
  { icon:'✂️', label:'Precisión' },
  { icon:'💈', label:'Estilo' },
  { icon:'🪒', label:'Navaja' },
  { icon:'👑', label:'Premium' },
]

const bookingSteps = [
  { n:'01', icon:'✂️', label:'Elige Servicio' },
  { n:'02', icon:'💈', label:'Elige Barbero' },
  { n:'03', icon:'📅', label:'Fecha & Hora' },
  { n:'04', icon:'💳', label:'Paga o Efectivo' },
]

const galleryPreview = [
  {
    id: 1,
    image: skinfade,
    style: 'Skin Fade Perfecto'
  },
  {
    id: 2,
    image: altofade,
    style: 'High Fade'
  },
  {
    id: 3,
    image: fadeuve,
    style: 'Fade en V'
  },
  {
    id: 4,
    image: clasico,
    style: 'Corte Clásico Ejecutivo'
  },
  {
    id: 5,
    image: clasicodos,
    style: 'Business Cut'
  },
  {
    id: 6,
    image: clasicotres,
    style: 'Clásico Juvenil'
  },
  {
    id: 7,
    image: barba,
    style: 'Beard Sculpt'
  },
  {
    id: 8,
    image: barbados,
    style: 'Italian Beard'
  },
  {
    id: 9,
    image: barbatres,
    style: 'Long Beard'
  }
]
const reviews = [
  { name:'Carlos M.', initial:'C', barbero:'Cliente de Aleksei', text:'Llevo 3 años viniendo y nunca me decepciona. El mejor fade de la ciudad, sin discusión. El ambiente es increíble y la atención es de primera.' },
  { name:'Rodrigo F.', initial:'R', barbero:'Cliente de Ivan', text:'Vine buscando un pompadour clásico y salí con el corte de mi vida. La atención al detalle de Ivan es impresionante. Ya tengo mi cita para el próximo mes.' },
  { name:'Arturo S.', initial:'A', barbero:'Cliente de Dmitri', text:'El paquete VIP vale cada peso. Vine para una ocasión especial y fue una experiencia completa. El masaje capilar solo ya lo vale. ¡10/10!' },
]

const infoStrip = [
  { icon:'📍', label:'Ubicación', value:'Insurgentes Sur 1234, CDMX' },
  { icon:'⏰', label:'Horario', value:'Lun–Sáb 9:00–20:00 · Dom 10:00–17:00' },
  { icon:'📞', label:'Teléfono', value:'+52 55 1234 5678' },
  { icon:'💳', label:'Pagos', value:'Efectivo, Tarjeta, Mercado Pago' },
]
</script>
