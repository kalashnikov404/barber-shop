# ✂️ Barber Shop Kalashnikov

> Sitio web completo con reservas de citas en línea, catálogo de servicios, selección de barbero, pagos anticipados o en efectivo, y panel de administración.

**Identidad visual:** Negro carbón + Dorado premium + Rojo acento — estética dark, lujosa, sin concesiones.

---

## 🚀 GUÍA DE INSTALACIÓN PASO A PASO

### Requisitos previos
- Node.js 18 o superior
- Cuenta gratuita en [supabase.com](https://supabase.com)
- Cuenta gratuita en [vercel.com](https://vercel.com)

---

## PASO 1 — Configurar Supabase (backend)

1. Entra a [supabase.com](https://supabase.com) → **New Project**
2. Nombre: `barber-kalashnikov` → Región: **South America (São Paulo)** (más cercana a México)
3. Espera ~2 minutos a que se inicialice
4. Ve a **SQL Editor → New Query**
5. Abre `supabase/migrations/001_schema.sql`, copia **todo** su contenido y pégalo
6. Haz clic en **Run** → debe decir "Success" (esto crea las tablas, políticas de seguridad, y precarga 7 servicios + 3 barberos de ejemplo)
7. Ve a **Project Settings → API** y copia:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public key** → `VITE_SUPABASE_ANON_KEY`

### Configurar autenticación
1. **Authentication → URL Configuration**
2. **Site URL**: `http://localhost:5173`
3. **Redirect URLs**: agrega `http://localhost:5173/**` y luego tu dominio de Vercel cuando lo tengas

---

## PASO 2 — Configurar el proyecto local

```bash
cd barber-kalashnikov
npm install
cp .env.example .env
# Edita .env con tus credenciales de Supabase
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) ✂️

---

## PASO 3 — Crear tu primer Administrador

1. Regístrate en la app (botón "Crear Cuenta")
2. En Supabase → **Table Editor → profiles**, busca tu fila y cambia `role` a `admin`

   O en **SQL Editor**:
   ```sql
   UPDATE public.profiles SET role = 'admin' WHERE email = 'tu@email.com';
   ```
3. Recarga la app → verás **⚙️ Panel Admin** en el menú de usuario

---

## PASO 4 — Deploy en Vercel

```bash
npm install -g vercel
npm run build   # Verifica que compile sin errores
vercel --prod
```

En Vercel agrega las variables de entorno `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`, luego regresa a Supabase y agrega tu dominio `.vercel.app` a las Redirect URLs.

---

## 🪒 MÓDULOS INCLUIDOS

| Módulo | Ruta | Descripción |
|--------|------|-------------|
| 🏠 Landing | `/` | Hero épico, servicios destacados, CTA de reserva, barberos, galería preview, reseñas |
| ✂️ Servicios | `/servicios` | Catálogo completo de 23 servicios en 6 categorías con precio y duración |
| 📅 Reservar | `/reservar` | **Wizard de 7 pasos**: Servicios → Barbero → Fecha → Hora → Datos → Pago → Confirmación |
| 💈 Barberos | `/barberos` | Perfiles del equipo con especialidad, rating y bio |
| 📸 Galería | `/galeria` | Trabajos por categoría + sección antes/después + lightbox |
| 📬 Contacto | `/contacto` | Ubicación, horarios, formulario de contacto |
| 👤 Mis Citas | `/mis-citas` | Historial de citas del cliente (próximas/pasadas) con opción de cancelar |
| ⚙️ Admin | `/admin` | Citas del día, gestión de barberos, catálogo de servicios, bloqueos de horario, configuración |

### El flujo de reserva (lo más importante)
1. **Servicios**: selección múltiple con filtro por categoría, resumen de precio/duración en vivo
2. **Barbero**: elegir uno específico o "sin preferencia"
3. **Fecha**: calendario interactivo (mes navegable, días pasados bloqueados)
4. **Horario**: slots de 30 min mañana/tarde, marcados como ocupados o disponibles
5. **Datos**: nombre, teléfono, email, notas
6. **Pago**: efectivo al llegar O en línea (tarjeta/Mercado Pago, formulario listo para integrar)
7. **Confirmación**: folio de cita, resumen completo, opción de agendar otra

---

## 🎨 PALETA DE COLORES

| Color | Hex | Uso |
|-------|-----|-----|
| ⚫ Ink/Blade | `#0A0A0A` / `#111111` | Fondos principales |
| 🟡 Gold | `#D4A017` → `#EEC643` | Color de marca, botones, acentos |
| 🔴 Blood | `#E11D1D` → `#FF4444` | Badges "popular", acentos de urgencia |
| ⚪ Chalk | `#F5F0E8` | Texto principal |
| ⚙️ Silver/Smoke | `#9A9A9A` / `#2C2C2C` | Texto secundario, bordes |

---

## 📦 ESTRUCTURA DEL PROYECTO

```
barber-kalashnikov/
├── src/
│   ├── views/
│   │   ├── LandingView.vue        # Página de inicio
│   │   ├── ServicesView.vue       # Catálogo completo
│   │   ├── BookingView.vue        # Wizard de reserva (7 pasos)
│   │   ├── BarbersView.vue        # Equipo de barberos
│   │   ├── GalleryView.vue        # Galería + antes/después
│   │   ├── ContactView.vue        # Contacto y ubicación
│   │   ├── AuthView.vue           # Login / Registro
│   │   ├── MyAppointmentsView.vue # Mis citas
│   │   ├── AdminView.vue          # Panel de administración
│   │   └── NotFound.vue
│   ├── components/
│   │   ├── Navbar.vue             # Con barber pole animado
│   │   └── Footer.vue
│   ├── stores/        # Pinia
│   │   ├── auth.js                # Sesión y roles
│   │   ├── booking.js             # Estado del wizard de reserva
│   │   └── services.js            # Catálogo de 23 servicios
│   ├── lib/supabase.js
│   └── router/index.js
├── supabase/migrations/001_schema.sql   # Schema + seed de servicios y barberos
├── .env.example
├── vercel.json
└── package.json
```

---

## ⚠️ PENDIENTES PARA PRODUCCIÓN REAL

| Módulo | Estado actual | Qué falta |
|--------|---------------|-----------|
| Disponibilidad de horarios | Demo con slots fijos | Conectar `barber_schedule` y `appointments` reales para calcular disponibilidad dinámica |
| Pago en línea | UI completa (formulario de tarjeta) | Integrar Mercado Pago SDK / Checkout Pro vía Edge Function con tu Access Token |
| Notificaciones de cita | No incluido | SMS/WhatsApp (Twilio) o email (Resend) al confirmar/recordar cita |
| Galería de imágenes reales | Emojis decorativos | Subir fotos reales a Supabase Storage bucket `gallery-images` |
| Reseñas reales | Hardcoded en Landing | Conectar tabla `reviews` ya creada en el schema |
| Bloqueo de horarios | UI lista en Admin | Conectar formulario a tabla `schedule_blocks` |
| Reportes de ingresos | Solo números demo | Crear vistas SQL agregadas (`SUM(total_price)` por fecha/barbero) |

---

## 🛠️ Comandos

```bash
npm run dev      # Desarrollo local (http://localhost:5173)
npm run build    # Build de producción
npm run preview  # Previsualizar el build
```

---

*Barber Shop Kalashnikov · Diseño y desarrollo RB · 2025*
