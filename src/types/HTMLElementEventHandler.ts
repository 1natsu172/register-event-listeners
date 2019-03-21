import { ListenerOptions } from './ListenerOptions'

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @type Single handler method type of event.
 */
export type HTMLElementEventHandler<K extends keyof HTMLElementEventMap> = (
  this: HTMLElement,
  ev: HTMLElementEventMap[K]
) => any | EventListenerOrEventListenerObject

/**
 * @type Object type for 2nd argment, key is event name: value is handler and optional options.
 */
export type HTMLElementEventHandlers<U extends keyof HTMLElementEventMap> = {
  [K in U]: [HTMLElementEventHandler<K>, ListenerOptions?]
}
