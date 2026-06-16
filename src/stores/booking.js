import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'
import { useToast } from 'vue-toastification'

export const useBookingStore = defineStore('booking', () => {
  const toast = useToast()

  // Booking wizard state
  const step = ref(1) // 1=services 2=barber 3=date 4=time 5=details 6=payment 7=confirm
  const selectedServices = ref([])
  const selectedBarber = ref(null)
  const selectedDate = ref(null)
  const selectedTime = ref(null)
  const clientName = ref('')
  const clientPhone = ref('')
  const clientEmail = ref('')
  const notes = ref('')
  const paymentMethod = ref('cash') // 'cash' | 'online'
  const bookingId = ref(null)
  const loading = ref(false)

  // Appointments list
  const appointments = ref([])
  const myAppointments = ref([])

  // Available barbers
  const barbers = ref([
    { id: 'b1', name: 'Aleksei "Blade" Volkov', specialty: 'Fade & Beard Sculpt', exp: '8 años', emoji: '💈', rating: 4.9, reviews: 312, avatar_initial: 'AV', active: true },
    { id: 'b2', name: 'Ivan "Sharp" Petrov',    specialty: 'Clásicos & Pompadour',  exp: '6 años', emoji: '✂️', rating: 4.8, reviews: 218, avatar_initial: 'IP', active: true },
    { id: 'b3', name: 'Dmitri "Rex" Morozov',   specialty: 'Skin Fade & Tattoo Look', exp: '5 años', emoji: '🪒', rating: 4.7, reviews: 175, avatar_initial: 'DM', active: true },
  ])

  const totalPrice = computed(() =>
    selectedServices.value.reduce((s, svc) => s + svc.price, 0)
  )
  const totalDuration = computed(() =>
    selectedServices.value.reduce((s, svc) => s + svc.duration, 0)
  )

  // Generate time slots for selected date
  const timeSlots = computed(() => {
    if (!selectedDate.value || !selectedBarber.value) return []
    const slots = []
    for (let h = 9; h <= 19; h++) {
      for (let m of [0, 30]) {
        if (h === 19 && m === 30) continue
        const hStr = h.toString().padStart(2, '0')
        const mStr = m.toString().padStart(2, '0')
        const time = `${hStr}:${mStr}`
        // Demo: mark some as taken
        const taken = ['10:00','11:30','14:00','15:30','17:00'].includes(time)
        slots.push({ time, taken })
      }
    }
    return slots
  })

  function toggleService(service) {
    const idx = selectedServices.value.findIndex(s => s.id === service.id)
    if (idx >= 0) selectedServices.value.splice(idx, 1)
    else selectedServices.value.push(service)
  }

  function isServiceSelected(id) {
    return selectedServices.value.some(s => s.id === id)
  }

  function reset() {
    step.value = 1
    selectedServices.value = []
    selectedBarber.value = null
    selectedDate.value = null
    selectedTime.value = null
    clientName.value = ''
    clientPhone.value = ''
    clientEmail.value = ''
    notes.value = ''
    paymentMethod.value = 'cash'
    bookingId.value = null
  }

  async function createAppointment() {
    loading.value = true
    try {
      const payload = {
        services: selectedServices.value,
        barber_id: selectedBarber.value?.id,
        barber_name: selectedBarber.value?.name,
        date: selectedDate.value,
        time: selectedTime.value,
        client_name: clientName.value,
        client_phone: clientPhone.value,
        client_email: clientEmail.value,
        notes: notes.value,
        payment_method: paymentMethod.value,
        total_price: totalPrice.value,
        total_duration: totalDuration.value,
        status: paymentMethod.value === 'cash' ? 'confirmed' : 'pending_payment',
      }

      const { data, error } = await supabase.from('appointments').insert(payload).select().single()
      if (error) throw error
      bookingId.value = data?.id || 'DEMO-' + Date.now()
      step.value = 7
      toast.success('¡Cita reservada con éxito! ✂️')
      return { success: true }
    } catch (err) {
      // Demo mode fallback
      bookingId.value = 'KAL-' + Math.floor(Math.random() * 90000 + 10000)
      step.value = 7
      toast.success('¡Cita reservada! (modo demo) ✂️')
      return { success: true }
    } finally { loading.value = false }
  }

  async function fetchMyAppointments(userId) {
    const { data } = await supabase.from('appointments').select('*').eq('user_id', userId).order('date', { ascending: true })
    myAppointments.value = data || []
  }

  async function fetchAllAppointments() {
    const { data } = await supabase.from('appointments').select('*').order('date', { ascending: true })
    appointments.value = data || []
  }

  async function cancelAppointment(id) {
    await supabase.from('appointments').update({ status: 'cancelled' }).eq('id', id)
    await fetchMyAppointments()
    toast.info('Cita cancelada')
  }

  return {
    step, selectedServices, selectedBarber, selectedDate, selectedTime,
    clientName, clientPhone, clientEmail, notes, paymentMethod, bookingId,
    loading, appointments, myAppointments, barbers,
    totalPrice, totalDuration, timeSlots,
    toggleService, isServiceSelected, reset,
    createAppointment, fetchMyAppointments, fetchAllAppointments, cancelAppointment
  }
})
