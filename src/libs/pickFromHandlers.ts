import { ListenerOptions } from '../types/ListenerOptions'
import {
  HTMLElementEventHandler,
  HTMLElementEventHandlers
} from '../types/HTMLElementEventHandler'

export const pickHandler = <K extends keyof HTMLElementEventMap>(
  event: K,
  eventHandlers: HTMLElementEventHandlers<K>
): HTMLElementEventHandler<K> => {
  const [handler] = eventHandlers[event]
  return handler
}

export const pickListenerOption = <K extends keyof HTMLElementEventMap>(
  event: K,
  eventHandlers: HTMLElementEventHandlers<K>
): ListenerOptions | undefined => {
  const [, listenerOption] = eventHandlers[event]
  return listenerOption
}
