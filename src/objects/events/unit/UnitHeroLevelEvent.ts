import { ObjectStorage } from "../../../services/ObjectStorage";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitHeroLevelEventDetail extends UnitEventDetail {
}

export interface UnitHeroLevelEvent {
  detail: UnitHeroLevelEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitHeroLevelEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
  };
};

export class UnitHeroLevelEvent extends UnitEvent {
  constructor(type: string, detail: UnitHeroLevelEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}
