import FatherScene from './FatherScene.js';
// Escena de exploración (temporal de momento)
export default class PortScene extends FatherScene {
	// construimos la escena
	constructor() {
		super('port');
	}

	// inicializamos la escena
	create() {
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