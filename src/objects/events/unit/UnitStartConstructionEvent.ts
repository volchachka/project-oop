import { ObjectStorage } from "../../../services/ObjectStorage";
import { Unit } from "../../Unit";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitStartConstructionEventDetail extends UnitEventDetail {
  constructingStructure: Unit;
}

export interface UnitStartConstructionEvent {
  detail: UnitStartConstructionEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitStartConstructionEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
    constructingStructure: objectStorage.getOrWrap(GetConstructingStructure()),
  };
};

export class UnitStartConstructionEvent extends UnitEvent {
  constructor(type: string, detail: UnitStartConstructionEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}