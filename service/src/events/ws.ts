import EventEmitter from './index'

const eventList = [
    'sys',
    'chat',
    'report',
    'file',
    'msg',
    'connection',
    'disconnect',
    'count'
] as const
type EventList = (typeof eventList)[number]

const eventEmitter = new EventEmitter<EventList>()

export { eventEmitter, eventList }

export default eventEmitter
