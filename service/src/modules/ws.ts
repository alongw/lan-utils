import { io } from '@/utils/server'
// import { getFileList } from '@/utils/file'

import wsEventEmitter from '@/events/ws'

io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('chat', (socket) => {
        wsEventEmitter.emit('chat', socket)
        console.log(socket)
    })

    socket.on('report', (socket) => {
        wsEventEmitter.emit('report', socket)
        console.log(socket)
    })

    wsEventEmitter.on('sys', (e) => {
        socket.emit('sys', e)
        console.log(e)
    })

    wsEventEmitter.on('file', (e) => {
        socket.emit('file', e)
        console.log(e)
    })

    wsEventEmitter.on('msg', (e) => {
        socket.emit('msg', e)
        console.log(e)
    })
})
