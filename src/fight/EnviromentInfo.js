export {EnviromentInfo, EnemiesInfo};
import {attackInfo} from "../fight/Attack.js"
// esta clase gestionará el cambio entre escenarios y escenas.
class EnviromentManager{

	constructor(){
		// gestor de escenas. tenemos que hacer que se cambie en el momento de cambiar entre escenas.

	}
}

// información de los personajes que se encuentran en el parque
let park = {
	info: {character: {name: "Melendi", imgID: 'melendi', actualHp: 75, maxHp: 75, actualMp: 115, maxMp: 115,
	rP: 4, rR: 6, rF: 3, rE: 7, rT: 5, acurracy: 90, speed: 60,
	attack: [attackInfo("A Rango 1 Target", 1, 25, 0, 1), attackInfo("A Rango 2 Target", 1, 20, 30, 1), 
	attackInfo("Support 1 Target", 5, -20, 25, 1), attackInfo("Camina por la Vida",5,-70,60,1)]},

	character2: {name: "Jarfaiter", imgID: 'jarfaiter', actualHp: 75, maxHp: 75, actualMp: 115, maxMp: 115,
	rP: 4, rR: 6, rF: 3, rE: 7, rT: 5, acurracy: 90, speed: 60, attack: [attackInfo("Navajeros", 0, 20, 0, 1), attackInfo("Quiero que ardas", 2, 35, 30, 1), 
	attackInfo("Ven a 4k", 0, 20, 25, 2), attackInfo("Porro",4,50,60,Math.random() * 4)]}},

	enemies: [{name: "Artista", imgID:'artist', actualHp: 70, maxHp: 70, actualMp: 0, maxMp: 0, rP: 5, rR: 5, rF: 5, rE: 5, rT: 5, acurracy: 90, speed: 40,
		attack: [attackInfo("Pincelada",2,20,0,1),attackInfo("Lanza un bote de pintura", 4, 15, 0, 1),attackInfo("Xilografía en el pecho", 3, 30, 0, 1)]},
	{name: "Culturista", imgID:'artist', actualHp: 80, maxHp: 80, actualMp: 0, maxMp: 0, rP: 8, rR: 6, rF: 4, rE: 3, rT: 6, acurracy: 85, speed: 60,
	attack:[attackInfo("Te flexeo el cráneo", 3, 40, 0, 1), attackInfo("Súper patada volador con un nombre increíblemente largo",0,45,0,1),
	attackInfo("Poñetaso", 0, 30, 0, 1)]}],
	shop: []
}

// variables exportadas
let EnviromentInfo = park.info;
let EnemiesInfo = park.enemies;