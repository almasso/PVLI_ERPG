

export default class InitialScene extends Phaser.Scene {
	
	constructor() {
		super({ key: 'initial' });
	}
	

	
	/**
	* Creación de los elementos de la escena principal de juego
	*/

	preload(){
		this.load.image('initialBg', 'assets/textures/HUD/Inicio.png');
		this.load.image('startButton', 'assets/textures/HUD/StartInicio.png');
	}


	create() {
        this.bg = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'initialBg');
        this.bg.scale = 4.71;


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