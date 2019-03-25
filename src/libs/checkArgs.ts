import { EventListeners } from '../types/EventListeners'

export const checkArgs = <E extends string>(
  eventListeners: EventListeners<E>
) => {
  if (!Array.isArray(eventListeners)) {
    throw new Error('2nd argment must be array type.')
  }

  eventListeners.forEach(eventListener => {
    if (!Array.isArray(eventListener)) {
      throw new Error('event listener is must be array type.')
    }
  })
}
