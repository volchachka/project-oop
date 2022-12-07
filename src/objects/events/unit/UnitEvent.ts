import { ObjectStorage } from "../../../services/ObjectStorage";
import { Unit } from "../../Unit";
import { Event } from "../Event";

export interface UnitEventDetail {
  triggerUnit: Unit;
}

export interface UnitEvent {
  detail: UnitEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
  };
};

export class UnitEvent extends Event {
  constructor(type: string, detail: UnitEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}
