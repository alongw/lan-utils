import { input } from '@inquirer/prompts'

import _ from 'lodash'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cmdList = new Map<string, (args: any) => void | Promise<void>>()

const handleInput = async (value: string) => {
    value = _.trim(value)
    if (!value) return

    const args: string[] = value.match(/(?:[^\s"]+|"[^"]*")+/g) || []
    args.forEach((arg, index) => {
        if (arg.startsWith('"') && arg.endsWith('"')) {
            args[index] = arg.slice(1, arg.length - 1)
        }
    })
    const command = args.shift()
    const cmd = cmdList.get(command)
    cmd && (await cmd(args))
}

export const consoleService = async () => {
    const command = await input({
        message: '>',
        theme: {
            prefix: ''
        }
    })

    await handleInput(command)

    consoleService()
}

import('./import')
