import Manin from '../obj/manin.js';
import enviromentObj from '../obj/enviromentObj.js';
import Bound from '../obj/bound.js';
import NPC from '../obj/npc.js';

/**
 * Escena principal.
 * @extends Phaser.Scene
 */
export default class MovementExample extends Phaser.Scene {
	
	constructor() {
		super({ key: 'movement' });
	}
	
	preload(){
		this.load.image('manin', 'assets/textures/Manín.png');
		this.load.image('bg', 'assets/textures/bg.png');
		this.load.image('house', 'assets/textures/house.png');
		this.load.image('pixel', 'assets/textures/pixel1x1.png');
		
		//TEST DE NPCS
		this.load.image('melendi','assets/textures/Melendi.png'); 
		
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
		let manin = new Manin(this, 100, 50);
		let npc1 = new NPC(this, 400, 400, 'melendi', 0);
		let bLeft = new Bound(this, -1, 0,1,bg.displayHeight);
		let bRight = new Bound(this, bg.displayWidth, 0,1,bg.displayHeight);
		let bUp = new Bound(this, 0, -1,bg.displayWidth,1);
		let bDown = new Bound(this, 0, bg.displayHeight,bg.displayWidth,1);
        this.cameras.main.startFollow(manin);
        let house = new enviromentObj(this,400,300, 'house');
		npc1.readDialogues();
        
		let scene = this; // Nos guardamos una referencia a la escena para usarla en la función anidada que viene a continuación
		
		manin.body.onCollide = true; // Activamos onCollide para poder detectar la colisión del caballero con el suelo

		this.physics.add.collider(manin, npc1);
		this.physics.add.collider(manin, house);
		this.physics.add.collider(manin, bg);
		this.physics.add.collider(manin, bLeft);
		this.physics.add.collider(manin, bDown);
		this.physics.add.collider(manin, bRight);
		this.physics.add.collider(manin, bUp);

		/*
		 * Escuchamos los eventos de colisión en el mundo para poder actuar ante ellos
		 * En este caso queremos detectar cuando el caballero colisiona con el suelo para activar el salto del personaje
		 * El salto del caballero lo desactivamos en su "clase" (archivo knight.js) para evitar dobles saltos
		 * También comprobamos si está en contacto con alguna caja mientras ataca, en ese caso destruimos la caja
		 */
	}

    Fight(){
        this.scene.launch('fightscene');
        this.scene.sleep('movement');
    }
}