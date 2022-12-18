import { ObjectStorage } from "../../../services/ObjectStorage";
import { Unit } from "../../Unit";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitRescuedEventDetail extends UnitEventDetail {
  rescuer: Unit;
}

export interface UnitRescuedEvent {
  detail: UnitRescuedEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitRescuedEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
    rescuer: objectStorage.getOrWrap(GetRescuer()),
  };
};

export class UnitRescuedEvent extends UnitEvent {
  constructor(type: string, detail: UnitRescuedEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}