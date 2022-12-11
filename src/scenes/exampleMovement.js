import {Manin, AllyTEST} from '../obj/manin.js';
import enviromentObj from '../obj/enviromentObj.js';
import Bound from '../obj/bound.js';
import NPC from '../obj/npc.js';
import { EnviromentInfo } from '../fight/EnviromentInfo.js';
import {walkingHUD, ExploreMenu} from '../fight/HUD.js'
import {InputMan} from '../fight/InputManager.js'
import Object from '../obj/Object.js'
import Inventory from '../obj/Inventory.js'

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
		this.load.image('alex', 'assets/textures/Characters/Alex.png');
		this.load.image('compuman', 'assets/textures/Characters/Compuman.png');
		this.load.image('frozono', 'assets/textures/Characters/Frozono.png');
		this.load.image('unverifiedtoni', 'assets/textures/Characters/toni1.png');
		this.load.image('verifiedtoni', 'assets/textures/Characters/toni2.png');
		this.load.image('pepperboy', 'assets/textures/Characters/PepperBoy.png');
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

		// creamos a manín
		this.manin = new Manin(this, 100, 50, this.scene.get('dialog'));
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
		let npc1 = new NPC(this, 400, 300, 'elmotivao', 0, npc_dialogues, this.manin);
		let npc2 = new NPC(this, 200, 200, 'vovovo', 1, npc_dialogues, this.manin);
		let npc3 = new NPC(this, 300, 200, 'jatsune', 2, npc_dialogues,this.manin);
		//let npc4 = new NPC(this, 500, 100, 'aloy', 3, npc_dialogues, this.manin);
		//let npc5 = new NPC(this, 300, 100, 'kratos', 4, npc_dialogues, this.manin);
		let npc4 = new NPC(this, 500, 100, 'alex', 3, npc_dialogues, this.manin);
		let npc5 = new NPC(this, 100, 100, 'frozono', 4, npc_dialogues, this.manin);
		let npc6 = new NPC(this, 100, 200, 'compuman', 5, npc_dialogues, this.manin);
		let npc7 = new NPC(this, 100, 300, 'unverifiedtoni', 6, npc_dialogues, this.manin);
		let npc8 = new NPC(this, 200, 400, 'verifiedtoni', 7, npc_dialogues, this.manin);
		let npc9 = new NPC(this, 600, 400, 'pepperboy', 8, npc_dialogues, this.manin);
		this.npcs = [npc1, npc2, npc3, npc4, npc5, npc6, npc7, npc8, npc9];
		for(let e of this.npcs) e.scale = 2.5;
		// genera la hierba y su collider. estaría guay parametrizarlo uwu.
		//this.GenerateHostileGround(120, 400, 2, 1, 2.5);
		//this.GenerateHostileGround(500, 200, 4, 4, 2.5);
		
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
		this.GenerateHostileGround(600, 200, 3 ,3 ,2);

	}
	
	// generación de la hierba hostil (TEMPORAL)
	GenerateHostileGround(x, y, fils, cols, scale){
		let hierbas = []; // array de hierbas
		// generamos las hierbas que se nos digan
		for(let i = 0; i < fils; i++){
			for(let o = 0; o < cols; o++){
				let h = new enviromentObj(this,x,y, 'hierba',scale,scale);
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

	UpdateInventory(inv){
		this.inventory = inv;
	}
	
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
		/*
		this.inventory.addItem(new Object('Fría', 10, 0));
		this.inventory.addItem(new Object('Fría', 10, 0));
		this.inventory.addItem(new Object('1111111111', 10, 0));
		this.inventory.addItem(new Object('2222222222', 10, 0));
		this.inventory.addItem(new Object('3333333333', 10, 0));
		this.inventory.addItem(new Object('4444444444', 10, 0));
		*/
		this.manin.touchingGrass = false;
        this.scene.launch('fightscene');
		//this.scene.get('fightscene').LoadInventory(this.inventory);
        this.scene.sleep('movement');
		this.scene.get('hud').Fight();
    }
}