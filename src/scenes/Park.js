import FatherScene from './FatherScene.js';
import {allyParty} from '../fight/Party.js'
import { interactuableObj } from '../obj/enviromentObj.js';
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
		this.iFunctions = [];

		
		// Recoger la caña de pescar
		this.iFunctions.push(function(){
			console.log("aa");
			let fishingRod = allyParty.questLog.GetQuest('fishingRod');
			if(fishingRod !== undefined && fishingRod.quest.stage === 0 && !fishingRod.quest.actualObjectiveCompleted){
				allyParty.questLog.advanceQuest('fishingRod'); 
				self.scene.get('hud').events.emit("updateQuestHUD");
				self.interactuableObjects[0].trigger.destroy();
				self.interactuableObjects[0].destroy();
			}
		});
		
		// Observar el lago 
		this.iFunctions.push(function(){
			let fishingRod = allyParty.questLog.GetQuest('fishingRod');
			if(fishingRod !== undefined && fishingRod.quest.stage === 1 && !fishingRod.quest.actualObjectiveCompleted){
				allyParty.questLog.advanceQuest('fishingRod'); 
				self.scene.get('hud').events.emit("updateQuestHUD");
				self.interactuableObjects[2].Hide(false);
				self.scene.sleep('park');
				self.scene.sleep('hud');
				self.scene.launch('fishing');
				self.interactuableObjects[1].trigger.destroy();
				self.interactuableObjects[1].destroy();
			} 
		});

		// Pelea con la estatua
		this.iFunctions.push(function(){
			let fishingRod = allyParty.questLog.GetQuest('fishingRod');
			if(fishingRod !== undefined && fishingRod.quest.stage === 2 && !fishingRod.quest.actualObjectiveCompleted){
				allyParty.questLog.advanceQuest('fishingRod'); 
				self.scene.sleep('hud');
				self.interactuableObjects[3].Hide(false);
				self.scene.sleep('park');
				self.scene.launch('fightscene', {loadFromEnviroment: true, index: 0})
				self.scene.get('fightscene').LoadInventory(allyParty.inventory);
				self.interactuableObjects[2].trigger.destroy();
				self.interactuableObjects[2].destroy();
			}
		})
		
		// Coger item
		this.iFunctions.push(function(){
			let statueQuest = allyParty.questLog.GetQuest('statueQuest');
			if(statueQuest !== undefined && statueQuest.quest.stage === 0 && !statueQuest.quest.actualObjectiveCompleted){
				allyParty.questLog.advanceQuest('statueQuest'); 
				self.scene.get('hud').events.emit("updateQuestHUD");
				self.interactuableObjects[3].trigger.destroy();
				self.interactuableObjects[3].destroy();
			}
		})
		
		super.generateIObjects(this.iFunctions);

		this.interactuableObjects[2].Hide(true);
		this.interactuableObjects[3].Hide(true);
	}

	// comprobación de colisiones y apertura de menús
	update(){
		super.update();
	}
}