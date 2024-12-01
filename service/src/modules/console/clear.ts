import messageTool from '@/utils/message'
import wsEventEmitter from '@/events/ws'
import logger from '@/utils/log'

export const handleClear = () => {
    messageTool.clearMessageList()
    wsEventEmitter.emit('sys', {
        type: 'showMsg',
        data: {
            config: {
                type: 'warning',
                message: '你的消息列表被强制清空'
            }
        }
    })
    wsEventEmitter.emit('sys', {
        type: 'updateMessageList',
        data: {
            messageList: []
        }
    })
    logger.info('Message list has been cleared')
}
