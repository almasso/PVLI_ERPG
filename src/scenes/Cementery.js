import {Manin, AllyTEST} from '../obj/manin.js';
import enviromentObj from '../obj/enviromentObj.js';
import Bound from '../obj/bound.js';
import NPC from '../obj/npc.js';
import { EnviromentInfo } from '../fight/EnviromentInfo.js';
//import { walkingHUD} from '../fight/HUD.js';

// Escena de exploración (temporal de momento)
export default class CementeryScene extends Phaser.Scene {
	
	// construimos la escena
	constructor() {
		super({ key: 'cementery' });
		this.manin; // protagonista
		//this.inventory = new Inventory();
		this.hierbasColliders = [];
	}
	
	// cargamos todas las imágenes
	preload(){
		this.load.image('logButton','assets/textures/HUD/logButton.png');
		this.load.image('manin', 'assets/textures/Characters/manin_new.png');
		this.load.image('bg3', 'assets/textures/Backgrounds/bgFight.png');
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
		this.load.image('fria', 'assets/textures/Props/fria.png');
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
		//Imagen de fondo
		var bg = this.add.image(0, 0, 'bg3').setOrigin(0, 0);

		// bounds del mundo
        this.cameras.main.setBounds(0, 0, bg.displayWidth, bg.displayHeight);

		// Offset para el fondo
		let upperBackgroundOffset = 20;

		this.questLog = "test"; 

		// creamos a manín
		this.manin = new Manin(this, 1350, 200, this.scene.get('dialog'), this.questLog,"CEMENTERY");
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
		let npc4 = new NPC(this, 400, 300, 'elmotivao', 0, npc_dialogues, this.manin);
		let npc5 = new NPC(this, 200, 200, 'vovovo', 1, npc_dialogues, this.manin);
		let npc3 = new NPC(this, 300, 200, 'jatsune', 2, npc_dialogues,this.manin);
		let npc1 = new NPC(this, 500, 100, 'aloy', 3, npc_dialogues, this.manin);
		let npc2 = new NPC(this, 300, 100, 'kratos', 4, npc_dialogues, this.manin);
		this.npcs = [npc1, npc2, npc3, npc4, npc5];
		npc1.scale = 2.5;
		npc2.scale = 2.5;
		npc3.scale = 2.5;
		npc4.scale = 2.5;
		npc5.scale = 2.5;
		// genera la hierba y su collider. estaría guay parametrizarlo uwu.
		this.GenerateHostileGround(120, 400, 2, 1, 2.5);
		this.GenerateHostileGround(500, 200, 4, 4, 2.5);
		this.ChangeScene();


        // //////////////////////
        //     this.walkingHUD=new walkingHUD(40,500,this,'miniHUD')
        //     this.walkingHUD.depth=3;
        // //////////////////
		
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
	ChangeScene()
    {
        this.frias = []; // array de hierbas
		this.friasCollider; //collider del trozo de hierba hostil

		// generamos las hierbas que se nos digan (en este caso 16 porque, de nuevo, TEMPORAL)
		
			for(let o = 0; o < 4; o++){
				this.frias.push(new enviromentObj(this,1350,200 + 64 *o, 'fria',2.5,2.5));
			}
		
		// añadimos la zona de colisión
		this.friasCollider = this.add.zone(this.frias[0].x,this.frias[0].y ).setSize(this.frias[0].displayWidth-55,(this.frias[0].displayHeight) ).setOrigin(0,0);		
		this.physics.world.enable(this.friasCollider); // añadimos su collider
		this.friasCollider.body.setAllowGravity(false); // quitamos gravedad
		this.friasCollider.body.moves = false;
		
		// creamos eventos para decirle a manín cuándo está tocando o no suelo hostil
		this.friasCollider.on("overlapstart", () =>{
			this.manin.touchingFria = true;
			console.log("YA")
		})
		this.friasCollider.on("overlapend", () =>{
			this.manin.touchingFria = false;
		})
		// añadimos un overlap entre manín y esta nueva zona de colliders
		this.physics.add.overlap(this.manin, this.friasCollider);
		
    
	}

	/*updateInventory(inv){
		this.inventory = inv;
	}*/
	
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

		var touchingFria = !this.friasCollider.body.touching.none;
		var wasTouchingFria = !this.friasCollider.body.wasTouching.none;
		
		if(touchingFria && !wasTouchingFria) {this.friasCollider.emit("overlapstart");}
		else if(!touchingFria && wasTouchingFria) this.friasCollider.emit("overlapend");

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
		this.manin.touchingGrass = false;
        this.scene.launch('fightscene');
		this.scene.get('fightscene').LoadInventory(this.inventory);
		this.scene.get('fightscene').CurrentScene('cementery');
        this.scene.sleep('cementery');
		this.scene.get('hud').Fight();
    }

	// pasamos a la escena de pelea
    

	Plaza(){
		this.manin.touchingFria = false;
		this.manin.touchingGrass = false;
        this.scene.wake('movement');
		this.scene.get('movement').LoadInventory(this.inventory);

        this.scene.sleep('cementery');
    }

	LoadInventory(inv){
		this.inventory = inv;
	}
	
}