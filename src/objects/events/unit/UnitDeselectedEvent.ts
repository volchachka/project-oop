import { ObjectStorage } from "../../../services/ObjectStorage";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitDeselectedEventDetail extends UnitEventDetail {
}

export interface UnitDeselectedEvent {
  detail: UnitDeselectedEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitDeselectedEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
  };
};

export class UnitDeselectedEvent extends UnitEvent {
  constructor(type: string, detail: UnitDeselectedEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}