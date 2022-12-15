export class enviromentObj extends Phaser.GameObjects.Sprite {
	// construimos el objeto de entorno
	constructor(scene, x, y, imageID, sX, sY, manin) {
		super(scene, x, y, imageID);
		this.setScale(sX,sY);
		this.scene.add.existing(this); 
		scene.physics.add.existing(this, true);
		this.collider=this.scene.physics.add.collider(this, manin);
	}

	// le quitamos velocidad al objeto
    preUpdate(t, dt) {
		super.preUpdate(t, dt);
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
	}
}

export class interactuableObj extends enviromentObj{
	constructor(scene, x, y, imageID, sX, sY, execute, manin){
		super(scene, x, y, imageID, sX, sY)
		this.function = execute;

		this.manin = manin;

        this.trigger = this.scene.add.zone(x, y, this.body.width * sX * 3/ 4, this.body.height * sY * 3/ 4);
        this.generateTrigger();
        this.scene.physics.world.enable(this.trigger);
        this.trigger.body.onOverlap = true;
        this.trigger.setScale(7);

		this.interacted = false;
	}

	generateTrigger() {
        this.scene.physics.add.collider(this.manin, this);
		this.scene.physics.add.overlap(this.manin, this.trigger);
    }

	Interact(){
		if(!this.interacted){
			this.function();
		}
	}

	Hide(bool){
		this.interacted = bool;
		this.setVisible(!bool);
	}
	Interacted(){ this.interacted = true; }

	
}