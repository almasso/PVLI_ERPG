import Manin from '../obj/manin.js';
import enviromentObj from '../obj/enviromentObj.js';
import Bound from '../obj/bound.js';
import {EnviromentInfo} from '../fight/EnviromentInfo.js';
import NPC from '../obj/npc.js';

/**
 * Escena principal.
 * @extends Phaser.Scene
 */
export default class MovementExample extends Phaser.Scene {
	
	constructor() {
		super({ key: 'movement' });
		this.enviromentInfo = EnviromentInfo;
		this.manin;
		this.hierbas = [];
	}
	
	preload(){
		this.load.image('manin', 'assets/Manín.png');
		this.load.image('bg', 'assets/bg.png');
		this.load.image('house', 'assets/house.png');
		this.load.image('pixel', 'assets/pixel1x1.png');
		this.load.image('hierba', 'assets/hierba.png')

		//TEST DE NPCS
		this.load.image('melendi','assets/textures/Melendi.png'); 
		//TEST DE JSON
		this.load.json('npc_dialogues', '../../assets/dialogues/npc_dialog.json');
		
        /*this.load.spritesheet('knight', 'assets/Knight/knight.png', {frameWidth: 72, frameHeight: 86})
		this.load.spritesheet('box', 'assets/Box/box.png', {frameWidth: 64, frameHeight: 64})*/
	}
	z
	/**
	* Creación de los elementos de la escena principal de juego
	*/
    
	create() {

        this.scene.sleep('uimanager');
		//Imagen de fondo
		var bg = this.add.image(0, 0, 'bg').setOrigin(0, 0);

        this.cameras.main.setBounds(0, 0, bg.displayWidth, bg.displayHeight);

		//Instanciamos nuestro personaje, que es un caballero, y la plataforma invisible que hace de suelo
		let npc_dialogues = this.cache.json.get('npc_dialogues');
		let npc1 = new NPC(this, 400, 400, 'melendi', 0, npc_dialogues);
		//

		let manin = new Manin(this, 100, 50);
		let bLeft = new Bound(this, -1, 0,1,bg.displayHeight);
		let bRight = new Bound(this, bg.displayWidth, 0,1,bg.displayHeight);
		let bUp = new Bound(this, 0, -1,bg.displayWidth,1);
		let bDown = new Bound(this, 0, bg.displayHeight,bg.displayWidth,1);
        this.cameras.main.startFollow(this.manin);
        let house = new enviromentObj(this,400,300, 'house',0.2,0.2);

		// genera la hierba y su collider. estaría guay parametrizarlo uwu.
		this.GenerateHostileGround();

		this.manin.body.onCollide = true; // Activamos onCollide para poder detectar la colisión del caballero con el suelo

		this.physics.add.collider(manin, npc1);

		this.physics.add.collider(manin, house);
		this.physics.add.collider(manin, bg);
		this.physics.add.collider(manin, bLeft);
		this.physics.add.collider(manin, bDown);
		this.physics.add.collider(manin, bRight);
		this.physics.add.collider(manin, bUp);
		manin.collider = null;

		scene.physics.world.on('collide', function(gameObject1, gameObject2, body1, body2) {
			console.log("HA HABIDO COLISIÓN")
			gameObject1.collider = gameObject2;
		});
	}
	// estaría muy guay parametrizar esto de aquí, pero de momento lo dejamos para esto de forma genérica :)
	GenerateHostileGround(){
		this.hierbas = [];
		this.hierbasColliders;

		for(let i = 0; i < 4; i++){
			for(let o = 0; o < 4; o++){
				this.hierbas.push(new enviromentObj(this,500 + 64*i,200 + 64 *o, 'hierba',2.5,2.5));
			}
		}
		
		this.hierbasColliders = this.add.zone(this.hierbas[0].x,this.hierbas[0].y).setSize(this.hierbas[0].displayWidth +this.hierbas[0].displayWidth * 2.0,this.hierbas[0].displayHeight * 2.5).setOrigin(0,0);		
		this.physics.world.enable(this.hierbasColliders);
		this.hierbasColliders.body.setAllowGravity(false);
		this.hierbasColliders.body.moves = false;
		
		this.hierbasColliders.on("overlapstart", () =>{
			this.manin.touchingGrass = true;
		})
		this.hierbasColliders.on("overlapend", () =>{
			this.manin.touchingGrass = false;
		})
		this.physics.add.overlap(this.manin, this.hierbasColliders);
	}
	
	update(){
		var touching = !this.hierbasColliders.body.touching.none;
		var wasTouching = !this.hierbasColliders.body.wasTouching.none;
		
		if(touching && !wasTouching) {this.hierbasColliders.emit("overlapstart");}
		else if(!touching && wasTouching) this.hierbasColliders.emit("overlapend");
	}

    Fight(){
		this.manin.touchingGrass = false;
        this.scene.launch('fightscene');
        this.scene.sleep('movement');
    }
}