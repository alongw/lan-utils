import { io } from '@/utils/server'

io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('testMsg', (msg) => {
        console.log(msg)
    })

    socket.on('systemMsg', (msg) => {
        console.log(msg)
    })
})
