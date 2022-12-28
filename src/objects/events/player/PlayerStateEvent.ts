import { ObjectStorage } from "../../../services/ObjectStorage";
import { GamePlayer } from "../../GamePlayer";
import { Event } from "../Event";

export interface PlayerStateEventDetail{
    triggerPlayer:GamePlayer;
    playerState: HPlayerState;
    value: number;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotPlayerStateEvent = (): PlayerStateEventDetail => {
    return {
        triggerPlayer: objectStorage.getOrWrap(GetTriggerPlayer()),
        playerState: GetEventPlayerState(),
        value: GetPlayerState( GetTriggerPlayer() , GetEventPlayerState() )
    };
};

export class PlayerEvent extends Event {
    constructor( type:string, detail: PlayerStateEventDetail | null ){
        super( type, detail || snapshotPlayerStateEvent());
    }
};