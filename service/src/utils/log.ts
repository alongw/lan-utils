import log4js from 'log4js'

enum Log_File_Path {
    CURRENT = 'logs/current.log'
}

log4js.configure({
    appenders: {
        currentConsole: {
            type: 'stdout',
            layout: {
                type: 'pattern',
                pattern: '[%d{MM/dd hh:mm:ss}] [%[%p%]] %m'
            }
        },
        currentFile: {
            type: 'file',
            filename: Log_File_Path.CURRENT,
            layout: {
                type: 'pattern',
                pattern: '%d %p %m'
            }
        }
    },
    categories: {
        default: {
            appenders: ['currentConsole', 'currentFile'],
            level: 'info'
        }
    }
})

const logger = log4js.getLogger('default')

export default logger
