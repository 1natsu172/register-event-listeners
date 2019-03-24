# register-event-listeners

**Utility function to register multiple events**

_**In other words, util function that multiple execute addEventListener/removeEventListener**_

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
const onEnd = (event) => console.log(`${event.type} event dispatched.`)

const { register, unRegister } = registerEventListeners(eventTarget, {
  touchstart: [onTouchStart],
  touchmove: [onTouchMove, { passive: false }],
  touchend: [onEnd],
  touchcancel: [onEnd]
})

// Execute element.addEventListener(s) passed to the argument.
register()

// Now added event listeners. 🔈

// Execute element.removeEventListener(s) passed to the argument.
unRegister()

// Now removed event listeners. 🔇
```

## 🔥 APIs

### `registerEventListeners(element, listeners)`

| name          | require |                                                                 type                                                                 | default | decstiption                                                                                             |
| ------------- | :-----: | :----------------------------------------------------------------------------------------------------------------------------------: | :-----: | ------------------------------------------------------------------------------------------------------- |
| element       |    ✓    |                                                             HTMLElement                                                              |    -    | [MDN - EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)                       |
| listeners |    ✓    | object([HTMLElementEventHandlerType](https://1natsu172.github.io/register-event-listeners/globals.html#htmlelementeventhandlertype)) |    -    | [MDN - addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) |

#### About 2nd argument(listeners)

##### object - Key

Key is an event name. **This must be strictly an [event.type](https://developer.mozilla.org/ja/docs/Web/API/Event/type).**

##### object - Value

**Value must be array type.**

`[handler, listenerOptions]` 

Please follow this format. `handler` is required, `listenerOptions` is optional.

This is exactly the same as the format of the second and third arguments of [`addEventListener`](https://developer.mozilla.org/ja/docs/Web/API/EventTarget/addEventListener).

##### The second argument object should be like this.

```javascript
{
  touchstart: [onTouchStart, {capture: true, once: true}],
  touchmove: [onTouchMove, { passive: false }],
  touchend: [onEnd],
  touchcancel: [onEnd]
}
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
