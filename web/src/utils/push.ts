import Push from 'push.js'
import { useStatusStore } from '@/stores/ststus'

const statusStore = useStatusStore()

export const getPermission = (reload: boolean = false) => {
  if (reload) {
    window.location.reload()
  }
  Push.Permission.request(
    () => {
      statusStore.updatePushMessagePermission(Push.Permission.has())
    },
    () => {
      statusStore.updatePushMessagePermission(Push.Permission.has())
    },
  )
}
