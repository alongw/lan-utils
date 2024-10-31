/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * 事件回调函数类型
 */
type EventCallback = (...args: any[]) => void

/**
 * 事件发射器
 * @template T 所有事件的类型
 */
class EventEmitter<T extends string> {
  /**
   * 事件监听列表
   * @private
   */
  private _listeners: Map<T, Set<EventCallback>>

  /**
   * 构造函数
   * @description 创建一个事件发射器
   */
  constructor() {
    this._listeners = new Map<T, Set<EventCallback>>()
  }

  /**
   * 监听事件
   * @param event 事件名称
   * @param callback 事件回调函数
   */
  on(event: T, callback: EventCallback) {
    if (!this._listeners.has(event)) {
      this._listeners.set(event, new Set<EventCallback>())
    }
    this._listeners.get(event)!.add(callback)
  }

  /**
   * 取消监听事件
   * @param event 事件名称
   * @param callback 事件回调函数
   */
  off(event: T, callback: EventCallback) {
    this._listeners.get(event)?.delete(callback)
  }

  /**
   * 发射事件
   * @param event 事件名称
   * @param args 事件参数
   */
  emit(event: T, ...args: any[]) {
    this._listeners.get(event)?.forEach(callback => {
      try {
        callback(...args)
      } catch (error) {
        console.error(`Error in callback for event "${event}":`, error)
      }
    })
  }
}

export default EventEmitter
