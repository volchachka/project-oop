import { RemoveHandleEvent } from "./events/RemoveHandleEvent";
import { Handle, Setter } from "./Handle";
import { Event } from "./events/Event";
import { UnitEventProcessor, UnitEventType } from "../services/UnitEventProcessor";
import { EventSettings } from "../services/EventTarget";
import { ObjectStorage } from "../services/ObjectStorage";
import { UnitEvent } from "./events/unit/UnitEvent";
import { UnitDeathEvent } from "./events/unit/UnitDeathEvent";
import { UnitResearchEvent } from "./events/unit/UnitResearchEvent";
import { UnitStartTrainEvent } from "./events/unit/UnitStartTrainEvent";
import { UnitFinishTrainEvent } from "./events/unit/UnitFinishTrainEvent";
import { UnitDetectEvent } from "./events/unit/UnitDetectedEvent";
import { UnitSummonEvent } from "./events/unit/UnitSummonEvent";
import { UnitLoadedEvent } from "./events/unit/UnitLoadedEvent";
import { UnitSellItemEvent } from "./events/unit/UnitSellItemEvent";
import { UnitSellUnitEvent } from "./events/unit/UnitSellUnitEvent";
import { UnitChangeOwnerEvent } from "./events/unit/UnitChangeOwnerEvent";
import { UnitIssuedOrderEvent } from "./events/unit/UnitIssuedOrderEvent";
import { UnitIssuedPointOrderEvent } from "./events/unit/UnitIssuedPointOrderEvent";
import { UnitIssuedTargetOrderEvent } from "./events/unit/UnitIssuedTargetOrderEvent";
import { UnitSpellEvent } from "./events/unit/UnitSpellEvent";
import { UnitAcquiredTargetEvent } from "./events/unit/UnitAcquiredTargetEvent";
import { UnitTargetInRangeEvent } from "./events/unit/UnitTargetInRangeEvent";
import { UnitAttackedEvent } from "./events/unit/UnitAttackedEvent";
import { UnitStartConstructionEvent } from "./events/unit/UnitStartConstructionEvent";
import { UnitCancelConstructionEvent } from "./events/unit/UnitCancelConstructionEvent";
import { UnitFinishConstructionEvent } from "./events/unit/UnitFinishConstructionEvent";
import { UnitCancelTrainEvent } from "./events/unit/UnitCancelTrainEvent";
import { UnitDamagedEvent } from "./events/unit/UnitDamagedEvent";
import { UnitDamagingEvent } from "./events/unit/UnitDamagingEvent";
import { UnitHiddenEvent } from "./events/unit/UnitHiddenEvent";
import { UnitSelectedEvent } from "./events/unit/UnitSelectedEvent";
import { UnitDeselectedEvent } from "./events/unit/UnitDeselectedEvent";
import { UnitUpgradeEvent } from "./events/unit/UnitUpgradeEvent";
import { UnitHeroLevelEvent } from "./events/unit/UnitHeroLevelEvent";
import { UnitHeroReviveEvent } from "./events/unit/UnitHeroReviveEvent";
import { UnitDecayEvent } from "./events/unit/UnitDecayEvent";
import { UnitHeroSkillEvent } from "./events/unit/UnitHeroSkillEvent";
import { UnitDropItemEvent } from "./events/unit/UnitDropItemEvent";
import { UnitPickupItemEvent } from "./events/unit/UnitPickupItemEvent";
import { UnitUseItemEvent } from "./events/unit/UnitUseItemEvent";
import { GamePlayer } from "./GamePlayer";
import { Item } from "./Item";
import { Widget } from "./Widget";
import { Destructable } from "./Destructable";

const objectStorage = ObjectStorage.getInstance();
const unitEventProcessor = UnitEventProcessor.getInstance();

export class Unit extends Widget {
  constructor(handle: HUnit);
  constructor(owner: HPlayer, unit: number, x: number, y: number, face: number);
  constructor(owner: HPlayer, unit: number, x: number, y: number, face: number, corpse: boolean);
  constructor(owner: HPlayer, unitName: string, x: number, y: number, face: number);
  constructor(handleOrPlayer: any, unit?: undefined, x?: undefined, y?: undefined, face?: undefined, corpse?: undefined);
  public constructor(handleOrPlayer: any, unit?: number | string, x?: number, y?: number, face?: number, corpse?: boolean) {
    if (type(handleOrPlayer) === "unit") {
      super(handleOrPlayer);
    } else {
      if (!unit) throw new TypeError("unit must be set");

      if (type(unit) === "string") {
        super(CreateUnitByName(handleOrPlayer as HPlayer, unit as string, x as number, y as number, face as number));
      } else if (corpse) {
        super(CreateCorpse(handleOrPlayer as HPlayer, unit as number, x as number, y as number, face as number));
      } else {
        super(CreateUnit(handleOrPlayer as HPlayer, unit as number, x as number, y as number, face as number));
      }
    }
  }

  public toHandle(): HUnit | null {
    return this.handle as HUnit;
  }

  public addEventListener(type: "remove", listener: (event: RemoveHandleEvent<Unit>) => void, once?: EventSettings): void;
  public addEventListener(type: UnitEventType, listener: (event: UnitEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "death", listener: (event: UnitDeathEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "researchstart", listener: (event: UnitResearchEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "researchcancel", listener: (event: UnitResearchEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "researchfinish", listener: (event: UnitResearchEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "trainstart", listener: (event: UnitStartTrainEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "traincancel", listener: (event: UnitCancelTrainEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "trainfinish", listener: (event: UnitFinishTrainEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "detected", listener: (event: UnitDetectEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "summon", listener: (event: UnitSummonEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "loaded", listener: (event: UnitLoadedEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "sellitem", listener: (event: UnitSellItemEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "sellunit", listener: (event: UnitSellUnitEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "changeowner", listener: (event: UnitChangeOwnerEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "dropitem", listener: (event: UnitDropItemEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "pickupitem", listener: (event: UnitPickupItemEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "useitem", listener: (event: UnitUseItemEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "issuedorder", listener: (event: UnitIssuedOrderEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "issuedpointorder", listener: (event: UnitIssuedPointOrderEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "issuedtargetorder", listener: (event: UnitIssuedTargetOrderEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "spellchannel", listener: (event: UnitSpellEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "spellcast", listener: (event: UnitSpellEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "spelleffect", listener: (event: UnitSpellEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "spellfinish", listener: (event: UnitSpellEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "spellendcast", listener: (event: UnitSpellEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "acquiredtarget", listener: (event: UnitAcquiredTargetEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "targetinrange", listener: (event: UnitTargetInRangeEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "attacked", listener: (event: UnitAttackedEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "rescued", listener: (event: UnitAttackedEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "constructstart", listener: (event: UnitStartConstructionEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "constructcancel", listener: (event: UnitCancelConstructionEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "constructfinish", listener: (event: UnitFinishConstructionEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "damaged", listener: (event: UnitDamagedEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "damaging", listener: (event: UnitDamagingEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "hidden", listener: (event: UnitHiddenEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "selected", listener: (event: UnitSelectedEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "deselected", listener: (event: UnitDeselectedEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "upgradestart", listener: (event: UnitUpgradeEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "upgradecancel", listener: (event: UnitUpgradeEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "upgradefinish", listener: (event: UnitUpgradeEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "herolevel", listener: (event: UnitHeroLevelEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "herorevivable", listener: (event: UnitHeroReviveEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "herorevivestart", listener: (event: UnitHeroReviveEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "herorevivecancel", listener: (event: UnitHeroReviveEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "herorevivefinish", listener: (event: UnitHeroReviveEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "decay", listener: (event: UnitDecayEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "heroskill", listener: (event: UnitHeroSkillEvent) => void, once?: EventSettings): void;
  public addEventListener(type: string, listener: (event: Event) => void, once?: EventSettings): void {
    if (unitEventProcessor.support(type)) {
      unitEventProcessor.subscribe(type, this);
      this.registerEventListener(type, listener, once);
    } else {
      super.addEventListener(type, listener, once);
    }
  }

  ///
  /// Autogenerated
  ///

  ///
  /// Functions
  ///

  public setFacingTimed(facingAngle: number, duration: number): this {
    SetUnitFacingTimed(this.toHandle(), facingAngle, duration);
    return this;
  }

  public setMoveTypeByIndex(moveIndex: number): this {
    SetUnitMoveTypeByIndex(this.toHandle(), moveIndex);
    return this;
  }

  public unitIgnoreAlarmToggled(): boolean {
    return UnitIgnoreAlarmToggled(this.toHandle());
  }

  public enableInventoryEx(enable: boolean): this {
    EnableUnitInventoryEx(this.toHandle(), enable);
    return this;
  }

  public unitDisableAbilities(state: boolean): this {
    UnitDisableAbilities(this.toHandle(), state);
    return this;
  }

  public getBaseDamageByIndex(atttackIndex: number): number {
    return GetUnitBaseDamageByIndex(this.toHandle(), atttackIndex);
  }

  public setColor(whichColor: HPlayerColor): this {
    SetUnitColor(this.toHandle(), whichColor);
    return this;
  }

  public getWeaponSoundByIndex(atttackIndex: number): number {
    return GetUnitWeaponSoundByIndex(this.toHandle(), atttackIndex);
  }

  public issueTargetOrderById(order: number, targetWidget: Widget): boolean {
    return IssueTargetOrderById(this.toHandle(), order, targetWidget.toHandle());
  }

  public enableAttack(enable: boolean): this {
    EnableUnitAttack(this.toHandle(), enable);
    return this;
  }

  public getCurrentResources(): number {
    return GetUnitCurrentResources(this.toHandle());
  }

  public isAttackEnabledEx(): boolean {
    return IsUnitAttackEnabledEx(this.toHandle());
  }

  public setItemTypeSlots(slots: number): this {
    SetItemTypeSlots(this.toHandle(), slots);
    return this;
  }

  public setDamageDicesSideByIndex(atttackIndex: number, dicesSides: number): this {
    SetUnitDamageDicesSideByIndex(this.toHandle(), atttackIndex, dicesSides);
    return this;
  }

  public unitRemoveBuffs(removePositive: boolean, removeNegative: boolean): this {
    UnitRemoveBuffs(this.toHandle(), removePositive, removeNegative);
    return this;
  }

  public unitHasItem(whichItem: Item): boolean {
    return UnitHasItem(this.toHandle(), whichItem.toHandle());
  }

  public isAbilityVisible(abilityId: number): boolean {
    return IsUnitAbilityVisible(this.toHandle(), abilityId);
  }

  public getAttackTypeByIndex(atttackIndex: number): HAttackType {
    return GetUnitAttackTypeByIndex(this.toHandle(), atttackIndex);
  }

  public getHeroExperienceNeeded(forLevel: number): number {
    return GetHeroExperienceNeeded(this.toHandle(), forLevel);
  }

  public getOwningPlayer(): GamePlayer {
    return objectStorage.getOrWrap(GetOwningPlayer(this.toHandle()));
  }

  public waygateGetDestinationX(): number {
    return WaygateGetDestinationX(this.toHandle());
  }

  public getBuff(buffId: number): HBuff {
    return GetUnitBuff(this.toHandle(), buffId);
  }

  public setDamageDicesByIndex(atttackIndex: number, dices: number): this {
    SetUnitDamageDicesByIndex(this.toHandle(), atttackIndex, dices);
    return this;
  }

  public unitModifySkillPoints(skillPointDelta: number): boolean {
    return UnitModifySkillPoints(this.toHandle(), skillPointDelta);
  }

  public getDefaultPropWindow(): number {
    return GetUnitDefaultPropWindow(this.toHandle());
  }

  public setHeroBaseProperName(nameIndex: number, properName: string): this {
    SetHeroBaseProperName(this.toHandle(), nameIndex, properName);
    return this;
  }

  public getWeaponTypeByIndex(atttackIndex: number): HWeaponType {
    return GetUnitWeaponTypeByIndex(this.toHandle(), atttackIndex);
  }

  public unitAddItemById(itemId: number): Item {
    return objectStorage.getOrWrap(UnitAddItemById(this.toHandle(), itemId));
  }

  public unitResetCooldown(): this {
    UnitResetCooldown(this.toHandle());
    return this;
  }

  public isIllusion(): boolean {
    return IsUnitIllusion(this.toHandle());
  }

  public isLoaded(): boolean {
    return IsUnitLoaded(this.toHandle());
  }

  public isInRangeXY(x: number, y: number, distance: number): boolean {
    return IsUnitInRangeXY(this.toHandle(), x, y, distance);
  }

  public removeFromStock(unitId: number): this {
    RemoveUnitFromStock(this.toHandle(), unitId);
    return this;
  }

  public getCurrentOrder(): number {
    return GetUnitCurrentOrder(this.toHandle());
  }

  public redraw(): this {
    RedrawUnit(this.toHandle());
    return this;
  }

  public setHeroXP(newXpVal: number, showEyeCandy: boolean): this {
    SetHeroXP(this.toHandle(), newXpVal, showEyeCandy);
    return this;
  }

  public setAnimationByIndex(whichAnimation: number): this {
    SetUnitAnimationByIndex(this.toHandle(), whichAnimation);
    return this;
  }

  public reviveHeroLoc(loc: HLocation, doEyecandy: boolean): boolean {
    return ReviveHeroLoc(this.toHandle(), loc, doEyecandy);
  }

  public setPositionLoc(whichLocation: HLocation): this {
    SetUnitPositionLoc(this.toHandle(), whichLocation);
    return this;
  }

  public issueTargetOrder(order: string, targetWidget: Widget): boolean {
    return IssueTargetOrder(this.toHandle(), order, targetWidget.toHandle());
  }

  public getLocustFlag(): number {
    return GetUnitLocustFlag(this.toHandle());
  }

  public issueInstantTargetOrderById(order: number, targetWidget: Widget, instantTargetWidget: Widget): boolean {
    return IssueInstantTargetOrderById(this.toHandle(), order, targetWidget.toHandle(), instantTargetWidget.toHandle());
  }

  public issuePointOrderById(order: number, x: number, y: number): boolean {
    return IssuePointOrderById(this.toHandle(), order, x, y);
  }

  public unitStripHeroLevel(howManyLevels: number): boolean {
    return UnitStripHeroLevel(this.toHandle(), howManyLevels);
  }

  public setAbilityLevel(abilcode: number, level: number): number {
    return SetUnitAbilityLevel(this.toHandle(), abilcode, level);
  }

  public addToStock(unitId: number, currentStock: number, stockMax: number): this {
    AddUnitToStock(this.toHandle(), unitId, currentStock, stockMax);
    return this;
  }

  public unitRemoveBuffsEx(
    removePositive: boolean,
    removeNegative: boolean,
    magic: boolean,
    physical: boolean,
    timedLife: boolean,
    aura: boolean,
    autoDispel: boolean
  ): this {
    UnitRemoveBuffsEx(this.toHandle(), removePositive, removeNegative, magic, physical, timedLife, aura, autoDispel);
    return this;
  }

  public isInRangeLoc(whichLocation: HLocation, distance: number): boolean {
    return IsUnitInRangeLoc(this.toHandle(), whichLocation, distance);
  }

  public issueInstantPointOrderById(order: number, x: number, y: number, instantTargetWidget: Widget): boolean {
    return IssueInstantPointOrderById(this.toHandle(), order, x, y, instantTargetWidget.toHandle());
  }

  public setMaterialTexture(textureName: string, materialId: number, textureIndex: number): this {
    SetUnitMaterialTexture(this.toHandle(), textureName, materialId, textureIndex);
    return this;
  }

  public recycleGuardPosition(): this {
    RecycleGuardPosition(this.toHandle());
    return this;
  }

  public getState(whichUnitState: HUnitState): number {
    return GetUnitState(this.toHandle(), whichUnitState);
  }

  public unitAddSleepPerm(add: boolean): this {
    UnitAddSleepPerm(this.toHandle(), add);
    return this;
  }

  public isAlive(): boolean {
    return IsUnitAlive(this.toHandle());
  }

  public issueBuildOrderById(unitId: number, x: number, y: number): boolean {
    return IssueBuildOrderById(this.toHandle(), unitId, x, y);
  }

  public getHeroStr(includeBonuses: boolean): number {
    return GetHeroStr(this.toHandle(), includeBonuses);
  }

  public setUseFood(useFood: boolean): this {
    SetUnitUseFood(this.toHandle(), useFood);
    return this;
  }

  public setPathing(flag: boolean): this {
    SetUnitPathing(this.toHandle(), flag);
    return this;
  }

  public addAnimationProperties(animProperties: string, add: boolean): this {
    AddUnitAnimationProperties(this.toHandle(), animProperties, add);
    return this;
  }

  public createMissileEx(missileTypeId: number, attackIndex: number): HMissile {
    return CreateMissileEx(this.toHandle(), missileTypeId, attackIndex);
  }

  public setPosition(newX: number, newY: number): this {
    SetUnitPosition(this.toHandle(), newX, newY);
    return this;
  }

  public unitSuspendDecay(suspend: boolean): this {
    UnitSuspendDecay(this.toHandle(), suspend);
    return this;
  }

  public waygateIsActive(): boolean {
    return WaygateIsActive(this.toHandle());
  }

  public isInTransport(whichTransport: Unit): boolean {
    return IsUnitInTransport(this.toHandle(), whichTransport.toHandle());
  }

  public unitAddAbility(abilityId: number): boolean {
    return UnitAddAbility(this.toHandle(), abilityId);
  }

  public issuePointOrderByIdLoc(order: number, whichLocation: HLocation): boolean {
    return IssuePointOrderByIdLoc(this.toHandle(), order, whichLocation);
  }

  public unitUseItem(whichItem: Item): boolean {
    return UnitUseItem(this.toHandle(), whichItem.toHandle());
  }

  public reviveHero(x: number, y: number, doEyecandy: boolean): boolean {
    return ReviveHero(this.toHandle(), x, y, doEyecandy);
  }

  public setHeroStr(newStr: number, permanent: boolean): this {
    SetHeroStr(this.toHandle(), newStr, permanent);
    return this;
  }

  public issueImmediateOrder(order: string): boolean {
    return IssueImmediateOrder(this.toHandle(), order);
  }

  public unitDamageTarget(
    target: Widget,
    amount: number,
    attack: boolean,
    ranged: boolean,
    attackType: HAttackType,
    damageType: HDamageType,
    weaponType: HWeaponType
  ): boolean {
    return UnitDamageTarget(this.toHandle(), target.toHandle(), amount, attack, ranged, attackType, damageType, weaponType);
  }

  public showAbility(abilityId: number, show: boolean): this {
    ShowUnitAbility(this.toHandle(), abilityId, show);
    return this;
  }

  public getVertexColour(): number {
    return GetUnitVertexColour(this.toHandle());
  }

  public morphToTypeIdEx(
    uid: number,
    unitFlags: number,
    updateHealthState: boolean,
    updateManaState: boolean,
    healthStateId: number,
    manaStateId: number,
    updateScale: boolean,
    replaceAbilities: boolean,
    whichAbility: HAbility,
    resetBuildingAnimation: boolean
  ): this {
    MorphUnitToTypeIdEx(
      this.toHandle(),
      uid,
      unitFlags,
      updateHealthState,
      updateManaState,
      healthStateId,
      manaStateId,
      updateScale,
      replaceAbilities,
      whichAbility,
      resetBuildingAnimation
    );
    return this;
  }

  public getAttackCooldownByIndex(atttackIndex: number): number {
    return GetUnitAttackCooldownByIndex(this.toHandle(), atttackIndex);
  }

  public enableAttackEx(enable: boolean): this {
    EnableUnitAttackEx(this.toHandle(), enable);
    return this;
  }

  public unitAddItemToSlotById(itemId: number, itemSlot: number): boolean {
    return UnitAddItemToSlotById(this.toHandle(), itemId, itemSlot);
  }

  public isGatherer(): boolean {
    return IsUnitGatherer(this.toHandle());
  }

  public setAttackTypeByIndex(atttackIndex: number, whichAttackType: HAttackType): this {
    SetUnitAttackTypeByIndex(this.toHandle(), atttackIndex, whichAttackType);
    return this;
  }

  public unitCanSleepPerm(): boolean {
    return UnitCanSleepPerm(this.toHandle());
  }

  public addItemToStock(itemId: number, currentStock: number, stockMax: number): this {
    AddItemToStock(this.toHandle(), itemId, currentStock, stockMax);
    return this;
  }

  public getHeroMaxLevelExperienceNeeded(): number {
    return GetHeroMaxLevelExperienceNeeded(this.toHandle());
  }

  public getDefaultMoveSpeed(): number {
    return GetUnitDefaultMoveSpeed(this.toHandle());
  }

  public setBaseMissileArt(attackIndex: number, missleArt: string): this {
    SetUnitBaseMissileArt(this.toHandle(), attackIndex, missleArt);
    return this;
  }

  public getDamageDicesSideByIndex(atttackIndex: number): number {
    return GetUnitDamageDicesSideByIndex(this.toHandle(), atttackIndex);
  }

  public morphToTypeId(uid: number): this {
    MorphUnitToTypeId(this.toHandle(), uid);
    return this;
  }

  public pauseEx(flag: boolean): this {
    PauseUnitEx(this.toHandle(), flag);
    return this;
  }

  public isMasked(whichPlayer: GamePlayer): boolean {
    return IsUnitMasked(this.toHandle(), whichPlayer.toHandle());
  }

  public setBlendTime(blendTime: number): this {
    SetUnitBlendTime(this.toHandle(), blendTime);
    return this;
  }

  public isRace(whichRace: HRace): boolean {
    return IsUnitRace(this.toHandle(), whichRace);
  }

  public getRallyPoint(): HLocation {
    return GetUnitRallyPoint(this.toHandle());
  }

  public getHeroSkillPoints(): number {
    return GetHeroSkillPoints(this.toHandle());
  }

  public unitRemoveAbility(abilityId: number): boolean {
    return UnitRemoveAbility(this.toHandle(), abilityId);
  }

  public setCreepGuard(creepGuard: boolean): this {
    SetUnitCreepGuard(this.toHandle(), creepGuard);
    return this;
  }

  public isAlly(whichPlayer: GamePlayer): boolean {
    return IsUnitAlly(this.toHandle(), whichPlayer.toHandle());
  }

  public unitResetAttackCooldownByIndex(atttackIndex: number): boolean {
    return UnitResetAttackCooldownByIndex(this.toHandle(), atttackIndex);
  }

  public setTruesightImmuneState(state: boolean): this {
    SetUnitTruesightImmuneState(this.toHandle(), state);
    return this;
  }

  public unitWakeUp(): this {
    UnitWakeUp(this.toHandle());
    return this;
  }

  public isInGroup(whichGroup: HGroup): boolean {
    return IsUnitInGroup(this.toHandle(), whichGroup);
  }

  public startItemCooldown(whichItem: Item, cooldown: number): this {
    StartItemCooldown(this.toHandle(), whichItem.toHandle(), cooldown);
    return this;
  }

  public unitAddItem(whichItem: Item): boolean {
    return UnitAddItem(this.toHandle(), whichItem.toHandle());
  }

  public setAttackState(atttackIndex: number, attackState: number): number {
    return SetUnitAttackState(this.toHandle(), atttackIndex, attackState);
  }

  public isHidden(): boolean {
    return IsUnitHidden(this.toHandle());
  }

  public getDamageDicesByIndex(atttackIndex: number): number {
    return GetUnitDamageDicesByIndex(this.toHandle(), atttackIndex);
  }

  public isTower(): boolean {
    return IsUnitTower(this.toHandle());
  }

  public unitDamagePoint(
    delay: number,
    radius: number,
    x: number,
    y: number,
    amount: number,
    attack: boolean,
    ranged: boolean,
    attackType: HAttackType,
    damageType: HDamageType,
    weaponType: HWeaponType
  ): boolean {
    return UnitDamagePoint(this.toHandle(), delay, radius, x, y, amount, attack, ranged, attackType, damageType, weaponType);
  }

  public setRescuable(byWhichPlayer: GamePlayer, flag: boolean): this {
    SetUnitRescuable(this.toHandle(), byWhichPlayer.toHandle(), flag);
    return this;
  }

  public enableMovementEx(enable: boolean): this {
    EnableUnitMovementEx(this.toHandle(), enable);
    return this;
  }

  public unitAddIndicator(red: number, green: number, blue: number, alpha: number): this {
    UnitAddIndicator(this.toHandle(), red, green, blue, alpha);
    return this;
  }

  public getAttacksEnabledIndex(): number {
    return GetUnitAttacksEnabledIndex(this.toHandle());
  }

  public unitIsSleeping(): boolean {
    return UnitIsSleeping(this.toHandle());
  }

  public setVertexColor(red: number, green: number, blue: number, alpha: number): this {
    SetUnitVertexColor(this.toHandle(), red, green, blue, alpha);
    return this;
  }

  public unitUseItemPoint(whichItem: Item, x: number, y: number): boolean {
    return UnitUseItemPoint(this.toHandle(), whichItem.toHandle(), x, y);
  }

  public waygateActivate(activate: boolean): this {
    WaygateActivate(this.toHandle(), activate);
    return this;
  }

  public getLevel(): number {
    return GetUnitLevel(this.toHandle());
  }

  public issuePointOrderLoc(order: string, whichLocation: HLocation): boolean {
    return IssuePointOrderLoc(this.toHandle(), order, whichLocation);
  }

  public isDead(): boolean {
    return IsUnitDead(this.toHandle());
  }

  public setExploded(exploded: boolean): this {
    SetUnitExploded(this.toHandle(), exploded);
    return this;
  }

  public unitPauseTimedLife(flag: boolean): this {
    UnitPauseTimedLife(this.toHandle(), flag);
    return this;
  }

  public setAttackCooldownByIndex(atttackIndex: number, attackCooldown: number): this {
    SetUnitAttackCooldownByIndex(this.toHandle(), atttackIndex, attackCooldown);
    return this;
  }

  public getHeroProperName(): string {
    return GetHeroProperName(this.toHandle());
  }

  public addHeroXP(xpToAdd: number, showEyeCandy: boolean): this {
    AddHeroXP(this.toHandle(), xpToAdd, showEyeCandy);
    return this;
  }

  public isStateNormal(additionalCheck: boolean): boolean {
    return IsUnitStateNormal(this.toHandle(), additionalCheck);
  }

  public getPointValue(): number {
    return GetUnitPointValue(this.toHandle());
  }

  public issuePointOrder(order: string, x: number, y: number): boolean {
    return IssuePointOrder(this.toHandle(), order, x, y);
  }

  public unitRemoveItemFromSlot(itemSlot: number): Item {
    return objectStorage.getOrWrap(UnitRemoveItemFromSlot(this.toHandle(), itemSlot));
  }

  public setFlyHeight(newHeight: number, rate: number): this {
    SetUnitFlyHeight(this.toHandle(), newHeight, rate);
    return this;
  }

  public isInvisible(whichPlayer: GamePlayer): boolean {
    return IsUnitInvisible(this.toHandle(), whichPlayer.toHandle());
  }

  public setAttackRangeByIndex(atttackIndex: number, range: number): this {
    SetUnitAttackRangeByIndex(this.toHandle(), atttackIndex, range);
    return this;
  }

  public setState(whichUnitState: HUnitState, newVal: number): this {
    SetUnitState(this.toHandle(), whichUnitState, newVal);
    return this;
  }

  public getAttackRangeByIndex(atttackIndex: number): number {
    return GetUnitAttackRangeByIndex(this.toHandle(), atttackIndex);
  }

  public getBaseMissileArt(attackIndex: number): string {
    return GetUnitBaseMissileArt(this.toHandle(), attackIndex);
  }

  public getDamagePointByIndex(atttackIndex: number): number {
    return GetUnitDamagePointByIndex(this.toHandle(), atttackIndex);
  }

  public getRallyDestructable(): Destructable {
    return objectStorage.getOrWrap(GetUnitRallyDestructable(this.toHandle()));
  }

  public getRace(): HRace {
    return GetUnitRace(this.toHandle());
  }

  public removeGuardPosition(): this {
    RemoveGuardPosition(this.toHandle());
    return this;
  }

  public getDamageReduction(): number {
    return GetUnitDamageReduction(this.toHandle());
  }

  public unitAddSleep(add: boolean): this {
    UnitAddSleep(this.toHandle(), add);
    return this;
  }

  public getMinimapX(): number {
    return GetUnitMinimapX(this.toHandle());
  }

  public getBuffLevel(buffId: number): number {
    return GetUnitBuffLevel(this.toHandle(), buffId);
  }

  public unitApplyUpdates(): number {
    return UnitApplyUpdates(this.toHandle());
  }

  public incAbilityLevel(abilcode: number): number {
    return IncUnitAbilityLevel(this.toHandle(), abilcode);
  }

  public addResourceAmount(amount: number): this {
    AddResourceAmount(this.toHandle(), amount);
    return this;
  }

  public isEnemy(whichPlayer: GamePlayer): boolean {
    return IsUnitEnemy(this.toHandle(), whichPlayer.toHandle());
  }

  public getMinimapY(): number {
    return GetUnitMinimapY(this.toHandle());
  }

  public decAbilityLevel(abilcode: number): number {
    return DecUnitAbilityLevel(this.toHandle(), abilcode);
  }

  public unitCountBuffsEx(
    removePositive: boolean,
    removeNegative: boolean,
    magic: boolean,
    physical: boolean,
    timedLife: boolean,
    aura: boolean,
    autoDispel: boolean
  ): number {
    return UnitCountBuffsEx(this.toHandle(), removePositive, removeNegative, magic, physical, timedLife, aura, autoDispel);
  }

  public isHero(): boolean {
    return IsUnitHero(this.toHandle());
  }

  public setLookAt(whichBone: string, lookAtTarget: Unit, offsetX: number, offsetY: number, offsetZ: number): this {
    SetUnitLookAt(this.toHandle(), whichBone, lookAtTarget.toHandle(), offsetX, offsetY, offsetZ);
    return this;
  }

  public setWeaponSoundByIndex(atttackIndex: number, weaponSound: number): this {
    SetUnitWeaponSoundByIndex(this.toHandle(), atttackIndex, weaponSound);
    return this;
  }

  public setReplaceableTexture(textureName: string, textureIndex: number): this {
    SetUnitReplaceableTexture(this.toHandle(), textureName, textureIndex);
    return this;
  }

  public setBaseMissileSpeed(attackIndex: number, missleSpeed: number): this {
    SetUnitBaseMissileSpeed(this.toHandle(), attackIndex, missleSpeed);
    return this;
  }

  public setDamagePointByIndex(atttackIndex: number, damagePoint: number): this {
    SetUnitDamagePointByIndex(this.toHandle(), atttackIndex, damagePoint);
    return this;
  }

  public pause(flag: boolean): this {
    PauseUnit(this.toHandle(), flag);
    return this;
  }

  public getHeroBaseProperName(nameIndex: number): string {
    return GetHeroBaseProperName(this.toHandle(), nameIndex);
  }

  public isMovementEnabledEx(): boolean {
    return IsUnitMovementEnabledEx(this.toHandle());
  }

  public isInventoryEnabled(): boolean {
    return IsUnitInventoryEnabled(this.toHandle());
  }

  public unitRemoveType(whichUnitType: HUnitType): boolean {
    return UnitRemoveType(this.toHandle(), whichUnitType);
  }

  public isAttackEnabled(): boolean {
    return IsUnitAttackEnabled(this.toHandle());
  }

  public isDetected(whichPlayer: GamePlayer): boolean {
    return IsUnitDetected(this.toHandle(), whichPlayer.toHandle());
  }

  public setScale(scaleX: number, scaleY: number, scaleZ: number): this {
    SetUnitScale(this.toHandle(), scaleX, scaleY, scaleZ);
    return this;
  }

  public setModel(modelName: string): this {
    SetUnitModel(this.toHandle(), modelName);
    return this;
  }

  public unitMakeAbilityPermanent(permanent: boolean, abilityId: number): boolean {
    return UnitMakeAbilityPermanent(this.toHandle(), permanent, abilityId);
  }

  public removeItemFromStock(itemId: number): this {
    RemoveItemFromStock(this.toHandle(), itemId);
    return this;
  }

  public getDefaultFlyHeight(): number {
    return GetUnitDefaultFlyHeight(this.toHandle());
  }

  public setRescueRange(range: number): this {
    SetUnitRescueRange(this.toHandle(), range);
    return this;
  }

  public setBonusDamageByIndex(atttackIndex: number, bonusDamage: number): this {
    SetUnitBonusDamageByIndex(this.toHandle(), atttackIndex, bonusDamage);
    return this;
  }

  public getHeroXP(): number {
    return GetHeroXP(this.toHandle());
  }

  public setNextAttackTimeStampByIndex(attackIndex: number, time: number): this {
    SetUnitNextAttackTimeStampByIndex(this.toHandle(), attackIndex, time);
    return this;
  }

  public setModelEx(modelName: string, playercolourId: number): this {
    SetUnitModelEx(this.toHandle(), modelName, playercolourId);
    return this;
  }

  public suspendHeroXP(flag: boolean): this {
    SuspendHeroXP(this.toHandle(), flag);
    return this;
  }

  public isFogged(whichPlayer: GamePlayer): boolean {
    return IsUnitFogged(this.toHandle(), whichPlayer.toHandle());
  }

  public unitSetUpgradeProgress(upgradePercentage: number): this {
    UnitSetUpgradeProgress(this.toHandle(), upgradePercentage);
    return this;
  }

  public unitApplyTimedLife(buffId: number, duration: number): this {
    UnitApplyTimedLife(this.toHandle(), buffId, duration);
    return this;
  }

  public resetLookAt(): this {
    ResetUnitLookAt(this.toHandle());
    return this;
  }

  public unitAddExtraAttackByIndex(atttackIndex: number): boolean {
    return UnitAddExtraAttackByIndex(this.toHandle(), atttackIndex);
  }

  public issueInstantTargetOrder(order: string, targetWidget: Widget, instantTargetWidget: Widget): boolean {
    return IssueInstantTargetOrder(this.toHandle(), order, targetWidget.toHandle(), instantTargetWidget.toHandle());
  }

  public waygateSetDestination(x: number, y: number): this {
    WaygateSetDestination(this.toHandle(), x, y);
    return this;
  }

  public getTotalMoveSpeed(): number {
    return GetUnitTotalMoveSpeed(this.toHandle());
  }

  public getBonusDamageByIndex(atttackIndex: number): number {
    return GetUnitBonusDamageByIndex(this.toHandle(), atttackIndex);
  }

  public getRallyUnit(): Unit {
    return objectStorage.getOrWrap(GetUnitRallyUnit(this.toHandle()));
  }

  public updateInfoBar(): number {
    return UpdateUnitInfoBar(this.toHandle());
  }

  public issueImmediateOrderById(order: number): boolean {
    return IssueImmediateOrderById(this.toHandle(), order);
  }

  public unitUnapplyUpdates(): number {
    return UnitUnapplyUpdates(this.toHandle());
  }

  public unitDropItemSlot(whichItem: Item, slot: number): boolean {
    return UnitDropItemSlot(this.toHandle(), whichItem.toHandle(), slot);
  }

  public issueInstantPointOrder(order: string, x: number, y: number, instantTargetWidget: Widget): boolean {
    return IssueInstantPointOrder(this.toHandle(), order, x, y, instantTargetWidget.toHandle());
  }

  public isSuspendedXP(): boolean {
    return IsSuspendedXP(this.toHandle());
  }

  public isShop(): boolean {
    return IsUnitShop(this.toHandle());
  }

  public getHeroLevel(): number {
    return GetHeroLevel(this.toHandle());
  }

  public unitShareVision(whichPlayer: GamePlayer, share: boolean): this {
    UnitShareVision(this.toHandle(), whichPlayer.toHandle(), share);
    return this;
  }

  public show(show: boolean): this {
    ShowUnit(this.toHandle(), show);
    return this;
  }

  public getDefaultTurnSpeed(): number {
    return GetUnitDefaultTurnSpeed(this.toHandle());
  }

  public isPaused(): boolean {
    return IsUnitPaused(this.toHandle());
  }

  public getBaseMissileSpeed(attackIndex: number): number {
    return GetUnitBaseMissileSpeed(this.toHandle(), attackIndex);
  }

  public enableInventory(enable: boolean): this {
    EnableUnitInventory(this.toHandle(), enable);
    return this;
  }

  public getAbility(aid: number): HAbility {
    return GetUnitAbility(this.toHandle(), aid);
  }

  public setFacingInstant(facing: number): this {
    SetUnitFacingInstant(this.toHandle(), facing);
    return this;
  }

  public getFoodUsed(): number {
    return GetUnitFoodUsed(this.toHandle());
  }

  public getNextAttackTimeStampByIndex(attackIndex: number): number {
    return GetUnitNextAttackTimeStampByIndex(this.toHandle(), attackIndex);
  }

  public remove(): this {
    RemoveUnit(this.toHandle());
    return this;
  }

  public getFoodMade(): number {
    return GetUnitFoodMade(this.toHandle());
  }

  public setFacingEx(facing: number, isInstant: boolean): this {
    SetUnitFacingEx(this.toHandle(), facing, isInstant);
    return this;
  }

  public getTotalMagicResist(): number {
    return GetUnitTotalMagicResist(this.toHandle());
  }

  public waygateGetDestinationY(): number {
    return WaygateGetDestinationY(this.toHandle());
  }

  public setWeaponTypeByIndex(atttackIndex: number, whichWeaponType: HWeaponType): this {
    SetUnitWeaponTypeByIndex(this.toHandle(), atttackIndex, whichWeaponType);
    return this;
  }

  public unitInventorySize(): number {
    return UnitInventorySize(this.toHandle());
  }

  public getAbilityByIndex(index: number): HAbility {
    return GetUnitAbilityByIndex(this.toHandle(), index);
  }

  public unitDropItemTarget(whichItem: Item, target: Widget): boolean {
    return UnitDropItemTarget(this.toHandle(), whichItem.toHandle(), target.toHandle());
  }

  public setHeroInt(newInt: number, permanent: boolean): this {
    SetHeroInt(this.toHandle(), newInt, permanent);
    return this;
  }

  public issueBuildOrder(unitToBuild: string, x: number, y: number): boolean {
    return IssueBuildOrder(this.toHandle(), unitToBuild, x, y);
  }

  public unitItemInSlot(itemSlot: number): Item {
    return objectStorage.getOrWrap(UnitItemInSlot(this.toHandle(), itemSlot));
  }

  public enableMovement(enable: boolean): this {
    EnableUnitMovement(this.toHandle(), enable);
    return this;
  }

  public unitRemoveItem(whichItem: Item): this {
    UnitRemoveItem(this.toHandle(), whichItem.toHandle());
    return this;
  }

  public getName(): string {
    return GetUnitName(this.toHandle());
  }

  public getRunicMagicResist(): number {
    return GetUnitRunicMagicResist(this.toHandle());
  }

  public setAnimation(whichAnimation: string): this {
    SetUnitAnimation(this.toHandle(), whichAnimation);
    return this;
  }

  public setCameraOrientController(xoffset: number, yoffset: number): this {
    SetCameraOrientController(this.toHandle(), xoffset, yoffset);
    return this;
  }

  public getHeroInt(includeBonuses: boolean): number {
    return GetHeroInt(this.toHandle(), includeBonuses);
  }

  public unitSetConstructionProgress(constructionPercentage: number): this {
    UnitSetConstructionProgress(this.toHandle(), constructionPercentage);
    return this;
  }

  public getHeroAgi(includeBonuses: boolean): number {
    return GetHeroAgi(this.toHandle(), includeBonuses);
  }

  public unitApplySilence(state: boolean): this {
    UnitApplySilence(this.toHandle(), state);
    return this;
  }

  public setBackswingPointByIndex(atttackIndex: number, backswing: number): this {
    SetUnitBackswingPointByIndex(this.toHandle(), atttackIndex, backswing);
    return this;
  }

  public unitAddAbilityEx(abilityId: number, checkForDuplicates: boolean): boolean {
    return UnitAddAbilityEx(this.toHandle(), abilityId, checkForDuplicates);
  }

  public selectHeroSkill(abilcode: number): this {
    SelectHeroSkill(this.toHandle(), abilcode);
    return this;
  }

  public getMagicResistByType(resistType: number): number {
    return GetUnitMagicResistByType(this.toHandle(), resistType);
  }

  public isInventoryEnabledEx(): boolean {
    return IsUnitInventoryEnabledEx(this.toHandle());
  }

  public setTypeSlots(slots: number): this {
    SetUnitTypeSlots(this.toHandle(), slots);
    return this;
  }

  public setOwner(whichPlayer: GamePlayer, changeColor: boolean): this {
    SetUnitOwner(this.toHandle(), whichPlayer.toHandle(), changeColor);
    return this;
  }

  public unitCanSleep(): boolean {
    return UnitCanSleep(this.toHandle());
  }

  public setHeroLevel(level: number, showEyeCandy: boolean): this {
    SetHeroLevel(this.toHandle(), level, showEyeCandy);
    return this;
  }

  public select(flag: boolean): this {
    SelectUnit(this.toHandle(), flag);
    return this;
  }

  public unitRemoveAbilityEx(abilityId: number, removeDuplicates: boolean): boolean {
    return UnitRemoveAbilityEx(this.toHandle(), abilityId, removeDuplicates);
  }

  public is(whichSpecifiedUnit: Unit): boolean {
    return IsUnit(this.toHandle(), whichSpecifiedUnit.toHandle());
  }

  public getBackswingPointByIndex(atttackIndex: number): number {
    return GetUnitBackswingPointByIndex(this.toHandle(), atttackIndex);
  }

  public setHeroAgi(newAgi: number, permanent: boolean): this {
    SetHeroAgi(this.toHandle(), newAgi, permanent);
    return this;
  }

  public kill(): this {
    KillUnit(this.toHandle());
    return this;
  }

  public unitUseItemTarget(whichItem: Item, target: Widget): boolean {
    return UnitUseItemTarget(this.toHandle(), whichItem.toHandle(), target.toHandle());
  }

  public isInForce(whichForce: HForce): boolean {
    return IsUnitInForce(this.toHandle(), whichForce);
  }

  public isMovementEnabled(): boolean {
    return IsUnitMovementEnabled(this.toHandle());
  }

  public setLocustFlag(flag: number, mode: number): this {
    SetUnitLocustFlag(this.toHandle(), flag, mode);
    return this;
  }

  public isVisible(whichPlayer: GamePlayer): boolean {
    return IsUnitVisible(this.toHandle(), whichPlayer.toHandle());
  }

  public isMoving(): boolean {
    return IsUnitMoving(this.toHandle());
  }

  public unitHasBuffsEx(
    removePositive: boolean,
    removeNegative: boolean,
    magic: boolean,
    physical: boolean,
    timedLife: boolean,
    aura: boolean,
    autoDispel: boolean
  ): boolean {
    return UnitHasBuffsEx(this.toHandle(), removePositive, removeNegative, magic, physical, timedLife, aura, autoDispel);
  }

  public setTexture(textureName: string, textureIndex: number): this {
    SetUnitTexture(this.toHandle(), textureName, textureIndex);
    return this;
  }

  public isInRange(otherUnit: Unit, distance: number): boolean {
    return IsUnitInRange(this.toHandle(), otherUnit.toHandle(), distance);
  }

  public getEluneMagicResist(): number {
    return GetUnitEluneMagicResist(this.toHandle());
  }

  public setAnimationWithRarity(whichAnimation: string, rarity: HRarityControl): this {
    SetUnitAnimationWithRarity(this.toHandle(), whichAnimation, rarity);
    return this;
  }

  public unitAddType(whichUnitType: HUnitType): boolean {
    return UnitAddType(this.toHandle(), whichUnitType);
  }

  public queueAnimation(whichAnimation: string): this {
    QueueUnitAnimation(this.toHandle(), whichAnimation);
    return this;
  }

  public isType(whichUnitType: HUnitType): boolean {
    return IsUnitType(this.toHandle(), whichUnitType);
  }

  public getAbilityLevel(abilcode: number): number {
    return GetUnitAbilityLevel(this.toHandle(), abilcode);
  }

  public unitCancelCurrentAttackByIndex(atttackIndex: number): number {
    return UnitCancelCurrentAttackByIndex(this.toHandle(), atttackIndex);
  }

  public unitIgnoreAlarm(flag: boolean): boolean {
    return UnitIgnoreAlarm(this.toHandle(), flag);
  }

  public getFlyHeight(): number {
    return GetUnitFlyHeight(this.toHandle());
  }

  public unitDropItemPoint(whichItem: Item, x: number, y: number): boolean {
    return UnitDropItemPoint(this.toHandle(), whichItem.toHandle(), x, y);
  }

  public setCameraTargetController(xoffset: number, yoffset: number, inheritOrientation: boolean): this {
    SetCameraTargetController(this.toHandle(), xoffset, yoffset, inheritOrientation);
    return this;
  }

  public setBaseDamageByIndex(atttackIndex: number, damage: number): this {
    SetUnitBaseDamageByIndex(this.toHandle(), atttackIndex, damage);
    return this;
  }

  public getLoc(): HLocation {
    return GetUnitLoc(this.toHandle());
  }

  public getDefaultAcquireRange(): number {
    return GetUnitDefaultAcquireRange(this.toHandle());
  }

  public unitSetUsesAltIcon(flag: boolean): this {
    UnitSetUsesAltIcon(this.toHandle(), flag);
    return this;
  }

  public isOwnedByPlayer(whichPlayer: GamePlayer): boolean {
    return IsUnitOwnedByPlayer(this.toHandle(), whichPlayer.toHandle());
  }

  public isSelected(whichPlayer: GamePlayer): boolean {
    return IsUnitSelected(this.toHandle(), whichPlayer.toHandle());
  }

  public setControl(flagValue: number, isSetFlagValue: boolean, ismove: boolean, isattack: boolean, isinventory: boolean): this {
    SetUnitControl(this.toHandle(), flagValue, isSetFlagValue, ismove, isattack, isinventory);
    return this;
  }

  ///
  /// Props
  ///

  public baseName(): string;
  public baseName(value: Setter<string, this>): this;
  public baseName(value?: Setter<string, this>): string | this {
    if (typeof value === "function") {
      value = value(GetUnitBaseName(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitBaseName(this.toHandle());
    }

    SetUnitBaseName(this.toHandle(), value);
    return this;
  }

  public baseColour(): number;
  public baseColour(value: Setter<number, this>): this;
  public baseColour(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitBaseColour(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitBaseColour(this.toHandle());
    }

    SetUnitBaseColour(this.toHandle(), value);
    return this;
  }

  public baseColourG(): number;
  public baseColourG(value: Setter<number, this>): this;
  public baseColourG(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitBaseColourG(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitBaseColourG(this.toHandle());
    }

    SetUnitBaseColourG(this.toHandle(), value);
    return this;
  }

  public stunned(): boolean;
  public stunned(value: Setter<boolean, this>): this;
  public stunned(value?: Setter<boolean, this>): boolean | this {
    if (typeof value === "function") {
      value = value(IsUnitStunned(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return IsUnitStunned(this.toHandle());
    }

    SetUnitStunned(this.toHandle(), value);
    return this;
  }

  public timeScale(): number;
  public timeScale(value: Setter<number, this>): this;
  public timeScale(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitTimeScale(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitTimeScale(this.toHandle());
    }

    SetUnitTimeScale(this.toHandle(), value);
    return this;
  }

  public baseColourA(): number;
  public baseColourA(value: Setter<number, this>): this;
  public baseColourA(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitBaseColourA(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitBaseColourA(this.toHandle());
    }

    SetUnitBaseColourA(this.toHandle(), value);
    return this;
  }

  public x(): number;
  public x(value: Setter<number, this>): this;
  public x(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitX(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitX(this.toHandle());
    }

    SetUnitX(this.toHandle(), value);
    return this;
  }

  public currentMana(): number;
  public currentMana(value: Setter<number, this>): this;
  public currentMana(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitCurrentMana(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitCurrentMana(this.toHandle());
    }

    SetUnitCurrentMana(this.toHandle(), value);
    return this;
  }

  public moveType(): number;
  public moveType(value: Setter<number, this>): this;
  public moveType(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitMoveType(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitMoveType(this.toHandle());
    }

    SetUnitMoveType(this.toHandle(), value);
    return this;
  }

  public maxMana(): number;
  public maxMana(value: Setter<number, this>): this;
  public maxMana(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitMaxMana(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitMaxMana(this.toHandle());
    }

    SetUnitMaxMana(this.toHandle(), value);
    return this;
  }

  public manaRegen(): number;
  public manaRegen(value: Setter<number, this>): this;
  public manaRegen(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitManaRegen(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitManaRegen(this.toHandle());
    }

    SetUnitManaRegen(this.toHandle(), value);
    return this;
  }

  public currentLife(): number;
  public currentLife(value: Setter<number, this>): this;
  public currentLife(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitCurrentLife(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitCurrentLife(this.toHandle());
    }

    SetUnitCurrentLife(this.toHandle(), value);
    return this;
  }

  public baseNightSight(): number;
  public baseNightSight(value: Setter<number, this>): this;
  public baseNightSight(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitBaseNightSight(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitBaseNightSight(this.toHandle());
    }

    SetUnitBaseNightSight(this.toHandle(), value);
    return this;
  }

  public facing(): number;
  public facing(value: Setter<number, this>): this;
  public facing(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitFacing(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitFacing(this.toHandle());
    }

    SetUnitFacing(this.toHandle(), value);
    return this;
  }

  public baseDaySight(): number;
  public baseDaySight(value: Setter<number, this>): this;
  public baseDaySight(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitBaseDaySight(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitBaseDaySight(this.toHandle());
    }

    SetUnitBaseDaySight(this.toHandle(), value);
    return this;
  }

  public lifeRegen(): number;
  public lifeRegen(value: Setter<number, this>): this;
  public lifeRegen(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitLifeRegen(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitLifeRegen(this.toHandle());
    }

    SetUnitLifeRegen(this.toHandle(), value);
    return this;
  }

  public baseReviveTip(): string;
  public baseReviveTip(value: Setter<string, this>): this;
  public baseReviveTip(value?: Setter<string, this>): string | this {
    if (typeof value === "function") {
      value = value(GetUnitBaseReviveTip(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitBaseReviveTip(this.toHandle());
    }

    SetUnitBaseReviveTip(this.toHandle(), value);
    return this;
  }

  public attackSpeed(): number;
  public attackSpeed(value: Setter<number, this>): this;
  public attackSpeed(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitAttackSpeed(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitAttackSpeed(this.toHandle());
    }

    SetUnitAttackSpeed(this.toHandle(), value);
    return this;
  }

  public baseShadowTex(): string;
  public baseShadowTex(value: Setter<string, this>): this;
  public baseShadowTex(value?: Setter<string, this>): string | this {
    if (typeof value === "function") {
      value = value(GetUnitBaseShadowTex(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitBaseShadowTex(this.toHandle());
    }

    SetUnitBaseShadowTex(this.toHandle(), value);
    return this;
  }

  public selectable(): boolean;
  public selectable(value: Setter<boolean, this>): this;
  public selectable(value?: Setter<boolean, this>): boolean | this {
    if (typeof value === "function") {
      value = value(IsUnitSelectable(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return IsUnitSelectable(this.toHandle());
    }

    SetUnitSelectable(this.toHandle(), value);
    return this;
  }

  public heroBasePrimaryStat(): HHeroAttribute;
  public heroBasePrimaryStat(value: Setter<HHeroAttribute, this>): this;
  public heroBasePrimaryStat(value?: Setter<HHeroAttribute, this>): HHeroAttribute | this {
    if (typeof value === "function") {
      value = value(GetHeroBasePrimaryStat(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetHeroBasePrimaryStat(this.toHandle());
    }

    SetHeroBasePrimaryStat(this.toHandle(), value);
    return this;
  }

  public bonusMoveSpeedPercent(): number;
  public bonusMoveSpeedPercent(value: Setter<number, this>): this;
  public bonusMoveSpeedPercent(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitBonusMoveSpeedPercent(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitBonusMoveSpeedPercent(this.toHandle());
    }

    SetUnitBonusMoveSpeedPercent(this.toHandle(), value);
    return this;
  }

  public userData(): number;
  public userData(value: Setter<number, this>): this;
  public userData(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitUserData(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitUserData(this.toHandle());
    }

    SetUnitUserData(this.toHandle(), value);
    return this;
  }

  public baseHotkey(): HOsKeyType;
  public baseHotkey(value: Setter<HOsKeyType, this>): this;
  public baseHotkey(value?: Setter<HOsKeyType, this>): HOsKeyType | this {
    if (typeof value === "function") {
      value = value(GetUnitBaseHotkey(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitBaseHotkey(this.toHandle());
    }

    SetUnitBaseHotkey(this.toHandle(), value);
    return this;
  }

  public itemSlots(): number;
  public itemSlots(value: Setter<number, this>): this;
  public itemSlots(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitItemSlots(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitItemSlots(this.toHandle());
    }

    SetUnitItemSlots(this.toHandle(), value);
    return this;
  }

  public moveSpeed(): number;
  public moveSpeed(value: Setter<number, this>): this;
  public moveSpeed(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitMoveSpeed(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitMoveSpeed(this.toHandle());
    }

    SetUnitMoveSpeed(this.toHandle(), value);
    return this;
  }

  public baseIcon(): string;
  public baseIcon(value: Setter<string, this>): this;
  public baseIcon(value?: Setter<string, this>): string | this {
    if (typeof value === "function") {
      value = value(GetUnitBaseIcon(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitBaseIcon(this.toHandle());
    }

    SetUnitBaseIcon(this.toHandle(), value);
    return this;
  }

  public y(): number;
  public y(value: Setter<number, this>): this;
  public y(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitY(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitY(this.toHandle());
    }

    SetUnitY(this.toHandle(), value);
    return this;
  }

  public maxLife(): number;
  public maxLife(value: Setter<number, this>): this;
  public maxLife(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitMaxLife(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitMaxLife(this.toHandle());
    }

    SetUnitMaxLife(this.toHandle(), value);
    return this;
  }

  public baseColourR(): number;
  public baseColourR(value: Setter<number, this>): this;
  public baseColourR(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitBaseColourR(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitBaseColourR(this.toHandle());
    }

    SetUnitBaseColourR(this.toHandle(), value);
    return this;
  }

  public baseTip(): string;
  public baseTip(value: Setter<string, this>): this;
  public baseTip(value?: Setter<string, this>): string | this {
    if (typeof value === "function") {
      value = value(GetUnitBaseTip(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitBaseTip(this.toHandle());
    }

    SetUnitBaseTip(this.toHandle(), value);
    return this;
  }

  public baseColourB(): number;
  public baseColourB(value: Setter<number, this>): this;
  public baseColourB(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitBaseColourB(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitBaseColourB(this.toHandle());
    }

    SetUnitBaseColourB(this.toHandle(), value);
    return this;
  }

  public currentSight(): number;
  public currentSight(value: Setter<number, this>): this;
  public currentSight(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitCurrentSight(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitCurrentSight(this.toHandle());
    }

    SetUnitCurrentSight(this.toHandle(), value);
    return this;
  }

  public moveAIType(): number;
  public moveAIType(value: Setter<number, this>): this;
  public moveAIType(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitMoveAIType(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitMoveAIType(this.toHandle());
    }

    SetUnitMoveAIType(this.toHandle(), value);
    return this;
  }

  public baseGoldCost(): number;
  public baseGoldCost(value: Setter<number, this>): this;
  public baseGoldCost(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitBaseGoldCost(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitBaseGoldCost(this.toHandle());
    }

    SetUnitBaseGoldCost(this.toHandle(), value);
    return this;
  }

  public armour(): number;
  public armour(value: Setter<number, this>): this;
  public armour(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitArmour(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitArmour(this.toHandle());
    }

    SetUnitArmour(this.toHandle(), value);
    return this;
  }

  public turnSpeed(): number;
  public turnSpeed(value: Setter<number, this>): this;
  public turnSpeed(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitTurnSpeed(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitTurnSpeed(this.toHandle());
    }

    SetUnitTurnSpeed(this.toHandle(), value);
    return this;
  }

  public armourType(): HDefenseType;
  public armourType(value: Setter<HDefenseType, this>): this;
  public armourType(value?: Setter<HDefenseType, this>): HDefenseType | this {
    if (typeof value === "function") {
      value = value(GetUnitArmourType(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitArmourType(this.toHandle());
    }

    SetUnitArmourType(this.toHandle(), value);
    return this;
  }

  public acquireRange(): number;
  public acquireRange(value: Setter<number, this>): this;
  public acquireRange(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitAcquireRange(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitAcquireRange(this.toHandle());
    }

    SetUnitAcquireRange(this.toHandle(), value);
    return this;
  }

  public invulnerable(): boolean;
  public invulnerable(value: Setter<boolean, this>): this;
  public invulnerable(value?: Setter<boolean, this>): boolean | this {
    if (typeof value === "function") {
      value = value(IsUnitInvulnerable(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return IsUnitInvulnerable(this.toHandle());
    }

    SetUnitInvulnerable(this.toHandle(), value);
    return this;
  }

  public baseAwakenTip(): string;
  public baseAwakenTip(value: Setter<string, this>): this;
  public baseAwakenTip(value?: Setter<string, this>): string | this {
    if (typeof value === "function") {
      value = value(GetUnitBaseAwakenTip(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitBaseAwakenTip(this.toHandle());
    }

    SetUnitBaseAwakenTip(this.toHandle(), value);
    return this;
  }

  public baseModel(): string;
  public baseModel(value: Setter<string, this>): this;
  public baseModel(value?: Setter<string, this>): string | this {
    if (typeof value === "function") {
      value = value(GetUnitBaseModel(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitBaseModel(this.toHandle());
    }

    SetUnitBaseModel(this.toHandle(), value);
    return this;
  }

  public baseSelectionScale(): number;
  public baseSelectionScale(value: Setter<number, this>): this;
  public baseSelectionScale(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitBaseSelectionScale(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitBaseSelectionScale(this.toHandle());
    }

    SetUnitBaseSelectionScale(this.toHandle(), value);
    return this;
  }

  public primaryStat(): HHeroAttribute;
  public primaryStat(value: Setter<HHeroAttribute, this>): this;
  public primaryStat(value?: Setter<HHeroAttribute, this>): HHeroAttribute | this {
    if (typeof value === "function") {
      value = value(GetUnitPrimaryStat(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitPrimaryStat(this.toHandle());
    }

    SetUnitPrimaryStat(this.toHandle(), value);
    return this;
  }

  public stunCounter(): number;
  public stunCounter(value: Setter<number, this>): this;
  public stunCounter(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitStunCounter(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitStunCounter(this.toHandle());
    }

    SetUnitStunCounter(this.toHandle(), value);
    return this;
  }

  public baseDescription(): string;
  public baseDescription(value: Setter<string, this>): this;
  public baseDescription(value?: Setter<string, this>): string | this {
    if (typeof value === "function") {
      value = value(GetUnitBaseDescription(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitBaseDescription(this.toHandle());
    }

    SetUnitBaseDescription(this.toHandle(), value);
    return this;
  }

  public baseUberTip(): string;
  public baseUberTip(value: Setter<string, this>): this;
  public baseUberTip(value?: Setter<string, this>): string | this {
    if (typeof value === "function") {
      value = value(GetUnitBaseUberTip(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitBaseUberTip(this.toHandle());
    }

    SetUnitBaseUberTip(this.toHandle(), value);
    return this;
  }

  public typeId(): number;
  public typeId(value: Setter<number, this>): this;
  public typeId(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitTypeId(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitTypeId(this.toHandle());
    }

    SetUnitTypeId(this.toHandle(), value);
    return this;
  }

  public resourceAmount(): number;
  public resourceAmount(value: Setter<number, this>): this;
  public resourceAmount(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetResourceAmount(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetResourceAmount(this.toHandle());
    }

    SetResourceAmount(this.toHandle(), value);
    return this;
  }

  public propWindow(): number;
  public propWindow(value: Setter<number, this>): this;
  public propWindow(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitPropWindow(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitPropWindow(this.toHandle());
    }

    SetUnitPropWindow(this.toHandle(), value);
    return this;
  }

  public basePortrait(): string;
  public basePortrait(value: Setter<string, this>): this;
  public basePortrait(value?: Setter<string, this>): string | this {
    if (typeof value === "function") {
      value = value(GetUnitBasePortrait(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitBasePortrait(this.toHandle());
    }

    SetUnitBasePortrait(this.toHandle(), value);
    return this;
  }

  public unitBaseMoveSpeed(): number;
  public unitBaseMoveSpeed(value: Setter<number, this>): this;
  public unitBaseMoveSpeed(value?: Setter<number, this>): number | this {
    if (typeof value === "function") {
      value = value(GetUnitUnitBaseMoveSpeed(this.toHandle()), this);
    }

    if (typeof value === "undefined") {
      return GetUnitUnitBaseMoveSpeed(this.toHandle());
    }

    SetUnitUnitBaseMoveSpeed(this.toHandle(), value);
    return this;
  }
}
