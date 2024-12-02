import { socket } from '@/utils/ws'

import { useMessageStore } from '@/stores/message'
import { useInfoStore } from '@/stores/info'

import Push from 'push.js'

export type PublicMessageType = {
  sender: {
    name: string
    uuid: string
  }
  time: string
  text: string
  msgType: string
  type: string
}

const messageStore = useMessageStore()
const userInfoStore = useInfoStore()

socket.on('msg', (data: PublicMessageType) => {
  messageStore.addMessage(data)

  if (userInfoStore.uuid !== data.sender.uuid) {
    Push.create(`[新消息]${data.sender.name}`, {
      body: data.text, // 消息内容
      requireInteraction: true, // 是否显示关闭、设置按钮
      icon: '', // 右侧图标，也可以是png url
      timeout: 30000, // 显示时间
    })
  }
})
