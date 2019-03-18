import { ListenerOptions } from './ListenerOptions'

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @type Single handler method type of event.
 */
export type HTMLElementEventHandler<K extends keyof HTMLElementEventMap> = (
  event: HTMLElementEventMap[K]
) => any

/**
 * @type Object type for 2nd argment, key is event name: value is handler and optional options.
 */
export type HTMLElementEventHandlers<U extends keyof HTMLElementEventMap> = {
  [K in U]: [HTMLElementEventHandler<K>, ListenerOptions?]
}
