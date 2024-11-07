import { socket } from '@/utils/ws'
import { useStatusStore } from '@/stores/ststus'

const statusStore = useStatusStore()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
socket.on('sys', (data: { type: string; data: any }) => {
  statusStore.updateWsClientCount(data?.data?.count || '1')
})
