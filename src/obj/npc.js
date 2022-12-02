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
        if(!this.uiScene.hasCreatedWindow) this.uiScene.createWindow();
        else if(!this.uiScene.isToggled) this.uiScene.toggleWindow();
        
        
        console.log(this.currentDialog);
        console.log(this.formerDialog);
        // console.log((this.dialogIndex + this.dialogCount) - 1);
        // console.log(this.beingAnimated);
        // console.log(this.dialogIndex);
        // console.log(this.dialogCount);

        if(this.currentDialog==this.dialogIndex && !this.dialogues.texts[this.currentDialog].unique) this.beingAnimated=false;

        if(!this.dialogues.texts[this.currentDialog].unique) {
            if(this.currentDialog < this.dialogIndex + this.dialogCount || (this.formerDialog == (this.dialogIndex + this.dialogCount)-1 )) {
                if(!this.beingAnimated && this.currentDialog < this.dialogIndex + this.dialogCount) {
                    this.uiScene.setText(this.dialogues.texts[this.currentDialog].npcName, this.dialogues.texts[this.currentDialog].text, true);
                    this.beingAnimated = true;
                    this.currentDialog++;
                }    
                else if(this.beingAnimated) {
                    this.uiScene.setText(this.dialogues.texts[this.formerDialog].npcName ,this.dialogues.texts[this.formerDialog].text, false);
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
                    this.uiScene.setText(this.dialogues.texts[this.currentDialog].npcName, this.dialogues.texts[this.currentDialog].text, true);
                    this.beingAnimated = true;
                }    
                else if(this.beingAnimated) {
                    this.uiScene.setText(this.dialogues.texts[this.formerDialog].npcName ,this.dialogues.texts[this.formerDialog].text, false);
                    this.beingAnimated = false;
                    this.canCloseWindow = true;
                    this.uiScene.events.emit('isNotBeingAnimated');
                }
            }
            else {
                this.canCloseWindow = false;
                this.currentDialog++;
                this.formerDialog++;
                this.beingAnimated=false;
                this.closeWindow();
            }
        }
    }

    closeWindow() {
        this.uiScene.toggleWindow();
        if(this.currentDialog >= this.dialogIndex + this.dialogCount) {
            this.currentDialog = this.dialogIndex;
            this.formerDialog = this.dialogIndex;
        }
        this.beingAnimated = false;
        return;
    }

    create() {
        this.uiScene.events.on("isBeingAnimated", () => {
            this.beingAnimated = true;
		})
		this.uiScene.events.on("isNotBeingAnimated", () => {
            console.log("ya he terminado de animar");
			this.beingAnimated = false;
            this.canCloseWindow = true;
		})
    }
} 