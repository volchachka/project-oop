import { ObjectStorage } from "../../../services/ObjectStorage";
import { Destructable } from "../../Destructable";
import { Item } from "../../Item";
import { Unit } from "../../Unit";
import { Widget } from "../../Widget";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitIssuedTargetOrderEventDetail extends UnitEventDetail {
  issuedOrderId: number;
  orderTarget: Widget;
  orderTargetUnit: Unit;
  orderTargetItem: Item;
  orderTargetDestructable: Destructable;
}

export interface UnitIssuedTargetOrderEvent {
  detail: UnitIssuedTargetOrderEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitIssuedTargetOrderEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
    issuedOrderId: GetIssuedOrderId(),
    orderTarget: objectStorage.getOrWrap(GetOrderTarget()),
    orderTargetUnit: objectStorage.getOrWrap(GetOrderTargetUnit()),
    orderTargetDestructable: objectStorage.getOrWrap(GetOrderTargetDestructable()),
    orderTargetItem: objectStorage.getOrWrap(GetOrderTargetItem()),
  };
};

export class UnitIssuedTargetOrderEvent extends UnitEvent {
  constructor(type: string, detail: UnitIssuedTargetOrderEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}
