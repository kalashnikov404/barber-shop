<template>
  <div class="min-h-screen bg-ink noise">
    <Navbar v-if="!isBookingFlow" />
    <router-view v-slot="{ Component, route }">
      <transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
    <Footer v-if="!isBookingFlow" />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

const route = useRoute()
const auth = useAuthStore()
const isBookingFlow = computed(() => route.name === 'Auth')

onMounted(() => auth.initialize())
</script>

<style>
.page-enter-active, .page-leave-active { transition: opacity 0.3s ease; }
.page-enter-from, .page-leave-to { opacity: 0; }
.noise::after {
  content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 999; opacity: 0.02;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
</style>
