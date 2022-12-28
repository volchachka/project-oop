import { ObjectStorage } from "../../../services/ObjectStorage";
import { Item } from "../../Item";
import { Unit } from "../../Unit";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitUseItemEventDetail extends UnitEventDetail {
  usedItem: Item;
}

export interface UnitUseItemEvent {
  detail: UnitUseItemEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitUseItemEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
    usedItem: objectStorage.getOrWrap(GetManipulatedItem()),
  };
};

export class UnitUseItemEvent extends UnitEvent {
  constructor(type: string, detail: UnitUseItemEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}
