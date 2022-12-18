import { ObjectStorage } from "../../../services/ObjectStorage";
import { Unit } from "../../Unit";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitChangeOwnerEventDetail extends UnitEventDetail {
  //TODO: Когда будет класс Player, заменить тип на Player
  previewOwner: HPlayer,
}

export interface UnitChangeOwnerEvent {
  detail: UnitChangeOwnerEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitChangeOwnerEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
    previewOwner: objectStorage.getOrWrap(GetChangingUnitPrevOwner()),
  };
};

export class UnitChangeOwnerEvent extends UnitEvent {
  constructor(type: string, detail: UnitChangeOwnerEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}