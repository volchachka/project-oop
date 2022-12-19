import { ObjectStorage } from "../../../services/ObjectStorage";
import { Unit } from "../../Unit";
import { UnitEvent, UnitEventDetail } from "./UnitEvent";

export interface UnitDamagedEventDetail extends UnitEventDetail {
  damager: Unit;
  damage: number;
  damageFlags: number;
  damageAbilityId: number;
  attackType: HAttackType;
  damageType: HDamageType;
  damageTypeFlags: number;
  weaponType: HWeaponType;
  isAttack: boolean;
  isRanged: boolean;
  preDamage: number;
}

export interface UnitDamagedEvent {
  detail: UnitDamagedEventDetail;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotUnitEvent = (): UnitDamagedEventDetail => {
  return {
    triggerUnit: objectStorage.getOrWrap(GetTriggerUnit()),
    damager: objectStorage.getOrWrap(GetEventDamageSource()),
    damage: GetEventDamage(),
    damageFlags: GetEventDamageFlags(),
    damageAbilityId: GetEventDamageAbilityId(),
    attackType: GetEventAttackType(),
    damageType: GetEventDamageType(),
    damageTypeFlags: GetEventDamageTypeFlags(),
    weaponType: GetEventWeaponType(),
    isAttack: GetEventIsAttack(),
    isRanged: GetEventIsRanged(),
    preDamage: GetEventPreDamage(),
  };
};

export class UnitDamagedEvent extends UnitEvent {
  constructor(type: string, detail: UnitDamagedEventDetail | null) {
    super(type, detail || snapshotUnitEvent());
  }
}
