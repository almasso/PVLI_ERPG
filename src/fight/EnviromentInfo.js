export {EnviromentInfo, EnemiesInfo, EnviromentManager};
import {attackInfo} from "../fight/Attack.js"

const scenes = {
	square: 0,
	park: 1,
	cementery: 2,
	port: 3
};

let hudKey = 'hud';

// esta clase gestionará el cambio entre escenarios y escenas.
class EnviromentManager extends Phaser.Scene{

	constructor(){
		// gestor de escenas. tenemos que hacer que se cambie en el momento de cambiar entre escenas.
		super({key: 'EnvManager'});
		this.coreScene = scenes.square;
		this.currentScene = scenes.square;
		this.info = sceneInfo[this.coreScene];
	}

	create(){
		this.initializeGame();
	}

	initializeGame(){
		this.startTransition();
		this.endTransition();
		this.scene.launch(sceneInfo[this.coreScene].key);
		this.scene.launch(hudKey);
		this.hudScene = this.scene.get(hudKey);	
	}

	startTransition(){
		
	}

	endTransition(){
		
	}

	changeScene(index){
		this.startTransition();
		this.endTransition();
		let sleepKey = this.info.key;
		this.info = sceneInfo[index];
		if(sceneInfo[index].launched) {
			this.scene.wake(sceneInfo[index].key);
		}
		else {
			this.scene.launch(sceneInfo[index].key);
			sceneInfo[index].launched = true;
		}
		this.scene.sleep(sleepKey);
		EnviromentInfo = this.info;
	}

	goToPlaza(){
		this.startTransition();
		this.endTransition();
		let sleepKey = this.info.key;
		this.info = sceneInfo[this.coreScene];
		this.scene.wake(sceneInfo[this.coreScene].key);
		this.scene.sleep(sleepKey);
	}
}

let square = {
	launched: true,
	key: 'square',
	bg: 'square',
	character: {name: "Melendi", imgID: 'melendi', actualHp: 75, maxHp: 75, actualMp: 115, maxMp: 115,
	rP: 4, rR: 6, rF: 3, rE: 7, rT: 5, acurracy: 90, speed: 60,
	attack: [attackInfo("A Rango 1 Target", 1, 25, 0, 1), attackInfo("A Rango 2 Target", 1, 20, 30, 1), 
	attackInfo("Support 1 Target", 5, -20, 25, 1), attackInfo("Camina por la Vida",5,-70,60,1)]},
	npcs: [npcInfo(400,300, 'elmotivao', 0), npcInfo(200, 200, 'vovovo', 1), npcInfo(300, 200, 'jatsune', 2)],
	qNpcs: [qNpcInfo(400, 500, 'melendi', 5, "guitarQuest","Mi Guitarra", 1, ["Recupera la Guitarra"])],
	sNpcs: [npcInfo(300, 100, 'alex', 9)],
	hNpcs:  [npcInfo(600, 100, 'patri', 11)],
}

// información de los personajes que se encuentran en el parque
let park = {
	launched: false,
	key: 'park',
	bg: 'park',
	npcs: [npcInfo(400,300, 'alex', 0), npcInfo(200, 200, 'alex', 1), npcInfo(300, 200, 'alex', 2)],
	qNpcs: [qNpcInfo(400, 500, 'melendi', 5, "guitarQuest2","NO ERA mi Guitarra", 2, ["Recupera la Guitarra", "Pelea contra Melendi"])],
	sNpcs: [npcInfo(300, 100, 'alex', 9)],
	hNpcs:  [npcInfo(600, 100, 'verifiedtoni', 11)],
	character: {name: "Melendi", imgID: 'melendi', actualHp: 75, maxHp: 75, actualMp: 115, maxMp: 115,
	rP: 4, rR: 6, rF: 3, rE: 7, rT: 5, acurracy: 90, speed: 60,
	attack: [attackInfo("A Rango 1 Target", 1, 25, 0, 1), attackInfo("A Rango 2 Target", 1, 20, 30, 1), 
	attackInfo("Support 1 Target", 5, -20, 25, 1), attackInfo("Camina por la Vida",5,-70,60,1)]},
	character2: {name: "Jarfaiter", imgID: 'jarfaiter', actualHp: 75, maxHp: 75, actualMp: 115, maxMp: 115,
	rP: 4, rR: 6, rF: 3, rE: 7, rT: 5, acurracy: 90, speed: 60, attack: [attackInfo("Navajeros", 0, 20, 0, 1), attackInfo("Quiero que ardas", 2, 35, 30, 1), 
	attackInfo("Ven a 4k", 0, 20, 25, 2), attackInfo("Porro",4,50,60,Math.random() * 4)]},
	enemies: [{name: "Artista", imgID:'artist', actualHp: 70, maxHp: 70, actualMp: 0, maxMp: 0, rP: 5, rR: 5, rF: 5, rE: 5, rT: 5, acurracy: 90, speed: 40,
		attack: [attackInfo("Pincelada",2,20,0,1),attackInfo("Lanza un bote de pintura", 4, 15, 0, 1),attackInfo("Xilografía en el pecho", 3, 30, 0, 1)],
		money: 500},
	{name: "Culturista", imgID:'artist', actualHp: 80, maxHp: 80, actualMp: 0, maxMp: 0, rP: 8, rR: 6, rF: 4, rE: 3, rT: 6, acurracy: 85, speed: 60,
	attack:[attackInfo("Te flexeo el cráneo", 3, 40, 0, 1), attackInfo("Súper patada volador con un nombre increíblemente largo",0,45,0,1),
	attackInfo("Poñetaso", 0, 30, 0, 1)], money: 1000}],
	shop: []
}

let cementery = {
	launched: false,
	key : 'cementery'
}

let port = {
	launched: false,
	key: 'port'
}

function npcInfo(x, y, img, id){
	return {x: x, y: y, img: img, id: id};
}

function qNpcInfo(x, y, img, id, qId, qName, qStages, qObj){
	return {x: x, y: y, img: img, id: id, qId: qId ,qName: qName, qStages: qStages, qObj: qObj};
}

let sceneInfo = [square, park, cementery, port];


// variables exportadas
let EnviromentInfo = square;
let EnemiesInfo = park.enemies;