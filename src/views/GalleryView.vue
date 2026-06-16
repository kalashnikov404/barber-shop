<template>
  <div class="min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-12">
        <div class="section-tag mb-3">— El Trabajo Habla</div>
        <h1 class="font-display text-5xl text-chalk">GALERÍA <span class="text-gold-gradient">DE ARTE</span></h1>
        <p class="text-silver font-body mt-4 max-w-xl mx-auto">Cada corte es una pieza única. Explora nuestro trabajo por categoría.</p>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-2 justify-center mb-10">
        <button @click="active='all'" class="px-5 py-2.5 text-xs font-display tracking-widest uppercase transition-all"
          :class="active==='all' ? 'bg-gold-500 text-ink' : 'border border-smoke text-silver hover:border-gold-700 hover:text-gold-400'">TODOS</button>
        <button v-for="c in cats" :key="c" @click="active=c" class="px-5 py-2.5 text-xs font-display tracking-widest uppercase transition-all"
          :class="active===c ? 'bg-gold-500 text-ink' : 'border border-smoke text-silver hover:border-gold-700 hover:text-gold-400'">{{ c }}</button>
      </div>

      <!-- Masonry-ish grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mb-16">
        <div v-for="g in filtered" :key="g.id" class="overflow-hidden cursor-pointer group relative" :style="`min-height:${g.tall?'380px':'180px'}`" @click="selected=g">
          <div class="w-full h-full flex items-center justify-center text-5xl md:text-7xl transition-transform duration-500 group-hover:scale-110"
            :style="`background:${g.bg};min-height:${g.tall?'380px':'180px'}`">
            {{ g.emoji }}
          </div>
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex flex-col items-center justify-center gap-1">
            <span class="text-white text-sm font-display tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">{{ g.style }}</span>
            <span class="text-gold-400 text-xs font-body opacity-0 group-hover:opacity-100 transition-opacity">por {{ g.barber }}</span>
          </div>
        </div>
      </div>

      <!-- Before/After -->
      <div class="mb-16">
        <div class="text-center mb-10">
          <div class="section-tag mb-3">— Transformaciones</div>
          <h2 class="font-display text-4xl text-chalk">ANTES <span class="text-silver">/</span> <span class="text-gold-gradient">DESPUÉS</span></h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="t in transformations" :key="t.id" class="card-dark overflow-hidden">
            <div class="grid grid-cols-2">
              <div class="h-40 flex items-center justify-center text-4xl relative" style="background:#1A1A1A">
                {{ t.before }}
                <span class="absolute bottom-2 left-2 text-[9px] text-silver tracking-widest uppercase">Antes</span>
              </div>
              <div class="h-40 flex items-center justify-center text-4xl relative" style="background:linear-gradient(135deg,#1A1500,#2C2200)">
                {{ t.after }}
                <span class="absolute bottom-2 left-2 text-[9px] text-gold-400 tracking-widest uppercase">Después</span>
              </div>
            </div>
            <div class="p-4">
              <div class="font-display text-chalk text-sm">{{ t.style }}</div>
              <div class="text-silver text-xs font-body">por {{ t.barber }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <teleport to="body">
      <div v-if="selected" class="fixed inset-0 z-50 flex items-center justify-center px-4 modal-backdrop" @click.self="selected=null">
        <div class="card-gold-border p-2 max-w-lg w-full">
          <div class="h-72 flex items-center justify-center text-9xl" :style="`background:${selected.bg}`">{{ selected.emoji }}</div>
          <div class="p-5 flex items-center justify-between">
            <div>
              <div class="font-display text-chalk text-lg">{{ selected.style }}</div>
              <div class="text-silver text-xs font-body">por {{ selected.barber }}</div>
            </div>
            <button @click="selected=null" class="w-9 h-9 flex items-center justify-center border border-smoke text-silver hover:text-gold-400 transition-colors">✕</button>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const cats = ['Fade','Clásico','Barba','Color','Diseño']
const active = ref('all')

const gallery = [
  { id:1,  cat:'Fade',    emoji:'💈', style:'Skin Fade Perfecto', barber:'Aleksei', bg:'linear-gradient(135deg,#1A1A1A,#2C2C2C)', tall:true },
  { id:2,  cat:'Clásico', emoji:'✂️', style:'Corte Clásico',       barber:'Ivan',    bg:'linear-gradient(135deg,#111,#222)', tall:false },
  { id:3,  cat:'Barba',   emoji:'🪒', style:'Beard Sculpt',        barber:'Aleksei', bg:'linear-gradient(135deg,#1A1209,#2C1E0A)', tall:false },
  { id:4,  cat:'Diseño',  emoji:'🎨', style:'Diseño Geométrico',   barber:'Dmitri',  bg:'linear-gradient(135deg,#0A0A1A,#111122)', tall:false },
  { id:5,  cat:'Barba',   emoji:'🧔', style:'Full Beard Art',      barber:'Aleksei', bg:'linear-gradient(135deg,#111,#1A1A1A)', tall:false },
  { id:6,  cat:'Clásico', emoji:'👑', style:'Pompadour VIP',       barber:'Ivan',    bg:'linear-gradient(135deg,#1A1500,#2C2200)', tall:true },
  { id:7,  cat:'Color',   emoji:'⚡', style:'Platinum Blonde',     barber:'Dmitri',  bg:'linear-gradient(135deg,#0A0A0A,#1A1A1A)', tall:false },
  { id:8,  cat:'Fade',    emoji:'🔥', style:'High Fade Trending',  barber:'Dmitri',  bg:'linear-gradient(135deg,#1A0A0A,#2C0A0A)', tall:false },
  { id:9,  cat:'Fade',    emoji:'💈', style:'Low Fade Clean',      barber:'Ivan',    bg:'linear-gradient(135deg,#151515,#252525)', tall:false },
  { id:10, cat:'Diseño',  emoji:'⚔️', style:'Tattoo Line Art',     barber:'Dmitri',  bg:'linear-gradient(135deg,#0A0A1A,#1A1A2A)', tall:false },
  { id:11, cat:'Color',   emoji:'🥈', style:'Gris Plata',          barber:'Aleksei', bg:'linear-gradient(135deg,#1A1A1A,#2A2A2A)', tall:true },
  { id:12, cat:'Clásico', emoji:'🎸', style:'Quiff Retro',         barber:'Ivan',    bg:'linear-gradient(135deg,#150A00,#251500)', tall:false },
]

const filtered = computed(() => active.value==='all' ? gallery : gallery.filter(g=>g.cat===active.value))
const selected = ref(null)

const transformations = [
  { id:1, before:'😐', after:'😎', style:'Transformación Skin Fade', barber:'Aleksei' },
  { id:2, before:'🧑', after:'🧔', style:'Beard Growth Sculpt',      barber:'Aleksei' },
  { id:3, before:'😶', after:'😏', style:'Look Ejecutivo',           barber:'Ivan' },
]
</script>
