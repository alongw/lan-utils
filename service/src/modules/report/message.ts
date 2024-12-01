import messageTool from '@/utils/message'
import dayjs from 'dayjs'
import _ from 'lodash'

import type { PublicMessageType } from '@/types/message'
import type { Socket } from 'socket.io'

import wsEventEmitter from '@/events/ws'
import user, { UserInstance } from '@/utils/user'

export const userSendMessage = (socket: Socket, data: { message: string }) => {
    data.message = _.trim(data.message)
    if (!data.message)
        return socket.emit('sys', {
            type: 'showDialog',
            data: {
                config: {
                    type: 'error',
                    title: '错误',
                    message: '基于保安理由，阁下的消息尚未被接纳'
                }
            }
        })
    const userIp = socket.handshake.headers['x-real-ip'] || socket.handshake.address
    let u: UserInstance = user.getUser(userIp.toString())

    if (!u) user.addUser(userIp.toString())
    u = user.getUser(userIp.toString())

    messageTool.addMessage({
        sender: {
            ip: userIp.toString(),
            name: u.user_name || userIp.toString(),
            uuid: u.user_uuid
        },
        text: data.message,
        msgType: 'text',
        time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        type: 'user_send_message'
    })

    const userMsg: PublicMessageType = {
        sender: {
            name: `${u.user_name} (${u.user_ip})`,
            uuid: u.user_uuid
        },
        text: data.message,
        msgType: 'text',
        time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        type: 'user_send_message'
    }

    wsEventEmitter.emit('msg', userMsg)
}

export const userGetMessage = () => {
    const msgList = messageTool.getMessage(50)
    const publicMsgList: PublicMessageType[] = msgList.map((msg) => {
        const senderName =
            msg.sender.uuid === 'System'
                ? 'System'
                : `${msg.sender.name} (${msg.sender.ip})`
        return {
            sender: {
                name: senderName,
                uuid: msg.sender.uuid
            },
            text: msg.text,
            msgType: msg.msgType,
            time: msg.time,
            type: msg.type
        }
    })
    return publicMsgList
}
