import {Manin, AllyTEST} from '../obj/manin.js';
import {enviromentObj, interactuableObj } from '../obj/enviromentObj.js';
import Bound from '../obj/bound.js';
import NPC from '../obj/npc.js';
import { EnviromentInfo } from '../fight/EnviromentInfo.js';
import { Quest, QuestNPC, QuestLog } from '../Quest.js';
import shopNPC from '../obj/shopNPC.js';
import healerNPC from '../obj/healerNPC.js';
import { allyParty } from '../fight/Party.js';

// Escena de exploración (temporal de momento)
export default class ParkScene extends Phaser.Scene {
	// construimos la escena
	constructor() {
		super({ key: 'park' });
		this.key = 'park';
		this.manin; // protagonista
		this.inventory = allyParty.inventory;
		this.hierbasColliders = [];
	}

	//#region input
	generateInput(){
		// input porque no funciona el InputMan. Vamos a tener que cambiarlo a una escena que controle input. qué feo
		this.spaceKey = this.input.keyboard.addKey('SPACE'); // interact
	}
	//#endregion	

	// inicializamos la escena
	create() {
		this.generateInput();

		//Imagen de fondo
		var bg = this.add.image(0, 0, EnviromentInfo.bg).setOrigin(0, 0);

		// bounds del mundo
		this.cameras.main.setBounds(0, 0, bg.displayWidth, bg.displayHeight);

		// Offset para el fondo
		let upperBackgroundOffset = 20;

		this.questLog = "test"; 

		// creamos a manín
		this.manin = new Manin(this, 100, 50, this.scene.get('dialog'), allyParty.QuestLog);
		//#region creamos los bordes del mundo
		let bLeft = new Bound(this, -1, 0,1,bg.displayHeight);
		let bRight = new Bound(this, bg.displayWidth, 0,1,bg.displayHeight);
		let bUp = new Bound(this, 0, -1 - upperBackgroundOffset,bg.displayWidth,1);
		let bDown = new Bound(this, 0, bg.displayHeight + upperBackgroundOffset,bg.displayWidth,1);
		//#endregion

		// la cámara sigue a manín
		this.cameras.main.startFollow(this.manin);
		// cargamos diálogos de los NPCs
		let npc_dialogues = this.cache.json.get('npc_dialogues');
		// #region generamos a los NPCs

		this.npcs = [];
		for(let i of EnviromentInfo.npcs){
			let newNpc = new NPC(this, i.x, i.y, i.img, i.id, npc_dialogues, this.manin);
			this.npcs.push(newNpc);
		}
		for(let i of EnviromentInfo.qNpcs){
			let newNpc = new QuestNPC(this, i.x,i.y, i.img, i.id, npc_dialogues, 
				this.manin, new Quest(i.qStages, i.qId, i.qName, i.qObj));
			this.npcs.push(newNpc);
		}
		for(let i of EnviromentInfo.sNpcs){
			let newNpc = new shopNPC(this, i.x, i.y, i.img, i.id, npc_dialogues, this.manin, this.inventory);
			this.npcs.push(newNpc);
		}
		for(let i of EnviromentInfo.hNpcs){
			let newNpc = new healerNPC(this, i.x, i.y, i.img, i.id, npc_dialogues, this.manin);
			this.npcs.push(newNpc);
		}
		for(let e of this.npcs) e.scale = 2.5;
		//#endregion

		for(let e of EnviromentInfo.hostile){
			this.GenerateHostileGround(e.x,e.y,e.fils,e.cols,e.scale, e.img)
		}
		
		// #region Obj. Interactivos (se podrían hacer desde EnvInfo? suena feo en general)
		let self = this;
		this.guitar = new interactuableObj(this, 700, 100, 'manin', 0.7, 0.7, function(){
			let guitarQuest = allyParty.questLog.GetQuest('guitarQuest2');
			if(guitarQuest !== undefined && !guitarQuest.quest.actualObjectiveCompleted){
				allyParty.questLog.advanceQuest('guitarQuest2'); 
				self.scene.get('hud').events.emit('updateQuestHUD');
				self.guitar.trigger.destroy();
				self.guitar.destroy();
			}
		}, this.manin);
		this.guitar.setScale(3);

		this.interactuableObjects = [this.guitar];
		//#endregion

		// genera la hierba y su collider
		// this.GenerateHostileGround(900, 200, 4, 4, 2.5);

		this.ChangeScene();
		
		//this.physics.add.collider(this.manin, house);
		this.physics.add.collider(this.manin, bg);
		this.physics.add.collider(this.manin, bLeft);
		this.physics.add.collider(this.manin, bDown);
		this.physics.add.collider(this.manin, bRight);
		this.physics.add.collider(this.manin, bUp);
		this.manin.body.onCollide = true;

		this.justAwaken = false;
		this.ally = new AllyTEST(this, 300, 300, this.manin, EnviromentInfo.character);
		this.ally.scale = 2.5;
	}

	// generación de la hierba hostil (TEMPORAL)
	GenerateHostileGround(x, y, fils, cols, scale, img){
		let hierbas = []; // array de hierbas
		// generamos las hierbas que se nos digan
		for(let i = 0; i < fils; i++){
			for(let o = 0; o < cols; o++){
				let h = new enviromentObj(this,x,y, img,scale,scale);
				h.x += h.displayWidth * i;
				h.y += h.displayHeight * o;
				hierbas.push(h);
			}
		}
		// añadimos la zona de colisión
		this.hierbasColliders.push(this.add.zone(x - hierbas[0].displayWidth / 2, y - hierbas[0].displayHeight / 2).setSize((hierbas[0].displayWidth) * fils,(hierbas[0].displayHeight) * cols).setOrigin(0,0));		
		this.physics.world.enable(this.hierbasColliders[this.hierbasColliders.length-1]); // añadimos su collider
		this.hierbasColliders[this.hierbasColliders.length-1].body.setAllowGravity(false); // quitamos gravedad
		this.hierbasColliders[this.hierbasColliders.length-1].body.moves = false;
		
		// creamos eventos para decirle a manín cuándo está tocando o no suelo hostil
		this.hierbasColliders[this.hierbasColliders.length-1].on("overlapstart", () =>{
			this.manin.touchingGrass = true;
		})
		this.hierbasColliders[this.hierbasColliders.length-1].on("overlapend", () =>{
			this.manin.touchingGrass = false;
			
		})
		// añadimos un overlap entre manín y esta nueva zona de colliders
		this.physics.add.overlap(this.manin.zone, this.hierbasColliders[this.hierbasColliders.length-1]);
	}

	ChangeScene()
	{
		this.sceneChangerCoords = [];
		this.changeCol = [];

		this.sceneChangerCoords.push(new enviromentObj(this, 100, 100, 'pixel',100,100));
		
		let self = this;
		let o = 0;

		for(let i of this.sceneChangerCoords){
			this.changeCol.push(this.add.zone(i.x, i.y).setSize(i.displayWidth, i.displayHeight).setOrigin(0,0));
			this.physics.world.enable(this.changeCol[o]);
			this.changeCol[o].body.setAllowGravity(false);
			this.changeCol[o].body.moves = false;

			this.changeCol[o].on("overlapstart", () => {
				if(self.spaceKey.isDown)
					self.scene.get('EnvManager').goToPlaza();
			});
			o++;
		}
	}

		/*
		this.frias = [];
		this.colliders = [];
		
		this.frias.push(new enviromentObj(this, 1195, 775, 'pixel',1,100));
		this.frias.push(new enviromentObj(this, 50, 775 , 'pixel',1,100));
		this.frias.push(new enviromentObj(this, 500, 15, 'pixel',100,1));

		// añadimos la zona de colisión
		for(let i = 0; i < 3; i++){
			this.colliders.push(this.add.zone(this.frias[i].x,this.frias[i].y ).setSize(this.frias[i].displayWidth-55,(this.frias[i].displayHeight) ).setOrigin(0,0));		
			this.physics.world.enable(this.colliders[i]); // añadimos su collider
			this.colliders[i].body.setAllowGravity(false); // quitamos gravedad
			this.colliders[i].body.moves = false;
			
			// creamos eventos
			this.colliders[i].on("overlapstart", () =>{
				this.manin.touchingFria = true;
				this.manin.moves[i]=true;
				
			})
			this.colliders[i].on("overlapend", () =>{
				this.manin.touchingFria = false;
				this.manin.moves[i]=false;

			})
			this.physics.add.overlap(this.manin, this.colliders[i]);
		}
		*/

	updateInventory(inv){
		this.inventory = inv;
	}

	// comprobación de colisiones y apertura de menús
	update(){
		let self = this;
		
		let hasCollidedGrass = false;
		
		this.hierbasColliders.forEach(function(colliders){
			
			let maninBounds = self.manin.zone.getBounds();
			let colliderGrassBounds = colliders.getBounds();
			
			if(Phaser.Geom.Intersects.RectangleToRectangle(maninBounds, colliderGrassBounds)){
				colliders.emit("overlapstart");
				hasCollidedGrass = true;
			}
			else if(!hasCollidedGrass){
				colliders.emit("overlapend");
			}
		});

		for(let i of this.changeCol){
			let maninBounds = self.manin.getBounds();
			let changeZoneBounds = i.getBounds();
			
			if(Phaser.Geom.Intersects.RectangleToRectangle(maninBounds, changeZoneBounds)){
				if(!this.justAwaken)
					i.emit("overlapstart");
			}
		}
		
		for(let i of this.npcs) {
			if(this.physics.world.overlap(this.manin, i.trigger) && this.manin.collider == null) {
				console.log("overlap");
				this.manin.collider = i;
			}
		}

		for(let i of this.interactuableObjects) {
			if(this.physics.world.overlap(this.manin, i.trigger) && this.manin.collider == null) {
				console.log("overlap");
				this.manin.collider = i;
			}
		}

		if(this.physics.world.overlap(this.manin, this.ally.trigger) && this.manin.collider == null) {
			console.log("overlap con aliado");
			this.manin.collider = this.ally;
		}

		if(this.manin.collider != null && !this.physics.world.overlap(this.manin, this.manin.collider.trigger)){
			this.manin.collider = null;
		}
	}

	// pasamos a la escena de pelea
	Fight(){
		this.manin.touchingGrass = false;
		this.scene.launch('fightscene');
		this.scene.get('fightscene').LoadInventory(this.inventory);
		this.scene.get('fightscene').CurrentScene(this.key);
		this.scene.sleep('park');
		this.scene.get('hud').Fight();
	}

	Park(){
		this.manin.touchingFria = false;
		this.manin.touchingGrass = false;
		this.manin.moveRight=false;
		this.scene.wake('park');
		this.scene.get('park').LoadInventory(this.inventory);
		
		this.scene.sleep('square');
	}
	Cementery(){
		this.manin.touchingFria = false;
		this.manin.touchingGrass = false;
		this.manin.moveLeft=false;
		this.scene.wake('cementery');
		this.scene.get('cementery').LoadInventory(this.inventory);
		
		this.scene.sleep('square');
	}
	Port(){
		this.manin.touchingFria = false;
		this.manin.touchingGrass = false;
		this.manin.moveDown=false;
		this.scene.wake('port');
		this.scene.get('port').LoadInventory(this.inventory);

		this.scene.sleep('square');
	}
}