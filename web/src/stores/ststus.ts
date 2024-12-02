import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStatusStore = defineStore('status', () => {
  /**
   * WebSocket Connect Status
   */
  const wsConnectStatus = ref<boolean>()
  const updateWsConnectStatus = (status: boolean) => {
    wsConnectStatus.value = status
  }

  /**
   * WebSocket Client Count
   */
  const wsClientCount = ref<number>()
  const updateWsClientCount = (count: number) => {
    wsClientCount.value = count
  }

  const pushMessagePermission = ref<boolean>()
  const updatePushMessagePermission = (permission: boolean) => {
    pushMessagePermission.value = permission
  }

  return {
    wsConnectStatus,
    updateWsConnectStatus,

    wsClientCount,
    updateWsClientCount,

    pushMessagePermission,
    updatePushMessagePermission,
  }
})
