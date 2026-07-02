import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'
import { useToast } from 'vue-toastification'

import aleksei from '@/assets/gallery/barber1.jpg'
import ivan from '@/assets/gallery/barber2.jpg'
import dmitri from '@/assets/gallery/barber3.jpg'

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
    {
      id: 'b1',
      name: 'Aleksei "Blade" Volkov',
      specialty: 'Fade & Beard Sculpt',
      exp: '8 años',
      emoji: '💈',
      rating: 4.9,
      reviews: 312,
      avatar_initial: 'AV',
      active: true,
      image: aleksei
    },
    {
      id: 'b2',
      name: 'Ivan "Sharp" Petrov',
      specialty: 'Clásicos & Pompadour',
      exp: '6 años',
      emoji: '✂️',
      rating: 4.8,
      reviews: 218,
      avatar_initial: 'IP',
      active: true,
      image: ivan
    },
    {
      id: 'b3',
      name: 'Dmitri "Rex" Morozov',
      specialty: 'Skin Fade & Tattoo Look',
      exp: '5 años',
      emoji: '🪒',
      rating: 4.7,
      reviews: 175,
      avatar_initial: 'DM',
      active: true,
      image: dmitri
    }
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

        const taken = ['10:00', '11:30', '14:00', '15:30', '17:00'].includes(time)

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
    // Tu código...
  }

  async function fetchMyAppointments(userId) {
    // Tu código...
  }

  async function fetchAllAppointments() {
    // Tu código...
  }

  async function cancelAppointment(id) {
    // Tu código...
  }

  return {
    step,
    selectedServices,
    selectedBarber,
    selectedDate,
    selectedTime,
    clientName,
    clientPhone,
    clientEmail,
    notes,
    paymentMethod,
    bookingId,
    loading,
    appointments,
    myAppointments,
    barbers,
    totalPrice,
    totalDuration,
    timeSlots,
    toggleService,
    isServiceSelected,
    reset,
    createAppointment,
    fetchMyAppointments,
    fetchAllAppointments,
    cancelAppointment
  }
})