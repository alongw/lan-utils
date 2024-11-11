import { socket } from '@/utils/ws'
import { useStatusStore } from '@/stores/ststus'
import { useMessageStore } from '@/stores/message'
import { useInfoStore } from '@/stores/info'
import { globalExec, exec, showDialog, goTo, showMsg } from '@/utils/globalExec'

const statusStore = useStatusStore()
const messageStore = useMessageStore()
const infoStore = useInfoStore()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
socket.on('sys', (data: { type: string; data: any }) => {
  if (data.type === 'clientCount')
    statusStore.updateWsClientCount(data?.data?.count || '1')

  if (data.type === 'updateMessageList') {
    messageStore.updateMessageList(data?.data?.messageList || [])
  }

  if (data.type === 'globalExec') {
    globalExec(data?.data?.command, data?.data?.data)
  }

  if (data.type === 'exec') {
    exec(data?.data?.command, data?.data?.data)
  }

  if (data.type === 'showDialog') {
    showDialog(data?.data?.config)
  }

  if (data.type === 'goTo') {
    goTo(data?.data?.config)
  }

  if (data.type === 'showMsg') {
    showMsg(data?.data?.config)
  }

  if (data.type === 'updateUserInfo') {
    infoStore.updateUsername(data?.data?.name || '')
    infoStore.updateUuid(data?.data?.uuid || '')
  }
})
