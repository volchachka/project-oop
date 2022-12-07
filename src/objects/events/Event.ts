import { EventTarget } from "../../services/EventTarget";

export class Event {
  private _target: EventTarget | null;

  public readonly type: string;

  public readonly timestamp: number;

  public readonly detail: any;

  public get target(): EventTarget | null {
    return this._target;
  }

  public set target(value: EventTarget | null) {
    if (this._target) {
      throw new TypeError("target cant re-initialized");
    }

    this._target = value;
  }

  constructor(type: string, detail: any) {
    this.type = type;
    this.detail = detail;
    this._target = null;

    this.timestamp = os.time();
  }
}
