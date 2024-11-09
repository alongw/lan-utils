import { socket } from '@/utils/ws'
import { useStatusStore } from '@/stores/ststus'
import { useMessageStore } from '@/stores/message'

const statusStore = useStatusStore()
const messageStore = useMessageStore()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
socket.on('sys', (data: { type: string; data: any }) => {
  if (data.type === 'clientCount')
    statusStore.updateWsClientCount(data?.data?.count || '1')

  if (data.type === 'updateMessageList') {
    messageStore.updateMessageList(data?.data?.messageList || [])
  }
})
