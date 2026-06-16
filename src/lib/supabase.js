import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials not configured. Demo mode active.')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder',
  { auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true } }
)

export const signUp = (email, password, meta) =>
  supabase.auth.signUp({ email, password, options: { data: meta } })
export const signIn = (email, password) =>
  supabase.auth.signInWithPassword({ email, password })
export const signOut = () => supabase.auth.signOut()
