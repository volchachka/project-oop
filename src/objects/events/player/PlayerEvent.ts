import { ObjectStorage } from "../../../services/ObjectStorage";
import { GamePlayer } from "../../GamePlayer";
import { Event } from "../Event";

export interface PlayerEventDetail{
    triggerPlayer:GamePlayer;
}

// Fucking Yaz'