import { Event } from "../objects/events/Event";
import { Unit } from "../objects/Unit";
import { ObjectStorage } from "./ObjectStorage";
import { UnitEvent } from "../objects/events/unit/UnitEvent";

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
  | "herorevivestart "
  | "herorevivecancel"
  | "herorevivefinish"
  | "summon"
  | "dropitem"
  | "pickupitem "
  | "useitem"
  | "loaded";

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
      unit.dispatchEvent(new UnitEvent(eventType, null));
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
