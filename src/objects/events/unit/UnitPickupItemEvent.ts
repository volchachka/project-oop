import { ObjectStorage } from "../../../services/ObjectStorage";
import { Unit } from "../../Unit";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitPickupItemEventDetail extends UnitEventDetail {
  //TODO: Когда будет класс Item, заменить на Item
  pickedupItem: HItem;
}

export interface UnitPickupItemEvent {
  detail: UnitPickupItemEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitPickupItemEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
    pickedupItem: GetManipulatedItem(),
  };
};

export class UnitPickupItemEvent extends UnitEvent {
  constructor(type: string, detail: UnitPickupItemEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}
