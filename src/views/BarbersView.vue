<template>
  <div class="min-h-screen py-12">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center mb-14">
        <div class="section-tag mb-3">— El Equipo</div>
        <h1 class="font-display text-5xl text-chalk">MAESTROS DEL <span class="text-gold-gradient">FILO</span></h1>
        <p class="text-silver font-body mt-4 max-w-xl mx-auto">Cada barbero es un artesano con su propio estilo. Encuentra al que mejor se adapte a tu visión.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div v-for="b in barbers" :key="b.id" class="card-dark p-8 text-center group hover:border-gold-700 transition-all duration-300">
          <div class="w-28 h-28 rounded-full mx-auto flex items-center justify-center font-display text-4xl text-gold-400 mb-6 group-hover:animate-glow-gold transition-all"
            style="background:linear-gradient(135deg,#1A1A1A,#2C2C2C);border:1px solid #3A3A3A">
            {{ b.avatar_initial }}
          </div>
          <div class="text-4xl mb-3">{{ b.emoji }}</div>
          <h3 class="font-display text-2xl text-chalk tracking-wide mb-1">{{ b.name }}</h3>
          <div class="section-tag text-xs mb-4">{{ b.specialty }}</div>

          <div class="grid grid-cols-3 gap-3 mb-5">
            <div><div class="font-display text-xl text-gold-400">{{ b.exp.split(' ')[0] }}</div><div class="text-[9px] text-silver tracking-widest uppercase">Años Exp.</div></div>
            <div><div class="font-display text-xl text-gold-400">{{ b.rating }}</div><div class="text-[9px] text-silver tracking-widest uppercase">⭐ Rating</div></div>
            <div><div class="font-display text-xl text-gold-400">{{ b.reviews }}</div><div class="text-[9px] text-silver tracking-widest uppercase">Reseñas</div></div>
          </div>

          <p class="text-silver text-sm font-body leading-relaxed mb-6">{{ b.bio }}</p>

          <div class="flex flex-wrap gap-1.5 justify-center mb-6">
            <span v-for="tag in b.tags" :key="tag" class="badge-gold text-[8px]">{{ tag }}</span>
          </div>

          <router-link to="/reservar" class="btn-gold w-full justify-center text-xs py-3"><span>Reservar con {{ b.name.split(' ')[0] }}</span></router-link>
        </div>
      </div>

      <!-- Why us -->
      <div class="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div v-for="w in whyUs" :key="w.label" class="text-center">
          <div class="text-3xl mb-3">{{ w.icon }}</div>
          <div class="font-display text-chalk tracking-wide mb-1">{{ w.label }}</div>
          <div class="text-silver text-sm font-body">{{ w.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBookingStore } from '@/stores/booking'
const booking = useBookingStore()

const barbers = booking.barbers.map(b => ({
  ...b,
  bio: {
    b1: 'Especialista en fades de alta precisión y esculpido de barba. Formado en Madrid, trae técnica europea con sensibilidad mexicana.',
    b2: 'Maestro de los cortes clásicos y peinados con volumen. Su pompadour es legendario en la colonia.',
    b3: 'El más joven del equipo pero con un ojo artístico excepcional. Especialista en diseños y skin fades extremos.',
  }[b.id],
  tags: {
    b1: ['Fade Expert','Beard Sculpt','Navaja'],
    b2: ['Clásicos','Pompadour','Tijera'],
    b3: ['Diseños','Skin Fade','Tattoo Look'],
  }[b.id]
}))

const whyUs = [
  { icon:'🏆', label:'Certificados', desc:'Formación internacional' },
  { icon:'🧴', label:'Productos Premium', desc:'Solo marcas profesionales' },
  { icon:'🪒', label:'Higiene Total', desc:'Esterilización en cada uso' },
  { icon:'⏱️', label:'Puntualidad', desc:'Tu tiempo es valioso' },
]
</script>
