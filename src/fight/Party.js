import Character from './Character.js'
import {attackInfo} from "../fight/Attack.js"
import {EnviromentInfo} from "../fight/EnviromentInfo.js"

// Esta clase gestionará todo lo que tenga que ver con aliados
export class Party{
	constructor()
	{
		// ahora mismo se construye con manín y melendi de base (TEMPORAL)
		this.party = [characterInfo("Manín","manin",100,100,100,100,5,5,5,5,5,90,50,
					 [attackInfo("Churrazo",0,30,0,1),attackInfo("Podación",0,40,15,1),
					  attackInfo("Pistola Agua",1,45,25,2),attackInfo("Asserting Dominance",1,60,60,1)]),
					  characterInfo(EnviromentInfo.character.name,EnviromentInfo.character.imgID,EnviromentInfo.character.actualHp,EnviromentInfo.character.maxHp,EnviromentInfo.character.actualMp,EnviromentInfo.character.maxMp
						,EnviromentInfo.character.rP,EnviromentInfo.character.rR,EnviromentInfo.character.rF,EnviromentInfo.character.rE,EnviromentInfo.character.rT,EnviromentInfo.character.acurracy,EnviromentInfo.character.speed,
						[attackInfo("A Rango 1 Target", 1, 25, 0, 1), attackInfo("A Rango 2 Target", 1, 20, 30, 1), 
						attackInfo("Support 1 Target", 5, -20, 25, 1), attackInfo("Camina por la Vida",5,-70,60,1)])];
		this.level = 1; // comienza en nivel 1
	}

	// añadimos a un personaje (NO IMPLEMENTADO)
	Add(character){
		this.party.push(character);
	}

	// Llevamos la party al estado original (TEMPORAL)
	RestartParty()
	{
		this.party = [characterInfo("Manín","manin",100,100,100,100,5,5,5,5,5,90,50,
					 [attackInfo("Churrazo",0,30,0,1),attackInfo("Podación",0,40,15,1),
					  attackInfo("Pistola Agua",1,45,25,2),attackInfo("Asserting Dominance",1,60,60,1)]),
					  characterInfo(EnviromentInfo.character.name,EnviromentInfo.character.imgID,EnviromentInfo.character.actualHp,EnviromentInfo.character.maxHp,EnviromentInfo.character.actualMp,EnviromentInfo.character.maxMp
						,EnviromentInfo.character.rP,EnviromentInfo.character.rR,EnviromentInfo.character.rF,EnviromentInfo.character.rE,EnviromentInfo.character.rT,EnviromentInfo.character.acurracy,EnviromentInfo.character.speed,
						[attackInfo("A Rango 1 Target", 1, 25, 0, 1), attackInfo("A Rango 2 Target", 1, 20, 30, 1), 
						attackInfo("Support 1 Target", 5, -20, 25, 1), attackInfo("Camina por la Vida",5,-70,60,1)])];
		this.level = 1;
	}
};

// función que devuvelve un objeto con información de un personaje
function characterInfo(name, imgID, actualHp, maxHp, actualMp, maxMp, rP, rR, rF, rE, rT, acurracy, speed, attack){
	return {name:name,imgID:imgID, actualHp: actualHp, maxHp: maxHp, actualMp: actualMp, maxMp: maxMp, rP:rP,rR:rR,rF:rF,rE:rE,rT:rT,acurracy:acurracy,speed:speed, attack:attack}
}

// exportamos una variable de tipo party que será la instancia que queremos
export let allyParty = new Party();