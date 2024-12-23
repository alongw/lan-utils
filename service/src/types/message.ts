export type MessageType = {
    sender: {
        name: string
        ip: string
        uuid: string
    }
    time: string
    text: string
    msgType: string
    type: string
}

export type PublicMessageType = {
    sender: {
        name: string
        uuid: string
    }
    time: string
    text: string
    msgType: string
    type: string
}
