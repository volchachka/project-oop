import { ObjectStorage } from "../../../services/ObjectStorage";
import { GamePlayer } from "../../GamePlayer";
import { Event } from "../Event";

export interface PlayerKeyPressEventDetail{
    triggerPlayer:GamePlayer;
    eventPlayerKey: HEventId; // HPlayerEvent?
}

export interface PlayerKeyEventDetail {
    triggerPlayer:GamePlayer;
    eventOSKey: HOsKeyType;
    eventMetaKey: number;
    eventKeyIsDown: boolean;
}

const objectStorage = ObjectStorage.getInstance();

const snapshotPlayerKeyPressEvent = (): PlayerKeyPressEventDetail => {
    return {
        triggerPlayer: objectStorage.getOrWrap(GetTriggerPlayer()),
        eventPlayerKey: GetTriggerEventId(), // maybe do you make the toPlayerEvent(GetTriggerEventId())?
        
    };
};
const snapshotPlayerKeyEvent = (): PlayerKeyEventDetail => {
    return {
    triggerPlayer: objectStorage.getOrWrap(GetTriggerPlayer()),
    eventOSKey: GetTriggerPlayerKey(),
    eventMetaKey: GetTriggerPlayerMetaKey(),
    eventKeyIsDown:GetTriggerPlayerIsKeyDown(),
};
};

export class PlayerPressEvent extends Event {
    constructor( type:string, detail: PlayerKeyPressEventDetail | null ){
        super( type, detail || snapshotPlayerKeyPressEvent());
    }
};

export class PlayerKeyEvent extends Event {
    constructor (type:string, detail: PlayerKeyEventDetail | null ){
        super( type, detail || snapshotPlayerKeyEvent());
    }

};