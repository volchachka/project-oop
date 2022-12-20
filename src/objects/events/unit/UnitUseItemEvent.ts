import { ObjectStorage } from "../../../services/ObjectStorage";
import { Unit } from "../../Unit";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitUseItemEventDetail extends UnitEventDetail {
  //TODO: Когда будет класс Item, заменить на Item
  usedItem: HItem;
}

export interface UnitUseItemEvent {
  detail: UnitUseItemEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitUseItemEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
    usedItem: GetManipulatedItem(),
  };
};

export class UnitUseItemEvent extends UnitEvent {
  constructor(type: string, detail: UnitUseItemEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}
