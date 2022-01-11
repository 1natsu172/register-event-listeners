import { ListenerOptions } from "./ListenerOptions";
import { LiteralUnion } from "./utils/LiteralUnion";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Make populary eventMap type……()
 */
export interface EventMap
  extends WindowEventMap,
    DocumentEventMap,
    HTMLElementEventMap {}

/**
 * In other word, Event name.
 * e.g.'scroll', 'touchmove'…
 */
export type EventType = LiteralUnion<keyof EventMap, string>;

/**
 * From addEventListener definition(dom.d.ts)
 * @todo ev: argument can't infer Event, temporary any…….
 */
type EventHandlerSignature<EventName extends keyof EventMap> = (
  this: EventTarget,
  ev: EventMap[EventName] | Event | any // Why can not infer Event??
) => any;

export type EventHandler<
  EventName extends EventType
> = EventName extends keyof EventMap
  ? EventHandlerSignature<EventName> | EventListenerOrEventListenerObject
  : EventListenerOrEventListenerObject | null;

export type EventListener<E extends EventType> = [
  Extract<EventType, E>,
  EventHandler<E>,
  ListenerOptions?
];

/**
 * @type Object type for 2nd argment, key is event name: value is handler and optional options.
 */
export type EventListeners<E extends EventType> = EventListener<E>[];
