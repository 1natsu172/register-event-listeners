import { HTMLElementEventHandlers } from '../types/HTMLElementEventHandler'

export const checkEventHandlersArg = <K extends keyof HTMLElementEventMap>(
  eventHandlers: HTMLElementEventHandlers<K>
) => {
  ;(Object.keys(eventHandlers) as (keyof typeof eventHandlers)[]).forEach(
    event => {
      const handler = eventHandlers[event]
      if (!Array.isArray(handler)) {
        throw new Error('The handler for each event is an array type.')
      }
    }
  )
}
