import NPC from '../obj/npc.js';
import Object from './Object.js';
import { shopHUD } from '../fight/HUD.js';

export class shopNPC extends NPC{
    constructor(scene, x, y, imageID, npcID, dialogues){
        super(scene, x, y, imageID, npcID, dialogues);
        this.createItems()
        this.shopHUD = new shopHUD(scene, 400, 0, this.items);
    }

    createItems(){
        this.items = [];
        
        this.items.push(new Object('Cigarro', -5, 10, 10));
        this.items.push(new Object('Kebab', 10, -5, 10));
        this.items.push(new Object('Fría', 20, -5, 20));
        this.items.push(new Object('Porro', -5, 20, 20));
        this.items.push(new Object('Dalsy Naranja', 10, 0, 15));
        this.items.push(new Object('Dalsy Fresa', 0, 10, 15));
        this.items.push(new Object('Ibuprofeno 200mg', 15, 0, 15));
        this.items.push(new Object('Ibuprofeno 600mg', 30, 0, 30));
        this.items.push(new Object('Ibuprofeno 1g', 45, 0, 45));
    }
}