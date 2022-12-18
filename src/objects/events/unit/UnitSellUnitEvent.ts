import { ObjectStorage } from "../../../services/ObjectStorage";
import { Unit } from "../../Unit";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitSellUnitEventDetail extends UnitEventDetail {
  soldUnit: Unit
}

export interface UnitSellUnitEvent {
  detail: UnitSellUnitEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitSellUnitEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
    soldUnit: objectStorage.getOrWrap(GetSoldUnit()),
  };
};

export class UnitSellUnitEvent extends UnitEvent {
  constructor(type: string, detail: UnitSellUnitEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}