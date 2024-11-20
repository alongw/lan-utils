import fse from 'fs-extra'

import { v4 } from 'uuid'

// 暂定使用 ip 来索引用户，后续完善用户系统后将使用 uuid
export class UserInstance {
    #user_name: string
    #user_ip: string
    #user_uuid: string

    constructor(ip: string) {
        this.#user_ip = ip
        this.#user_uuid = v4()
    }

    get user_name() {
        return this.#user_name
    }

    get user_ip() {
        return this.#user_ip
    }

    get user_uuid() {
        return this.#user_uuid
    }

    setUserName(name: string) {
        this.#user_name = name
    }

    toJSON() {
        return {
            user_name: this.#user_name,
            user_ip: this.#user_ip,
            user_uuid: this.#user_uuid
        }
    }

    static fromJSON(json: { user_name: string; user_ip: string; user_uuid: string }) {
        const instance = new UserInstance(json.user_ip)
        instance.#user_name = json.user_name
        instance.#user_uuid = json.user_uuid
        return instance
    }
}

export class User {
    #user_list: Set<UserInstance>
    constructor() {
        this.#user_list = new Set()
        this.loadUser()
    }

    checkUserFile() {
        if (!fse.existsSync('./data/user.json')) {
            fse.writeJsonSync('./data/user.json', [])
        }
    }

    saveUser() {
        this.checkUserFile()
        fse.writeJsonSync('./data/user.json', Array.from(this.#user_list))
    }

    loadUser() {
        this.checkUserFile()
        const users = fse.readJsonSync('./data/user.json')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.#user_list = new Set(users.map((user: any) => UserInstance.fromJSON(user)))
    }

    addUser(ip: string) {
        this.#user_list.add(new UserInstance(ip))
    }

    getUser(ip: string) {
        return Array.from(this.#user_list).find((user) => user.user_ip === ip)
    }

    updateUserInfo(ip: string, name: string) {
        let user = this.getUser(ip)
        if (!user) {
            this.addUser(ip)
            user = this.getUser(ip)
        }
        user.setUserName(name)
        this.saveUser()
    }
}

export default new User()
