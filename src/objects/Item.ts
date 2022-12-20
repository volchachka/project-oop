import { ObjectStorage } from "../services/ObjectStorage";
import { Handle } from "./Handle";
import { GamePlayer } from "./GamePlayer";

const objectStorage = ObjectStorage.getInstance();

export class Item extends Handle {
  public toHandle(): HUnit | null {
    return this.handle as HUnit;
  }

  public getItemAbility(abilityId: number): HAbility {
    return GetItemAbility(this.handle as HItem, abilityId);
  }

  public getItemAbilityByIndex(abilityIndex: number): HAbility {
    return GetItemAbilityByIndex(this.handle as HItem, abilityIndex);
  }

  public getItemFacing(): number {
    return GetItemFacing(this.handle as HItem);
  }

  public getItemLevel(): number {
    return GetItemLevel(this.handle as HItem);
  }

  public getItemName(): string {
    return GetItemName(this.handle as HItem);
  }

  public getItemPlayer(): GamePlayer {
    return objectStorage.getOrWrap(GetItemPlayer(this.handle as HItem));
  }

  public getItemType(): HItemType {
    return GetItemType(this.handle as HItem);
  }

  public getItemTypeId(): number {
    return GetItemTypeId(this.handle as HItem);
  }

  public getItemVertexColour(): number {
    return GetItemVertexColour(this.handle as HItem);
  }

  public getItemX(): number {
    return GetItemX(this.handle as HItem);
  }

  public getItemY(): number {
    return GetItemY(this.handle as HItem);
  }

  public isItemInvulnerable(): boolean {
    return IsItemInvulnerable(this.handle as HItem);
  }

  public isItemOwned(): boolean {
    return IsItemOwned(this.handle as HItem);
  }

  public isItemPawnable(): boolean {
    return IsItemPawnable(this.handle as HItem);
  }

  public isItemPowerup(): boolean {
    return IsItemPowerup(this.handle as HItem);
  }

  public isItemSellable(): boolean {
    return IsItemSellable(this.handle as HItem);
  }

  public isItemVisible(): boolean {
    return IsItemVisible(this.handle as HItem);
  }

  public queueItemAnimation(animation: string): void {
    return QueueItemAnimation(this.handle as HItem, animation);
  }

  public queueItemAnimationByIndex(animIndex: number): void {
    return QueueItemAnimationByIndex(this.handle as HItem, animIndex);
  }

  public removeItem(): void {
    return RemoveItem(this.handle as HItem);
  }

  public setItemAnimation(animation: string): void {
    return SetItemAnimation(this.handle as HItem, animation);
  }

  public setItemAnimationByIndex(animIndex: number): void {
    return SetItemAnimationByIndex(this.handle as HItem, animIndex);
  }

  public setItemAnimationWithRarity(animation: string, rarity: HRarityControl): void {
    return SetItemAnimationWithRarity(this.handle as HItem, animation, rarity);
  }

  public setItemAnimationWithRarityByIndex(animIndex: number, rarity: HRarityControl): void {
    return SetItemAnimationWithRarityByIndex(this.handle as HItem, animIndex, rarity);
  }

  public setItemDropID(unitId: number): void {
    return SetItemDropID(this.handle as HItem, unitId);
  }

  public setItemDropOnDeath(flag: boolean): void {
    return SetItemDropOnDeath(this.handle as HItem, flag);
  }

  public setItemDroppable(flag: boolean): void {
    return SetItemDroppable(this.handle as HItem, flag);
  }

  public setItemFacing(facing: number, isInstant: boolean): void {
    return SetItemFacing(this.handle as HItem, facing, isInstant);
  }

  public setItemInvulnerable(flag: boolean): void {
    return SetItemInvulnerable(this.handle as HItem, flag);
  }

  public setItemModel(modelFile: string): void {
    return SetItemModel(this.handle as HItem, modelFile);
  }

  public setItemOrientation(yaw: number, pitch: number, roll: number): void {
    return SetItemOrientation(this.handle as HItem, yaw, pitch, roll);
  }

  public setItemPawnable(flag: boolean): void {
    return SetItemPawnable(this.handle as HItem, flag);
  }

  public setItemPlayer(whichPlayer: GamePlayer, changeColor: boolean): void {
    return SetItemPlayer(this.handle as HItem, whichPlayer.toHandle(), changeColor);
  }

  public setItemPosition(x: number, y: number): void {
    return SetItemPosition(this.handle as HItem, x, y);
  }

  public setItemSpaceRotation(yaw: number, pitch: number, roll: number, eulerOrder: number): void {
    return SetItemSpaceRotation(this.handle as HItem, yaw, pitch, roll, eulerOrder);
  }

  public setItemVertexColour(red: number, green: number, blue: number, alpha: number): void {
    return SetItemVertexColour(this.handle as HItem, red, green, blue, alpha);
  }

  public setItemVisible(show: boolean): void {
    return SetItemVisible(this.handle as HItem, show);
  }

  get baseCharges() {
    return GetItemBaseCharges(this.handle as HItem);
  }

  set baseCharges(value: number) {
    SetItemBaseCharges(this.handle as HItem, value);
  }

  get baseClassification() {
    return GetItemBaseClassification(this.handle as HItem);
  }

  set baseClassification(value: number) {
    SetItemBaseClassification(this.handle as HItem, value);
  }

  get baseCooldownId() {
    return GetItemBaseCooldownId(this.handle as HItem);
  }

  set baseCooldownId(value: number) {
    SetItemBaseCooldownId(this.handle as HItem, value);
  }

  get baseDescription() {
    return GetItemBaseDescription(this.handle as HItem);
  }

  set baseDescription(value: string) {
    SetItemBaseDescription(this.handle as HItem, value);
  }

  get baseGoldCost() {
    return GetItemBaseGoldCost(this.handle as HItem);
  }

  set baseGoldCost(value: number) {
    SetItemBaseGoldCost(this.handle as HItem, value);
  }

  get baseHotkey() {
    return GetItemBaseHotkey(this.handle as HItem);
  }

  set baseHotkey(value: HOsKeyType) {
    SetItemBaseHotkey(this.handle as HItem, value);
  }

  get baseIcon() {
    return GetItemBaseIcon(this.handle as HItem);
  }

  set baseIcon(value: string) {
    SetItemBaseIcon(this.handle as HItem, value);
  }

  get baseIsDroppable() {
    return GetItemBaseIsDroppable(this.handle as HItem);
  }

  set baseIsDroppable(value: boolean) {
    SetItemBaseIsDroppable(this.handle as HItem, value);
  }

  get baseIsDroppableOnDeath() {
    return GetItemBaseIsDroppableOnDeath(this.handle as HItem);
  }

  set baseIsDroppableOnDeath(value: boolean) {
    SetItemBaseIsDroppableOnDeath(this.handle as HItem, value);
  }

  get baseIsIgnoreCooldown() {
    return GetItemBaseIsIgnoreCooldown(this.handle as HItem);
  }

  set baseIsIgnoreCooldown(value: boolean) {
    SetItemBaseIsIgnoreCooldown(this.handle as HItem, value);
  }

  get baseIsMorph() {
    return GetItemBaseIsMorph(this.handle as HItem);
  }

  set baseIsMorph(value: boolean) {
    SetItemBaseIsMorph(this.handle as HItem, value);
  }

  get baseIsPawnable() {
    return GetItemBaseIsPawnable(this.handle as HItem);
  }

  set baseIsPawnable(value: boolean) {
    SetItemBaseIsPawnable(this.handle as HItem, value);
  }

  get baseIsPerishable() {
    return GetItemBaseIsPerishable(this.handle as HItem);
  }

  set baseIsPerishable(value: boolean) {
    SetItemBaseIsPerishable(this.handle as HItem, value);
  }

  get baseIsPickRandom() {
    return GetItemBaseIsPickRandom(this.handle as HItem);
  }

  set baseIsPickRandom(value: boolean) {
    SetItemBaseIsPickRandom(this.handle as HItem, value);
  }

  get baseIsPowerUp() {
    return GetItemBaseIsPowerUp(this.handle as HItem);
  }

  set baseIsPowerUp(value: boolean) {
    SetItemBaseIsPowerUp(this.handle as HItem, value);
  }

  get baseIsSellable() {
    return GetItemBaseIsSellable(this.handle as HItem);
  }

  set baseIsSellable(value: boolean) {
    SetItemBaseIsSellable(this.handle as HItem, value);
  }

  get baseIsUsable() {
    return GetItemBaseIsUsable(this.handle as HItem);
  }

  set baseIsUsable(value: boolean) {
    SetItemBaseIsUsable(this.handle as HItem, value);
  }

  get baseLevel() {
    return GetItemBaseLevel(this.handle as HItem);
  }

  set baseLevel(value: number) {
    SetItemBaseLevel(this.handle as HItem, value);
  }

  get baseLumberCost() {
    return GetItemBaseLumberCost(this.handle as HItem);
  }

  set baseLumberCost(value: number) {
    SetItemBaseLumberCost(this.handle as HItem, value);
  }

  get baseName() {
    return GetItemBaseName(this.handle as HItem);
  }

  set baseName(value: string) {
    SetItemBaseName(this.handle as HItem, value);
  }

  get baseOldLevel() {
    return GetItemBaseOldLevel(this.handle as HItem);
  }

  set baseOldLevel(value: number) {
    SetItemBaseOldLevel(this.handle as HItem, value);
  }

  get basePriority() {
    return GetItemBasePriority(this.handle as HItem);
  }

  set basePriority(value: number) {
    SetItemBasePriority(this.handle as HItem, value);
  }

  get baseStockMaximum() {
    return GetItemBaseStockMaximum(this.handle as HItem);
  }

  set baseStockMaximum(value: number) {
    SetItemBaseStockMaximum(this.handle as HItem, value);
  }

  get baseStockReplenishInterval() {
    return GetItemBaseStockReplenishInterval(this.handle as HItem);
  }

  set baseStockReplenishInterval(value: number) {
    SetItemBaseStockReplenishInterval(this.handle as HItem, value);
  }

  get baseStockStartDelay() {
    return GetItemBaseStockStartDelay(this.handle as HItem);
  }

  set baseStockStartDelay(value: number) {
    SetItemBaseStockStartDelay(this.handle as HItem, value);
  }

  get baseTip() {
    return GetItemBaseTip(this.handle as HItem);
  }

  set baseTip(value: string) {
    SetItemBaseTip(this.handle as HItem, value);
  }

  get baseUberTip() {
    return GetItemBaseUberTip(this.handle as HItem);
  }

  set baseUberTip(value: string) {
    SetItemBaseUberTip(this.handle as HItem, value);
  }

  get charges() {
    return GetItemCharges(this.handle as HItem);
  }

  set charges(value: number) {
    SetItemCharges(this.handle as HItem, value);
  }

  get cooldown() {
    return GetItemCooldown(this.handle as HItem);
  }

  set cooldown(value: number) {
    SetItemCooldown(this.handle as HItem, value);
  }

  get life() {
    return GetItemLife(this.handle as HItem);
  }

  set life(value: number) {
    SetItemLife(this.handle as HItem, value);
  }

  get maxLife() {
    return GetItemMaxLife(this.handle as HItem);
  }

  set maxLife(value: number) {
    SetItemMaxLife(this.handle as HItem, value);
  }

  get pitch() {
    return GetItemPitch(this.handle as HItem);
  }

  set pitch(value: number) {
    SetItemPitch(this.handle as HItem, value);
  }

  get remainingCooldown() {
    return GetItemRemainingCooldown(this.handle as HItem);
  }

  set remainingCooldown(value: number) {
    SetItemRemainingCooldown(this.handle as HItem, value);
  }

  get roll() {
    return GetItemRoll(this.handle as HItem);
  }

  set roll(value: number) {
    SetItemRoll(this.handle as HItem, value);
  }

  get scale() {
    return GetItemScale(this.handle as HItem);
  }

  set scale(value: number) {
    SetItemScale(this.handle as HItem, value);
  }

  get timeScale() {
    return GetItemTimeScale(this.handle as HItem);
  }

  set timeScale(value: number) {
    SetItemTimeScale(this.handle as HItem, value);
  }

  get userData() {
    return GetItemUserData(this.handle as HItem);
  }

  set userData(value: number) {
    SetItemUserData(this.handle as HItem, value);
  }

  get yaw() {
    return GetItemYaw(this.handle as HItem);
  }

  set yaw(value: number) {
    SetItemYaw(this.handle as HItem, value);
  }
}
