import { io } from '@/utils/server'
import wsEventEmitter from '@/events/ws'

import type { Socket } from 'socket.io'

import { userGetMessage } from './report/message'

// handle client connection
wsEventEmitter.on('connection', (socket: Socket) => {
    const fn = () => {
        wsEventEmitter.emit('sys', {
            type: 'clientCount',
            data: {
                count: io.engine.clientsCount
            }
        })

        socket.emit('sys', {
            type: 'updateMessageList',
            data: {
                messageList: userGetMessage()
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
