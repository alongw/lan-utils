import { MessagePlugin, DialogPlugin } from 'tdesign-vue-next'
import router from '@/router'

type MessageConfig = {
  type:
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
    | 'question'
    | 'loading'
    | 'closeAll'
  message: string
}
export const showMsg = (config: MessageConfig) => {
  if (config.type === 'closeAll') return MessagePlugin.closeAll()
  MessagePlugin[config.type](config.message)
}

type DialogConfig = {
  message: string
  title: string
}
export const showDialog = (config: DialogConfig) => {
  const confirmDia = DialogPlugin({
    header: config.title,
    body: config.message,
    onConfirm: () => {
      confirmDia.hide()
    },
  })
}

type GoToConfig = {
  path?: string
  name?: string
}
export const goTo = (config: GoToConfig) => {
  if (config.path && !config.path.startsWith('/'))
    config.path = `/${config.path}`
  if (config.path) return router.push(config.path)
  if (config.name) return router.push({ name: config.name })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const globalExec = (command: string, data: any) => {
  if (command === 'showMsg') return showMsg(data)
  if (command === 'goTo') return goTo(data)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const exec = (command: string, data: any) => {
  exec(command, data)
}

export default globalExec
