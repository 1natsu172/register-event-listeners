/**
 * @description From type-fest(https://github.com/sindresorhus/type-fest)
 */

/**
Matches any [primitive value](https://developer.mozilla.org/en-US/docs/Glossary/Primitive).
*/
export type Primitive = null | undefined | string | number | boolean | symbol

export type LiteralUnion<
  LiteralType extends BaseType,
  BaseType extends Primitive
> = LiteralType | (BaseType & { _?: never })
