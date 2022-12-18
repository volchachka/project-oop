import { ObjectStorage } from "../../../services/ObjectStorage";
import { Unit } from "../../Unit";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitDetectEventDetail extends UnitEventDetail {
  //TODO: Когда будет класс Player, заменить на Player
  detectingPlayer: HPlayer,
}

export interface UnitDetectEvent {
  detail: UnitDetectEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitDetectEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
    detectingPlayer: objectStorage.getOrWrap(GetEventDetectingPlayer())
  };
};

export class UnitDetectEvent extends UnitEvent {
  constructor(type: string, detail: UnitDetectEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}