import { ObjectStorage } from "../../../services/ObjectStorage";
import { Item } from "../../Item";
import { Unit } from "../../Unit";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitSellItemEventDetail extends UnitEventDetail {
  buyingUnit: Unit;
  soldItem: Item;
}

export interface UnitSellItemEvent {
  detail: UnitSellItemEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitSellItemEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
    buyingUnit: objectStorage.getOrWrap(GetBuyingUnit()),
    soldItem: objectStorage.getOrWrap(GetSoldItem()),
  };
};

export class UnitSellItemEvent extends UnitEvent {
  constructor(type: string, detail: UnitSellItemEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}
