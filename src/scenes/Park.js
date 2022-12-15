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

		this.iFunctions.push(function(){
			console.log("aa");
			let fishingRod = allyParty.questLog.GetQuest('fishingRod');
			if(fishingRod !== undefined && fishingRod.quest.stage === 1 && !fishingRod.quest.actualObjectiveCompleted){
				allyParty.questLog.advanceQuest('fishingRod'); 
				self.scene.get('hud').events.emit("updateQuestHUD");
				self.interactuableObjects[1].trigger.destroy();
				self.interactuableObjects[1].destroy();
				self.scene.sleep('park');
				self.scene.sleep('hud');
				self.scene.launch('fishing');
				let self2 = this;
				self.scene.bossFight  = new interactuableObj(self, 100, 550, 'manin', 0.7, 0.7, function(){
					this.scene.scene.sleep('hud');
					self2.self.scene.launch('fightscene', {loadFromEnviroment: true, index: 0})
					this.scene.scene.get('fightscene').LoadInventory(allyParty.inventory);
					let self3 = this;
					self2.self.scene.bossItem = new interactuableObj(self2.self, 100, 550, 'melendi', 0.7, 0.7, function(){
						let fishingRod = allyParty.questLog.GetQuest('fishingRod');
						if(fishingRod !== undefined && fishingRod.quest.stage === 2 && !fishingRod.quest.actualObjectiveCompleted){
							allyParty.questLog.advanceQuest('fishingRod'); 
							self3.self2.self.scene.get('hud').events.emit("updateQuestHUD");
							self3.self2.self.bossFight.trigger.destroy();
							self3.self2.self.bossItem.destroy();
						}
					})
					self2.self.scene.sleep('park');
				}, this.manin); 
			}
		});

		this.iFunctions.push()

		
		super.generateIObjects(this.iFunctions);
	}

	// comprobación de colisiones y apertura de menús
	update(){
		super.update();
	}
}