export default class enviromentObj extends Phaser.GameObjects.Sprite {
	// construimos el objeto de entorno
	constructor(scene, x, y, imageID, sX, sY) {
		super(scene, x, y, imageID);
		this.setScale(sX,sY);
		this.scene.add.existing(this); 
		scene.physics.add.existing(this, true);
	}

	// le quitamos velocidad al objeto
    preUpdate(t, dt) {
		super.preUpdate(t, dt);
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
	}
}