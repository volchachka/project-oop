import { ObjectStorage } from "../../../services/ObjectStorage";
import { GamePlayer } from "../../GamePlayer";
import { Event } from "../Event";

export interface PlayerKeyPressEventDetail{
    triggerPlayer:GamePlayer;
    eventPlayerKey: HEventId; // HPlayerEvent?
}

const objectStorage = ObjectStorage.getInstance();

const snapshotPlayerKeyPressEvent = (): PlayerKeyPressEventDetail => {
    return {
        triggerPlayer: objectStorage.getOrWrap(GetTriggerPlayer()),
        eventPlayerKey: GetTriggerEventId(), // maybe do you make the toPlayerEvent(GetTriggerEventId())?
    };
};

export class PlayerEvent extends Event {
    constructor( type:string, detail: PlayerKeyPressEventDetail | null ){
        super( type, detail || snapshotPlayerKeyPressEvent());
    }
};