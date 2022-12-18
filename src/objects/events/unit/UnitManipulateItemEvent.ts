import { ObjectStorage } from "../../../services/ObjectStorage";
import { Unit } from "../../Unit";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitManipulatingItemEventDetail extends UnitEventDetail {
  //TODO: Когда будет класс Item, заменить на Item
  manipulatingItem: HItem,
}

export interface UnitManipulatingItemEvent {
  detail: UnitManipulatingItemEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitManipulatingItemEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
    manipulatingItem: objectStorage.getOrWrap(GetManipulatedItem()),
  };
};

export class UnitManipulatingItemEvent extends UnitEvent {
  constructor(type: string, detail: UnitManipulatingItemEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}