import { EventTarget } from "../services/EventTarget";

export interface Handle {
  [key: string]: any;
}

export class Handle extends EventTarget {
  protected handle: HHandle | null;

  public constructor(handle: HHandle) {
    super();
    this.handle = handle;
  }

  public isHandleAlive() {
    return this.handle !== null;
  }

  public toHandle() {
    return this.handle;
  }

  get handleId() {
    return GetHandleId(this.handle);
  }

  get type() {
    return tostring(this.handle);
  }
}
