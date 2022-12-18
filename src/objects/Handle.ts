import { EventCallback, EventSettings, EventTarget } from "../services/EventTarget";
import { RemoveHandleEvent } from "./events/RemoveHandleEvent";

export interface Handle {
  [key: string]: any;
}

export class Handle extends EventTarget {
  protected handle: HHandle | null;

  public constructor(handle: HHandle) {
    super();
    this.handle = handle;
  }

  public remove() {
    let isRemoved = false;

    switch (type(this.handle)) {
      case "unit":
        RemoveUnit(this.handle as HUnit);
        isRemoved = true;
        break;

      case "timer":
        DestroyTimer(this.handle as HTimer);
        isRemoved = true;
        break;
    }

    if (isRemoved) {
      this.handle = null;

      this.dispatchEvent(new RemoveHandleEvent(this));
    }
  }

  public isHandleAlive() {
    return this.handle !== null;
  }

  public toHandle() {
    return this.handle;
  }

  public addEventListener(type: "remove", listener: (event: RemoveHandleEvent<Handle>) => void, once?: EventSettings): void;
  public addEventListener(type: string, listener: EventCallback, settings?: EventSettings): void;
  public addEventListener(type: string, listener: EventCallback, settings?: EventSettings) {
    super.addEventListener(type, listener, settings);
  }

  get handleId() {
    return GetHandleId(this.handle);
  }

  get type() {
    return type(this.handle);
  }
}
