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
		console.log(sceneInfo[this.currentScene].key);
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
			this.scene.wake(hudKey);
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
		this.currentScene = index;
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
	character: [{
		x: 300,
		y:300, 
		name: "Melendi", 
		imgID: 'melendi', 
		actualHp: 75, 
		maxHp: 75, 
		actualMp: 115, 
		maxMp: 115,
		rP: 4, 
		rR: 6, 
		F: 3, 
		rE: 7, 
		rT: 5, 
		acurracy: 90, 
		speed: 60,
		attack: [
			attackInfo("A Rango 1 Target", 1, 25, 0, 1), 
			attackInfo("A Rango 2 Target", 1, 20, 30, 1), 
			attackInfo("Support 1 Target", 5, -20, 25, 1), 
			attackInfo("Camina por la Vida",5,-70,60,1)
		]
	}],
	npcs: [
		npcInfo(400,300, 'elmotivao', 0), 
		npcInfo(200, 200, 'vovovo', 1), 
		npcInfo(300, 200, 'jatsune', 2)
	],
	qNpcs: [
		qNpcInfo(
			400, 
			500, 
			'melendi', 
			5, 
			"guitarQuest",
			"Mi Guitarra", 
			2, 
			["Recupera la Guitarra", "Pelea contra Melendi"]
			)
		],
	sNpcs: [
		sNpcInfo(
			300, 
			100, 
			'alex', 
			9, 
			[
				itemInfo("Cigarro", -5, 10, 10, 'cigarro'), 		
				itemInfo('Kebab', 10, -5, 10,'kebab'), 
				itemInfo('Fría', 20, -5, 20, 'fria'), 
				itemInfo('Porro', -5, 20, 20, 'porro'), 
				itemInfo('Dalsy Naranja', 10, 0, 15, 'dalsyN'),
				itemInfo('Dalsy Fresa', 0, 10, 15, 'dalsyF'),
				itemInfo('Ibuprofeno 200mg', 15, 0, 15, 'i200'),
				itemInfo('Ibuprofeno 600mg', 30, 0, 30, 'i600'),
				itemInfo('Ibuprofeno 1g', 45, 0, 45, 'i1')
			]
			)
		],
	hNpcs:  [
		npcInfo(600, 100, 'patri', 11)
	],
	hostile: [
		hostileInfo(900,200,'hierba', 4, 4, 2.5), 
		hostileInfo(700, 500, 'hierba', 1, 1, 2)
	],
	eObj: [
		eObjInfo(200, 400, 'kratos', 2, 2)
	],
	iObj: [
		eObjInfo(700, 100, 'manin', 0.7, 0.7)
	],
	travel: [
		travelInfo(1195, 775, 'pixel', 100, 100, scenes.park),
		travelInfo(50, 775, 'pixel', 100, 100, scenes.park),
		travelInfo(500, 150, 'pixel', 100, 100, scenes.park)
	]
}

let nombresSanxe = ["Pedro Sánchez", "Otto Frauden", "Elim Postor", "Chan Chu-yo", "Pierre d'Elvotto", "Hurto Sinescrupoulos", "Gandhi Sima Farsa", "Massimo Atracco", 
					"Tekito Tuboto", "Mestafa Al-Votar", "Pedro das Trampas", "Ami Mewele Atrampa", "Jo Dan-sen", "Falconetti", "Mr. Handsome", "Silvio Panada", "T. Van Astaffar",
					"Abraham Urnas", "Ivan A. Timar", "T. des Falco do Nascimento", "Pancho R. Obando", "Many Puleo"];

// información de los personajes que se encuentran en el parque
let park = {
	launched: false,
	key: 'park',
	bg: 'square',
	npcs: [
		npcInfo(400,300, 'alex', 0), 
		npcInfo(200, 200, 'alex', 1), 
		npcInfo(300, 200, 'alex', 2),
		npcInfo(300, 400, 'tiolavara', 22)
	],
	qNpcs: [
		qNpcInfo(400, 500, 'melendi', 5, "guitarQuest2","NO ERA mi Guitarra", 2, ["Recupera la Guitarra", "Pelea contra Melendi"])],
	sNpcs: [sNpcInfo(300, 100, 'alex', 9, [itemInfo("Cigarro", -5, 10, 10, 'cigarro')
	, itemInfo('Kebab', 10, -5, 10,'kebab'), itemInfo('Fría', 20, -5, 20, 'fria'), 
		itemInfo('Porro', -5, 20, 20, 'porro'), itemInfo('Dalsy Naranja', 10, 0, 15, 'dalsyN'),
		itemInfo('Dalsy Fresa', 0, 10, 15, 'dalsyF'),
		itemInfo('Ibuprofeno 200mg', 15, 0, 15, 'i200'),
		itemInfo('Ibuprofeno 600mg', 30, 0, 30, 'i600'),
		itemInfo('Ibuprofeno 1g', 45, 0, 45, 'i1')])],
	hNpcs:  [npcInfo(600, 100, 'verifiedtoni', 11)],
	character: [{x: 300,y:300, name: "Melendi", imgID: 'melendi', actualHp: 75, maxHp: 75, actualMp: 115, maxMp: 115,
	rP: 4, rR: 6, rF: 3, rE: 7, rT: 5, acurracy: 90, speed: 60,
	attack: [attackInfo("A Rango 1 Target", 1, 25, 0, 1), attackInfo("A Rango 2 Target", 1, 20, 30, 1), 
	attackInfo("Support 1 Target", 5, -20, 25, 1), attackInfo("Camina por la Vida",5,-70,60,1)]},
	{x:500, y:500, name: "Jarfaiter", imgID: 'jarfaiter', actualHp: 75, maxHp: 75, actualMp: 115, maxMp: 115,
	rP: 4, rR: 6, rF: 3, rE: 7, rT: 5, acurracy: 90, speed: 60, attack: [attackInfo("Navajeros", 0, 20, 0, 1), attackInfo("Quiero que ardas", 2, 35, 30, 1), 
	attackInfo("Ven a 4k", 0, 20, 25, 2), attackInfo("Porro",4,50,60,4)]},
	{
		name: nombresSanxe[Math.floor(Math.random() * nombresSanxe.length)], 
		imgID: 'sanxe', 
		actualHp: 75, 
		maxHp: 75, 
		actualMp: 115, 
		maxMp: 115,
		rP: 4, 
		rR: 6, 
		rF: 3, 
		rE: 7, 
		rT: 5, 
		acurracy: 90, 
		speed: 60, 
		attack: [
			attackInfo("Bono Cultural Joven", 0, 20, 0, 1), 
			attackInfo("Chuletón al punto", 2, 35, 30, 1), 
			attackInfo("Ataque Falcon", 0, 20, 25, 2), 
			attackInfo("Instaurar la República",4,50,60,Math.random() * 4)
		]}],
	enemies: [{name: "Artista", imgID:'artist', actualHp: 70, maxHp: 70, actualMp: 0, maxMp: 0, rP: 5, rR: 5, rF: 5, rE: 5, rT: 5, acurracy: 90, speed: 40,
		attack: [attackInfo("Pincelada",1,20,0,1),attackInfo("Lanza un bote de pintura", 1, 15, 0, 1),attackInfo("Xilografía en el pecho", 1, 30, 0, 1)]},
	{name: "Culturista", imgID:'people', actualHp: 80, maxHp: 80, actualMp: 0, maxMp: 0, rP: 8, rR: 6, rF: 4, rE: 3, rT: 6, acurracy: 85, speed: 60,
	attack:[attackInfo("Te flexeo el cráneo", 3, 40, 0, 1), attackInfo("Súper patada volador con un nombre increíblemente largo",0,45,0,1),
	attackInfo("Poñetaso", 0, 30, 0, 1)]}],
	hostile: [hostileInfo(900,200,'hierba', 4, 4, 2.5), 
	hostileInfo(700, 500, 'hierba', 1, 1, 2)],
	eObj: [eObjInfo(200, 400, 'kratos', 2, 2)],
	iObj: [eObjInfo(700, 100, 'manin', 0.7, 0.7)],
	travel: [travelInfo(1195, 775, 'pixel', 100, 100, scenes.square),
	travelInfo(50, 775, 'pixel', 100, 100, scenes.square),
	travelInfo(500, 15, 'pixel', 100, 100, scenes.square)]
}

let cementery = {
	launched: false,
	key : 'cementery'
}

let port = {
	launched: false,
	key: 'port'
}

function itemInfo(name, hp, mp, price, img) {
	return {name: name, hp: hp, mp: mp, price: price, img: img};
}

function npcInfo(x, y, img, id){
	return {x: x, y: y, img: img, id: id};
}

function sNpcInfo(x, y, img, id, items){
	return {x: x, y: y, img: img, id: id, items: items};
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