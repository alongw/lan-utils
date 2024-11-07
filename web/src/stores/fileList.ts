import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { File } from '@/types/file'

export const useFileListStore = defineStore('fileList', () => {
  const fileList = ref<File[]>([])
  const updateFileList = (list: File[]) => {
    fileList.value = list
  }

  return {
    fileList,
    updateFileList,
  }
})
