import { ObjectStorage } from "../../../services/ObjectStorage";
import { Unit } from "../../Unit";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitIssuedTargetOrderEventDetail extends UnitEventDetail {
  issuedOrderId: number;
  //TODO: Когда будет класс Widget заменить на Widget
  orderTarget: HWidget;
  orderTargetUnit: Unit;
  //TODO: Когда будет класс Item заменить на Item
  orderTargetItem: HItem;
  //TODO: Когда будет класс Destructable заменить на Destructable
  orderTargetDestructable: HDestructable;
}

export interface UnitIssuedTargetOrderEvent {
  detail: UnitIssuedTargetOrderEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitIssuedTargetOrderEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
    issuedOrderId: GetIssuedOrderId(),
    orderTarget: GetOrderTarget(),
    orderTargetUnit: objectStorage.getOrWrap(GetOrderTargetUnit()),
    orderTargetDestructable: GetOrderTargetDestructable(),
    orderTargetItem: GetOrderTargetItem(),
  };
};

export class UnitIssuedTargetOrderEvent extends UnitEvent {
  constructor(type: string, detail: UnitIssuedTargetOrderEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}
