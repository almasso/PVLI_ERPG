import Manin from '../obj/manin.js';
import enviromentObj from '../obj/enviromentObj.js';
import Bound from '../obj/bound.js';
import NPC from '../obj/npc.js';

// Escena de exploración (temporal de momento)
export default class MovementExample extends Phaser.Scene {
	
	// construimos la escena
	constructor() {
		super({ key: 'movement' });
		this.manin; // protagonista
	}
	
	// cargamos todas las imágenes
	preload(){
		this.load.image('manin', 'assets/textures/Characters/Manin.png');
		this.load.image('bg', 'assets/textures/Backgrounds/bg.png');
		this.load.image('pixel', 'assets/textures/Props/pixel1x1.png');
		this.load.image('hierba', 'assets/textures/Props/hierba.png');
		this.load.image('melendi','assets/textures/Characters/Melendi.png'); 
		this.load.json('npc_dialogues', 'assets/dialogues/npc_dialog.json');

		// this.load.image('maninHead', 'assets/textures/HUD/explore/maninHead.png');
		// this.load.image('melendiHead', 'assets/textures/HUD/explore/melendiHead.png');
		// this.load.image('miniHUD', 'assets/textures/HUD/explore/miniHUD.png');

	}
	z
	/**
	* Creación de los elementos de la escena principal de juego
	*/

	// inicializamos la escena
	create() {
		// ponemos a dormir la escena que controla la UI
		this.scene.sleep('uimanager');

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
		let npc1 = new NPC(this, 400, 400, 'melendi', 0, npc_dialogues);
		let npc2 = new NPC(this, 200, 200, 'melendi', 1, npc_dialogues);
		npc1.scale = 2.5;
		npc2.scale = 2.5;
		//#endregion
		// genera la hierba y su collider. (temporal)
		this.GenerateHostileGround();

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
		
		// // generamos HUD de estado de party
		// this.walkingHUD = new walkingHUD(40, 500, this, 'miniHUD')
		// this.walkingHUD.depth = 3;
	}
	
	// actualizamos el HUD de estado de party
	// UpdateHUD(){
	// 	this.walkingHUD.Update();

	// }
	
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
	
	// comprobación de colisiones
	update(){
		var touching = !this.hierbasColliders.body.touching.none;
		var wasTouching = !this.hierbasColliders.body.wasTouching.none;
		
		if(touching && !wasTouching) {this.hierbasColliders.emit("overlapstart");}
		else if(!touching && wasTouching) this.hierbasColliders.emit("overlapend");
	}

	// pasamos a la escena de pelea
    Fight(){
		this.manin.touchingGrass = false;
        this.scene.launch('fightscene');
        this.scene.sleep('movement');
    }
}