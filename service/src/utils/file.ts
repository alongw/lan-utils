import fse from 'fs-extra'

export const getFileList = (path = './share') => {
    return fse.readdir(path)
}
