import { ObjectStorage } from "../../../services/ObjectStorage";
import { Item } from "../../Item";
import { Unit } from "../../Unit";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitDropItemEventDetail extends UnitEventDetail {
  droppedItem: Item;
}

export interface UnitDropItemEvent {
  detail: UnitDropItemEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitDropItemEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
    droppedItem: objectStorage.getOrWrap(GetManipulatedItem()),
  };
};

export class UnitDropItemEvent extends UnitEvent {
  constructor(type: string, detail: UnitDropItemEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}
