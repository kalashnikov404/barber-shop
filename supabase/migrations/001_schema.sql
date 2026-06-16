-- =====================================================
-- BARBER SHOP KALASHNIKOV — Supabase Schema
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- =====================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────────────────────────────────
-- PROFILES
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT,
  full_name   TEXT,
  phone       TEXT,
  role        TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('admin','barber','client')),
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, phone, role)
  VALUES (
    NEW.id, NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name',''),
    COALESCE(NEW.raw_user_meta_data->>'phone',''),
    COALESCE(NEW.raw_user_meta_data->>'role','client')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─────────────────────────────────────────────
-- BARBERS (perfil profesional, distinto del profile de auth)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.barbers (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name         TEXT NOT NULL,
  specialty    TEXT,
  bio          TEXT,
  years_exp    INTEGER,
  rating       NUMERIC(2,1) DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 0,
  avatar_url   TEXT,
  active       BOOLEAN DEFAULT TRUE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- SERVICES (catálogo)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.services (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  category    TEXT NOT NULL CHECK (category IN ('Cortes','Barba','Tratamientos','Color','Cejas','Paquetes')),
  description TEXT,
  price       NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  duration    INTEGER NOT NULL, -- minutos
  icon        TEXT DEFAULT '✂️',
  popular     BOOLEAN DEFAULT FALSE,
  active      BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- BARBER SCHEDULE (horario regular semanal)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.barber_schedule (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  barber_id   UUID REFERENCES public.barbers(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0=domingo
  start_time  TIME NOT NULL,
  end_time    TIME NOT NULL,
  active      BOOLEAN DEFAULT TRUE
);

-- Bloqueos de horario (vacaciones, días festivos, mantenimiento)
CREATE TABLE IF NOT EXISTS public.schedule_blocks (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  barber_id   UUID REFERENCES public.barbers(id) ON DELETE CASCADE, -- NULL = aplica a todos
  date        DATE NOT NULL,
  start_time  TIME, -- NULL = todo el día
  end_time    TIME,
  reason      TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- APPOINTMENTS (citas)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.appointments (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  barber_id       UUID REFERENCES public.barbers(id) ON DELETE SET NULL,
  barber_name     TEXT,
  services        JSONB NOT NULL, -- array de {id,name,price,duration}
  date            DATE NOT NULL,
  time            TIME NOT NULL,
  client_name     TEXT NOT NULL,
  client_phone    TEXT NOT NULL,
  client_email    TEXT,
  notes           TEXT,
  total_price     NUMERIC(10,2) NOT NULL,
  total_duration  INTEGER NOT NULL,
  payment_method  TEXT CHECK (payment_method IN ('cash','online')),
  payment_status  TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid','paid','refunded')),
  mp_preference_id TEXT,
  mp_payment_id   TEXT,
  status          TEXT DEFAULT 'pending_payment' CHECK (status IN (
    'pending_payment','confirmed','completed','cancelled','no_show'
  )),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- REVIEWS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.reviews (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  appointment_id UUID REFERENCES public.appointments(id) ON DELETE CASCADE,
  user_id       UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  barber_id     UUID REFERENCES public.barbers(id) ON DELETE SET NULL,
  rating        INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment       TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- GALLERY (trabajos realizados)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.gallery (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  barber_id   UUID REFERENCES public.barbers(id) ON DELETE SET NULL,
  category    TEXT,
  style_name  TEXT,
  image_url   TEXT,
  before_url  TEXT,
  after_url   TEXT,
  featured    BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ─────────────────────────────────────────────
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.barbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.barber_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedule_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins view all profiles" ON public.profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins update all profiles" ON public.profiles FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Barbers, services, gallery: lectura pública, gestión admin
CREATE POLICY "Public read barbers" ON public.barbers FOR SELECT USING (active = TRUE);
CREATE POLICY "Admins manage barbers" ON public.barbers FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Public read services" ON public.services FOR SELECT USING (active = TRUE);
CREATE POLICY "Admins manage services" ON public.services FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Public read gallery" ON public.gallery FOR SELECT USING (TRUE);
CREATE POLICY "Admins manage gallery" ON public.gallery FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin','barber'))
);

-- Schedule: lectura pública (para calcular disponibilidad), gestión admin
CREATE POLICY "Public read schedule" ON public.barber_schedule FOR SELECT USING (TRUE);
CREATE POLICY "Admins manage schedule" ON public.barber_schedule FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Public read blocks" ON public.schedule_blocks FOR SELECT USING (TRUE);
CREATE POLICY "Admins manage blocks" ON public.schedule_blocks FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin','barber'))
);

-- Appointments: cliente ve/crea las suyas, admin/barber ven todas
CREATE POLICY "Anyone can create appointment" ON public.appointments FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Users view own appointments" ON public.appointments FOR SELECT USING (
  user_id = auth.uid() OR user_id IS NULL
);
CREATE POLICY "Users update own appointments" ON public.appointments FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Staff manage all appointments" ON public.appointments FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin','barber'))
);

-- Reviews: lectura pública, creación por cliente autenticado
CREATE POLICY "Public read reviews" ON public.reviews FOR SELECT USING (TRUE);
CREATE POLICY "Users create own reviews" ON public.reviews FOR INSERT WITH CHECK (user_id = auth.uid());

-- ─────────────────────────────────────────────
-- SEED: Servicios iniciales
-- ─────────────────────────────────────────────
INSERT INTO public.services (name, category, description, price, duration, icon, popular) VALUES
('Corte Clásico','Cortes','Corte tradicional con tijera y navaja. Acabado limpio y atemporal.',150,30,'✂️',false),
('Skin Fade','Cortes','Degradado perfecto al ras de la piel. Definición máxima.',200,45,'💈',true),
('Fade + Diseño','Cortes','Fade con líneas y diseños personalizados a navaja.',250,60,'🎨',true),
('Corte + Barba','Cortes','Combo completo: corte a tu estilo + arreglo y perfilado de barba.',300,60,'🪒',true),
('Arreglo de Barba','Barba','Perfilado, delineado y acabado con navaja caliente.',120,25,'🪒',true),
('Afeitado Clásico','Barba','Afeitado completo con toalla caliente, navaja y aceites premium.',150,35,'🫧',false),
('Paquete VIP','Paquetes','Corte + Barba Sculpt + Masaje + Hidratación + Tratamiento. La experiencia completa.',550,120,'👑',true)
ON CONFLICT DO NOTHING;

-- ─────────────────────────────────────────────
-- SEED: Barberos iniciales
-- ─────────────────────────────────────────────
INSERT INTO public.barbers (name, specialty, bio, years_exp, rating, reviews_count, active) VALUES
('Aleksei "Blade" Volkov', 'Fade & Beard Sculpt', 'Especialista en fades de alta precisión y esculpido de barba.', 8, 4.9, 312, true),
('Ivan "Sharp" Petrov', 'Clásicos & Pompadour', 'Maestro de los cortes clásicos y peinados con volumen.', 6, 4.8, 218, true),
('Dmitri "Rex" Morozov', 'Skin Fade & Tattoo Look', 'Especialista en diseños y skin fades extremos.', 5, 4.7, 175, true)
ON CONFLICT DO NOTHING;

-- ─────────────────────────────────────────────
-- PRIMER ADMIN
-- Después de registrarte, ejecuta:
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'tu@email.com';
-- ─────────────────────────────────────────────

-- ─────────────────────────────────────────────
-- STORAGE BUCKETS (ejecutar manualmente si se requiere)
-- ─────────────────────────────────────────────
-- INSERT INTO storage.buckets (id, name, public) VALUES ('gallery-images', 'gallery-images', TRUE);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('barber-avatars', 'barber-avatars', TRUE);
