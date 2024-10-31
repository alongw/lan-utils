import { io } from 'socket.io-client'
import { MessagePlugin } from 'tdesign-vue-next'
import { ref } from 'vue'
import { useStatusStore } from '@/stores/ststus'

const URL = import.meta.env.VITE_BASE_URL || window.location.host

const showConnectMsg = ref<boolean>(false)

const statusStore = useStatusStore()

export const socket = io(URL, {
  reconnection: false,
})

socket.on('connect', () => {
  socket.emit('report', 'Lan-Utils-Client connected')

  if (showConnectMsg.value) MessagePlugin.success('已成功与服务器建立连接')
  statusStore.updateWsConnectStatus(true)
})

socket.on('disconnect', () => {
  showConnectMsg.value = true
  MessagePlugin.error('与服务器断开连接，正在尝试重连...')
  statusStore.updateWsConnectStatus(false)
  setTimeout(() => socket.connect(), 500)
})

socket.on('connect_error', () => {
  showConnectMsg.value = true
  MessagePlugin.error('连接服务器失败，正在尝试重连...')
  statusStore.updateWsConnectStatus(false)
  setTimeout(() => socket.connect(), 500)
})

import('./file')

export default socket
