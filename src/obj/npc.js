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
        this.verified = this.dialogues.attributes[this.npcID].verified;
        this.developer = this.dialogues.attributes[this.npcID].developer;
        
        this.scene.add.existing(this);
        this.setScale(1.3,1.3);
        scene.physics.add.existing(this, true);
        this.countDialogues();
        this.manin = manin;
        this.collider;
        this.trigger = this.scene.add.zone(x, y, this.body.width + 7, this.body.height + 7);
        this.generateTrigger();
        this.scene.physics.world.enable(this.trigger);
        this.trigger.body.onOverlap = true;
        this.trigger.setScale(2,2);
        this.create();

        this.rickroll = false;
        
    }

    generateTrigger() {
        this.collider= this.scene.physics.add.collider(this.manin, this);
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
        if(!this.uiScene.hasCreatedWindow) this.uiScene.createWindow(this.verified, this.developer);
        else if(!this.uiScene.isToggled) this.uiScene.toggleWindow(this.verified, this.developer);

        if(this.currentDialog === this.dialogIndex && !this.dialogues.texts[this.currentDialog].unique) this.beingAnimated=false;

        if(this.currentDialog !== this.dialogues.texts.length && !this.dialogues.texts[this.currentDialog].unique ||(this.currentDialog !== 0 && !this.dialogues.texts[this.currentDialog - 1].unique)) this.multipleDialogues();
        else this.uniqueDialogue();
        
        //if(this.currentDialog === this.dialogues.texts.length) this.closeWindow();
    }

    multipleDialogues() {
        if(this.formerDialog !== this.currentDialog) this.formerDialog = this.currentDialog - 1;
        
        if(this.npcID === 25 && !this.rickroll) {	
            this.rickroll = true;	
            const rickrollconfig = {
                mute: false,
                volume: 0.2,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: false,
                delay: 0,
            };
            this.rickroll = this.scene.sound.add('rickroll', rickrollconfig);
            this.scene.musica.pause();
            this.rickroll.play();
        }

        console.log(this.dialogIndex + this.dialogCount);
        console.log('wewew');
        console.log(this.formerDialog);
        console.log('--------');
        if(this.currentDialog < this.dialogIndex + this.dialogCount || (this.formerDialog === (this.dialogIndex + this.dialogCount - 1))) {
            if(!this.beingAnimated && this.currentDialog < this.dialogIndex + this.dialogCount) {
                this.uiScene.setText(this.dialogues.attributes[this.npcID].npcName, this.dialogues.texts[this.currentDialog].text, true, this.verified, this.developer);
                this.beingAnimated = true;
                this.currentDialog++;
            }    
            else if(this.beingAnimated) {
                this.uiScene.setText(this.dialogues.attributes[this.npcID].npcName ,this.dialogues.texts[this.formerDialog].text, false, this.verified, this.developer);

                this.formerDialog++;
                this.beingAnimated = false;
                this.uiScene.events.emit('isNotBeingAnimated');
            }    
        }
        else {
            this.rickroll.stop();
            this.closeWindow();
            this.scene.musica.resume();
        }
    }
    
    uniqueDialogue() {
        if((!this.canCloseWindow && (this.currentDialog < this.dialogIndex + this.dialogCount || (this.formerDialog == (this.dialogIndex + this.dialogCount)-1)))) {
            if(!this.beingAnimated && this.currentDialog < this.dialogIndex + this.dialogCount) {
                this.uiScene.setText(this.dialogues.attributes[this.npcID].npcName, this.dialogues.texts[this.currentDialog].text, true, this.verified, this.developer);
                this.beingAnimated = true;
            }    
            else if(this.beingAnimated) {
                this.uiScene.setText(this.dialogues.attributes[this.npcID].npcName ,this.dialogues.texts[this.formerDialog].text, false, this.verified, this.developer);
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

    shopDialog(itemName, hasBought) {
        if(hasBought) this.uiScene.setText(this.dialogues.attributes[this.npcID].npcName , "Has comprado " + itemName.name + ". Gracias, vuelva pronto.", true, this.verified, this.developer);
        else this.uiScene.setText(this.dialogues.attributes[this.npcID].npcName , "Siniora Homer, el " + itemName.name + " que usted está intentando adquirir está fuera de su rango monetario. Por favor seleccione otro producto o váyase.", true, this.verified, this.developer);
    }

    questDialog(dialogues) {
        if(this.currentDialog < this.dialogIndex + this.dialogCount || (this.formerDialog === (this.dialogIndex + this.dialogCount - 1))) {
            if(!this.beingAnimated && this.currentDialog < this.dialogIndex + this.dialogCount) {
                this.uiScene.setText(this.dialogues.attributes[this.npcID].npcName, this.dialogues.texts[this.currentDialog].text, true, this.verified, this.developer);
                this.beingAnimated = true;
                this.currentDialog++;
            }    
            else if(this.beingAnimated) {
                this.uiScene.setText(this.dialogues.attributes[this.npcID].npcName ,this.dialogues.texts[this.formerDialog].text, false, this.verified, this.developer);

                this.formerDialog++;
                this.beingAnimated = false;
                this.uiScene.events.emit('isNotBeingAnimated');
            }
           
        }
        else {
            this.closeWindow();
            this.scene.musica.resume();
        }
    }
    

    closeWindow() {
        this.uiScene.toggleWindow(this.verified, this.developer);
        if(this.currentDialog >= this.dialogIndex + this.dialogCount) {
            this.currentDialog = this.dialogIndex;
            this.formerDialog = this.dialogIndex;
        }
        this.beingAnimated = false;
        this.canCloseWindow = false;
        this.currentlyTalking = false;
        this.rickroll = false;
        this.scene.events.emit('dialogWindowClosed');
            if(this.currentDialog==69)
            {
                console.log("SI")
                this.scene.Kratos();           
            }    
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