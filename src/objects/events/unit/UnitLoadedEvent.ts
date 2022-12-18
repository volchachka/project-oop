import { ObjectStorage } from "../../../services/ObjectStorage";
import { Unit } from "../../Unit";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitLoadedEventDetail extends UnitEventDetail {
  transporter: Unit
}

export interface UnitLoadedEvent {
  detail: UnitLoadedEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitLoadedEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
    transporter: objectStorage.getOrWrap(GetTransportUnit()),
  };
};

export class UnitLoadedEvent extends UnitEvent {
  constructor(type: string, detail: UnitLoadedEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}