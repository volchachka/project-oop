import { ObjectStorage } from "../../../services/ObjectStorage";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitSelectedEventDetail extends UnitEventDetail {
}

export interface UnitSelectedEvent {
  detail: UnitSelectedEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitSelectedEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
  };
};

export class UnitSelectedEvent extends UnitEvent {
  constructor(type: string, detail: UnitSelectedEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}