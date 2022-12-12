import NPC from "./npc.js";
import { allyParty } from "../fight/Party.js";

export default class healerNPC extends NPC{
    constructor(scene, x, y, imageID, npcID, dialogues, manin){
        super(scene, x, y, imageID, npcID, dialogues, manin);
    }

    heal(){
        allyParty.party.forEach(function(ally){
            ally.actualHp = ally.maxHp;
            ally.actualMp = ally.maxMp;
            ally.dead = false;
            ally.alteredStates = [false, false, false];
        })
    }

    readDialogues(){
        this.heal();
        super.readDialogues();
    }
}