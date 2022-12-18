import { ObjectStorage } from "../../../services/ObjectStorage";
import { Unit } from "../../Unit";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitAcquiredTargetEventDetail extends UnitEventDetail {
  target: Unit
}

export interface UnitAcquiredTargetEvent {
  detail: UnitAcquiredTargetEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitAcquiredTargetEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
    target: objectStorage.getOrWrap(GetEventTargetUnit()),
  };
};

export class UnitAcquiredTargetEvent extends UnitEvent {
  constructor(type: string, detail: UnitAcquiredTargetEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}