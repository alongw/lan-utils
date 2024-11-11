export const handleFile = (fileName: string) => {
  const index = fileName.lastIndexOf('.')
  let name, ext
  if (index === -1) {
    name = fileName
    ext = ''
  } else {
    name = fileName.slice(0, index)
    ext = fileName.slice(index + 1)
  }
  const fullName = fileName

  return {
    name,
    ext,
    fullName,
  }
}

export const iconList: { [key: string]: string[] } = {
  class: ['class'],
  doc: ['doc', 'docx'],
  dockerfile: ['dockerfile'],
  exe: ['exe'],
  html: ['html', 'htm'],
  iso: ['iso'],
  jar: ['jar'],
  java: ['java'],
  jpg: ['jpg', 'jpeg'],
  js: ['js'],
  json: ['json'],
  md: ['md'],
  mp4: ['mp4'],
  pdf: ['pdf'],
  py: ['py'],
  sql: ['sql'],
  txt: ['txt'],
  xml: ['xml'],
  zip: ['zip', 'rar'],
  css: ['css'],
  gitignore: ['gitignore'],
  mp3: ['mp3'],
  png: ['png'],
  ppt: ['ppt', 'pptx'],
  svg: ['svg'],
  xls: ['xls', 'xlsx'],
  yml: ['yml', 'yaml'],
  file: ['file', '*'],
}

export const getIconUrl = (ext: string): string => {
  for (const key in iconList) {
    if (iconList[key].includes(ext)) {
      return `/icons/${key}.png`
    }
  }
  return '/icons/file.png'
}

// const URL = import.meta.env.VITE_BASE_URL || window.location.host

export const getDownloadUrl = (fullName: string) => {
  return `/share/${fullName}`
}
