import { ObjectStorage } from "../../../services/ObjectStorage";
import { GamePlayer } from "../../GamePlayer";
import { Unit } from "../../Unit";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitChangeOwnerEventDetail extends UnitEventDetail {
  previewOwner: GamePlayer;
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
