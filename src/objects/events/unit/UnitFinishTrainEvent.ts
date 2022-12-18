import { ObjectStorage } from "../../../services/ObjectStorage";
import { Unit } from "../../Unit";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitFinishTrainEventDetail extends UnitEventDetail {
  trainedUnit: Unit
}

export interface UnitFinishTrainEvent {
  detail: UnitFinishTrainEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitFinishTrainEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
    trainedUnit: objectStorage.getOrWrap(GetTrainedUnit()),
  };
};

export class UnitFinishTrainEvent extends UnitEvent {
  constructor(type: string, detail: UnitFinishTrainEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}