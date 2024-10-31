import { io } from 'socket.io-client'

const URL = import.meta.env.VITE_BASE_URL || window.location.host

export const socket = io(URL)

socket.on('connect', () => {
  console.log('connected')
  socket.emit('systemMsg', 'Lan-Utils-Client connected')
})

socket.on('disconnect', () => {
  console.log('disconnected')
})

export default socket
