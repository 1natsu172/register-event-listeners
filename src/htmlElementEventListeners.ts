import {
  pickHandler,
  pickListenerOption,
  detectListenerOption,
  captureOption,
  checkEventHandlersArg
} from './libs'

import { HTMLElementEventHandlers } from './types/HTMLElementEventHandler'

export const registerEventListeners = <K extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  listeners: HTMLElementEventHandlers<K>
) => {
  checkEventHandlersArg(listeners)

  const register = () =>
    (Object.keys(listeners) as (keyof typeof listeners)[]).forEach(
      event => {
        const handler = pickHandler(event, listeners)
        const pickedOption = pickListenerOption(event, listeners)
        const listenerOption = detectListenerOption(pickedOption)

        element.addEventListener(event, handler, listenerOption)
      }
    )

  const unRegister = () =>
    (Object.keys(listeners) as (keyof typeof listeners)[]).forEach(
      event => {
        const handler = pickHandler(event, listeners)
        const pickedOption = pickListenerOption(event, listeners)
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
