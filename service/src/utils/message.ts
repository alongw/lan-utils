import fse from 'fs-extra'

import type { MessageType } from '@/types/message'

export class Message {
    #message = new Set<MessageType>()
    #max: number

    constructor(max: number) {
        this.#max = max
        this.loadMessage(false)
    }

    /**
     *
     * @param message
     * Add a message to the message list
     */
    addMessage(message: MessageType) {
        this.#message.add(message)
        this.truncateMessage()
    }

    /**
     *
     * @param max
     * Get the latest message
     */
    getMessage(max: number) {
        return Array.from(this.#message).slice(-max)
    }

    /**
     * Save the message to the file
     */
    saveMessage() {
        const before = fse.readJsonSync('./data/message.json')
        const after = Array.from(this.#message)
        fse.writeJsonSync('./data/message.json', [...before, ...after])
    }

    /**
     * Load the message from the file
     */
    loadMessage(importMsg: boolean = true) {
        if (!fse.existsSync('./data/message.json')) {
            fse.writeJsonSync('./data/message.json', [])
        }
        if (importMsg) {
            this.#message = new Set(
                fse.readJsonSync('./data/message.json').slice(-this.#max)
            )
        } else {
            this.#message = new Set()
        }
    }

    /**
     * Truncate the message list
     */
    truncateMessage() {
        if (this.#message.size > this.#max) {
            const before = fse.readJsonSync('./data/message.json')
            const after = Array.from(this.#message).slice(0, Math.floor(this.#max * 0.7))
            fse.writeJsonSync('./data/message.json', [...before, ...after])
            this.#message = new Set(
                Array.from(this.#message).slice(Math.floor(this.#max * 0.7))
            )
        }
    }

    /**
     * Clear the message list
     */
    clearMessageList() {
        this.saveMessage()
        this.#message = new Set()
    }
}

export default new Message(100)
