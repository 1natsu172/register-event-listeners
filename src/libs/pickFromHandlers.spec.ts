import { pickHandler, pickListenerOption } from '.'
import { HTMLElementEventHandlers } from '../types/HTMLElementEventHandler'

const mock: HTMLElementEventHandlers<
  'scroll' | 'touchstart' | 'toggle' | 'focus' | 'keydown'
> = {
  touchstart: [() => {}],
  toggle: [() => {}, false],
  focus: [() => {}, true],
  scroll: [() => {}, { capture: true }],
  keydown: [() => {}, { passive: false }]
}

describe('pickHandler', () => {
  test('pick handler from each event values', () => {
    ;(Object.keys(mock) as (keyof typeof mock)[]).forEach(eventName => {
      expect(pickHandler(eventName, mock)).toBe(mock[eventName][0])
    })
  })
})

describe('pickListenerOption', () => {
  test('When ListenerOptions is "not" passed', () => {
    expect(pickListenerOption('touchstart', mock)).toBeUndefined()
  })
  test('When ListenerOptions is passed "boolean"', () => {
    expect(pickListenerOption('toggle', mock)).toBe(false)
    expect(pickListenerOption('focus', mock)).toBe(true)
  })
  test('When ListenerOptions is passed "object"', () => {
    expect(pickListenerOption('scroll', mock)).toMatchObject({ capture: true })
    expect(pickListenerOption('keydown', mock)).toMatchObject({
      passive: false
    })
  })
})
