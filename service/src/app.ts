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
app.use('/', defaultRouter)

app.listen(config.listen_port, () => {
    console.log(`Server started on port ${config.listen_port}`)
})
