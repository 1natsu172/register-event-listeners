import { ListenerOptions } from './ListenerOptions'

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @type Single handler method type of event.
 */
export type HTMLElementEventHandler<K extends keyof HTMLElementEventMap> = (
  this: HTMLElement,
  ev: HTMLElementEventMap[K]
) => any | EventListenerOrEventListenerObject

export type HTMLElementEventHandlerType<K extends keyof HTMLElementEventMap> = [
  HTMLElementEventHandler<K>,
  ListenerOptions?
]

/**
 * @type Object type for 2nd argment, key is event name: value is handler and optional options.
 */
export type HTMLElementEventHandlers<U extends keyof HTMLElementEventMap> = {
  [K in U]: HTMLElementEventHandlerType<K>
}
