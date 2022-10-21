export {EnviromentInfo, EnemiesInfo};

class EnviromentManager{

	constructor(){
		// leer de archivo todos los enviroments.
	}
}

function attackInfo(name,type,dmg,requiredMps,targets){
	return {name:name,type:type,dmg:dmg,requiredMps:requiredMps,targets:targets}
}

let park = {
	info: {character: {imageId: "melendi", initialHP: 75, initialMP: 115,
	rP: 4, rR: 6, rF: 3, rE: 7, rT: 5, acurracy: 90, speed: 60,
	attack1: attackInfo("A Rango 1 Target", 1, 25, 0, 1), attack2: attackInfo("A Rango 2 Target", 1, 20, 30, 1), 
	attack3: attackInfo("Support 1 Target", 5, 20, 25, 1), attack4: attackInfo("Camina por la Vida",5,70,60,1)}},
	
	enemies: [{name: "Artista", imgID:"artista", hp: 70, mp: 0, rP: 5, rR: 5, rF: 5, rE: 5, rT: 5, acurracy: 90, speed: 40,
		attack: [attackInfo("Pincelada",0,20,0,1),attackInfo("Lanza un bote de pintura", 4, 15, 0, 1),attackInfo("Xilografía en el pecho", 2, 30, 0, 1)]},
	{name: "Culturista", imgID:"culturista", hp: 80, mp: 0, rP: 8, rR: 6, rF: 4, rE: 3, rT: 6, acurracy: 85, speed: 60,
	attack:[attackInfo("Te flexeo el cráneo", 0, 40, 0, 1), attackInfo("Súper patada volador con un nombre increíblemente largo",0,45,0,1),
	attackInfo("Poñetaso", 0, 30, 0, 1)]
}]
}

let EnviromentInfo = park.info;
let EnemiesInfo = park.enemies;


