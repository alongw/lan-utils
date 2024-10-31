import EventEmitter from './index'

const eventList = [] as const
type EventList = (typeof eventList)[number]

const eventEmitter = new EventEmitter<EventList>()

export { eventEmitter, eventList }

export default eventEmitter
