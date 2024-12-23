import { io } from '@/utils/server'
import { getFileList } from '@/utils/file'

import wsEventEmitter from '@/events/ws'

io.on('connection', async (socket) => {
    wsEventEmitter.emit('connection', socket)

    socket.on('chat', (data) => {
        wsEventEmitter.emit('chat', data)
        console.log(data)
    })

    socket.on('report', (data) => {
        wsEventEmitter.emit('report', {
            socket,
            data
        })
    })

    socket.emit('file', await getFileList())

    const handleSysEvent = (e: unknown) => socket.emit('sys', e)
    const handleFileEvent = (e: string[]) => socket.emit('file', e)
    const handleMsgEvent = (e: unknown) => socket.emit('msg', e)

    wsEventEmitter.on('sys', handleSysEvent)

    wsEventEmitter.on('file', handleFileEvent)

    wsEventEmitter.on('msg', handleMsgEvent)

    socket.on('disconnect', () => {
        wsEventEmitter.emit('disconnect', socket)
        wsEventEmitter.off('sys', handleSysEvent)
        wsEventEmitter.off('file', handleFileEvent)
        wsEventEmitter.off('msg', handleMsgEvent)
    })
})

import('./import')
