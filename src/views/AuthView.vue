<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-ink">
    <div class="absolute inset-0" style="background-image:linear-gradient(rgba(212,160,23,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(212,160,23,0.03) 1px,transparent 1px);background-size:60px 60px;"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full" style="background:radial-gradient(circle,rgba(212,160,23,0.06) 0%,transparent 70%);"></div>

    <div class="w-full max-w-md relative z-10">
      <div class="text-center mb-10">
        <router-link to="/" class="inline-flex flex-col items-center gap-3">
          <div class="barber-pole-wrap"><div class="barber-pole"></div></div>
          <div class="font-display tracking-[0.15em] text-2xl text-gold-400">KALASHNIKOV</div>
          <div class="text-[9px] tracking-[0.4em] text-silver uppercase font-body">Barber Shop</div>
        </router-link>
      </div>

      <div class="flex mb-6 border border-smoke">
        <button @click="mode='login'" class="flex-1 py-3 font-display text-xs tracking-widest uppercase transition-all" :class="mode==='login' ? 'bg-gold-500 text-ink' : 'text-silver'">Iniciar Sesión</button>
        <button @click="mode='register'" class="flex-1 py-3 font-display text-xs tracking-widest uppercase transition-all" :class="mode==='register' ? 'bg-gold-500 text-ink' : 'text-silver'">Crear Cuenta</button>
      </div>

      <div v-if="mode==='login'" class="card-dark p-6 space-y-4">
        <h2 class="font-display text-xl text-chalk mb-1">BIENVENIDO DE VUELTA</h2>
        <div>
          <label class="section-tag text-[9px] mb-2 block">CORREO</label>
          <input v-model="loginForm.email" type="email" class="input-dark" placeholder="tu@email.com" />
        </div>
        <div class="relative">
          <label class="section-tag text-[9px] mb-2 block">CONTRASEÑA</label>
          <input v-model="loginForm.password" :type="showPass?'text':'password'" class="input-dark pr-12" placeholder="••••••••" />
          <button @click="showPass=!showPass" class="absolute right-4 top-9 text-silver">{{ showPass?'🙈':'👁️' }}</button>
        </div>
        <button @click="handleLogin" :disabled="auth.loading" class="btn-gold w-full py-3.5 text-sm">
          <span v-if="!auth.loading">ENTRAR</span>
          <span v-else class="flex items-center gap-2 justify-center"><span class="animate-spin">✂️</span> Entrando...</span>
        </button>
      </div>

      <div v-else class="card-dark p-6 space-y-4">
        <h2 class="font-display text-xl text-chalk mb-1">ÚNETE AL CLUB</h2>
        <div>
          <label class="section-tag text-[9px] mb-2 block">NOMBRE COMPLETO</label>
          <input v-model="regForm.name" class="input-dark" placeholder="Tu nombre completo" />
        </div>
        <div>
          <label class="section-tag text-[9px] mb-2 block">CORREO</label>
          <input v-model="regForm.email" type="email" class="input-dark" placeholder="tu@email.com" />
        </div>
        <div>
          <label class="section-tag text-[9px] mb-2 block">TELÉFONO</label>
          <input v-model="regForm.phone" class="input-dark" placeholder="55 1234 5678" />
        </div>
        <div class="relative">
          <label class="section-tag text-[9px] mb-2 block">CONTRASEÑA</label>
          <input v-model="regForm.password" :type="showPass?'text':'password'" class="input-dark pr-12" placeholder="Mínimo 8 caracteres" />
          <button @click="showPass=!showPass" class="absolute right-4 top-9 text-silver">{{ showPass?'🙈':'👁️' }}</button>
        </div>
        <button @click="handleRegister" :disabled="auth.loading" class="btn-gold w-full py-3.5 text-sm">
          <span v-if="!auth.loading">CREAR CUENTA</span>
          <span v-else class="flex items-center gap-2 justify-center"><span class="animate-spin">✂️</span> Creando...</span>
        </button>
      </div>

      <router-link to="/" class="block text-center mt-6 text-silver hover:text-gold-400 transition-colors text-sm font-body">← Volver al inicio</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const mode = ref('login')
const showPass = ref(false)
const loginForm = ref({ email:'', password:'' })
const regForm = ref({ name:'', email:'', phone:'', password:'' })

async function handleLogin() {
  if (!loginForm.value.email || !loginForm.value.password) return
  const r = await auth.login(loginForm.value.email, loginForm.value.password)
  if (r.success) router.push(route.query.redirect || '/')
}
async function handleRegister() {
  const { name, email, phone, password } = regForm.value
  if (!name || !email || !password) return
  const r = await auth.register(email, password, name, phone)
  if (r.success) mode.value = 'login'
}
</script>
