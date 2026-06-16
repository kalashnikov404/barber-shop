import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/',          name: 'Landing',    component: () => import('@/views/LandingView.vue') },
  { path: '/servicios', name: 'Services',   component: () => import('@/views/ServicesView.vue') },
  { path: '/reservar',  name: 'Booking',    component: () => import('@/views/BookingView.vue') },
  { path: '/galeria',   name: 'Gallery',    component: () => import('@/views/GalleryView.vue') },
  { path: '/barberos',  name: 'Barbers',    component: () => import('@/views/BarbersView.vue') },
  { path: '/contacto',  name: 'Contact',    component: () => import('@/views/ContactView.vue') },
  { path: '/auth',      name: 'Auth',       component: () => import('@/views/AuthView.vue') },
  { path: '/mis-citas', name: 'MyCitas',    component: () => import('@/views/MyAppointmentsView.vue'), meta: { requiresAuth: true } },
  { path: '/admin',     name: 'Admin',      component: () => import('@/views/AdminView.vue'), meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFound.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' })
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()
  if (!auth.isLoggedIn && !auth.profile) await auth.initialize()
  if (to.meta.requiresAuth && !auth.isLoggedIn) return { name: 'Auth', query: { redirect: to.fullPath } }
  if (to.meta.requiresAdmin && !auth.isAdmin) return { name: 'Landing' }
})

export default router
