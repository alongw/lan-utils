import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useInfoStore = defineStore(
  'info',
  () => {
    const username = ref('')
    const uuid = ref('')

    const updateUsername = (newUsername: string) => {
      username.value = newUsername
    }

    const updateUuid = (newUuid: string) => {
      uuid.value = newUuid
    }

    return {
      username,
      uuid,

      updateUsername,
      updateUuid,
    }
  },
  {
    persist: true,
  },
)
