import { ObjectStorage } from "../../../services/ObjectStorage";
import { Unit } from "../../Unit";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitSummonEventDetail extends UnitEventDetail {
  summonedUnit: Unit
}

export interface UnitSummonEvent {
  detail: UnitSummonEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitSummonEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
    summonedUnit: objectStorage.getOrWrap(GetSummonedUnit()),
  };
};

export class UnitSummonEvent extends UnitEvent {
  constructor(type: string, detail: UnitSummonEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}