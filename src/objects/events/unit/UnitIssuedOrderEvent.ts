import { ObjectStorage } from "../../../services/ObjectStorage";
import { Unit } from "../../Unit";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitIssuedOrderEventDetail extends UnitEventDetail {
  issuedOrder: number,
}

export interface UnitIssuedOrderEvent {
  detail: UnitIssuedOrderEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitIssuedOrderEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
    issuedOrder: GetIssuedOrderId(),
  };
};

export class UnitIssuedOrderEvent extends UnitEvent {
  constructor(type: string, detail: UnitIssuedOrderEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}