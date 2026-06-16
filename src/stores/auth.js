import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase, signIn, signUp, signOut } from '@/lib/supabase'
import { useToast } from 'vue-toastification'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const profile = ref(null)
  const loading = ref(false)
  const toast = useToast()

  const isAdmin = computed(() => profile.value?.role === 'admin')
  const isBarber = computed(() => profile.value?.role === 'barber' || profile.value?.role === 'admin')
  const isLoggedIn = computed(() => !!user.value)

  async function initialize() {
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.user) { user.value = session.user; await fetchProfile() }
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) { user.value = session.user; await fetchProfile() }
      else if (event === 'SIGNED_OUT') { user.value = null; profile.value = null }
    })
  }

  async function fetchProfile() {
    if (!user.value) return
    const { data } = await supabase.from('profiles').select('*').eq('id', user.value.id).single()
    profile.value = data
  }

  async function login(email, password) {
    loading.value = true
    try {
      const { data, error } = await signIn(email, password)
      if (error) throw error
      user.value = data.user
      await fetchProfile()
      toast.success('✂️ Bienvenido de vuelta')
      return { success: true }
    } catch (err) {
      toast.error('Credenciales incorrectas')
      return { success: false }
    } finally { loading.value = false }
  }

  async function register(email, password, name, phone) {
    loading.value = true
    try {
      const { error } = await signUp(email, password, { full_name: name, phone, role: 'client' })
      if (error) throw error
      toast.success('¡Cuenta creada! Revisa tu correo ✂️')
      return { success: true }
    } catch (err) {
      toast.error(err.message)
      return { success: false }
    } finally { loading.value = false }
  }

  async function logout() {
    await signOut()
    user.value = null; profile.value = null
    toast.info('Hasta la próxima 👋')
  }

  return { user, profile, loading, isAdmin, isBarber, isLoggedIn, initialize, login, register, logout, fetchProfile }
})
