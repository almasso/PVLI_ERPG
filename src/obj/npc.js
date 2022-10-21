import { game } from "../Game.js";

export default class NPC extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, imageID, npcID) {
        super(scene, x, y, imageID);
        this.npcID = npcID;
        this.scene.add.existing(this);
        this.setScale(0.15,0.15);
        this.game = game;
        scene.physics.add.existing(this, true);
    }


    
    readDialogues() {
        var dialogoJSON = this.game.cache.json.get('npc_dialogues');
        console.log(dialogoJSON);
    }
}