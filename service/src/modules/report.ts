import wsEventEmitter from '@/events/ws'

import type { Socket } from 'socket.io'

import { userSendMessage } from './report/message'
import { userUpdateInfo } from './report/info'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
wsEventEmitter.on('report', (e: { socket: Socket; data: any }) => {
    const { socket, data } = e
    if (!data || !data.type) return

    if (data.type === 'user_send_message') userSendMessage(socket, data.data)

    if (data.type === 'user_update_info') userUpdateInfo(socket, data.data)
})
