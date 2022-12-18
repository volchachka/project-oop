import { ObjectStorage } from "../../../services/ObjectStorage";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitHeroReviveEventDetail extends UnitEventDetail {
}

export interface UnitHeroReviveEvent {
  detail: UnitHeroReviveEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitHeroReviveEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
  };
};

export class UnitHeroReviveEvent extends UnitEvent {
  constructor(type: string, detail: UnitHeroReviveEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}
