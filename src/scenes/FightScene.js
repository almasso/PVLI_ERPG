export class FightScene extends Phaser.Scene {
	
	constructor() {
		super({ key: 'fightscene' });
		this.aux;
	}
	
	preload(){
		// Cargar imagenes de todos los enemigos y jugadores
		this.load.image('manin', 'assets/Manín.png');
		this.load.image('fightBg','assets/bgFight.png')
		this.load.image('melendi','assets/Melendi.png')
	}
	
	/**
	 * Creación de los elementos de la escena principal de juego
	 */ 
	create() {
		this.aux = new InputMan(this);
		//Imagen de fondo
		this.scene.wake('uimanager');
		this.scene.get('uimanager').SetUI(true);
		//Instanciamos nuestro personaje, que es un caballero, y la plataforma invisible que hace de 
	}
	
	update(t,dt){
		if(Phaser.Input.Keyboard.JustDown(this.aux.spaceKey)){
			this.scene.wake('movement');
			this.scene.sleep('uimanager');
			this.scene.sleep('fightscene');
		}
	}

	Reset(){
		this.create();
	}
}

export class UI_Manager extends Phaser.Scene {
	constructor() {
		super({ key: 'uimanager', active: true });
		this.bg;
	}
	
	preload(){
		// cargar los botones
		this.load.image('fightBg','assets/bgFight.png')
	}

	create(){
		this.bg = this.add.image(-150, 0, 'fightBg').setOrigin(0, 0);
		this.bg.setScale(0.8);
		this.SetUI(false);
	}
	
	SetUI(bool){
		console.log("ASDASDAS");
		this.bg.visible = bool;
	}
}

class InputMan extends Phaser.GameObjects.Sprite{
	constructor(scene){
		super(scene,-100,-100,'pixel1x1');
		this.scene.add.existing(this); //Añadimos a Manín a la escena
        this.stepsWalked = 0;
        
		this.wKey = this.scene.input.keyboard.addKey('W'); // move up
		this.aKey = this.scene.input.keyboard.addKey('A'); // move left
		this.sKey = this.scene.input.keyboard.addKey('S'); // move down
		this.dKey = this.scene.input.keyboard.addKey('D'); // move right
		this.spaceKey = this.scene.input.keyboard.addKey('SPACE'); // interact
	}
}