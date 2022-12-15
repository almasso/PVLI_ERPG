import FatherScene from './FatherScene.js';
// Escena de exploración (temporal de momento)
export default class ParkScene extends FatherScene {
	// construimos la escena
	constructor() {
		super('park');
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
		this.musica = this.sound.add('park', config);
		this.musica.play();
		super.create();
		this.eObjs[5].setVisible(false);
		this.eObjs[6].setVisible(false);
		for(let i=0;i<this.sceneChangerCoords.length;i++)this.sceneChangerCoords[i].setVisible(false)

	}

	// comprobación de colisiones y apertura de menús
	update(){
		super.update();
	}
}