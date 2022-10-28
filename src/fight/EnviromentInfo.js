export {EnviromentInfo, EnemiesInfo};
import {attackInfo} from "../fight/Attack.js"
class EnviromentManager{

	constructor(){
		// leer de archivo todos los enviroments.
	}
}

let park = {
	info: {character: {name: "Melendi", imgID: "melendi", actualHp: 75, maxHp: 75, actualMp: 115, maxMp: 115,
	rP: 4, rR: 6, rF: 3, rE: 7, rT: 5, acurracy: 90, speed: 45,
	attack: [attackInfo("Hablando en plata", 1, 25, 0, 1), attackInfo("Desde mi ventana", 1, 20, 30, 1), 
	attackInfo("Tu jardín con enanitos", 5, -20, 25, 1), attackInfo("Camina por la Vida",5,-70,60,1)]}},
	
	enemies: [{name: "Artista", imgID:"artista2", actualHp: 70, maxHp: 70, actualMp: 0, maxMp: 0, rP: 3, rR: 4, rF: 5, rE: 5, rT: 5, acurracy: 90, speed: 60,
		attack: [attackInfo("Pincelada",0,20,0,1),attackInfo("Lanza un bote de pintura", 4, 15, 0, 1),attackInfo("Xilografía en el pecho", 2, 30, 0, 1)]},
	{name: "Culturista", imgID:"culturista", actualHp: 80, maxHp: 80, actualMp: 0, maxMp: 0, rP: 7, rR: 4, rF: 4, rE: 3, rT: 6, acurracy: 85, speed: 40,
	attack:[attackInfo("Te flexeo el cráneo", 0, 20, 0, 1), attackInfo("Súper patada volador con un nombre increíblemente largo",0,30,0,1),
	attackInfo("Poñetaso", 0, 25, 0, 1)]}]
}

let EnviromentInfo = park.info;
let EnemiesInfo = park.enemies;