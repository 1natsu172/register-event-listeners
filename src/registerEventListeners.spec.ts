import { registerEventListeners } from "./registerEventListeners";

const handlerMock1 = jest.fn();
const handlerMock2 = jest.fn();

const handlers1 = {
  scroll: handlerMock1,
  touchstart: handlerMock1,
  touchmove: handlerMock1,
  touchend: handlerMock1,
  click: handlerMock1
};

const handlers2 = {
  focus: handlerMock2,
  blur: handlerMock2,
  keydown: handlerMock2,
  keypress: handlerMock2,
  keyup: handlerMock2
};

let element: HTMLElement;
let registerEventListeners1: ReturnType<typeof registerEventListeners>;
let registerEventListeners2: ReturnType<typeof registerEventListeners>;

beforeAll(() => {
  /**
   * @description initialize
   */
  element = document.createElement("div");
  document.body.appendChild(element);

  registerEventListeners1 = registerEventListeners(element, [
    ["scroll", handlers1.scroll],
    ["touchstart", handlers1.touchstart],
    ["touchmove", handlers1.touchmove],
    ["touchend", handlers1.touchend],
    ["click", handlers1.click]
  ]);

  registerEventListeners2 = registerEventListeners(element, [
    ["focus", handlers2.focus],
    ["blur", handlers2.blur],
    ["keydown", handlers2.keydown],
    ["keypress", handlers2.keypress],
    ["keyup", handlers2.keyup]
  ]);
});

afterAll(() => {
  /**
   * @description unRegister reliably
   */
  registerEventListeners1.unRegister();
  registerEventListeners2.unRegister();
});

describe("When an event occurs after register", () => {
  beforeEach(() => {
    const { register } = registerEventListeners1;
    register();
  });

  afterEach(() => {
    const { unRegister } = registerEventListeners1;
    unRegister();
    handlerMock1.mockClear(); // Clear called record
  });

  Object.keys(handlers1).forEach(event => {
    test("The expected handler is called for each event.", () => {
      element.dispatchEvent(new Event(event));
      expect(handlers1[event]).toHaveBeenCalled();
    });
    test("Handler is not called for unrelated event.", () => {
      element.dispatchEvent(new Event("mouseMove"));
      expect(handlers1[event]).not.toHaveBeenCalled();
    });
  });
});

describe("When an event occurs after unRegister", () => {
  beforeAll(() => {
    const { register, unRegister } = registerEventListeners1;
    register();
    unRegister();
  });

  Object.keys(handlers1).forEach(event => {
    test("listeners are removed and nothing is called.", () => {
      element.dispatchEvent(new Event(event));
      expect(handlers1[event]).not.toHaveBeenCalled();
    });
  });
});

describe("Remove listeners(unRegister) tests of multiple instances", () => {
  let instance1: typeof registerEventListeners1;
  let instance2: typeof registerEventListeners2;

  beforeAll(() => {
    instance1 = registerEventListeners1;
    instance2 = registerEventListeners2;
  });
  beforeEach(() => {
    instance1.register();
    instance2.register();
  });
  afterEach(() => {
    instance1.unRegister();
    instance2.unRegister();
    handlerMock1.mockClear();
    handlerMock2.mockClear();
  });

  test("Only execute unRegister1: register2's listeners still alive.", () => {
    instance1.unRegister();
    Object.keys(handlers1).forEach(event => {
      element.dispatchEvent(new Event(event));
      expect(handlers1[event]).not.toHaveBeenCalled();
    });

    Object.keys(handlers2).forEach(event => {
      element.dispatchEvent(new Event(event));
      expect(handlers2[event]).toHaveBeenCalled();
    });
  });

  test("unRegister instance2: both instances listeners removed.", () => {
    instance1.unRegister();
    instance2.unRegister();
    Object.keys({ ...handlers1, ...handlers2 }).forEach(event => {
      element.dispatchEvent(new Event(event));
      expect({ ...handlers1, ...handlers2 }[event]).not.toHaveBeenCalled();
    });
  });
});

describe("register then unRegister then re-register", () => {
  let instance1: typeof registerEventListeners1;

  beforeAll(() => {
    instance1 = registerEventListeners1;
  });

  beforeEach(() => {
    handlerMock1.mockClear();
  });

  afterAll(() => {
    // cleanup
    instance1.unRegister();
  });

  test("handler is called.", () => {
    instance1.register();
    Object.keys(handlers1).forEach(event => {
      element.dispatchEvent(new Event(event));
      expect(handlers1[event]).toHaveBeenCalled();
    });
  });

  test('handler is "not" called.', () => {
    instance1.unRegister();
    Object.keys(handlers1).forEach(event => {
      element.dispatchEvent(new Event(event));
      expect(handlers1[event]).not.toHaveBeenCalled();
    });
  });

  test("listeners are re-registed, so handler is called.", () => {
    instance1.register();
    Object.keys(handlers1).forEach(event => {
      element.dispatchEvent(new Event(event));
      expect(handlers1[event]).toHaveBeenCalled();
    });
  });
});

describe("Errors by argument inputs", () => {
  test("2nd arg nesting values is not Array type.", () => {
    expect(() =>
      registerEventListeners(element, ["mousedown", handlerMock1])
    ).toThrow();
  });
});

describe("Validity check of EventTarget", () => {
  const eventTargets = [
    window,
    document,
    document.body,
    document.createElement("div")
  ];
  const event = "scroll";

  const registedListeners: ReturnType<typeof registerEventListeners>[] = [];

  beforeAll(() => {
    eventTargets.forEach(eventTarget => {
      const registedListener = registerEventListeners(eventTarget, [
        [event, handlers1.scroll]
      ]);
      registedListener.register();
      registedListeners.push(registedListener);
    });
  });

  afterAll(() => {
    registedListeners.forEach(registedListener => {
      const { unRegister } = registedListener;
      unRegister();
    });
  });

  afterEach(() => {
    handlerMock1.mockClear(); // Clear called record
  });

  eventTargets.forEach(eventTarget => {
    test("Check if listener is passing for eventTargets", () => {
      eventTarget.dispatchEvent(new Event(event));
      expect(handlerMock1).toHaveBeenCalled();
    });
  });
});
