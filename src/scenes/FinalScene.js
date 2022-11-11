import {allyParty, Party} from '../fight/Party.js'


export default class FinalScene extends Phaser.Scene {
	
	constructor() {
		super({ key: 'final' });
	}
	
	preload(){
		this.load.image('finalBg', 'assets/textures/HUD/Gameover.png');
		this.load.image('retryButton', 'assets/textures/HUD/Retry.png');
	}
	z
	/**
	* Creación de los elementos de la escena principal de juego
	*/

	create() {
        this.bg = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'finalBg');
        this.bg.scale = 4.71;


        this.startButton = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'retryButton').setOrigin(0, 0);
        this.startButton.scale = 4.7;
        this.startButton.x -= this.startButton.displayWidth / 2;
        this.startButton.y -= this.startButton.displayHeight * 2/ 5 - 2;

        this.startButton.setInteractive();

        this.startButton.on('pointerup',()=>{
			allyParty.RestartParty();
			this.scene.launch('initial');
            this.scene.stop('final');
		})
    }



	
}