import { ObjectStorage } from "../../../services/ObjectStorage";
import { Unit } from "../../Unit";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitDropItemEventDetail extends UnitEventDetail {
  //TODO: Когда будет класс Item, заменить на Item
  droppedItem: HItem;
}

export interface UnitDropItemEvent {
  detail: UnitDropItemEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitDropItemEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
    droppedItem: GetManipulatedItem(),
  };
};

export class UnitDropItemEvent extends UnitEvent {
  constructor(type: string, detail: UnitDropItemEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}
