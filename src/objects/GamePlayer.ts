import { RemoveHandleEvent } from "./events/RemoveHandleEvent";
import { Handle } from "./Handle";
import { Event } from "./events/Event";
import { ObjectStorage } from "../services/ObjectStorage";
import { Unit } from "./Unit";

const objectStorage = ObjectStorage.getInstance();

export class GamePlayer extends Handle {
  constructor(player: HPlayer);

  public constructor(player: HPlayer) {
    super(player);
  }

  // Todo createUnit

  public toHandle(): HPlayer | null {
    return this.handle as HPlayer;
  }

  public addTechResearched(techid: number, levels: number): void {
    return AddPlayerTechResearched(this.handle as HPlayer, techid, levels);
  }

  public cacheHeroData(): void {
    return CachePlayerHeroData(this.handle as HPlayer);
  }

  public commandAI(command: number, data: number): void {
    return CommandAI(this.handle as HPlayer, command, data);
  }

  public createBlightedGoldmine(x: number, y: number, face: number): Unit {
    return objectStorage.getOrWrap(CreateBlightedGoldmine(this.handle as HPlayer, x, y, face));
  }

  public createCorpse(unitid: number, x: number, y: number, face: number): Unit {
    return objectStorage.getOrWrap(CreateCorpse(this.handle as HPlayer, unitid, x, y, face));
  }

  public createFogModifierRadius(
    whichState: HFogState,
    centerx: number,
    centerY: number,
    radius: number,
    useSharedVision: boolean,
    afterUnits: boolean
  ): HFogModifier {
    return CreateFogModifierRadius(this.handle as HPlayer, whichState, centerx, centerY, radius, useSharedVision, afterUnits);
  }

  public createFogModifierRect(whichState: HFogState, where: HRect, useSharedVision: boolean, afterUnits: boolean): HFogModifier {
    return CreateFogModifierRect(this.handle as HPlayer, whichState, where, useSharedVision, afterUnits);
  }

  public cripplePlayer(toWhichPlayers: HForce, flag: boolean): void {
    return CripplePlayer(this.handle as HPlayer, toWhichPlayers, flag);
  }

  public dialogDisplay(whichDialog: HDialog, flag: boolean): void {
    return DialogDisplay(this.handle as HPlayer, whichDialog, flag);
  }

  public displayTextToPlayer(x: number, y: number, message: string): void {
    return DisplayTextToPlayer(this.handle as HPlayer, x, y, message);
  }

  public displayTimedTextFromPlayer(x: number, y: number, duration: number, message: string): void {
    return DisplayTimedTextFromPlayer(this.handle as HPlayer, x, y, duration, message);
  }

  public displayTimedTextToPlayer(x: number, y: number, duration: number, message: string): void {
    return DisplayTimedTextToPlayer(this.handle as HPlayer, x, y, duration, message);
  }

  public forceStartLocation(startLocIndex: number): void {
    return ForcePlayerStartLocation(this.handle as HPlayer, startLocIndex);
  }

  public getAIDifficulty(): HAIDifficulty {
    return GetAIDifficulty(this.handle as HPlayer);
  }

  public getFirstUnitInSelection(): Unit {
    return objectStorage.getOrWrap(GetFirstUnitInSelection(this.handle as HPlayer));
  }

  public getAlliance(otherPlayer: GamePlayer, whichAllianceSetting: HAllianceType): boolean {
    return GetPlayerAlliance(this.handle as HPlayer, otherPlayer.toHandle(), whichAllianceSetting);
  }

  public getId(): number {
    return GetPlayerId(this.handle as HPlayer);
  }

  public getRace(): HRace {
    return GetPlayerRace(this.handle as HPlayer);
  }

  public getScore(whichPlayerScore: HPlayerScore): number {
    return GetPlayerScore(this.handle as HPlayer, whichPlayerScore);
  }

  public getSelectable(): boolean {
    return GetPlayerSelectable(this.handle as HPlayer);
  }

  public getSlotState(): HPlayerSlotState {
    return GetPlayerSlotState(this.handle as HPlayer);
  }

  public getState(whichPlayerState: HPlayerState): number {
    return GetPlayerState(this.handle as HPlayer, whichPlayerState);
  }

  public getStructureCount(includeIncomplete: boolean): number {
    return GetPlayerStructureCount(this.handle as HPlayer, includeIncomplete);
  }

  public getTaxRate(otherPlayer: GamePlayer, whichResource: HPlayerState): number {
    return GetPlayerTaxRate(this.handle as HPlayer, otherPlayer.toHandle(), whichResource);
  }

  public getTechCount(techid: number, specificonly: boolean): number {
    return GetPlayerTechCount(this.handle as HPlayer, techid, specificonly);
  }

  public getTechMaxAllowed(techid: number): number {
    return GetPlayerTechMaxAllowed(this.handle as HPlayer, techid);
  }

  public getTechResearched(techid: number, specificonly: boolean): boolean {
    return GetPlayerTechResearched(this.handle as HPlayer, techid, specificonly);
  }

  public getTypedUnitCount(unitName: string, includeIncomplete: boolean, includeUpgrades: boolean): number {
    return GetPlayerTypedUnitCount(this.handle as HPlayer, unitName, includeIncomplete, includeUpgrades);
  }

  public getUnitCount(includeIncomplete: boolean): number {
    return GetPlayerUnitCount(this.handle as HPlayer, includeIncomplete);
  }

  public getTournamentScore(): number {
    return GetTournamentScore(this.handle as HPlayer);
  }

  public getUnitSelected(): Unit {
    return objectStorage.getOrWrap(GetUnitSelected(this.handle as HPlayer));
  }

  public getUnitSelectedCountByPlayer(): number {
    return GetUnitSelectedCountByPlayer(this.handle as HPlayer);
  }

  public isAlly(otherPlayer: GamePlayer): boolean {
    return IsPlayerAlly(this.handle as HPlayer, otherPlayer.toHandle());
  }

  public isEnemy(otherPlayer: GamePlayer): boolean {
    return IsPlayerEnemy(this.handle as HPlayer, otherPlayer.toHandle());
  }

  public isInForce(whichForce: HForce): boolean {
    return IsPlayerInForce(this.handle as HPlayer, whichForce);
  }

  public isObserver(): boolean {
    return IsPlayerObserver(this.handle as HPlayer);
  }

  public isRacePrefSet(pref: HRacePreference): boolean {
    return IsPlayerRacePrefSet(this.handle as HPlayer, pref);
  }

  public issueNeutralImmediateOrder(neutralStructure: Unit, unitToBuild: string): boolean {
    return IssueNeutralImmediateOrder(this.handle as HPlayer, neutralStructure.toHandle(), unitToBuild);
  }

  public issueNeutralImmediateOrderById(neutralStructure: Unit, unitId: number): boolean {
    return IssueNeutralImmediateOrderById(this.handle as HPlayer, neutralStructure.toHandle(), unitId);
  }

  public issueNeutralPointOrder(neutralStructure: Unit, unitToBuild: string, x: number, y: number): boolean {
    return IssueNeutralPointOrder(this.handle as HPlayer, neutralStructure.toHandle(), unitToBuild, x, y);
  }

  public issueNeutralPointOrderById(neutralStructure: Unit, unitId: number, x: number, y: number): boolean {
    return IssueNeutralPointOrderById(this.handle as HPlayer, neutralStructure.toHandle(), unitId, x, y);
  }

  public issueNeutralTargetOrder(neutralStructure: Unit, unitToBuild: string, target: HWidget): boolean {
    return IssueNeutralTargetOrder(this.handle as HPlayer, neutralStructure.toHandle(), unitToBuild, target);
  }

  public issueNeutralTargetOrderById(neutralStructure: Unit, unitId: number, target: HWidget): boolean {
    return IssueNeutralTargetOrderById(this.handle as HPlayer, neutralStructure.toHandle(), unitId, target);
  }

  public pauseCompAI(pause: boolean): void {
    return PauseCompAI(this.handle as HPlayer, pause);
  }

  public playerGetLeaderboard(): HLeaderBoard {
    return PlayerGetLeaderboard(this.handle as HPlayer);
  }

  public playerSetLeaderboard(lb: HLeaderBoard): void {
    return PlayerSetLeaderboard(this.handle as HPlayer, lb);
  }

  public removeAllGuardPositions(): void {
    return RemoveAllGuardPositions(this.handle as HPlayer);
  }

  public removePlayer(gameResult: HPlayerGameResult): void {
    return RemovePlayer(this.handle as HPlayer, gameResult);
  }

  public setBlight(x: number, y: number, radius: number, addBlight: boolean): void {
    return SetBlight(this.handle as HPlayer, x, y, radius, addBlight);
  }

  public setBlightPoint(x: number, y: number, addBlight: boolean): void {
    return SetBlightPoint(this.handle as HPlayer, x, y, addBlight);
  }

  public setBlightRect(r: HRect, addBlight: boolean): void {
    return SetBlightRect(this.handle as HPlayer, r, addBlight);
  }

  public setFogStateRadius(whichState: HFogState, centerx: number, centerY: number, radius: number, useSharedVision: boolean): void {
    return SetFogStateRadius(this.handle as HPlayer, whichState, centerx, centerY, radius, useSharedVision);
  }

  public setFogStateRect(whichState: HFogState, where: HRect, useSharedVision: boolean): void {
    return SetFogStateRect(this.handle as HPlayer, whichState, where, useSharedVision);
  }

  public setAbilityAvailable(abilid: number, avail: boolean): void {
    return SetPlayerAbilityAvailable(this.handle as HPlayer, abilid, avail);
  }

  public setAlliance(otherPlayer: GamePlayer, whichAllianceSetting: HAllianceType, value: boolean): void {
    return SetPlayerAlliance(this.handle as HPlayer, otherPlayer.toHandle(), whichAllianceSetting, value);
  }

  public setOnScoreScreen(flag: boolean): void {
    return SetPlayerOnScoreScreen(this.handle as HPlayer, flag);
  }

  public setRacePreference(whichRacePreference: HRacePreference): void {
    return SetPlayerRacePreference(this.handle as HPlayer, whichRacePreference);
  }

  public setRaceSelectable(value: boolean): void {
    return SetPlayerRaceSelectable(this.handle as HPlayer, value);
  }

  public setState(whichPlayerState: HPlayerState, value: number): void {
    return SetPlayerState(this.handle as HPlayer, whichPlayerState, value);
  }

  public setTaxRate(otherPlayer: GamePlayer, whichResource: HPlayerState, rate: number): void {
    return SetPlayerTaxRate(this.handle as HPlayer, otherPlayer?.toHandle(), whichResource, rate);
  }

  public setTechMaxAllowed(techid: number, maximum: number): void {
    return SetPlayerTechMaxAllowed(this.handle as HPlayer, techid, maximum);
  }

  public setTechResearched(techid: number, setToLevel: number): void {
    return SetPlayerTechResearched(this.handle as HPlayer, techid, setToLevel);
  }

  public setUnitsOwner(newOwner: number): void {
    return SetPlayerUnitsOwner(this.handle as HPlayer, newOwner);
  }

  public startCampaignAI(script: string): void {
    return StartCampaignAI(this.handle as HPlayer, script);
  }

  public startMeleeAI(script: string): void {
    return StartMeleeAI(this.handle as HPlayer, script);
  }

  get color() {
    return GetPlayerColor(this.handle as HPlayer);
  }

  set color(value: HPlayerColor) {
    SetPlayerColor(this.handle as HPlayer, value);
  }

  get controller() {
    return GetPlayerController(this.handle as HPlayer);
  }

  set controller(value: HMapControl) {
    SetPlayerController(this.handle as HPlayer, value);
  }

  get handicap() {
    return GetPlayerHandicap(this.handle as HPlayer);
  }

  set handicap(value: number) {
    SetPlayerHandicap(this.handle as HPlayer, value);
  }

  get handicapXP() {
    return GetPlayerHandicapXP(this.handle as HPlayer);
  }

  set handicapXP(value: number) {
    SetPlayerHandicapXP(this.handle as HPlayer, value);
  }

  get name() {
    return GetPlayerName(this.handle as HPlayer);
  }

  set name(value: string) {
    SetPlayerName(this.handle as HPlayer, value);
  }

  get startLocation() {
    return GetPlayerStartLocation(this.handle as HPlayer);
  }

  set startLocation(value: number) {
    SetPlayerStartLocation(this.handle as HPlayer, value);
  }

  get team() {
    return GetPlayerTeam(this.handle as HPlayer);
  }

  set team(value: number) {
    SetPlayerTeam(this.handle as HPlayer, value);
  }
}
