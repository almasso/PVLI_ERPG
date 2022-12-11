import {Manin, AllyTEST} from '../obj/manin.js';
import {enviromentObj, interactuableObj} from '../obj/enviromentObj.js';
import Bound from '../obj/bound.js';
import NPC from '../obj/npc.js';
import { EnviromentInfo } from '../fight/EnviromentInfo.js';

// Escena de exploración (temporal de momento)
export default class PortScene extends Phaser.Scene {
	
	// construimos la escena
	constructor() {
		super({ key: 'port' });
		this.manin; // protagonista
		//this.inventory = new Inventory();
		this.hierbasColliders = [];
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
		var bg = this.add.image(0, 0, 'square').setOrigin(0, 0);

		// bounds del mundo
        this.cameras.main.setBounds(0, 0, bg.displayWidth, bg.displayHeight);

		// Offset para el fondo
		let upperBackgroundOffset = 20;

		this.questLog = "test"; 

		// creamos a manín
		this.manin = new Manin(this, 300, 70, this.scene.get('dialog'), this.questLog,"PORT");
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
		// let npc4 = new NPC(this, 400, 300, 'elmotivao', 0, npc_dialogues, this.manin);
		// let npc5 = new NPC(this, 200, 200, 'vovovo', 1, npc_dialogues, this.manin);
		// let npc3 = new NPC(this, 300, 200, 'jatsune', 2, npc_dialogues,this.manin);
		// let npc1 = new NPC(this, 500, 100, 'aloy', 3, npc_dialogues, this.manin);
		// let npc2 = new NPC(this, 300, 100, 'kratos', 4, npc_dialogues, this.manin);
		// this.npcs = [npc1, npc2, npc3, npc4, npc5];
		// npc1.scale = 2.5;
		// npc2.scale = 2.5;
		// npc3.scale = 2.5;
		// npc4.scale = 2.5;
		// npc5.scale = 2.5;
		// genera la hierba y su collider. estaría guay parametrizarlo uwu.
		this.GenerateHostileGround(120, 400, 2, 1, 2.5);
		this.GenerateHostileGround(500, 200, 4, 4, 2.5);
		this.ChangeScene();
		
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
				this.frias.push(new enviromentObj(this,300+50*o,0, 'pixel',2.5,2.5));
			}
		
		// añadimos la zona de colisión
		this.friasCollider = this.add.zone(this.frias[0].x,this.frias[0].y ).setSize(this.frias[0].displayWidth+100,(this.frias[0].displayHeight-50) ).setOrigin(0,0);		
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

		// for(let i of this.npcs) {
		// 	if(this.physics.world.overlap(this.manin, i.trigger) && this.manin.collider == null) {
		// 		console.log("overlap")
		// 		this.manin.collider = i;
		// 	}
		// }
	
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
		this.scene.get('fightscene').CurrentScene('port');
        this.scene.sleep('port');
		this.scene.get('hud').Fight();
    }

	// pasamos a la escena de pelea
    

	Plaza(){
		this.manin.touchingFria = false;
		this.manin.touchingGrass = false;
        this.scene.wake('square');
		this.scene.get('square').LoadInventory(this.inventory);

        this.scene.sleep('port');
    }

	LoadInventory(inv){
		this.inventory = inv;
	}
	
}