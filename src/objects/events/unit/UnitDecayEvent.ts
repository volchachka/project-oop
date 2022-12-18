import { ObjectStorage } from "../../../services/ObjectStorage";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitDecayEventDetail extends UnitEventDetail {
}

export interface UnitDecayEvent {
  detail: UnitDecayEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitDecayEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
  };
};

export class UnitDecayEvent extends UnitEvent {
  constructor(type: string, detail: UnitDecayEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}