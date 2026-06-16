<template>
  <footer class="border-t border-smoke bg-blade mt-20">
    <div class="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
      <div class="md:col-span-2">
        <div class="flex items-center gap-3 mb-5">
          <div class="barber-pole-wrap"><div class="barber-pole"></div></div>
          <div>
            <div class="font-display tracking-[0.15em] text-2xl text-gold-400">KALASHNIKOV</div>
            <div class="text-[9px] tracking-[0.4em] text-silver uppercase font-body">Barber Shop</div>
          </div>
        </div>
        <p class="text-silver text-sm font-body leading-relaxed max-w-xs">Precisión. Estilo. Carácter. Donde cada corte es una obra de arte y cada cliente sale transformado.</p>
        <div class="mt-5 space-y-1 text-sm text-silver font-body">
          <div>📍 Insurgentes Sur 1234, CDMX</div>
          <div>📞 +52 55 1234 5678</div>
          <div>⏰ Lun–Sáb: 9:00–20:00 · Dom: 10:00–17:00</div>
        </div>
      </div>
      <div>
        <div class="section-tag mb-4">Servicios</div>
        <ul class="space-y-2 text-sm text-silver font-body">
          <li v-for="s in footerServices" :key="s"><a class="hover:text-gold-400 transition-colors">{{ s }}</a></li>
        </ul>
      </div>
      <div>
        <div class="section-tag mb-4">Accesos</div>
        <ul class="space-y-2 text-sm text-silver font-body">
          <li><router-link to="/reservar" class="hover:text-gold-400 transition-colors">✂️ Reservar Cita</router-link></li>
          <li><router-link to="/galeria" class="hover:text-gold-400 transition-colors">📸 Galería</router-link></li>
          <li><router-link to="/barberos" class="hover:text-gold-400 transition-colors">💈 Nuestros Barberos</router-link></li>
          <li><router-link to="/auth" class="hover:text-gold-400 transition-colors">👤 Mi Cuenta</router-link></li>
          <li><router-link to="/contacto" class="hover:text-gold-400 transition-colors">📬 Contacto</router-link></li>
        </ul>
      </div>
    </div>
    <div class="gold-line-full"></div>
    <div class="py-5 text-center text-xs text-silver/50 font-body">
      © {{ new Date().getFullYear() }} Barber Shop Kalashnikov · Diseño y desarrollo <span class="text-gold-600 font-bold">RB</span> · Todos los derechos reservados
    </div>
  </footer>
</template>

<script setup>
const footerServices = ['Skin Fade','Corte Clásico','Arreglo de Barba','Afeitado con Navaja','Tratamientos Capilares','Coloración','Paquete VIP']
</script>
