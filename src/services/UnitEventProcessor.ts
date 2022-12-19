import { Event } from "../objects/events/Event";
import { Unit } from "../objects/Unit";
import { ObjectStorage } from "./ObjectStorage";
import { UnitEvent } from "../objects/events/unit/UnitEvent";
import { UnitDamagedEvent } from "./../objects/events/unit/UnitDamagedEvent";
import { UnitDamagingEvent } from "./../objects/events/unit/UnitDamagingEvent";
import { UnitDeathEvent } from "./../objects/events/unit/UnitDeathEvent";
import { UnitDecayEvent } from "./../objects/events/unit/UnitDecayEvent";
import { UnitDetectEvent } from "./../objects/events/unit/UnitDetectedEvent";
import { UnitHiddenEvent } from "./../objects/events/unit/UnitHiddenEvent";
import { UnitSelectedEvent } from "./../objects/events/unit/UnitSelectedEvent";
import { UnitDeselectedEvent } from "./../objects/events/unit/UnitDeselectedEvent";
import { UnitAcquiredTargetEvent } from "./../objects/events/unit/UnitAcquiredTargetEvent";
import { UnitTargetInRangeEvent } from "./../objects/events/unit/UnitTargetInRangeEvent";
import { UnitAttackedEvent } from "./../objects/events/unit/UnitAttackedEvent";
import { UnitUpgradeEvent } from "./../objects/events/unit/UnitUpgradeEvent";
import { UnitSpellEvent } from "./../objects/events/unit/UnitSpellEvent";
import { UnitChangeOwnerEvent } from "./../objects/events/unit/UnitChangeOwnerEvent";
import { UnitSellUnitEvent } from "../objects/events/unit/UnitSellUnitEvent";
import { UnitSellItemEvent } from "./../objects/events/unit/UnitSellItemEvent";
import { UnitLoadedEvent } from "./../objects/events/unit/UnitLoadedEvent";
import { UnitStartTrainEvent } from "./../objects/events/unit/UnitStartTrainEvent";
import { UnitResearchEvent } from "./../objects/events/unit/UnitResearchEvent";
import { UnitIssuedOrderEvent } from "./../objects/events/unit/UnitIssuedOrderEvent";
import { UnitIssuedPointOrderEvent } from "./../objects/events/unit/UnitIssuedPointOrderEvent";
import { UnitIssuedTargetOrderEvent } from "./../objects/events/unit/UnitIssuedTargetOrderEvent";
import { UnitHeroLevelEvent } from "./../objects/events/unit/UnitHeroLevelEvent";
import { UnitHeroSkillEvent } from "./../objects/events/unit/UnitHeroSkillEvent";
import { UnitHeroReviveEvent } from "./../objects/events/unit/UnitHeroReviveEvent";
import { UnitSummonEvent } from "./../objects/events/unit/UnitSummonEvent";

export type UnitEventType =
  | "damaged"
  | "damaging"
  | "death"
  | "decay"
  | "detected"
  | "hidden"
  | "selected"
  | "deselected"
  | "acquiredtarget"
  | "targetinrange"
  | "attacked"
  | "rescued"
  | "constructstart"
  | "constructcancel"
  | "constructfinish"
  | "upgradestart"
  | "upgradecancel"
  | "upgradefinish"
  | "trainstart"
  | "traincancel"
  | "trainfinish"
  | "researchstart"
  | "researchcancel"
  | "researchfinish"
  | "issuedorder"
  | "issuedpointorder"
  | "issuedtargetorder"
  | "herolevel"
  | "heroskill"
  | "herorevivable"
  | "herorevivestart"
  | "herorevivecancel"
  | "herorevivefinish"
  | "summon"
  | "dropitem"
  | "pickupitem "
  | "useitem"
  | "loaded"
  | "sellitem"
  | "sellunit"
  | "changeowner"
  | "spellchannel"
  | "spellcast"
  | "spelleffect"
  | "spellfinish"
  | "spellendcast";

const stringToHandle: {
  [key: string]: HUnitEvent;
} = {
  damaged: EVENT_UNIT_DAMAGED,
  damaging: EVENT_UNIT_DAMAGING,
  death: EVENT_UNIT_DEATH,
  decay: EVENT_UNIT_DECAY,
  detected: EVENT_UNIT_DETECTED,
  hidden: EVENT_UNIT_HIDDEN,
  selected: EVENT_UNIT_SELECTED,
  deselected: EVENT_UNIT_DESELECTED,
  acquiredtarget: EVENT_UNIT_ACQUIRED_TARGET,
  targetinrange: EVENT_UNIT_TARGET_IN_RANGE,
  attacked: EVENT_UNIT_ATTACKED,
  rescued: EVENT_UNIT_RESCUED,
  constructcancel: EVENT_UNIT_CONSTRUCT_CANCEL,
  constructfinish: EVENT_UNIT_CONSTRUCT_FINISH,
  upgradestart: EVENT_UNIT_UPGRADE_START,
  upgradecancel: EVENT_UNIT_UPGRADE_CANCEL,
  upgradefinish: EVENT_UNIT_UPGRADE_FINISH,
  trainstart: EVENT_UNIT_TRAIN_START,
  traincancel: EVENT_UNIT_TRAIN_CANCEL,
  trainfinish: EVENT_UNIT_TRAIN_FINISH,
  researchstart: EVENT_UNIT_RESEARCH_START,
  researchcancel: EVENT_UNIT_RESEARCH_CANCEL,
  researchfinish: EVENT_UNIT_RESEARCH_FINISH,
  issuedorder: EVENT_UNIT_ISSUED_ORDER,
  issuedpointorder: EVENT_UNIT_ISSUED_POINT_ORDER,
  issuedtargetorder: EVENT_UNIT_ISSUED_TARGET_ORDER,
  herolevel: EVENT_UNIT_HERO_LEVEL,
  heroskill: EVENT_UNIT_HERO_SKILL,
  herorevivable: EVENT_UNIT_HERO_REVIVABLE,
  herorevivestart: EVENT_UNIT_HERO_REVIVE_START,
  herorevivecancel: EVENT_UNIT_HERO_REVIVE_CANCEL,
  herorevivefinish: EVENT_UNIT_HERO_REVIVE_FINISH,
  summon: EVENT_UNIT_SUMMON,
  dropitem: EVENT_UNIT_DROP_ITEM,
  pickupitem: EVENT_UNIT_PICKUP_ITEM,
  useitem: EVENT_UNIT_USE_ITEM,
  loaded: EVENT_UNIT_LOADED,
  sellitem: EVENT_UNIT_SELL_ITEM,
  sellunit: EVENT_UNIT_SELL,
  changeowner: EVENT_UNIT_CHANGE_OWNER,
  spellchannel: EVENT_UNIT_SPELL_CHANNEL,
  spellcast: EVENT_UNIT_SPELL_CAST,
  spelleffect: EVENT_UNIT_SPELL_EFFECT,
  spellfinish: EVENT_UNIT_SPELL_FINISH,
  spellendcast: EVENT_UNIT_SPELL_ENDCAST,
};

type UnitTriggerInfo = {
  [key: string]: HTrigger;
};

const objectStorage = ObjectStorage.getInstance();

export class UnitEventProcessor {
  private static readonly eventProcessor: UnitEventProcessor = new UnitEventProcessor();

  private unitToTriggerMap: Map<Unit, UnitTriggerInfo>;

  public static getInstance() {
    return this.eventProcessor;
  }

  private constructor() {
    this.unitToTriggerMap = new Map();
  }

  public support(eventType: string): boolean {
    return stringToHandle[eventType] !== null;
  }

  public subscribe(eventType: string, unit: Unit): void {
    if (!unit.toHandle() || !stringToHandle[eventType]) return;

    let registerUnitEvents = this.unitToTriggerMap.get(unit) || {};
    if (registerUnitEvents[eventType]) return;

    const newTrigger = CreateTrigger();

    objectStorage.setIfAbsent(unit.toHandle(), unit);

    TriggerRegisterUnitEvent(newTrigger, unit.toHandle(), stringToHandle[eventType]);
    TriggerAddAction(newTrigger, () => {
      switch (eventType as UnitEventType) {
        case "damaged":
          unit.dispatchEvent(new UnitDamagedEvent(eventType, null));
          break;
        case "damaging":
          unit.dispatchEvent(new UnitDamagingEvent(eventType, null));
          break;
        case "death":
          unit.dispatchEvent(new UnitDeathEvent(eventType, null));
          break;
        case "decay":
          unit.dispatchEvent(new UnitDecayEvent(eventType, null));
          break;
        case "detected":
          unit.dispatchEvent(new UnitDetectEvent(eventType, null));
          break;
        case "hidden":
          unit.dispatchEvent(new UnitHiddenEvent(eventType, null));
          break;
        case "selected":
          unit.dispatchEvent(new UnitSelectedEvent(eventType, null));
          break;
        case "deselected":
          unit.dispatchEvent(new UnitDeselectedEvent(eventType, null));
          break;
        case "acquiredtarget":
          unit.dispatchEvent(new UnitAcquiredTargetEvent(eventType, null));
          break;
        case "targetinrange":
          unit.dispatchEvent(new UnitTargetInRangeEvent(eventType, null));
          break;
        case "attacked":
          unit.dispatchEvent(new UnitAttackedEvent(eventType, null));
          break;
        case "upgradestart":
        case "upgradecancel":
        case "upgradefinish":
          unit.dispatchEvent(new UnitUpgradeEvent(eventType, null));
          break;
        case "trainstart":
        case "traincancel":
        case "trainfinish":
          unit.dispatchEvent(new UnitStartTrainEvent(eventType, null));
          break;
        case "researchstart":
        case "researchcancel":
        case "researchfinish":
          unit.dispatchEvent(new UnitResearchEvent(eventType, null));
          break;
        case "issuedorder":
          unit.dispatchEvent(new UnitIssuedOrderEvent(eventType, null));
          break;
        case "issuedpointorder":
          unit.dispatchEvent(new UnitIssuedPointOrderEvent(eventType, null));
          break;
        case "issuedtargetorder":
          unit.dispatchEvent(new UnitIssuedTargetOrderEvent(eventType, null));
          break;
        case "herolevel":
          unit.dispatchEvent(new UnitHeroLevelEvent(eventType, null));
          break;
        case "heroskill":
          unit.dispatchEvent(new UnitHeroSkillEvent(eventType, null));
          break;
        case "herorevivable":
        case "herorevivestart":
        case "herorevivecancel":
        case "herorevivefinish":
          unit.dispatchEvent(new UnitHeroReviveEvent(eventType, null));
          break;
        case "summon":
          unit.dispatchEvent(new UnitSummonEvent(eventType, null));
          break;
        case "researchcancel":
        case "researchfinish":
          unit.dispatchEvent(new UnitResearchEvent(eventType, null));
          break;
        case "spellchannel":
        case "spellcast":
        case "spelleffect":
        case "spellfinish":
        case "spellendcast":
          unit.dispatchEvent(new UnitSpellEvent(eventType, null));
          break;
        case "changeowner":
          unit.dispatchEvent(new UnitChangeOwnerEvent(eventType, null));
          break;
        case "sellunit":
          unit.dispatchEvent(new UnitSellUnitEvent(eventType, null));
          break;
        case "sellitem":
          unit.dispatchEvent(new UnitSellItemEvent(eventType, null));
          break;
        case "loaded":
          unit.dispatchEvent(new UnitLoadedEvent(eventType, null));
          break;

        // Todo  constructcancel, constructfinish, dropitem, pickupitem, useitem
        default:
          unit.dispatchEvent(new UnitEvent(eventType, null));
      }
    });

    registerUnitEvents[eventType] = newTrigger;
    this.unitToTriggerMap.set(unit, registerUnitEvents);
  }

  public unsubscribe(eventType: string, unit: Unit): void {
    let registerUnitEvents = this.unitToTriggerMap.get(unit);
    if (!registerUnitEvents) return;

    const trigger = registerUnitEvents[eventType];
    if (!trigger) return;

    DestroyTrigger(trigger);
    delete registerUnitEvents[eventType];

    this.unitToTriggerMap.set(unit, registerUnitEvents);
  }
}
