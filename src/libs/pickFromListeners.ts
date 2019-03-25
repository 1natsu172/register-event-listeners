import { ListenerOptions } from '../types/ListenerOptions'
import { EventListener, EventType, EventHandler } from '../types/EventListeners'

export const pickEventType = <E extends EventType>(
  eventListener: EventListener<E>
): EventType => {
  const [eventType] = eventListener
  return eventType
}

export const pickHandler = <E extends EventType>(
  eventListener: EventListener<E>
): EventHandler<E> => {
  const [, handler] = eventListener
  return handler
}

export const pickListenerOption = <E extends EventType>(
  eventListener: EventListener<E>
): ListenerOptions | undefined => {
  const [, , listenerOption] = eventListener
  return listenerOption
}
