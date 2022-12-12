import NPC from "../../../src/obj/npc";

export default class healerNPC extends NPC{
    constructor(scene, x, y, imageID, npcID, dialogues, manin, party){
        super(scene, x, y, imageID, npcID, dialogues, manin);
    }
}