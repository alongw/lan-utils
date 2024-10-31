import { socket } from '@/utils/ws'
import { useFileListStore } from '@/stores/fileList'

const fileListStore = useFileListStore()

socket.on('file', (data: string[]) => {
  const result = data.map(item => handleFile(item))
  fileListStore.updateFileList(result)
})

export const handleFile = (fileName: string) => {
  const index = fileName.lastIndexOf('.')
  const name = fileName.slice(0, index)
  const ext = fileName.slice(index + 1)
  const fullName = fileName

  return {
    name,
    ext,
    fullName,
  }
}
