import messageTool from '@/utils/message'
import dayjs from 'dayjs'

import type { PublicMessageType } from '@/types/message'
import type { Socket } from 'socket.io'

import wsEventEmitter from '@/events/ws'

export const userSendMessage = (socket: Socket, data: { message: string }) => {
    const userIp = socket.handshake.headers['x-real-ip'] || socket.handshake.address

    messageTool.addMessage({
        sender: {
            ip: userIp.toString(),
            name: userIp.toString()
        },
        text: data.message,
        time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        type: 'user_send_message'
    })

    const userMsg: PublicMessageType = {
        sender: {
            name: userIp.toString()
        },
        text: data.message,
        time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        type: 'user_send_message'
    }

    wsEventEmitter.emit('msg', userMsg)
}

export const userGetMessage = () => {
    const msgList = messageTool.getMessage(50)
    const publicMsgList: PublicMessageType[] = msgList.map((msg) => {
        return {
            sender: {
                name: msg.sender.name
            },
            text: msg.text,
            time: msg.time,
            type: msg.type
        }
    })
    return publicMsgList
}
