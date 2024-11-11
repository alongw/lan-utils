import { socket } from '@/utils/ws'
import dayjs from 'dayjs'

export const report = <T>(data: { type: string; data: T }) => {
  socket.emit('report', data)
}

export const connect = () => {
  report({
    type: 'user_connect',
    data: {
      time: dayjs().valueOf(),
      host: window.location.host,
      client: {
        name: import.meta.env.VITE_CLIENT_NAME,
        version: import.meta.env.VITE_CLIENT_VERSION,
      },
    },
  })
}

export const sendMessage = (msg: string) => {
  report({
    type: 'user_send_message',
    data: {
      message: msg,
      time: dayjs().valueOf(),
      host: window.location.host,
    },
  })
}

export const updateUserInfo = (data: { name: string }) => {
  report({
    type: 'user_update_info',
    data: {
      ...data,
      time: dayjs().valueOf(),
      host: window.location.host,
    },
  })
}
