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
		const config = {
			mute: false,
			volume: 0.5,
			rate: 1,
			detune: 0,
			seek: 0,
			loop: true,
			delay: 0,
		};
		this.musica = this.sound.add('square', config);
		this.musica.play();
		
		for(let i=0;i<this.eObjs.length;i++)this.eObjs[i].setVisible(false)
		this.npcs[8].collider.destroy()
		this.npcs[8].setScale(5,5)
		this.npcs[8].trigger.setScale(4,4)
		for(let i=0;i<this.sceneChangerCoords.length;i++)this.sceneChangerCoords[i].setVisible(false)

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