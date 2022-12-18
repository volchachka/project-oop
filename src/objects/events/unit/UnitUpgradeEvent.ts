import { ObjectStorage } from "../../../services/ObjectStorage";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitUpgradeEventDetail extends UnitEventDetail {
}

export interface UnitUpgradeEvent {
  detail: UnitUpgradeEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitUpgradeEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
  };
};

export class UnitUpgradeEvent extends UnitEvent {
  constructor(type: string, detail: UnitUpgradeEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}