import {
  pickHandler,
  pickListenerOption,
  detectListenerOption,
  captureOption,
  checkEventHandlersArg
} from './libs'

import { HTMLElementEventHandlers } from './types/HTMLElementEventHandler'

export const htmlElementEventListeners = <K extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  eventHandlers: HTMLElementEventHandlers<K>
) => {
  checkEventHandlersArg(eventHandlers)

  const register = () =>
    (Object.keys(eventHandlers) as (keyof typeof eventHandlers)[]).forEach(
      event => {
        const handler = pickHandler(event, eventHandlers)
        const pickedOption = pickListenerOption(event, eventHandlers)
        const listenerOption = detectListenerOption(pickedOption)

        element.addEventListener(event, handler, listenerOption)
      }
    )

  const unRegister = () =>
    (Object.keys(eventHandlers) as (keyof typeof eventHandlers)[]).forEach(
      event => {
        const handler = pickHandler(event, eventHandlers)
        const pickedOption = pickListenerOption(event, eventHandlers)
        const listenerOption = captureOption(pickedOption)

        element.removeEventListener(
          event,
          handler,
          listenerOption // c.f https://developer.mozilla.org/ja/docs/Web/API/EventTarget/removeEventListener
        )
      }
    )

  return { register, unRegister }
}
