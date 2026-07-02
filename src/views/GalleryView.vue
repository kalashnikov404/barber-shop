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
        
        <div class="relative w-full h-full overflow-hidden"
  :style="`min-height:${g.tall?'380px':'180px'}`">

  <img
    :src="g.image"
    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
  />

  <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
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
          <div v-for="t in transformations"
  :key="t.id"
  class="card-dark overflow-hidden group transition-all duration-500 hover:-translate-y-2">
<div class="h-64 overflow-hidden relative">
 <img
  :src="t.image"
  :alt="t.style"
  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
/>

  <div class="absolute top-3 left-3 bg-black/70 px-2 py-1 rounded text-[10px] tracking-widest text-silver uppercase">
    Antes
  </div>

  <div class="absolute top-3 right-3 bg-gold-500 px-2 py-1 rounded text-[10px] tracking-widest text-ink uppercase">
    Después
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
         
         
<div class="h-96 w-full overflow-hidden">
  <img
    :src="selected.image"
    class="w-full h-full object-cover"
  />
</div>

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



const cats = ['Fade','Clásico','Barba','Color','Diseño']

const active = ref('all')

const gallery = [
  {
    id:1,
    cat:'Fade',
    image:skinfade,
    style:'Skin Fade Perfecto',
    barber:'Aleksei',
    bg:'linear-gradient(135deg,#1A1A1A,#2C2C2C)',
    tall:true
  },

  {
    id:11,
    cat:'Fade',
    image:altofade,
    style:'Skin Fade Alto',
    barber:'Aleksei',
    bg:'linear-gradient(135deg,#1A1A1A,#2C2C2C)',
    tall:true
  },


    {
    id:11,
    cat:'Fade',
    image:fadeuve,
    style:'Skin Fade en V',
    barber:'Aleksei',
    bg:'linear-gradient(135deg,#1A1A1A,#2C2C2C)',
    tall:true
  },

  {
    id:2,
    cat:'Clásico',
    image:clasico,
    style:'Corte Clásico Ejecutivo',
    barber:'Ivan',
    bg:'linear-gradient(135deg,#111,#222)',
    tall:false
  },

  {
    id:22,
    cat:'Clásico',
    image:clasicodos,
    style:'Corte Clásico Business',
    barber:'Ivan',
    bg:'linear-gradient(135deg,#111,#222)',
    tall:false
  },

    {
    id:222,
    cat:'Clásico',
    image:clasicotres,
    style:'Corte Clásico Juvenil',
    barber:'Ivan',
    bg:'linear-gradient(135deg,#111,#222)',
    tall:false
  },

  {
    id:3,
    cat:'Barba',
    image:barba,
    style:'Beard Sculpt Premium',
    barber:'Aleksei',
    bg:'linear-gradient(135deg,#1A1209,#2C1E0A)',
    tall:false
  },

  {
    id:33,
    cat:'Barba',
    image:barbados,
    style:'Beard Italian',
    barber:'Aleksei',
    bg:'linear-gradient(135deg,#1A1209,#2C1E0A)',
    tall:false
  },



    {
    id:333,
    cat:'Barba',
    image:barbatres,
    style:'Beard Long',
    barber:'Aleksei',
    bg:'linear-gradient(135deg,#1A1209,#2C1E0A)',
    tall:false
  },


  {
    id:4,
    cat:'Diseño',
    image:diseño,
    style:'Diseño Geométrico',
    barber:'Dmitri',
    bg:'linear-gradient(135deg,#0A0A1A,#111122)',
    tall:false
  }
]

const filtered = computed(() => active.value==='all' ? gallery : gallery.filter(g=>g.cat===active.value))
const selected = ref(null)

const transformations = [
  {
    id: 1,
    image: transformacion1,
    style: 'Transformación Skin Fade',
    barber: 'Aleksei'
  },
  {
    id: 2,
    image: transformacion2,
    style: 'Shaved beard',
    barber: 'Aleksei'
  },
  {
    id: 3,
    image: transformacion3,
    style: 'Look Ejecutivo',
    barber: 'Ivan'
  }
]
</script>
