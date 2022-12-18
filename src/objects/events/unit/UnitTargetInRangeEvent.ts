import { ObjectStorage } from "../../../services/ObjectStorage";
import { Unit } from "../../Unit";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitTargetInRangeEventDetail extends UnitEventDetail {
  target: Unit
}

export interface UnitTargetInRangeEvent {
  detail: UnitTargetInRangeEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitTargetInRangeEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
    target: objectStorage.getOrWrap(GetEventTargetUnit()),
  };
};

export class UnitTargetInRangeEvent extends UnitEvent {
  constructor(type: string, detail: UnitTargetInRangeEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}