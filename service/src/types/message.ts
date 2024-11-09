export type MessageType = {
    sender: {
        name: string
        ip: string
    }
    time: string
    text: string
    type: string
}

export type PublicMessageType = {
    sender: {
        name: string
    }
    time: string
    text: string
    type: string
}
