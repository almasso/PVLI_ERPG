import Manin from '../obj/manin.js';
import enviromentObj from '../obj/enviromentObj.js';
import Bound from '../obj/bound.js';
import NPC from '../obj/npc.js';
import {walkingHUD, ExploreMenu} from '../fight/HUD.js'
import {InputMan} from '../fight/InputManager.js'
//import Object from '../obj/Object.js'
import Inventory from '../obj/Inventory.js'

// Escena de exploración (temporal de momento)
export default class ParkScene extends Phaser.Scene {
	
	// construimos la escena
	constructor() {
		super({ key: 'park' });
		this.manin; // protagonista
		this.inventory;
	}
	
	// cargamos todas las imágenes
	preload(){
		this.load.image('manin', 'assets/textures/Characters/manin_new.png');
		this.load.image('bg2', 'assets/textures/Backgrounds/bg2.png');
		this.load.image('pixel', 'assets/textures/Props/pixel1x1.png');
		this.load.image('hierba', 'assets/textures/Props/hierba.png');
		this.load.image('melendi','assets/textures/Characters/Melendi.png'); 
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
		// ponemos a dormir la escena que controla la UI
		this.scene.sleep('uimanager');

		//Imagen de fondo
		var bg = this.add.image(0, 0, 'bg2').setOrigin(0, 0);

		// bounds del mundo
        this.cameras.main.setBounds(0, 0, bg.displayWidth, bg.displayHeight);

		// Offset para el fondo
		let upperBackgroundOffset = 20;

		// creamos a manín
		this.manin = new Manin(this, 100, 50, this.scene.get('dialog'),"PARK");
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
		let npc1 = new NPC(this, 400, 400, 'kratos', 0, npc_dialogues);
		let npc2 = new NPC(this, 200, 200, 'aloy', 1, npc_dialogues);
		npc1.scale = 2.5;
		npc2.scale = 2.5;
		//#endregion
		// genera la hierba y su collider. (temporal)
		this.GenerateHostileGround();

        this.ChangeScene();

		//#region  añadimos colisiones (temporal)
		this.physics.add.collider(this.manin, npc1);
		this.physics.add.collider(this.manin, npc2);
		this.physics.add.collider(this.manin, bg);
		this.physics.add.collider(this.manin, bLeft);
		this.physics.add.collider(this.manin, bDown);
		this.physics.add.collider(this.manin, bRight);
		this.physics.add.collider(this.manin, bUp);
		this.manin.body.onCollide = true;

		//#endregion
		
		// generamos HUD de estado de party
		this.walkingHUD = new walkingHUD(40, 500, this, 'miniHUD')
		this.walkingHUD.depth = 3;

		this.pointer = this.add.image(0,0,'pointer').setOrigin(0,0);
		this.pointer.visible = false;
		this.pointer.depth = 3;
		// generamos el Menú
		this.menu = new ExploreMenu(620,100,this,'menuBG', this.pointer);
		this.menu.Show(false);
		this.showMenu = false;
	}
	
	// actualizamos el HUD de estado de party
	UpdateHUD(){
	 	this.walkingHUD.Update();

	}
	
	// generación de la hierba hostil (TEMPORAL)
	GenerateHostileGround(){
		this.hierbas = []; // array de hierbas
		this.hierbasColliders; //collider del trozo de hierba hostil

		// generamos las hierbas que se nos digan (en este caso 16 porque, de nuevo, TEMPORAL)
		for(let i = 0; i < 4; i++){
			for(let o = 0; o < 4; o++){
				this.hierbas.push(new enviromentObj(this,500 + 64*i,200 + 64 *o, 'hierba',2.5,2.5));
			}
		}
		// añadimos la zona de colisión
		this.hierbasColliders = this.add.zone(this.hierbas[0].x,this.hierbas[0].y - 55).setSize(this.hierbas[0].displayWidth +this.hierbas[0].displayWidth * 1.5,(this.hierbas[0].displayHeight) * 2.5 + 55).setOrigin(0,0);		
		this.physics.world.enable(this.hierbasColliders); // añadimos su collider
		this.hierbasColliders.body.setAllowGravity(false); // quitamos gravedad
		this.hierbasColliders.body.moves = false;
		
		// creamos eventos para decirle a manín cuándo está tocando o no suelo hostil
		this.hierbasColliders.on("overlapstart", () =>{
			this.manin.touchingGrass = true;
		})
		this.hierbasColliders.on("overlapend", () =>{
			this.manin.touchingGrass = false;
		})
		// añadimos un overlap entre manín y esta nueva zona de colliders
		this.physics.add.overlap(this.manin, this.hierbasColliders);
	}
    ChangeScene()
    {
        this.frias = []; // array de hierbas
		this.friasCollider; //collider del trozo de hierba hostil

		// generamos las hierbas que se nos digan (en este caso 16 porque, de nuevo, TEMPORAL)
		for(let i = 0; i < 1; i++){
			for(let o = 0; o < 4; o++){
				this.frias.push(new enviromentObj(this, 20*i,200 + 64 *o, 'fria',2.5,2.5));
			}
		}
		// añadimos la zona de colisión
		this.friasCollider = this.add.zone(this.frias[0].x,this.frias[0].y).setSize(this.frias[0].displayWidth-55 ,(this.frias[0].displayHeight)).setOrigin(0,0);		
		this.physics.world.enable(this.friasCollider); // añadimos su collider
		this.friasCollider.body.setAllowGravity(false); // quitamos gravedad
		this.friasCollider.body.moves = false;
		
		// creamos eventos para decirle a manín cuándo está tocando o no suelo hostil
		this.friasCollider.on("overlapstart", () =>{
			this.manin.touchingFria = true;
		})
		this.friasCollider.on("overlapend", () =>{
			this.manin.touchingFria = false;
		})
		// añadimos un overlap entre manín y esta nueva zona de colliders
		this.physics.add.overlap(this.manin, this.friasCollider);
    }

	updateInventory(inv){
		this.inventory = inv;
	}
	
	// comprobación de colisiones y apertura de menús
	update(){
		var touching = !this.hierbasColliders.body.touching.none;
		var wasTouching = !this.hierbasColliders.body.wasTouching.none;
		
		if(touching && !wasTouching) {this.hierbasColliders.emit("overlapstart");}
		else if(!touching && wasTouching) this.hierbasColliders.emit("overlapend");

        var touchingFria = !this.friasCollider.body.touching.none;
		var wasTouchingFria = !this.friasCollider.body.wasTouching.none;
		
		if(touchingFria && !wasTouchingFria) {this.friasCollider.emit("overlapstart");}
		else if(!touchingFria && wasTouchingFria) this.friasCollider.emit("overlapend");

		// 
		if(Phaser.Input.Keyboard.JustDown(this.qKey)) {this.showMenu = !this.showMenu; this.menu.Show(this.showMenu); }
	}

	// pasamos a la escena de pelea
    Fight(){
		this.manin.touchingGrass = false;
        this.scene.launch('fightscene');
		this.scene.get('fightscene').LoadInventory(this.inventory);
		this.scene.get('fightscene').CurrentScene('park');
        this.scene.sleep('park');
    }

	
	Plaza(){
		this.manin.touchingFria = false;
		this.manin.touchingGrass = false;
        		
        this.scene.wake('movement');
		this.scene.get('movement').LoadInventory(this.inventory);
		this.scene.get('movement').LoadManin();
        this.scene.sleep('park');
    }
	LoadInventory(inv){
		this.inventory = inv;
	}
	LoadManin(){
		
		this.manin.x=this.frias[1].x+70
		this.manin.y=this.frias[1].y
		this.manin.touchingFria = false;
	}
}