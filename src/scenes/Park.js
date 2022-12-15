import FatherScene from './FatherScene.js';
import {allyParty} from '../fight/Party.js'
// Escena de exploración (temporal de momento)
export default class ParkScene extends FatherScene {
	// construimos la escena
	constructor() {
		super('park');
	}

	// inicializamos la escena
	create() {
		super.create();
		let self = this;
		this.iFunctions = [function(){
			this.scene.scene.sleep('hud');
			self.scene.sleep('park');
			self.scene.launch('fightscene', {loadFromEnviroment: true, index: 0})
			this.scene.scene.get('fightscene').LoadInventory(allyParty.inventory);
		}, function(){}];
		
		super.generateIObjects(this.iFunctions);
	}

	// comprobación de colisiones y apertura de menús
	update(){
		super.update();
	}
}