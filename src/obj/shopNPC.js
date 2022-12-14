import NPC from '../obj/npc.js';
import Object from './Object.js';
import { shopHUD } from '../fight/HUD.js';

export default class shopNPC extends NPC{
    constructor(scene, x, y, imageID, npcID, dialogues, manin, inv){
        super(scene, x, y, imageID, npcID, dialogues, manin);
        this.scene = scene;
        this.createItems()
        this.currentItem = -1;
        this.inventory = inv;
        this.shopHUD = this.scene.scene.get('hud').addShop(this);
    }

    createItems(){
        this.items = [];
        this.items.push(new Object('Cigarro', -5, 10, 10, 'cigarro'));
        this.items.push(new Object('Kebab', 10, -5, 10,'kebab'));
        this.items.push(new Object('Fría', 20, -5, 20, 'fria'));
        this.items.push(new Object('Porro', -5, 20, 20, 'porro'));
        this.items.push(new Object('Dalsy Naranja', 10, 0, 15, 'dalsyN'));
        this.items.push(new Object('Dalsy Fresa', 0, 10, 15, 'dalsyF'));
        this.items.push(new Object('Ibuprofeno 200mg', 15, 0, 15, 'i200'));
        this.items.push(new Object('Ibuprofeno 600mg', 30, 0, 30, 'i600'));
        this.items.push(new Object('Ibuprofeno 1g', 45, 0, 45, 'i1'));
    }

    buy(item){
        this.inventory.buy(item);
    }

    readDialogues(){
        super.readDialogues();
        this.shopHUD.buyButton.visible = true;
        this.shopHUD.naoButton.visible = true;
    }

    close(){
        this.scene.events.emit('closeShopping');
        super.closeWindow();
    }
}