export default class NPC extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, imageID, npcID, dialogues) {
        super(scene, x, y, imageID);
        this.npcID = npcID;
        this.dialogues = dialogues;
        this.scene.add.existing(this);
        this.setScale(0.15,0.15);
        scene.physics.add.existing(this, true);
    }


    
    readDialogues() {
        for(let i = 0; i < this.dialogues.texts.length; i++) {
            if(this.npcID == this.dialogues.texts[i].npcID) console.log(this.dialogues.texts[i].text);
        }
    }
}