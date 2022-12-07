import { Event } from "../objects/events/Event";

export type EventCallback = (event: Event) => void;

export interface EventSettings {
  once?: boolean;
}

export class EventTarget {
  private events: Map<string, Map<EventCallback, EventSettings>>;

  constructor() {
    this.events = new Map();
  }

  public addEventListener(type: string, listener: EventCallback, settings?: EventSettings) {
    this.registerEventListener(type, listener, settings);
  }

  protected registerEventListener(type: string, listener: EventCallback, settings?: EventSettings) {
    let eventCallbacks = this.events.get(type);

    if (!eventCallbacks) {
      eventCallbacks = new Map();
      eventCallbacks.set(listener, {
        once: settings?.once,
      });
      this.events.set(type, eventCallbacks);
    } else {
      eventCallbacks.set(listener, {
        once: settings?.once,
      });
    }

    this.events.set(type, eventCallbacks);
  }

  public removeEventListener(type: string, listener: EventCallback) {
    let eventCallbacks = this.events.get(type);

    if (eventCallbacks) {
      eventCallbacks.delete(listener);
      this.events.set(type, eventCallbacks);
    }
  }

  public dispatchEvent(event: Event) {
    event.target = this;

    let eventCallbacks = this.events.get(event.type);

    if (eventCallbacks) {
      const callbacks = Array.from(eventCallbacks.keys());

      callbacks.forEach((i) => {
        try {
          if (eventCallbacks?.get(i)?.once) {
            this.removeEventListener(event.type, i);
          }

          i(event);
        } catch (e) {
          print(`|cFFFF0000 Callback ${event.target} evaluate error: ${e}`);
        }
      });
    }
  }

  protected hasEventListener(type: string): boolean {
    const callbacksMap = this.events.get(type);

    if (!callbacksMap) return false;

    return callbacksMap.size > 0;
  }
}
