import { captureOption } from '.'

describe('captureOption func', () => {
  test('passed nothing arg | passed undefined', () => {
    expect(captureOption()).toBe(false)
    expect(captureOption(undefined)).toBe(false)
  })

  test.each`
    listenerOptions                       | expected
    ${{ capture: true }}                  | ${true}
    ${{ capture: false }}                 | ${false}
    ${{ once: true }}                     | ${false}
    ${{ passive: false }}                 | ${false}
    ${{ passive: false, capture: true }}  | ${true}
    ${{ passive: false, capture: false }} | ${false}
  `('passed object type listenerOptions', ({ listenerOptions, expected }) => {
    expect(captureOption(listenerOptions)).toBe(expected)
  })

  test('passed boolean type listenerOptions', () => {
    expect(captureOption(true)).toBe(true)
    expect(captureOption(false)).toBe(false)
  })
})

describe('detectListenerOption func', () => {
  const listenerOptionsMock = { capture: true, passive: true }
  const listenerOptionsMock2 = { capture: false, passive: true }
  const captureOptionMock = true

  beforeEach(() => {
    jest.resetModules() // reset mock module when run each test.
  })

  test('When Supports passive: Return the passed argument.', () => {
    // Set mocks
    jest.mock('detect-passive-events', () => ({ hasSupport: true }))
    const detectPassiveEvents = require('detect-passive-events')
    const { detectListenerOption } = require('.')

    // is simulate supportsPassive === true
    expect(detectPassiveEvents.hasSupport).toBe(true)

    expect(detectListenerOption(listenerOptionsMock)).toBe(listenerOptionsMock)
    expect(detectListenerOption(captureOptionMock)).toBe(captureOptionMock)
    expect(detectListenerOption(undefined)).toBeUndefined()
  })

  test('When "not" Supports passive: Return boolean by captureOption Func.', () => {
    // Set mocks
    jest.mock('detect-passive-events', () => ({ hasSupport: false }))
    const detectPassiveEvents = require('detect-passive-events')
    const { detectListenerOption } = require('.')

    // is simulate supportsPassive === false
    expect(detectPassiveEvents.hasSupport).toBe(false)

    expect(detectListenerOption(listenerOptionsMock)).toBe(true)
    expect(detectListenerOption(listenerOptionsMock2)).toBe(false)
    expect(detectListenerOption(captureOptionMock)).toBe(true)
    expect(detectListenerOption(!captureOptionMock)).toBe(false)
  })
})
