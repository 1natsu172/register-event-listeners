import detectPassiveEvents from 'detect-passive-events'

import { ListenerOptions } from '../types/ListenerOptions'

const supportsPassive = detectPassiveEvents.hasSupport

/**
 *
 * @description
 * Detect if the user has specified useCapture.
 * –– Otherwise, the implicit default value is false.
 */
export const captureOption = (listenerOptions?: ListenerOptions): boolean =>
  !!(
    (typeof listenerOptions === 'object' && listenerOptions.capture === true) ||
    (typeof listenerOptions === 'boolean' && listenerOptions === true)
  )

/**
 *
 * @description
 * Pass the listenerOptions as is if Object type options are available.
 * –– Otherwise, forced pass a Boolean(useCaptureOption).
 */
export const detectListenerOption = (
  listenerOption?: ListenerOptions
): ListenerOptions | undefined =>
  supportsPassive ? listenerOption : captureOption(listenerOption)
