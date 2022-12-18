import { ObjectStorage } from "../../../services/ObjectStorage";
import { Unit } from "../../Unit";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitDamagingEventDetail extends UnitEventDetail {
  target: Unit,
  damage: number,
  damageFlags: number,
  damageAbilityId: number,
  attackType: HAttackType,
  damageType: HDamageType,
  damageTypeFlags: number,
  weaponType: HWeaponType,
  isAttack: boolean,
  isRanged: boolean,
  preDamage: number,
}

export interface UnitDamagingEvent {
  detail: UnitDamagingEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitDamagingEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
    target: objectStorage.getOrWrap(GetEventDamageTarget()),
    damage: GetEventDamage(),
    damageFlags: GetEventDamageFlags(),
    damageAbilityId: GetEventDamageAbilityId(),
    attackType: objectStorage.getOrWrap(GetEventAttackType()),
    damageType: objectStorage.getOrWrap(GetEventDamageType()),
    damageTypeFlags: GetEventDamageTypeFlags(),
    weaponType: objectStorage.getOrWrap(GetEventWeaponType()),
    isAttack: GetEventIsAttack(),
    isRanged: GetEventIsRanged(),
    preDamage: GetEventPreDamage(),
  };
};

export class UnitDamagingEvent extends UnitEvent {
  constructor(type: string, detail: UnitDamagingEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}