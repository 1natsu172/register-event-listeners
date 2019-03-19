import {
  pickHandler,
  pickListenerOption,
  detectListenerOption,
  captureOption
} from './libs'

import { HTMLElementEventHandlers } from './types/HTMLElementEventHandler'

export const htmlElementEventListeners = <K extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  eventHandlers: HTMLElementEventHandlers<K>
) => {
  // if (!Array.isArray(eventHandlers)) {
  //   throw new Error(
  //     'eventHandlers is not an array type. eventHandlers must be an array type.'
  //   )
  // }

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
