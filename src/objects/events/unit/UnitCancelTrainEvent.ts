import { ObjectStorage } from "../../../services/ObjectStorage";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitCancelTrainEventDetail extends UnitEventDetail {
  trainedUnitType: number;
}

export interface UnitCancelTrainEvent {
  detail: UnitCancelTrainEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitCancelTrainEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
    trainedUnitType: GetTrainedUnitType(),
  };
};

export class UnitCancelTrainEvent extends UnitEvent {
  constructor(type: string, detail: UnitCancelTrainEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}