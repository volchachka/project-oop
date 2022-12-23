import { ObjectStorage } from "../../../services/ObjectStorage";
import { GamePlayer } from "../../GamePlayer";
import { Event } from "../Event";

export interface PlayerEventDetail{
    triggerPlayer:GamePlayer;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotPlayerEvent = (): PlayerEventDetail => {
    return {
        triggerPlayer: objectStorage.getOrWrap(GetTriggerPlayer()),
    };
};

export class PlayerEvent extends Event {
    constructor( type:string, detail: PlayerEventDetail | null ){
        super( type, detail || snapshotPlayerEvent());
    }
};