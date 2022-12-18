import { ObjectStorage } from "../../../services/ObjectStorage";
import { Unit } from "../../Unit";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitCancelConstructionEventDetail extends UnitEventDetail {
  cancelledConstruction: Unit;
}

export interface UnitCancelConstructionEvent {
  detail: UnitCancelConstructionEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitCancelConstructionEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
    cancelledConstruction: objectStorage.getOrWrap(GetCancelledStructure()),
  };
};

export class UnitCancelConstructionEvent extends UnitEvent {
  constructor(type: string, detail: UnitCancelConstructionEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}