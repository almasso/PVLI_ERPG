export default class enviromentObj extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor de Box, nuestras cajas destructibles
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 */
	constructor(scene, x, y, imageID) {
		super(scene, x, y, imageID);
		this.setScale(0.2,0.2);
		this.scene.add.existing(this); //Añadimos la caja a la escena

		// Agregamos la caja a las físicas para que Phaser lo tenga en cuenta
		scene.physics.add.existing(this, true);
	}

    preUpdate(t, dt) {
		super.preUpdate(t, dt);
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
	}
}