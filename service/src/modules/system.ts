import { io } from '@/utils/server'
import wsEventEmitter from '@/events/ws'

// handle client connection
wsEventEmitter.on('connection', () => {
    const fn = () => {
        wsEventEmitter.emit('sys', {
            type: 'clientCount',
            data: {
                count: io.engine.clientsCount
            }
        })
    }
    setTimeout(fn, 100)
    fn()
})

// handle client disconnection
wsEventEmitter.on('disconnect', () => {
    wsEventEmitter.emit('sys', {
        type: 'clientCount',
        data: {
            count: io.engine.clientsCount
        }
    })
})
