import { ListenerOptions } from '../types/ListenerOptions'
import {
  HTMLElementEventHandler,
  HTMLElementEventHandlers
} from '../types/HTMLElementEventHandler'

export const pickHandler = <K extends keyof HTMLElementEventMap>(
  event: K,
  listeners: HTMLElementEventHandlers<K>
): HTMLElementEventHandler<K> => {
  const [handler] = listeners[event]
  return handler
}

export const pickListenerOption = <K extends keyof HTMLElementEventMap>(
  event: K,
  listeners: HTMLElementEventHandlers<K>
): ListenerOptions | undefined => {
  const [, listenerOption] = listeners[event]
  return listenerOption
}
