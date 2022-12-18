import { ObjectStorage } from "../../../services/ObjectStorage";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitStartTrainEventDetail extends UnitEventDetail {
  trainedUnitType: number;
}

export interface UnitStartTrainEvent {
  detail: UnitStartTrainEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitStartTrainEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
    trainedUnitType: GetTrainedUnitType(),
  };
};

export class UnitStartTrainEvent extends UnitEvent {
  constructor(type: string, detail: UnitStartTrainEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}