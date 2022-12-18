import { ObjectStorage } from "../../../services/ObjectStorage";
import { Unit } from "../../Unit";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitFinishConstructionEventDetail extends UnitEventDetail {
  constructedStructure: Unit;
}

export interface UnitFinishConstructionEvent {
  detail: UnitFinishConstructionEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitFinishConstructionEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
    constructedStructure: objectStorage.getOrWrap(GetConstructedStructure()),
  };
};

export class UnitFinishConstructionEvent extends UnitEvent {
  constructor(type: string, detail: UnitFinishConstructionEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}