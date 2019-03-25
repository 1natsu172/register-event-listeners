import { checkArgs } from '.'

/**
 * @description
 * For .js testing.
 * Type Errors is expected.
 */
test('when input Array', () => {
  expect(() => {
    checkArgs([['keydown', jest.fn()]])
  }).not.toThrow()
})

test('when input "not" Array', () => {
  expect(() => {
    checkArgs('scroll', jest.fn())
  }).toThrow()
  expect(() => {
    checkArgs(['scroll', jest.fn()])
  }).toThrow()
})
