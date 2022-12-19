import { ObjectStorage } from "../../../services/ObjectStorage";
import { Unit } from "../../Unit";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitSellItemEventDetail extends UnitEventDetail {
  buyingUnit: Unit;
  //TODO: Когда будет добавлен класс Item переиминовать тип в Item
  soldItem: HItem;
}

export interface UnitSellItemEvent {
  detail: UnitSellItemEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitSellItemEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
    buyingUnit: objectStorage.getOrWrap(GetBuyingUnit()),
    soldItem: GetSoldItem(),
  };
};

export class UnitSellItemEvent extends UnitEvent {
  constructor(type: string, detail: UnitSellItemEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}
