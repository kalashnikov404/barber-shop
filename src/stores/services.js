import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

export const useServicesStore = defineStore('services', () => {
  const catalog = ref([])
  const loading = ref(false)

  // Hardcoded catalog (used as demo when Supabase not connected)
  const defaultCatalog = [
    // ── CORTES ──
    { id:'s01', category:'Cortes', name:'Corte Clásico',        price:150, duration:30, icon:'✂️',  popular:false, desc:'Corte tradicional con tijera y navaja. Acabado limpio y atemporal.' },
    { id:'s02', category:'Cortes', name:'Skin Fade',            price:200, duration:45, icon:'💈',  popular:true,  desc:'Degradado perfecto al ras de la piel. Definición máxima.' },
    { id:'s03', category:'Cortes', name:'Fade + Diseño',        price:250, duration:60, icon:'🎨',  popular:true,  desc:'Fade con líneas y diseños personalizados a navaja.' },
    { id:'s04', category:'Cortes', name:'Corte + Barba',        price:300, duration:60, icon:'🪒',  popular:true,  desc:'Combo completo: corte a tu estilo + arreglo y perfilado de barba.' },
    { id:'s05', category:'Cortes', name:'Corte Infantil',       price:120, duration:30, icon:'👦',  popular:false, desc:'Corte para niños hasta 12 años. Paciencia y precisión garantizada.' },
    { id:'s06', category:'Cortes', name:'Pompadour / Quiff',    price:230, duration:50, icon:'🎸',  popular:false, desc:'Volumen y estructura. Estilo retro con acabado moderno.' },
    // ── BARBA ──
    { id:'s07', category:'Barba',  name:'Arreglo de Barba',     price:120, duration:25, icon:'🪒',  popular:true,  desc:'Perfilado, delineado y acabado con navaja caliente.' },
    { id:'s08', category:'Barba',  name:'Afeitado Clásico',     price:150, duration:35, icon:'🫧',  popular:false, desc:'Afeitado completo con toalla caliente, navaja y aceites premium.' },
    { id:'s09', category:'Barba',  name:'Beard Sculpt',         price:200, duration:45, icon:'🧔',  popular:false, desc:'Escultura total de barba: forma, volumen y definición.' },
    { id:'s10', category:'Barba',  name:'Barba + Hidratación',  price:230, duration:50, icon:'💆',  popular:false, desc:'Arreglo completo + mascarilla hidratante y aceite de barba.' },
    // ── TRATAMIENTOS ──
    { id:'s11', category:'Tratamientos', name:'Keratina Capilar',  price:450, duration:90, icon:'✨', popular:false, desc:'Tratamiento de keratina para cabello liso, brillante y sin frizz.' },
    { id:'s12', category:'Tratamientos', name:'Hidratación Profunda',price:280, duration:60, icon:'💧',popular:false, desc:'Mascarilla hidratante + vapor + aclarado. Cabello renovado.' },
    { id:'s13', category:'Tratamientos', name:'Masaje Capilar',     price:180, duration:30, icon:'🧴', popular:false, desc:'Masaje relajante del cuero cabelludo con aceites esenciales.' },
    { id:'s14', category:'Tratamientos', name:'Tratamiento Anti-caspa',price:220,duration:45,icon:'🌿',popular:false,desc:'Limpieza profunda + loción especializada. Resultados visibles.' },
    // ── COLOR ──
    { id:'s15', category:'Color',  name:'Tinte Completo',       price:400, duration:90, icon:'🎨',  popular:false, desc:'Coloración completa con tinte de calidad premium.' },
    { id:'s16', category:'Color',  name:'Mechas / Highlights',  price:500, duration:120,icon:'⚡',  popular:false, desc:'Mechas o highlights a mano alzada. Efecto natural o dramático.' },
    { id:'s17', category:'Color',  name:'Decoloración + Tinte', price:650, duration:150,icon:'🔥',  popular:false, desc:'Proceso completo: decoloración base + aplicación de color.' },
    { id:'s18', category:'Color',  name:'Gris / Plata',         price:700, duration:150,icon:'🥈',  popular:true,  desc:'Look gris platino o plata. El más solicitado de la temporada.' },
    // ── CEJAS ──
    { id:'s19', category:'Cejas',  name:'Depilación de Cejas',  price:80,  duration:15, icon:'👁️', popular:false, desc:'Depilación con hilo o cera. Diseño y definición perfecta.' },
    { id:'s20', category:'Cejas',  name:'Cejas + Barba Combo',  price:180, duration:35, icon:'💎',  popular:false, desc:'Diseño de cejas + perfilado de barba. Combo de precisión.' },
    // ── PAQUETES ──
    { id:'s21', category:'Paquetes', name:'Paquete VIP',        price:550, duration:120,icon:'👑',  popular:true,  desc:'Corte + Barba Sculpt + Masaje + Hidratación + Tratamiento. La experiencia completa.' },
    { id:'s22', category:'Paquetes', name:'Paquete Novia/o',    price:800, duration:150,icon:'💍',  popular:false, desc:'Look completo para tu día especial. Corte + Color + Barba + Manicura.' },
    { id:'s23', category:'Paquetes', name:'Paquete Ejecutivo',  price:400, duration:90, icon:'👔',  popular:false, desc:'Corte + Afeitado clásico + Masaje capilar. Para el hombre ocupado.' },
  ]

  async function fetchCatalog() {
    loading.value = true
    const { data, error } = await supabase.from('services').select('*').eq('active', true).order('category')
    catalog.value = (data && data.length > 0) ? data : defaultCatalog
    loading.value = false
  }

  // Expose default catalog for components that need it without fetching
  function getCatalog() {
    return catalog.value.length > 0 ? catalog.value : defaultCatalog
  }

  const categories = ['Cortes','Barba','Tratamientos','Color','Cejas','Paquetes']

  return { catalog, loading, defaultCatalog, categories, fetchCatalog, getCatalog }
})
