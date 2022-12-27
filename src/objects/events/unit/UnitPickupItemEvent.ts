import { ObjectStorage } from "../../../services/ObjectStorage";
import { Item } from "../../Item";
import { Unit } from "../../Unit";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitPickupItemEventDetail extends UnitEventDetail {
  pickedupItem: Item;
}

export interface UnitPickupItemEvent {
  detail: UnitPickupItemEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitPickupItemEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
    pickedupItem: objectStorage.getOrWrap(GetManipulatedItem()),
  };
};

export class UnitPickupItemEvent extends UnitEvent {
  constructor(type: string, detail: UnitPickupItemEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}
