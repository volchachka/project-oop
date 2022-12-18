import { ObjectStorage } from "../../../services/ObjectStorage";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitHiddenEventDetail extends UnitEventDetail {
}

export interface UnitHiddenEvent {
  detail: UnitHiddenEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitHiddenEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
  };
};

export class UnitHiddenEvent extends UnitEvent {
  constructor(type: string, detail: UnitHiddenEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}