export default class NPC extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, imageID, npcID) {
        super(scene, x, y, imageID);
        this.npcID = npcID;
        this.scene.add.existing(this);
        this.setScale(0.15,0.15);
        scene.physics.add.existing(this, true);
    }

    Interact() {

    }
}