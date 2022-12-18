import { ObjectStorage } from "../../../services/ObjectStorage";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitResearchEventDetail extends UnitEventDetail {
  researchId: number;
}

export interface UnitResearchEvent {
  detail: UnitResearchEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitResearchEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
    researchId: GetResearched(),
  };
};

export class UnitResearchEvent extends UnitEvent {
  constructor(type: string, detail: UnitResearchEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}