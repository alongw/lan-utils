import { socket } from '@/utils/ws'
import { useFileListStore } from '@/stores/fileList'
import { handleFile } from '@/utils/file'

const fileListStore = useFileListStore()

socket.on('file', (data: string[]) => {
  const result = data.map(item => handleFile(item))
  fileListStore.updateFileList(result)
})
