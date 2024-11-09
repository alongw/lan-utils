import { socket } from '@/utils/ws'

import { useMessageStore } from '@/stores/message'

export type PublicMessageType = {
  sender: {
    name: string
  }
  time: string
  text: string
  type: string
}

const messageStore = useMessageStore()

socket.on('msg', (data: PublicMessageType) => {
  messageStore.addMessage(data)
})
