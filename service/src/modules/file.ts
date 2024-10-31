import { io } from '@/utils/server'
import wsEventEmitter from '@/events/ws'
import { getFileList } from '@/utils/file'

const sendShareFile = async () => {
    if (io.engine.clientsCount <= 0) return

    const files = await getFileList()
    wsEventEmitter.emit('file', files)
}

let fileShareInterval: NodeJS.Timeout | null = null

if (!fileShareInterval) {
    fileShareInterval = setInterval(sendShareFile, 1000 * 5)
}
