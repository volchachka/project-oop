import { RemoveHandleEvent } from "./events/RemoveHandleEvent";
import { Handle } from "./Handle";
import { Event } from "./events/Event";
import { ObjectStorage } from "../services/ObjectStorage"
import { Unit } from "./Unit";

export const GamePlayerDefaultTimeLifeMessage = 30.0;

const objectStorage = ObjectStorage.getInstance();

export class GamePlayer extends Handle {

    constructor(PlayerOrId:HPlayer | null);
    constructor(PlayerOrId:number);

    public constructor( PlayerOrId: HPlayer | number | null ){
        if (PlayerOrId) {
            if ( type(PlayerOrId) == "number" ) 
                super( Player( PlayerOrId as number ));
            else super( PlayerOrId as HPlayer );
        } else super(GetTriggerPlayer());
    } 

    public toHandle(): HPlayer | null {
        return this.handle as HPlayer;
    }
}