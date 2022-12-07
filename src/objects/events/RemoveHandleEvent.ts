import { Event } from "./Event";

export interface RemoveHandleEvent<T> {
  detail: T;
}

export class RemoveHandleEvent<T> extends Event {
  constructor(handle: T) {
    super("remove", handle);
  }
}
