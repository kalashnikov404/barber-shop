<template>
  <div class="min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-12">
        <div class="section-tag mb-3">— Catálogo Completo</div>
        <h1 class="font-display text-5xl text-chalk">NUESTROS <span class="text-gold-gradient">SERVICIOS</span></h1>
        <p class="text-silver font-body mt-4 max-w-xl mx-auto">Cada servicio incluido con precisión artesanal. Precios y duración transparentes.</p>
      </div>

      <!-- Category filter -->
      <div class="flex flex-wrap gap-2 justify-center mb-10">
        <button @click="active='all'" class="px-5 py-2.5 text-xs font-display tracking-widest uppercase transition-all"
          :class="active==='all' ? 'bg-gold-500 text-ink' : 'border border-smoke text-silver hover:border-gold-700 hover:text-gold-400'">
          TODOS
        </button>
        <button v-for="cat in categories" :key="cat" @click="active=cat" class="px-5 py-2.5 text-xs font-display tracking-widest uppercase transition-all"
          :class="active===cat ? 'bg-gold-500 text-ink' : 'border border-smoke text-silver hover:border-gold-700 hover:text-gold-400'">
          {{ cat }}
        </button>
      </div>

      <!-- Grid grouped by category -->
      <div v-for="cat in displayCategories" :key="cat" class="mb-12">
        <div class="flex items-center gap-4 mb-6">
          <h2 class="font-display text-2xl text-gold-400 tracking-wide">{{ cat.toUpperCase() }}</h2>
          <div class="gold-line-full flex-1"></div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="s in byCategory(cat)" :key="s.id" class="service-card">
            <div class="flex items-start justify-between mb-3">
              <span class="text-4xl">{{ s.icon }}</span>
              <div v-if="s.popular" class="badge-blood text-[9px]">POPULAR</div>
            </div>
            <h3 class="font-display text-lg text-chalk tracking-wide mb-1">{{ s.name }}</h3>
            <p class="text-silver text-xs font-body leading-relaxed mb-5">{{ s.desc }}</p>
            <div class="flex items-center justify-between mb-4">
              <span class="font-display text-xl text-gold-400">${{ s.price }} <span class="text-silver text-xs font-body">MXN</span></span>
              <span class="text-silver text-xs">⏱ {{ s.duration }} min</span>
            </div>
            <router-link to="/reservar" class="btn-outline-gold w-full justify-center text-xs py-2">Reservar →</router-link>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="card-gold-border p-10 text-center mt-16">
        <div class="text-5xl mb-4">✂️</div>
        <h2 class="font-display text-3xl text-chalk mb-3">¿LISTO PARA TU TRANSFORMACIÓN?</h2>
        <p class="text-silver font-body mb-6 max-w-md mx-auto">Reserva en línea en menos de 2 minutos. Elige tus servicios, barbero y horario.</p>
        <router-link to="/reservar" class="btn-gold px-12 py-4 text-sm"><span>✂️ RESERVAR AHORA</span></router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useServicesStore } from '@/stores/services'

const store = useServicesStore()
const services = store.defaultCatalog
const categories = store.categories
const active = ref('all')

const displayCategories = computed(() => active.value === 'all' ? categories : [active.value])
function byCategory(cat) { return services.filter(s => s.category === cat) }
</script>
