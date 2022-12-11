export default class InitialScene extends Phaser.Scene {
	
	constructor() {
		super({ key: 'initial' });
	}
	
	// incializamos la escena	
	create() {

		// fondo
        this.bg = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'initialBg');
        this.bg.scale = 4.71;

		// botón de inicio
        this.startButton = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'startButton').setOrigin(0, 0);
        this.startButton.scale = 4.7;
        this.startButton.x -= this.startButton.displayWidth / 2;
        this.startButton.y -= this.startButton.displayHeight * 2/ 5 - 2;

        this.startButton.setInteractive();

        this.startButton.on('pointerup',()=>{
			this.scene.launch('movement');
            this.scene.stop('initial');
		})
    }
}