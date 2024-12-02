import type { Socket } from 'socket.io'
import user from '@/utils/user'

import _ from 'lodash'
import validator from 'validator'

const checkName = (name: string) => {
    return (
        validator.isLength(name, { min: 3, max: 13 }) &&
        /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(name)
    )
}

export const userUpdateInfo = (socket: Socket, data: { name: string }) => {
    data.name = _.trim(data.name)
    if (!checkName(data?.name))
        return socket.emit('sys', {
            type: 'showDialog',
            data: {
                config: {
                    type: 'error',
                    title: '错误',
                    message: '基于保安理由，阁下的用户信息更新请求尚未被接纳'
                }
            }
        })
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
