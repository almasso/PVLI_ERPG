import FatherScene from './FatherScene.js';
// Escena de exploración (temporal de momento)
export default class ParkScene extends FatherScene {
	// construimos la escena
	constructor() {
		super('park');
	}

	// inicializamos la escena
	create() {
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