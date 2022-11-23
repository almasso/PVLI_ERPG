export default class NPC extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, imageID, npcID, dialogues, manin) {
        super(scene, x, y, imageID);
        this.npcID = npcID;
        this.uiScene = manin.uiScene;
        
        this.dialogues = dialogues;
        this.dialogIndex = 0;
        this.dialogCount = 0;
        this.currentDialog = 0;
        this.hasShownText = true;
        this.hasNotInteracted = false;
        this.beingAnimated = false;
        
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
        this.currentDialog = this.dialogIndex;
    }

    readDialogues() {
        if(!this.uiScene.hasCreatedWindow) this.uiScene.createWindow();
        else if(!this.uiScene.isToggled) this.uiScene.toggleWindow();

        if(this.currentDialog < this.dialogIndex + this.dialogCount) {
            if(!this.beingAnimated) {
                this.uiScene.setText(this.dialogues.texts[this.currentDialog].npcName ,this.dialogues.texts[this.currentDialog].text, true);
                this.hasShownText = false;
                //this.beingAnimated = true;
            }    
            else if(this.beingAnimated) {
                this.uiScene.setText(this.dialogues.texts[this.currentDialog].npcName ,this.dialogues.texts[this.currentDialog].text, false);
                this.hasShownText = true;
                //this.hasNotInteracted = false;
                //this.beingAnimated = false;
            }
        }
        else {
            this.uiScene.toggleWindow();
            this.currentDialog = this.dialogIndex;
            return;
        }
        //this.dialogBeingShown = !this.dialogBeingShown;
        if(!this.beingAnimated) this.currentDialog++;
    }

    preUpdate() {
        var touching = !this.body.touching.none;
        var touchingTrigger = !this.trigger.body.touching.none;
		var wasTouching = !this.body.wasTouching.none;
        var wasTouchingTrigger = !this.trigger.body.wasTouching.none;

        if(touching && !wasTouching && !wasTouchingTrigger) {this.emit("overlapstart");}
        else if(!touching && touchingTrigger && wasTouching && wasTouchingTrigger) {this.emit("overlapend");}

        this.uiScene.events.on("isBeingAnimated", () => {
			console.log("está siendo animado");
            this.beingAnimated = true;
		})
		this.uiScene.events.on("isNotBeingAnimated", () => {
            console.log("ya no está siendo animado");
			this.beingAnimated = false;
		})
    }
} 