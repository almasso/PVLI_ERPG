import Character from '../fight/Character.js'

export class FightScene extends Phaser.Scene {
	
	constructor() {
		super({ key: 'fightscene' });
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
		this.scene.get('uimanager');
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
	constructor(party) {
		super({ key: 'uimanager', active: true });
		this.bg;
		this.fleeButton;
		this.party = party;
		this.charBlocks = [];
	}
	
	preload(){
		// cargar los botones
		this.load.image('fightBg','assets/bgFight.png')
		this.load.image('attackButton','assets/attackButton.png');
		this.load.image('attackButtonHover','assets/attackButtonHover.png');
		this.load.image('objectButton','assets/objectButton.png');
		this.load.image('objectButtonHover','assets/objectButtonHover.png');
		this.load.image('fleeButton','assets/fleeButton.png');
		this.load.image('AllyBlock','assets/AllyBlock.png');
		this.load.image('attackBlock','assets/AllyAttack.png');
	}

	CreateButtons(){
		this.attackButton = this.add.image(this.sys.game.canvas.width/15,this.sys.game.canvas.height/2 + this.sys.game.canvas.height/30,'attackButton');
		this.attackButton.setScale(1.5);
		this.attackButton.setInteractive(); // Hacemos el sprite interactivo para que lance eventos

		this.attackButtonHover = this.add.image(this.attackButton.x,this.attackButton.y,'attackButtonHover');
		this.attackButtonHover.setScale(1.5);
		this.attackButtonHover.setInteractive(); // Hacemos el sprite interactivo para que lance eventos
		this.attackButtonHover.visible = false;

		this.objectButton = this.add.image(this.attackButton.x,this.attackButton.y + this.attackButton.displayHeight,'objectButton');
		this.objectButton.setScale(1.5);
		this.objectButton.setInteractive(); // Hacemos el sprite interactivo para que lance eventos

		this.objectButtonHover = this.add.image(this.objectButton.x,this.objectButton.y,'objectButtonHover');
		this.objectButtonHover.setScale(1.5);
		this.objectButtonHover.setInteractive(); // Hacemos el sprite interactivo para que lance eventos
		this.objectButtonHover.visible = false;
		
		// Falta botón de Huída.

		//#region input de Botones
		// Escuchamos los eventos del ratón cuando interactual con nuestro sprite de "Start"

		
		this.attackButton.on('pointerover', () => {
			// Hacer que el botón tenga otra imagen haciendo hover
			this.attackButton.visible = false;
			this.attackButtonHover.visible = true;
		});

		this.attackButtonHover.on('pointerup',()=>{
			this.allyHud.DisplayAttacks();
		})
		
		this.attackButtonHover.on('pointerout', () => {
			this.attackButton.visible = true;
			this.attackButtonHover.visible = false;
		})

		this.objectButton.on('pointerover', () => {
			// Hacer que el botón tenga otra imagen haciendo hover
			this.objectButton.visible = false;
			this.objectButtonHover.visible = true;
		});

	    this.objectButtonHover.on('pointerout', () => {
			this.objectButton.visible = true;
			this.objectButtonHover.visible = false;
		});

		//#endregion
	}

	create(){
		/*
		Esto de aquí lo usaremos cuando le pasemos la party a esta escena, aunque no sé muy bien cómo
		this.party.foreach(function (character){
			this.charBlocks[0] = new AllyHUD(this,character, 'AllyBlock', 'attackBlock');
		});*/
		
		this.bg = this.add.image(-150, 0, 'fightBg').setOrigin(0, 0);
		this.bg.setScale(0.8);

		// Ahora mismo tenemos que crear el character porque no nos lo está pasando el EnviromentInfo. Tenemos que hacerlo uwu
		this.character = new Character(this,this.sys.game.canvas.width/2 - 50, 0, 'manin', 100, 100).setOrigin(0,0);
		this.character.visible = false;
		this.character.SetAttacks(0,0,0,0);

		this.allyHud = new AllyHUD(this, this.character, 'AllyBlock', 'attackBlock');
		
		this.CreateButtons();
	}
}
class HealthBar {

	constructor (scene, x, y)
	{
		this.bar = new Phaser.GameObjects.Graphics(scene);

		this.x = x;
		this.y = y;
		this.value = 100;
		this.p = 76 / 100;

		this.draw();

		scene.add.existing(this.bar);
	}

	draw ()
	{
		this.bar.clear();

		//  BG
		this.bar.fillStyle(0x000000);
		this.bar.fillRect(this.x, this.y, 80, 16);

		//  Health

		this.bar.fillStyle(0xffffff);
		this.bar.fillRect(this.x + 2, this.y + 2, 76, 12);

		if (this.value < 30)
		{
			this.bar.fillStyle(0xff0000);
		}
		else
		{
			this.bar.fillStyle(0x00ff00);
		}

		var d = Math.floor(this.p * this.value);

		this.bar.fillRect(this.x + 2, this.y + 2, d, 12);
	}
}

class AllyHUD{
	constructor(scene, character, imgID, attackBlockID){
		this.block = scene.add.image(scene.sys.game.canvas.width/2, 0, imgID);
		this.block.y = this.block.displayHeight/2;
		this.character = character;
		this.attackBlock = scene.add.image(this.block.x - this.block.displayWidth/2, this.block.y*2, attackBlockID).setOrigin(0,0);
		this.attackBlock.visible = false;
		this.attacks = [character.GetAttack(0),character.GetAttack(1),character.GetAttack(2),character.GetAttack(3)];
		this.charImg = scene.add.image(this.block.x, this.block.y - this.block.displayHeight / 5, character.imageId);
		this.charImg.setScale(0.13);
		this.HealthBar = new HealthBar(scene, this.block.x - this.block.displayWidth/2.5, this.block.y + this.block.displayHeight/6);
	}

	DisplayAttacks(){
		this.attackBlock.visible = !this.attackBlock.visible;
	}

}

class InputMan extends Phaser.GameObjects.Sprite{
	constructor(scene){
		super(scene,-100,-100,'pixel1x1');
		this.scene.add.existing(this); //Añadimos a Manín a la escena
        
		this.wKey = this.scene.input.keyboard.addKey('W'); // move up
		this.aKey = this.scene.input.keyboard.addKey('A'); // move left
		this.sKey = this.scene.input.keyboard.addKey('S'); // move down
		this.dKey = this.scene.input.keyboard.addKey('D'); // move right
		this.spaceKey = this.scene.input.keyboard.addKey('SPACE'); // interact
	}
}