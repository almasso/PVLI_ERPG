export {EnviromentInfo, EnemiesInfo, EnviromentManager};
import {attackInfo} from "../fight/Attack.js"
import { allyParty } from "./Party.js";

const scenes = {
	square: 0,
	park: 1,
	cementery: 2,
	port: 3
};

let hudKey = 'hud';
let fightKey = 'fightscene';

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

	fight(){
		this.scene.sleep(sceneInfo[this.currentScene].key);
		this.scene.sleep(hudKey);
		this.scene.launch(fightKey);
		this.scene.get(fightKey).LoadInventory(allyParty.inventory);
	}

	walk(bool){
		if(bool){
			for(let i of sceneInfo){
				this.scene.stop(i.key);
			}
			this.scene.launch('final');
		}
		else{
			this.scene.wake(sceneInfo[this.currentScene].key);
			this.hudScene.Walk();
			this.hudScene.UpdateHUD();
		}
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
	character: [{x: 300,y:300, name: "Melendi", imgID: 'melendi', actualHp: 75, maxHp: 75, actualMp: 115, maxMp: 115,
	rP: 4, rR: 6, rF: 3, rE: 7, rT: 5, acurracy: 90, speed: 60,
	attack: [attackInfo("A Rango 1 Target", 1, 25, 0, 1), attackInfo("A Rango 2 Target", 1, 20, 30, 1), 
	attackInfo("Support 1 Target", 5, -20, 25, 1), attackInfo("Camina por la Vida",5,-70,60,1)]}],
	
	npcs: [npcInfo(400,900, 'verifiedtoni', 0), npcInfo(200, 900, 'pepperboy', 1), npcInfo(300, 900, 'jatsune', 2),
	npcInfo(500,900, 'frozono', 0),	npcInfo(250,225, 'homero', 0),npcInfo(700,900, 'spider', 0),
	npcInfo(800,900, 'patrik', 0),npcInfo(900,900, 'bob', 0),npcInfo(600,350, 'dinostatue', 0),npcInfo(200,700, 'rick', 0)],
	
	
	qNpcs: [qNpcInfo(400, 500, 'melendi', 5, "guitarQuest","Mi Guitarra", 2, ["Recupera la Guitarra", "Pelea contra Melendi"])],
	sNpcs: [npcInfo(1000, 100, 'alex', 9)],
	hNpcs:  [npcInfo(100, 250, 'tienda', 10)],
	hostile: [hostileInfo(900,200,'hierba', 1, 1, 2.5), 
			  hostileInfo(700, 500, 'hierba', 1, 1, 2)],
	eObj: [eObjInfo(600, 100, 'valla', 0.5, 0.5),eObjInfo(540, 275, 'pixel', 140, 50)
	,eObjInfo(600, 375, 'pixel', 250, 75),eObjInfo(600, 325, 'pixel', 150, 50)],
	iObj: [],
	travel: [travelInfo(1195, 850, 'pixel', 100, 100, scenes.park),
			 travelInfo(10, 850, 'pixel', 100, 100, scenes.cementery),
			 travelInfo(500, 150, 'pixel', 100, 100, scenes.park)]
}

// información de los personajes que se encuentran en el parque
let park = {
	launched: false,
	key: 'park',
	bg: 'park',
	
	npcs: [npcInfo(1300,400, 'patri', 10),npcInfo(830,50, 'compuman', 5),npcInfo(100,300, 'unverifiedtoni', 6),
	npcInfo(800,700, 'elmotivao', 0),	npcInfo(950,860, 'vovovo', 1),npcInfo(250,950, 'joker', 0),
	npcInfo(1500,850, 'aloy', 0),npcInfo(1550,150, 'sirenita', 0),npcInfo(1000,600, 'ikerJimenez', 0)],
	
	
	qNpcs: [qNpcInfo(550, 90, 'melendi', 5, "guitarQuest2","NO ERA mi Guitarra", 2, ["Recupera la Guitarra", "Pelea contra Melendi"])],
	sNpcs: [],
	hNpcs:  [],
	character: [{x: 300,y:300, name: "Melendi", imgID: 'melendi', actualHp: 75, maxHp: 75, actualMp: 115, maxMp: 115,
	rP: 4, rR: 6, rF: 3, rE: 7, rT: 5, acurracy: 90, speed: 60,
	attack: [attackInfo("A Rango 1 Target", 1, 25, 0, 1), attackInfo("A Rango 2 Target", 1, 20, 30, 1), 
	attackInfo("Support 1 Target", 5, -20, 25, 1), attackInfo("Camina por la Vida",5,-70,60,1)]},
	{x:500, y:500, name: "Jarfaiter", imgID: 'jarfaiter', actualHp: 75, maxHp: 75, actualMp: 115, maxMp: 115,
	rP: 4, rR: 6, rF: 3, rE: 7, rT: 5, acurracy: 90, speed: 60, attack: [attackInfo("Navajeros", 0, 20, 0, 1), attackInfo("Quiero que ardas", 2, 35, 30, 1), 
	attackInfo("Ven a 4k", 0, 20, 25, 2), attackInfo("Porro",4,50,60,Math.random() * 4)]}],
	enemies: [{name: "Artista", imgID:'artist', actualHp: 70, maxHp: 70, actualMp: 0, maxMp: 0, rP: 5, rR: 5, rF: 5, rE: 5, rT: 5, acurracy: 90, speed: 40,
		attack: [attackInfo("Pincelada",1,20,0,1),attackInfo("Lanza un bote de pintura", 1, 15, 0, 1),attackInfo("Xilografía en el pecho", 1, 30, 0, 1)]},
	{name: "Culturista", imgID:'people', actualHp: 80, maxHp: 80, actualMp: 0, maxMp: 0, rP: 8, rR: 6, rF: 4, rE: 3, rT: 6, acurracy: 85, speed: 60,
	attack:[attackInfo("Te flexeo el cráneo", 3, 40, 0, 1), attackInfo("Súper patada volador con un nombre increíblemente largo",0,45,0,1),
	attackInfo("Poñetaso", 0, 30, 0, 1)]}],
	hostile: [hostileInfo(875,310,'hierba', 3, 2, 2.5),hostileInfo(725,825,'hierba', 1, 1, 2.5),hostileInfo(650,900,'hierba', 1, 1, 2.5),hostileInfo(600,550,'hierba', 2, 1, 2.5),hostileInfo(1040,860,'hierba', 3, 2, 2.5),hostileInfo(875,700,'hierba', 3, 2, 2.5),hostileInfo(965,230,'hierba', 1, 1, 2.5),hostileInfo(800,150,'hierba', 2, 2, 2.5),hostileInfo(1500,335,'hierba', 2, 2, 2.5),hostileInfo(1400,500,'hierba', 3, 2, 2.5),hostileInfo(300, 50, 'hierba', 3, 2, 2),hostileInfo(335, 180, 'hierba', 2, 1, 2),
	hostileInfo(150, 400, 'hierba', 1, 1, 2),hostileInfo(200, 500, 'hierba', 1, 1, 2),hostileInfo(350, 850, 'hierba', 2, 3, 2),
	hostileInfo(25, 850, 'hierba', 5, 1, 2),hostileInfo(25, 725, 'hierba', 7, 2, 2)],
	eObj: [eObjInfo(0, 265, 'tree', 6.5, 6.5),eObjInfo(126, 900, 'tree', 7, 7),eObjInfo(693, 25, 'tree', 7, 7),eObjInfo(1575, 640, 'tree', 7, 7)
	,eObjInfo(1388, 785, 'ten', 4, 4),eObjInfo(1500, 20, 'pixel', 300, 300),eObjInfo(1200, 20, 'pixel', 400, 100)],
	iObj: [],
	travel: [travelInfo(10, 60, 'pixel', 100, 100, scenes.square)]
}

let cementery = {
	launched: false,
	key : 'cementery',
	bg: 'clif',
	npcs: [npcInfo(485,125, 'kratos', 13)],
	qNpcs: [],
	 sNpcs: [],
	 hNpcs:  [],
	 character: [],
	enemies: [],
	hostile: [],
	eObj: [eObjInfo(200, 300, 'insignia', 0.5, 0.5),eObjInfo(650, 170, 'pixel', 320, 0.5),eObjInfo(460, 0, 'pixel', 0.5, 500),eObjInfo(650, 74, 'pixel', 320, 0.5)],
	iObj: [],
	travel: [travelInfo(800, 120, 'pixel', 70, 70, scenes.square)]
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

function hostileInfo(x, y, img, fils, cols, scale){
	return {x: x, y: y, img: img, fils: fils, cols: cols, scale: scale};
}

function eObjInfo(x, y, img, sX, sY){
	return {x: x, y: y, img: img, sX: sX, sY: sY};
}

function travelInfo(x, y, img, sX, sY, scene){
	return {x: x, y: y, img: img, sX: sX, sY: sY, scene: scene};
}

let sceneInfo = [square, park, cementery, port];

// variables exportadas
let EnviromentInfo = square;
let EnemiesInfo = park.enemies;