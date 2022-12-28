import { ObjectStorage } from "../../../services/ObjectStorage";
import { GamePlayer } from "../../GamePlayer";
import { Unit } from "../../Unit";
import { Event } from "../Event";
import { PlayerEvent } from "./PlayerEvent";

export interface PlayerResearchedEventDetail {
    triggerPlayer:GamePlayer;
    researching:number;
    researchingUnit:Unit;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotResearchedPlayerEvent = (): PlayerResearchedEventDetail =>{
    return {
        triggerPlayer: objectStorage.getOrWrap(GetTriggerPlayer()),
        researching: GetResearched(),
        researchingUnit: objectStorage.getOrWrap(GetResearchingUnit()),
    };
};

export class PlayerResearchedEvent extends PlayerEvent {
    constructor( type:string, detail: PlayerResearchedEventDetail | null ){
        super( type, detail || snapshotResearchedPlayerEvent());
    };
}