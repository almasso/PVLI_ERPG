import {Manin, AllyTEST} from '../obj/manin.js';
import {enviromentObj, interactuableObj } from '../obj/enviromentObj.js';
import Bound from '../obj/bound.js';
import NPC from '../obj/npc.js';
import { EnviromentInfo } from '../fight/EnviromentInfo.js';
import { Quest, QuestNPC, QuestLog } from '../Quest.js';
import { QuestHUD } from '../fight/HUD.js';

// Escena de exploración (temporal de momento)
export default class MovementExample extends Phaser.Scene {
	
	// construimos la escena
	constructor() {
		super({ key: 'movement' });
		this.manin; // protagonista
		//this.inventory = new Inventory();
		this.hierbasColliders = [];
	}
	
	// cargamos todas las imágenes
	preload(){
		this.load.image('logButton','assets/textures/HUD/logButton.png');
		this.load.image('guitar','assets/guitar.jpg');
		this.load.image('manin', 'assets/textures/Characters/manin_new.png');
		this.load.image('bg', 'assets/textures/Backgrounds/bg.png');
		this.load.image('pixel', 'assets/textures/Props/pixel1x1.png');
		this.load.image('hierba', 'assets/textures/Props/hierba.png');
		this.load.image('melendi','assets/textures/Characters/Melendi.png'); 
		this.load.image('artist','assets/textures/Characters/artista2.png'); 
		this.load.image('artistHead','assets/textures/HUD/explore/artista2Head.png'); 
		this.load.image('melendi','assets/textures/Characters/Melendi.png');
		this.load.image('elmotivao', 'assets/textures/Characters/elmotivao.png');
		this.load.image('vovovo', 'assets/textures/Characters/vovovo.png');
		this.load.image('jatsune', 'assets/textures/Characters/jatsune.png');
		this.load.json('npc_dialogues', 'assets/dialogues/npc_dialog.json');
		this.load.image('maninHead', 'assets/textures/HUD/explore/maninHead.png');
		this.load.image('melendiHead', 'assets/textures/HUD/explore/melendiHead.png');
		this.load.image('miniHUD', 'assets/textures/HUD/explore/miniHUD.png');
		this.load.image('menuBG', 'assets/textures/HUD/explore/menuBG.png');
		this.load.image('menuPartyButton', 'assets/textures/HUD/explore/menuPartyButton.png');
		this.load.image('menuOrderButton', 'assets/textures/HUD/explore/menuOrderButton.png');
		this.load.image('pointer', 'assets/textures/HUD/explore/pointer.png')
		this.load.image('partyStateBG', 'assets/textures/HUD/explore/partyStateBG.png')
		this.load.image('resistancesText', 'assets/textures/HUD/explore/resistancesText.png')
		this.load.image('partyStats', 'assets/textures/HUD/explore/partyStats.png')

		this.load.image('resP', 'assets/textures/HUD/explore/resP.png')
		this.load.image('resR', 'assets/textures/HUD/explore/resR.png')
		this.load.image('resE', 'assets/textures/HUD/explore/resE.png')
		this.load.image('resF', 'assets/textures/HUD/explore/resF.png')
		this.load.image('resT', 'assets/textures/HUD/explore/resT.png')

		this.load.spritesheet('manin_move','assets/textures/Characters/manin_move.png',{frameWidth:25, frameHeight:32});
		this.load.spritesheet('manin_pop','assets/textures/Characters/manin_pop.png',{frameWidth:25, frameHeight:32});
		this.load.spritesheet('manin_pose','assets/textures/Characters/manin_pose.png',{frameWidth:25, frameHeight:32});
		this.load.image('kratos','assets/textures/NPC-RAUL/Kratos.png'); 
		this.load.image('aloy','assets/textures/NPC-RAUL/Aloy.png'); 
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/

	// inicializamos la escena
	create() {
		//#region input
		// input porque no funciona el InputMan. Vamos a tener que cambiarlo a una escena que controle input. qué feo
		this.wKey = this.input.keyboard.addKey('W'); // move up
		this.aKey = this.input.keyboard.addKey('A'); // move left
		this.sKey = this.input.keyboard.addKey('S'); // move down
		this.dKey = this.input.keyboard.addKey('D'); // move right
		this.spaceKey = this.input.keyboard.addKey('SPACE'); // interact
		this.eKey = this.input.keyboard.addKey('E'); //chose
		this.qKey = this.input.keyboard.addKey('Q');  //attack
		//#endregion	
		// ponemos a dormir la escena que controla la UI
		this.scene.sleep('uimanager');
		this.scene.launch('hud');

		//Imagen de fondo
		var bg = this.add.image(0, 0, 'bg').setOrigin(0, 0);

		// bounds del mundo
        this.cameras.main.setBounds(0, 0, bg.displayWidth, bg.displayHeight);

		// Offset para el fondo
		let upperBackgroundOffset = 20;

		this.questLog = "test"; 

		// creamos a manín
		this.manin = new Manin(this, 100, 50, this.scene.get('dialog'), new QuestLog());
		this.questHud = new QuestHUD(this, this.manin);
		this.manin.questLog.setQuestHUD(this.questHud);
		this.questHud.Update();
		//#region  creamos los bordes del mundo
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
		let npc1 = new NPC(this, 500, 100, 'aloy', 3, npc_dialogues, this.manin);
		let npc4 = new NPC(this, 400, 300, 'elmotivao', 0, npc_dialogues, this.manin);
		let npc5 = new NPC(this, 200, 200, 'vovovo', 1, npc_dialogues, this.manin);
		let npc3 = new NPC(this, 300, 200, 'jatsune', 2, npc_dialogues,this.manin);
		let npc2 = new NPC(this, 300, 100, 'kratos', 4, npc_dialogues, this.manin);
		
		
		let qNpc = new QuestNPC(this, 400, 500, 'melendi', 5, npc_dialogues, this.manin, new Quest('manin', 2, 'guitarQuest', "Mi Guitarra", ["Recupera la guitarra"
		,"Pelea contra melendi"]));

		let qNpc2 = new QuestNPC(this, 200, 500, 'melendi', 5, npc_dialogues, this.manin, new Quest('manin', 2, 'guitarQuest2', "Prueba 2", ["Recupera la otra guitarra"
		,"Pelea contra melendi2"]));

		this.npcs = [npc1, npc2, npc3, npc4, npc5,qNpc, qNpc2];
		let self = this;
		this.guitar = new interactuableObj(this, 700, 100, 'guitar', 0.3, 0.3, function(){
			let quest = self.manin.questLog.GetQuest('guitarQuest').quest;
			if(quest !== undefined && !quest.actualObjectiveCompleted){
				self.manin.questLog.advanceQuest('guitarQuest'); 
				self.questHud.Update();
				console.log("PILLADO");
				self.guitar.destroy();
			}
		}, this.manin);

		qNpc.scale = 2.5;
		qNpc2.scale = 2.5;

		npc2.scale = 2.5;
		npc3.scale = 2.5;
		npc4.scale = 2.5;
		npc5.scale = 2.5;
		npc1.scale = 2.5;

		this.interactuableObjects = [this.guitar];
		// genera la hierba y su collider. estaría guay parametrizarlo uwu.
		this.GenerateHostileGround(120, 400, 2, 1, 2.5);
		this.GenerateHostileGround(500, 200, 4, 4, 2.5);
		
		//this.physics.add.collider(this.manin, house);
		this.physics.add.collider(this.manin, bg);
		this.physics.add.collider(this.manin, bLeft);
		this.physics.add.collider(this.manin, bDown);
		this.physics.add.collider(this.manin, bRight);
		this.physics.add.collider(this.manin, bUp);
		this.manin.body.onCollide = true;

		this.ally = new AllyTEST(this, 300, 300, this.manin, EnviromentInfo.character);
		this.ally.scale = 2.5;
		//#endregion
	}
	
	// generación de la hierba hostil (TEMPORAL)
	GenerateHostileGround(x, y, fils, cols, scale){
		let hierbas = []; // array de hierbas
		// generamos las hierbas que se nos digan
		for(let i = 0; i < fils; i++){
			for(let o = 0; o < cols; o++){
				hierbas.push(new enviromentObj(this,x + 64*i,y + 64 *o, 'hierba',scale,scale));
			}
		}
		// añadimos la zona de colisión
		this.hierbasColliders.push(this.add.zone(x - 44, y - 33).setSize((hierbas[hierbas.length-1].displayWidth - 11) * fils,(hierbas[hierbas.length-1].displayHeight - 11) * cols).setOrigin(0,0));		
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

	/*updateInventory(inv){
		this.inventory = inv;
	}*/
	
	// comprobación de colisiones y apertura de menús
	update(){
		let self = this;
		let hasCollided = false;
		this.hierbasColliders.forEach(function(colliders){
			
			let maninBounds = self.manin.zone.getBounds();
			let colliderBounds = colliders.getBounds();
			
			if(Phaser.Geom.Intersects.RectangleToRectangle(maninBounds, colliderBounds)){
				colliders.emit("overlapstart");
				hasCollided = true;
			}
			else if(!hasCollided){
				colliders.emit("overlapend");
			}
		});

		for(let i of this.npcs) {
			if(this.physics.world.overlap(this.manin, i.trigger) && this.manin.collider == null) {
				console.log("overlap")
				this.manin.collider = i;
			}
		}

		for(let i of this.interactuableObjects) {
			if(this.physics.world.overlap(this.manin, i.trigger) && this.manin.collider == null) {
				console.log("overlap")
				this.manin.collider = i;
			}
		}
	
		if(this.physics.world.overlap(this.manin, this.ally.trigger) && this.manin.collider == null) {
			console.log("overlap con aliado")
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
		//this.scene.get('fightscene').LoadInventory(this.inventory);
        this.scene.sleep('movement');
		this.scene.get('hud').Fight();
    }
}