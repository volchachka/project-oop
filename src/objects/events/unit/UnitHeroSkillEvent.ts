import { ObjectStorage } from "../../../services/ObjectStorage";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitHeroSkillEventDetail extends UnitEventDetail {
  learnedSkill: number;
  learnedSkillLevel: number;
}

export interface UnitHeroSkillEvent {
  detail: UnitHeroSkillEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitHeroSkillEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
    learnedSkill: GetLearnedSkill(),
    learnedSkillLevel: GetLearnedSkillLevel(),
  };
};

export class UnitHeroSkillEvent extends UnitEvent {
  constructor(type: string, detail: UnitHeroSkillEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}
