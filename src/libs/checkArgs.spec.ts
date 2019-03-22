import { checkEventHandlersArg } from '.'

/**
 * @description
 * For .js testing.
 * Type Errors is expected.
 */
test('when input Array', () => {
  expect(() => {
    checkEventHandlersArg({ t: [] })
  }).not.toThrow()
  expect(() => {
    checkEventHandlersArg({ t: [1, 2] })
  }).not.toThrow()
})

test('when input "not" Array', () => {
  expect(() => {
    checkEventHandlersArg({ t: 1 })
  }).toThrow()
  expect(() => {
    checkEventHandlersArg({ t: '1' })
  }).toThrow()
  expect(() => {
    checkEventHandlersArg({ t: {} })
  }).toThrow()
  expect(() => {
    checkEventHandlersArg({ t: () => {} })
  }).toThrow()
})
