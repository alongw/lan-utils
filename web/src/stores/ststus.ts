import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStatusStore = defineStore('status', () => {
  const wsConnectStatus = ref<boolean>()
  const updateWsConnectStatus = (status: boolean) => {
    wsConnectStatus.value = status
  }

  return { wsConnectStatus, updateWsConnectStatus }
})
