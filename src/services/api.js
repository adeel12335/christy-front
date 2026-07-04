import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
})

API.interceptors.request.use(cfg => {
  const token = localStorage.getItem('unleashed_token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

// Auth
export const login = (data) => API.post('/auth/login', data)
export const getMe = () => API.get('/auth/me')

// Bookings
export const getBookings = () => API.get('/bookings')
export const createBooking = (data) => API.post('/bookings', data)
export const updateBooking = (id, data) => API.patch(`/bookings/${id}`, data)
export const deleteBooking = (id) => API.delete(`/bookings/${id}`)

// Events
export const getEvents = () => API.get('/events')
export const createEvent = (data) => API.post('/events', data)
export const updateEvent = (id, data) => API.put(`/events/${id}`, data)
export const deleteEvent = (id) => API.delete(`/events/${id}`)

// Submissions
export const getSubmissions = () => API.get('/submissions')
export const createSubmission = (data) => API.post('/submissions', data)
export const updateSubmission = (id, data) => API.patch(`/submissions/${id}`, data)
export const deleteSubmission = (id) => API.delete(`/submissions/${id}`)

// Stats
export const getStats = () => API.get('/stats')

// Settings
export const getSettings = () => API.get('/settings')
export const updateSettings = (data) => API.put('/settings', data)

export default API
