import { ObjectStorage } from "../../../services/ObjectStorage";
import { Unit } from "../../Unit";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitSpellEventDetail extends UnitEventDetail {
  spellId: number,
  //TODO: когда будет класс Ability заменить на Ability
  spell: HAbility,
  //TODO: Когда будет класс Location заменить на Location
  targetLocation: HLocation,
  targetX: number,
  targetY: number,
  //TODO: Когда будет класс Destructable, заменить на Destructable
  targetDestructable: HDestructable,
  //TODO: Когда будет класс Item заменить на Item
  targetItem: HItem,
  targetUnit: Unit,  
}

export interface UnitSpellEvent {
  detail: UnitSpellEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitSpellEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
    spell: objectStorage.getOrWrap(GetSpellAbility()),
    spellId: GetSpellAbilityId(),
    targetLocation: objectStorage.getOrWrap(GetSpellTargetLoc()),
    targetX: GetSpellTargetX(),
    targetY: GetSpellTargetY(),
    targetDestructable: objectStorage.getOrWrap(GetSpellTargetDestructable()),
    targetItem: objectStorage.getOrWrap(GetSpellTargetItem()),
    targetUnit: objectStorage.getOrWrap(GetSpellTargetUnit()),
  };
};

export class UnitSpellEvent extends UnitEvent {
  constructor(type: string, detail: UnitSpellEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}