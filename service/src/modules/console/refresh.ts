import wsEventEmitter from '@/events/ws'

export const handleRefresh = () => {
    wsEventEmitter.emit('sys', {
        type: 'showMsg',
        data: {
            config: {
                type: 'warning',
                message: '你将被强制刷新页面'
            }
        }
    })
    setTimeout(() => {
        wsEventEmitter.emit('sys', {
            type: 'reload',
            data: {}
        })
    }, 1000)
}
