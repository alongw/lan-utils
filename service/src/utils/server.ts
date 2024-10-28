import { Server } from 'socket.io'
import { createServer } from 'node:http'
import express from 'express'
import config from '@/utils/config'
import cors from 'cors'
import bodyparser from 'body-parser'
import defaultRouter from '@/routers/index'

const app = express()

app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.use('/', express.static('public'))
app.use('/share', express.static('share'))
app.use('/', defaultRouter)

const server = createServer(app)
export const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

io.use

server.listen(config.listen_port, () => {
    console.log(`Server started on port ${config.listen_port}`)
})
