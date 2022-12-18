import { ObjectStorage } from "../../../services/ObjectStorage";
import { Unit } from "../../Unit";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitAttackedEventDetail extends UnitEventDetail {
  attacker: Unit;
}

export interface UnitAttackedEvent {
  detail: UnitAttackedEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitAttackedEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
    attacker: objectStorage.getOrWrap(GetAttacker()),
  };
};

export class UnitAttackedEvent extends UnitEvent {
  constructor(type: string, detail: UnitAttackedEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}