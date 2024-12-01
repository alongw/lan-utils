import messageTool from '@/utils/message'
import dayjs from 'dayjs'
import wsEventEmitter from '@/events/ws'

import type { PublicMessageType } from '@/types/message'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleSay = (args: any) => {
    if (args.length < 1) return
    const msg: string = args[0] || ''
    const type = args[1] || 'info'
    const sender: string = args[2] || 'System'

    messageTool.addMessage({
        sender: {
            ip: 'System',
            name: sender,
            uuid: 'System'
        },
        text: msg,
        msgType: type,
        time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        type: 'user_send_message'
    })

    const userMsg: PublicMessageType = {
        sender: {
            name: sender,
            uuid: 'System'
        },
        text: msg,
        msgType: type,
        time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        type: 'user_send_message'
    }

    wsEventEmitter.emit('msg', userMsg)
}
