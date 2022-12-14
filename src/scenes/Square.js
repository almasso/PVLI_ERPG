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

		this.iFunctions = [function(){
			let guitarQuest = allyParty.questLog.GetQuest('guitarQuest');
			if(guitarQuest !== undefined && !guitarQuest.quest.actualObjectiveCompleted){
				allyParty.questLog.advanceQuest('guitarQuest'); 
				self.scene.get('hud').events.emit("updateQuestHUD");
				self.interactuableObjects[0].trigger.destroy();
				self.interactuableObjects[0].destroy();
			}
		}, function(){}];
		
		super.generateIObjects(this.iFunctions);
	}
	
	// comprobación de colisiones y apertura de menús
	update(){
		super.update();
	}
}