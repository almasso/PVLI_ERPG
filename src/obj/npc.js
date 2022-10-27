export default class NPC extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, imageID, npcID, dialogues) {
        super(scene, x, y, imageID);
        this.npcID = npcID;
        this.dialogues = dialogues;
        this.dialogIndex = 0;
        this.dialogCount = 0;
        this.currentDialog = 0;
        this.scene.add.existing(this);
        this.setScale(0.15,0.15);
        scene.physics.add.existing(this, true);
        this.countDialogues();
    }

    countDialogues() {
        var i = 0;
        var encontrado = false;
        while(i < this.dialogues.texts.length && !encontrado) {
            if(this.npcID === this.dialogues.texts[i].npcID) {
                this.dialogCount++;
            }
            else if(this.npcID > this.dialogues.texts[i].npcID) {
                this.dialogIndex++;
            }
            else {
                encontrado = true;
            }
            i++;
        }
        this.currentDialog = this.dialogIndex;
    }

    readDialogues(uiScene) {
        if(!uiScene.hasCreatedWindow) uiScene.createWindow();
        else if(!uiScene.isToggled) uiScene.toggleWindow();

        if(this.currentDialog < this.dialogIndex + this.dialogCount) {
            uiScene.setText(this.dialogues.texts[this.currentDialog].text);
            this.currentDialog++;
        }
        else {
            uiScene.toggleWindow();
            this.currentDialog = this.dialogIndex;
        }
    }
} 