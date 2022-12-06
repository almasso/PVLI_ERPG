export default class NPC extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, imageID, npcID, dialogues, manin) {
        super(scene, x, y, imageID);
        this.npcID = npcID;
        this.uiScene = manin.uiScene;
        
        this.dialogues = dialogues;
        this.dialogIndex = 0;
        this.dialogCount = 0;
        this.currentDialog = 0;
        this.formerDialog = 0;
        this.beingAnimated = false;
        this.canCloseWindow = false;
        this.currentlyTalking = false;
        this.verified = this.dialogues.verified[this.npcID].verified;
        
        this.scene.add.existing(this);
        this.setScale(0.15,0.15);
        scene.physics.add.existing(this, true);
        this.countDialogues();
        this.manin = manin;

        this.trigger = this.scene.add.zone(x, y, this.body.width + 7, this.body.height + 7);
        this.generateTrigger();
        this.scene.physics.world.enable(this.trigger);
        this.trigger.body.onOverlap = true;
        this.trigger.setScale(7,7);
        this.create();
    }

    generateTrigger() {
        this.scene.physics.add.collider(this.manin, this);
		this.scene.physics.add.overlap(this.manin, this.trigger);
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
        this.currentDialog = this.formerDialog = this.dialogIndex;
    }

    readDialogues() {
        if(!this.uiScene.hasCreatedWindow && !this.verified) this.uiScene.createWindow(false);
        else if(!this.uiScene.hasCreatedWindow && this.verified) this.uiScene.createWindow(true);
        else if(!this.uiScene.isToggled && !this.verified) this.uiScene.toggleWindow(false);
        else if(!this.uiScene.isToggled && this.verified) this.uiScene.toggleWindow(true);

        if(this.currentDialog==this.dialogIndex && !this.dialogues.texts[this.currentDialog].unique) this.beingAnimated=false;

        if(!this.dialogues.texts[this.currentDialog].unique) {
            if(this.currentDialog < this.dialogIndex + this.dialogCount || (this.formerDialog == (this.dialogIndex + this.dialogCount)-1 )) {
                if(!this.beingAnimated && this.currentDialog < this.dialogIndex + this.dialogCount) {
                    if(!this.verified) this.uiScene.setText(this.dialogues.texts[this.currentDialog].npcName, this.dialogues.texts[this.currentDialog].text, true, false);
                    else this.uiScene.setText(this.dialogues.texts[this.currentDialog].npcName, this.dialogues.texts[this.currentDialog].text, true, true);
                    this.beingAnimated = true;
                    this.currentDialog++;
                }    
                else if(this.beingAnimated) {
                    if(!this.verified) this.uiScene.setText(this.dialogues.texts[this.formerDialog].npcName ,this.dialogues.texts[this.formerDialog].text, false, false);
                    else this.uiScene.setText(this.dialogues.texts[this.formerDialog].npcName ,this.dialogues.texts[this.formerDialog].text, false, true);
                    this.formerDialog++;
                    this.beingAnimated = false;
                    this.uiScene.events.emit('isNotBeingAnimated');
                    if(this.formerDialog != this.currentDialog) this.formerDialog = this.currentDialog - 1;
                }
            }
            else {
                this.closeWindow();
            }
        }
        else {
            if((!this.canCloseWindow && (this.currentDialog < this.dialogIndex + this.dialogCount || (this.formerDialog == (this.dialogIndex + this.dialogCount)-1)))) {
                if(!this.beingAnimated && this.currentDialog < this.dialogIndex + this.dialogCount) {
                    if(!this.verified) this.uiScene.setText(this.dialogues.texts[this.currentDialog].npcName, this.dialogues.texts[this.currentDialog].text, true, false);
                    else this.uiScene.setText(this.dialogues.texts[this.currentDialog].npcName, this.dialogues.texts[this.currentDialog].text, true, true);
                    this.beingAnimated = true;
                }    
                else if(this.beingAnimated) {
                    if(!this.verified) this.uiScene.setText(this.dialogues.texts[this.formerDialog].npcName ,this.dialogues.texts[this.formerDialog].text, false, false);
                    else this.uiScene.setText(this.dialogues.texts[this.formerDialog].npcName ,this.dialogues.texts[this.formerDialog].text, false, true);
                    this.beingAnimated = false;
                    this.canCloseWindow = true;
                    this.uiScene.events.emit('isNotBeingAnimated');
                }
            }
            else {
                this.currentDialog++;
                this.formerDialog++;
                this.closeWindow();
            }
        }
    }

    closeWindow() {
        if(!this.verified) this.uiScene.toggleWindow(false);
        else this.uiScene.toggleWindow(true);
        if(this.currentDialog >= this.dialogIndex + this.dialogCount) {
            this.currentDialog = this.dialogIndex;
            this.formerDialog = this.dialogIndex;
        }
        this.beingAnimated = false;
        this.canCloseWindow = false;
        this.currentlyTalking = false;
        return;
    }

    create() {
        this.uiScene.events.on("isBeingAnimated", () => {
            if(this.currentlyTalking) this.beingAnimated = true;
		})
		this.uiScene.events.on("isNotBeingAnimated", () => {
			if(this.currentlyTalking) {
                this.beingAnimated = false;
                this.canCloseWindow = true;
            }
		})
    }
} 