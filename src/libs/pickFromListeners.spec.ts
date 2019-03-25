import { pickEventType, pickHandler, pickListenerOption } from '.'
import { EventListeners } from '../types/EventListeners'

const mock: EventListeners<
  'touchstart' | 'toggle' | 'focus' | 'scroll' | 'keydown'
> = [
  ['touchstart', jest.fn(() => {})],
  ['toggle', jest.fn(() => {}), false],
  ['focus', jest.fn(() => {}), true],
  ['scroll', jest.fn(() => {}), { capture: true }],
  ['keydown', jest.fn(() => {}), { passive: false }]
]

describe('pickEventType', () => {
  test('pick event type from each listener', () => {
    mock.forEach((listener, index) => {
      expect(pickEventType(listener)).toBe(mock[index][0])
    })
  })
})

describe('pickHandler', () => {
  test('pick handler from each listener', () => {
    mock.forEach((listener, index) => {
      expect(pickHandler(listener)).toBe(mock[index][1])
    })
  })
})

describe('pickListenerOption', () => {
  test('When ListenerOptions is "not" passed', () => {
    expect(pickListenerOption(mock[0])).toBeUndefined()
  })
  test('When ListenerOptions is passed "boolean"', () => {
    expect(pickListenerOption(mock[1])).toBe(false)
    expect(pickListenerOption(mock[2])).toBe(true)
  })
  test('When ListenerOptions is passed "object"', () => {
    expect(pickListenerOption(mock[3])).toMatchObject({ capture: true })
    expect(pickListenerOption(mock[4])).toMatchObject({
      passive: false
    })
  })
})
