import { io } from 'socket.io-client'
import { MessagePlugin } from 'tdesign-vue-next'
import { ref } from 'vue'

const URL = import.meta.env.VITE_BASE_URL || window.location.host

const showConnectMsg = ref<boolean>(false)

export const socket = io(URL, {
  reconnection: false,
})

socket.on('connect', () => {
  socket.emit('report', 'Lan-Utils-Client connected')

  if (showConnectMsg.value) MessagePlugin.success('已成功与服务器建立连接')
})

socket.on('disconnect', () => {
  showConnectMsg.value = true
  MessagePlugin.error('与服务器断开连接，正在尝试重连...')
  setTimeout(() => socket.connect(), 500)
})

socket.on('connect_error', () => {
  showConnectMsg.value = true
  MessagePlugin.error('连接服务器失败，正在尝试重连...')
  setTimeout(() => socket.connect(), 500)
})

export default socket
