import { EventCallback, EventSettings } from "../services/EventTarget";
import { RemoveHandleEvent } from "./events/RemoveHandleEvent";
import { TimerElapsedEvent } from "./events/TimerElapsedEvent";
import { Handle } from "./Handle";

export class Timer extends Handle {
  private _interval: number;
  private _autoreset: boolean;
  private _enabled: boolean;
  private _paused: boolean;

  constructor(timer?: HTimer) {
    if (timer) super(timer);
    else super(CreateTimer());

    this._interval = 1000;
    this._autoreset = true;
    this._enabled = false;
    this._paused = false;
  }

  get enabled() {
    return this._enabled;
  }

  set enabled(value: boolean) {
    this._enabled = value;

    if (value) {
      this.startTimer();
    } else {
      // PauseTimer
    }
  }

  get interval() {
    return this._interval;
  }

  set interval(value: number) {
    this._interval = value;

    if (this._enabled) {
      this.startTimer();
    }
  }

  get autoReset() {
    return this._autoreset;
  }

  set autoReset(value: boolean) {
    this._autoreset = value;

    if (this._enabled) {
      this.startTimer();
    }
  }

  get paused() {
    return this._paused;
  }

  set paused(value: boolean) {
    if (!this._enabled) {
      throw new Error("Timer disabled");
    }

    this._paused = value;

    if (value) {
      PauseTimer(this.handle as HTimer);
    } else {
      ResumeTimer(this.handle as HTimer);
    }
  }

  get elapsed() {
    return R2I(TimerGetElapsed(this.handle as HTimer) * 1000);
  }

  get remaining() {
    return R2I(TimerGetRemaining(this.handle as HTimer) * 1000);
  }

  public addEventListener(type: "elapse", listener: (event: TimerElapsedEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "remove", listener: (event: RemoveHandleEvent<Timer>) => void, once?: EventSettings): void;
  public addEventListener(type: string, listener: EventCallback, settings?: EventSettings): void;
  public addEventListener(type: string, listener: EventCallback, settings?: EventSettings) {
    super.addEventListener(type, listener, settings);
  }

  private startTimer() {
    TimerStart(this.handle as HTimer, this._interval / 1000, this._autoreset, () => {
      this.timerTick();
    });
  }

  private timerTick(): void {
    this.dispatchEvent(new TimerElapsedEvent(this));
  }
}
