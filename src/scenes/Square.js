import {allyParty} from '../fight/Party.js'
import FatherScene from './FatherScene.js';
// Escena de exploración (temporal de momento)
export default class Square extends FatherScene {
	// construimos la escena
	constructor() {
		super('square');
	}
	
	// inicializamos la escena
	create() {
		super.create();
		
		for(let i=0;i<this.eObjs.length;i++)this.eObjs[i].setVisible(false)
		this.npcs[8].collider.destroy()
		this.npcs[8].setScale(5,5)
		this.npcs[8].trigger.setScale(4,4)
		for(let i=0;i<this.sceneChangerCoords.length;i++)this.sceneChangerCoords[i].setVisible(false)

		this.qFunctions = [];

		let self = this;
		this.qFunctions.push(function(){
			self.scene.stop('square');
		})
		
		super.generateQuests(this.qFunctions);
	}
	
	// comprobación de colisiones y apertura de menús
	update(){
		super.update();
	}
}