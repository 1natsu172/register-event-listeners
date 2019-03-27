[![](https://img.shields.io/npm/v/register-event-listeners.svg?style=for-the-badge&logo=npm&colorB=cc3534)](https://www.npmjs.com/package/register-event-listeners)
[![](https://img.shields.io/npm/types/register-event-listeners.svg?style=for-the-badge&logo=typescript&colorB=007acc)](https://www.npmjs.com/package/register-event-listeners)
[![](https://img.shields.io/circleci/project/github/1natsu172/register-event-listeners/master.svg?style=for-the-badge&logo=circleci&colorB=00992B)](https://circleci.com/gh/1natsu172/register-event-listeners)
![Codecov](https://img.shields.io/codecov/c/github/1natsu172/register-event-listeners.svg?color=%23FF2F6B&logo=codecov&style=for-the-badge)

# register-event-listeners

**Utility function to register multiple event listeners**

_**In other words, utility function that multiple execute addEventListener/removeEventListener**_

---

## _CAVEAT_

**Currently, the type definition of the second argument is little broken.**

Investigating a solution, but it is difficult……

Help wanted!([#1](https://github.com/1natsu172/register-event-listeners/issues/1))

---

## ✨ Getting Started

with **yarn**

```bash
yarn add register-event-listeners
```

or

with **npm**

```bash
npm install register-event-listeners
```

## 💁 Usage

```javascript
import { registerEventListeners } from 'register-event-listeners'

const eventTarget = document.body

const onTouchStart = (event) => console.log(`${event.type} event dispatched.`)
const onTouchMove = (event) => console.log(`${event.type} event dispatched.`)
const onEnd = (event) => console.log(`${event.type} event dispatched.`)

const { register, unRegister } = registerEventListeners(eventTarget, [
  ['touchstart', onTouchStart],
  ['touchmove', onTouchMove, { passive: false }],
  ['touchend', onEnd],
  ['touchcancel', onEnd]
])

// Execute element.addEventListener(s) passed to the argument.
register()

// Now added event listeners. 🔈

// Execute element.removeEventListener(s) passed to the argument.
unRegister()

// Now removed event listeners. 🔇
```

## 🔥 APIs

### `registerEventListeners(element, listeners)`

| name        | require |                                                   type                                                    | default | decstiption                                                                                             |
| ----------- | :-----: | :-------------------------------------------------------------------------------------------------------: | :-----: | ------------------------------------------------------------------------------------------------------- |
| eventTarget |    ✓    |                                                EventTarget                                                |    -    | [MDN - EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)                       |
| listeners   |    ✓    | Array([EventListeners](https://1natsu172.github.io/register-event-listeners/globals.html#eventlisteners)) |    -    | [MDN - addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) |

#### About the 2nd argument(listeners)


##### The element of the array

**Element is same as the format of the argument of [`addEventListener`](https://developer.mozilla.org/ja/docs/Web/API/EventTarget/addEventListener)**

That is this 👉 `[type, listener[, options])]`

* `type` is **[event.type](https://developer.mozilla.org/ja/docs/Web/API/Event/type).**
* `listener` is commonly called a **handler**
* `options` is listenerOptions

##### The 2nd argument should be like this.

```javascript
[
  ['touchstart', onTouchStart, {capture: true, once: true}],
  ['touchmove', onTouchMove, { passive: false }],
  ['touchend', onEnd],
  ['touchcancel', onEnd]
]
```

#### Returns

##### register

register event listeners. In other words _addEventListener**s**_.

##### unRegister

unRegister event listeners. In other words _removeEventListener**s**_.


## 💚 Running the tests

with [Jest](https://jestjs.io/).

```bash
yarn test
```
or

```bash
npm run test
```

<!-- 
## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us. -->

## 🏷 Versioning

Use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/1natsu172/handy-media-query/tags). 

## ©️ License

MIT © [1natsu172](https://github.com/1natsu172)
