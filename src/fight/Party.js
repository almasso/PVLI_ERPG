import Character from './Character.js'
import {attackInfo} from "../fight/Attack.js"
import {EnviromentInfo} from "../fight/EnviromentInfo.js"

// Esta clase gestionará todo lo que tenga que ver con aliados
export class Party{
	constructor()
	{
		// ahora mismo se construye con manín y melendi de base (TEMPORAL)
		this.party = [characterInfo("Manín","manin",100,100,100,100,5,5,5,5,5,90,50,
					 [attackInfo("Churrazo",2,30,0,1),attackInfo("Podación",4,40,15,1),
					  attackInfo("Pistola Agua",3,45,25,2),attackInfo("Asserting Dominance",1,60,60,1)]),
					  characterInfo(EnviromentInfo.character.name,EnviromentInfo.character.imgID,EnviromentInfo.character.actualHp,EnviromentInfo.character.maxHp,EnviromentInfo.character.actualMp,EnviromentInfo.character.maxMp
						,EnviromentInfo.character.rP,EnviromentInfo.character.rR,EnviromentInfo.character.rF,EnviromentInfo.character.rE,EnviromentInfo.character.rT,EnviromentInfo.character.acurracy,EnviromentInfo.character.speed,
						[attackInfo("PUM a distancia", 1, 25, 0, 1), attackInfo("PUM a distancia 2", 3, 20, 30, 1), 
						attackInfo("te curo uwu", 5, -20, 25, 1), attackInfo("Camina por la Vida",5,-70,60,1)]),
						characterInfo(EnviromentInfo.character.name,'artist',EnviromentInfo.character.actualHp,EnviromentInfo.character.maxHp,EnviromentInfo.character.actualMp,EnviromentInfo.character.maxMp
						  ,EnviromentInfo.character.rP,EnviromentInfo.character.rR,EnviromentInfo.character.rF,EnviromentInfo.character.rE,EnviromentInfo.character.rT,EnviromentInfo.character.acurracy,EnviromentInfo.character.speed,
						  [attackInfo("PUM a distancia", 2, 25, 0, 1), attackInfo("PUM a distancia 2", 4, 20, 30, 1), 
						  attackInfo("te curo uwu", 5, -20, 25, 1), attackInfo("Camina por la Vida",5,-70,60,1)]),
						  characterInfo(EnviromentInfo.character2.name,EnviromentInfo.character2.imgID,EnviromentInfo.character2.actualHp,EnviromentInfo.character2.maxHp,EnviromentInfo.character2.actualMp,EnviromentInfo.character2.maxMp
							,EnviromentInfo.character.rP,EnviromentInfo.character2.rR,EnviromentInfo.character2.rF,EnviromentInfo.character2.rE,EnviromentInfo.character2.rT,EnviromentInfo.character2.acurracy,EnviromentInfo.character2.speed,
							[attackInfo("Navajeros", 0, 20, 0, 1), attackInfo("Quiero que ardas", 2, 35, 30, 1), 
							attackInfo("Ven a 4k", 3, 20, 25, 2), attackInfo("Humito",4,50,60, 4)])];
		this.party[0].index = 0;
		this.party[1].index = 1;
		this.party[2].index = 2;
		this.party[3].index = 3;
		this.level = 1; // comienza en nivel 1
		this.alliesNum = this.party.length;
		if(this.alliesNum > 4) this.alliesNum = 4;
	}

	swapAllies(newOrder){
		let self = this
		this.party.forEach(function(ally, index) {
			if(newOrder[index].index != ally.index){
				let num = 0;
				while(index != newOrder[num].index)
				{
					num++;
				}
				[self.party[index], self.party[num]] = 
				[self.party[num], self.party[index]]; // esto no acaba de cambiar y no comprendo
			}
		});

		this.party.forEach(function(ally, index) {
			ally.index = index;
		});
	}

	// añadimos a un personaje (NO IMPLEMENTADO)
	Add(character){
		this.party.push(character);
		if(this.alliesNum < 4) this.alliesNum++;
		else this.alliesNum = 4;
		this.party[this.party.length-1].index = this.party.length - 1;
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
	return {name:name,imgID:imgID, actualHp: actualHp, maxHp: maxHp, actualMp: actualMp, maxMp: maxMp, rP:rP,rR:rR,rF:rF,rE:rE,rT:rT,acurracy:acurracy,speed:speed, attack:attack, index: 0, alteredStates : [false,false,false]}
}

// exportamos una variable de tipo party que será la instancia que queremos
export let allyParty = new Party();