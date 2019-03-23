import { HTMLElementEventHandlers } from '../types/HTMLElementEventHandler'

export const checkEventHandlersArg = <K extends keyof HTMLElementEventMap>(
  listeners: HTMLElementEventHandlers<K>
) => {
  ;(Object.keys(listeners) as (keyof typeof listeners)[]).forEach(
    event => {
      const handler = listeners[event]
      if (!Array.isArray(handler)) {
        throw new Error('The handler for each event is an array type.')
      }
    }
  )
}
