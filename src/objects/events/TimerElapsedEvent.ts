import { Timer } from "../Timer";
import { Event } from "./Event";

export interface TimerElapsedEvent {
  detail: Timer;
}

export class TimerElapsedEvent extends Event {
  constructor(timer: Timer) {
    super("elapse", timer);
  }
}
