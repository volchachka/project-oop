import { ObjectStorage } from "../../../services/ObjectStorage";
import { Unit } from "../../Unit";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitIssuedPointOrderEventDetail extends UnitEventDetail {
  issuedOrderId: number,
  orderPointX: number,
  orderPointY: number,
  //TODO: Когда будет класс Location заменить на Location
  orderLocation: HLocation,
}

export interface UnitIssuedPointOrderEvent {
  detail: UnitIssuedPointOrderEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitIssuedPointOrderEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
    issuedOrderId: GetIssuedOrderId(),
    orderPointX: GetOrderPointX(),
    orderPointY: GetOrderPointY(),
    orderLocation: objectStorage.getOrWrap(GetOrderPointLoc()),
  };
};

export class UnitIssuedPointOrderEvent extends UnitEvent {
  constructor(type: string, detail: UnitIssuedPointOrderEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}