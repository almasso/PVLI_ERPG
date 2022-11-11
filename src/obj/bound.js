export default class Bound extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, scaleX, scaleY) {
        super(scene, x, y, 'pixel');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
        this.scene.physics.add.collider(this);
        
        // Cambiamos el tamaño del body para ocupar todo el ancho de la escena
        this.body.width = scaleX;
        this.body.height = scaleY;
    }
  }