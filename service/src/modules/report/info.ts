import type { Socket } from 'socket.io'
import user from '@/utils/user'

export const userUpdateInfo = (socket: Socket, data: { name: string }) => {
    if (!data?.name) return
    user.updateUserInfo(socket.handshake.address, data.name)
    socket.emit('sys', {
        type: 'showDialog',
        data: {
            config: {
                type: 'success',
                title: '远程通知',
                message: '阁下的用户信息更新请求已被接纳'
            }
        }
    })
    const userInstance = user.getUser(socket.handshake.address)
    if (!userInstance) return
    socket.emit('sys', {
        type: 'updateUserInfo',
        data: {
            name: userInstance.user_name,
            uuid: userInstance.user_uuid
        }
    })
}
