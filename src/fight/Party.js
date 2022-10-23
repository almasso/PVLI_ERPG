import Character from './Character.js'
import {attackInfo} from "../fight/Attack.js"
import {EnviromentInfo} from "../fight/EnviromentInfo.js"

//Importa y crea nuevos tipos de enemigo
class Party{
	constructor()
	{
		this.party = [characterInfo("Manín","manin",100,100,100,100,5,5,5,5,5,90,50,
					 [attackInfo("Churrazo",0,30,0,1),attackInfo("Podación",0,40,15,1),
					  attackInfo("Pistola Agua",1,45,25,2),attackInfo("Asserting Dominance",1,60,60,1)]),
					EnviromentInfo.character];
		this.level = 1;
	}

	Add(character){
		this.party.push(character);
	}
};
// imageId, initialHP, initialMP
// attackInfo x4
// name: "Artista", imgID:"melendi", hp: 70, mp: 0, rP: 5, rR: 5, rF: 5, rE: 5, rT: 5, acurracy: 90, speed: 40

function characterInfo(name, imgID, actualHp, maxHp, actualMp, maxMp, rP, rR, rF, rE, rT, acurracy, speed, attack){
	return {name:name,imgID:imgID, actualHp: actualHp, maxHp: maxHp, actualMp: actualMp, maxMp: maxMp, rP:rP,rR:rR,rF:rF,rE:rE,rT:rT,acurracy:acurracy,speed:speed, attack:attack}
}

export let allyParty = new Party();
// exportar instancia de Party! YAY FIESTA :)