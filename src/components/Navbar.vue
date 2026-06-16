<template>
  <nav class="fixed top-0 left-0 right-0 z-50" style="background:rgba(10,10,10,0.92);backdrop-filter:blur(16px);border-bottom:1px solid rgba(212,160,23,0.12)">
    <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-3 group">
        <div class="barber-pole-wrap flex-shrink-0">
          <div class="barber-pole"></div>
        </div>
        <div>
          <div class="font-display tracking-[0.15em] text-xl text-gold-400 leading-none group-hover:text-gold-300 transition-colors">KALASHNIKOV</div>
          <div class="text-[9px] tracking-[0.4em] text-silver uppercase font-body">Barber Shop</div>
        </div>
      </router-link>

      <!-- Desktop nav -->
      <div class="hidden lg:flex items-center gap-8">
        <router-link v-for="l in links" :key="l.to" :to="l.to" class="nav-link text-sm tracking-widest font-display uppercase">{{ l.label }}</router-link>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3">
        <router-link to="/reservar" class="hidden sm:inline-flex btn-gold text-xs py-2.5 px-6">
          <span>✂️ Reservar Cita</span>
        </router-link>

        <!-- User menu -->
        <div v-if="auth.isLoggedIn" class="relative" ref="menuRef">
          <button @click="menuOpen=!menuOpen" class="w-10 h-10 flex items-center justify-center text-gold-400 border border-gold-700 hover:border-gold-400 transition-colors text-sm font-display">
            {{ initials }}
          </button>
          <transition name="drop">
            <div v-if="menuOpen" class="absolute right-0 top-full mt-2 w-52 card-dark border border-gold-700/40 py-1 z-50">
              <div class="px-4 py-3 border-b border-smoke">
                <div class="text-sm font-bold text-chalk">{{ auth.profile?.full_name }}</div>
                <div class="text-xs text-silver">{{ auth.profile?.role }}</div>
              </div>
              <router-link to="/mis-citas" class="menu-item" @click="menuOpen=false">📅 Mis Citas</router-link>
              <router-link v-if="auth.isAdmin" to="/admin" class="menu-item" @click="menuOpen=false">⚙️ Panel Admin</router-link>
              <button @click="handleLogout" class="menu-item w-full text-left text-blood-400">🚪 Cerrar Sesión</button>
            </div>
          </transition>
        </div>
        <router-link v-else to="/auth" class="w-10 h-10 flex items-center justify-center text-silver hover:text-gold-400 border border-smoke hover:border-gold-700 transition-colors">👤</router-link>

        <!-- Mobile toggle -->
        <button @click="mobileOpen=!mobileOpen" class="lg:hidden w-10 h-10 flex items-center justify-center text-silver hover:text-gold-400 border border-smoke hover:border-gold-700 transition-colors">
          {{ mobileOpen ? '✕' : '☰' }}
        </button>
      </div>
    </div>

    <!-- Mobile nav -->
    <transition name="drop">
      <div v-if="mobileOpen" class="lg:hidden bg-blade border-t border-smoke px-4 py-4 space-y-1">
        <router-link v-for="l in links" :key="l.to" :to="l.to" class="block nav-link-mobile py-3 text-sm tracking-widest font-display uppercase border-b border-smoke/50" @click="mobileOpen=false">{{ l.label }}</router-link>
        <router-link to="/reservar" class="mt-4 btn-gold w-full justify-center text-xs py-3" @click="mobileOpen=false">✂️ Reservar Cita</router-link>
      </div>
    </transition>
  </nav>
  <div class="h-16"></div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const menuOpen = ref(false)
const mobileOpen = ref(false)
const menuRef = ref(null)
onClickOutside(menuRef, () => { menuOpen.value = false })

const initials = computed(() => (auth.profile?.full_name||'K').split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase())
const links = [
  { to:'/',         label:'Inicio' },
  { to:'/servicios',label:'Servicios' },
  { to:'/barberos', label:'Barberos' },
  { to:'/galeria',  label:'Galería' },
  { to:'/contacto', label:'Contacto' },
]
async function handleLogout() { menuOpen.value=false; await auth.logout(); router.push('/') }
</script>

<style scoped>
.nav-link { color: rgba(154,154,154,0.8); transition: color 0.2s; }
.nav-link:hover, .nav-link.router-link-active { color: #D4A017; }
.nav-link-mobile { color: rgba(154,154,154,0.8); transition: color 0.2s; display: block; }
.nav-link-mobile:hover { color: #D4A017; }
.menu-item { display:block; padding:0.6rem 1rem; font-size:0.8rem; font-family:'Nunito',sans-serif; color:rgba(245,240,232,0.75); transition:all 0.2s; cursor:pointer; }
.menu-item:hover { background:rgba(212,160,23,0.08); color:#F5F0E8; }
.drop-enter-active,.drop-leave-active { transition:all 0.2s; }
.drop-enter-from,.drop-leave-to { opacity:0; transform:translateY(-8px); }
</style>
