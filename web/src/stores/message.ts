import { ref } from 'vue'
import { defineStore } from 'pinia'

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

export const useMessageStore = defineStore('message', () => {
  const messageList = ref<PublicMessageType[]>([])
  const updateMessageList = (list: PublicMessageType[]) => {
    messageList.value = list
  }
  const addMessage = (msg: PublicMessageType) => {
    messageList.value.push(msg)
    if (messageList.value.length > 200) messageList.value.shift()
  }
  const clearMessageList = () => {
    messageList.value = []
  }
  return {
    messageList,

    updateMessageList,
    addMessage,
    clearMessageList,
  }
})
