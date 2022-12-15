import FatherScene from './FatherScene.js';
// Escena de exploración (temporal de momento)
export default class PortScene extends FatherScene {
	// construimos la escena
	constructor() {
		super('port');
	}

	// inicializamos la escena
	create() {
		const config = {
			mute: false,
			volume: 0.5,
			rate: 1,
			detune: 0,
			seek: 0,
			loop: true,
			delay: 0,
		};
		this.musica = this.sound.add('devs', config);
		this.musica.play();


		super.create();
		for(let i=0;i<this.npcs.length;i++)this.npcs[i].setScale(5,5)
		this.manin.x=400
		this.manin.y=500
		this.manin.setScale(5,5)
		for(let i=0;i<this.sceneChangerCoords.length;i++)this.sceneChangerCoords[i].setVisible(false)

	}

	// comprobación de colisiones y apertura de menús
	update(){
		super.update();
	}
}