import NPC from '../obj/npc.js';
import Object from './Object.js';
import { shopHUD } from '../fight/HUD.js';

export default class shopNPC extends NPC {
    constructor(scene, x, y, imageID, npcID, dialogues, manin, inv){
        super(scene, x, y, imageID, npcID, dialogues, manin);
        
        this.items = [];
        this.scene = scene;
        this.createItems()
        this.currentItem = -1;
        this.inventory = inv;
        this.shopHUD = new shopHUD(scene, 400, 0, this.items, this);
    }

    createItems(){        
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

    loadInventory(inv){
        this.inventory = inv;
    }

    buy(){
        if(this.inventory.money >= this.currentItem.price){
            this.inventory.money -= this.currentItem.price;
            this.inventory.addItem(this.currentItem);
            this.scene.updateInventory(this.inventory);
            this.currentItem = -1;
        }
    }

    readDialogues(){
        super.readDialogues();

    }

    close(){
        this.scene.events.emit('closeShopping');
        super.closeWindow();
    }
}