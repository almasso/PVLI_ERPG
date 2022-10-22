import Character from '../fight/Character.js'

export class FightScene extends Phaser.Scene {
	constructor(party) {
		super({ key: 'fightscene'});
		this.bg;
		this.fleeButton;
		this.party = party;
		this.charBlocks = [];
	}
	
	preload(){
		// cargar personajes
		this.load.image('manin', 'assets/Manín.png');
		this.load.image('fightBg','assets/bgFight.png')
		//this.load.image('melendi','assets/Melendi.png')
		this.load.image('dinoseto','assets/DinosetoFinal.png')
		this.load.image('attackPointer','assets/attackPointer.png');

		// cargar los botones
		this.load.image('fightBg','assets/bgFight.png')
		this.load.image('attackButton','assets/attackButton.png');
		this.load.image('attackButtonHover','assets/attackButtonHover.png');
		this.load.image('objectButton','assets/objectButton.png');
		this.load.image('objectButtonHover','assets/objectButtonHover.png');
		//this.load.image('fleeButton','assets/fleeButton.png');
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

	SelectTarget(attack){ // Falta implementar esto con varios personajes y enemigos (¿Arrays de personajes y enemigos con un index que se le pase al metodo?)
		if(this.character.mp >= attack.requiredMps)  // Condicion para no dejar hacer el ataque si no hay mps
		{
			this.character.mp -= attack.requiredMps;  
			this.enemy.Damage(attack);
			this.enemyHud.Update();
			this.allyHud.ManaBar.updateValue(this.character.mp);
			this.allyHud.ManaBar.draw();
			this.CheckEnemies();	
		}
		else
		{
			// Feedback de que no tienes mps
		}
	}

	CheckEnemies(){
		// Esto tiene que ver el estado de los enemigos cada vez que les pegan. 
		if(this.enemy.Dead){
			this.EndCombat();
		}
	}

	EndCombat(){
		this.scene.wake('movement');
		this.scene.stop('fightscene');
	}

	create(){
		/*
		Esto de aquí lo usaremos cuando le pasemos la party a esta escena, aunque no sé muy bien cómo
		this.party.foreach(function (character){
			this.charBlocks[0] = new AllyHUD(this,character, 'AllyBlock', 'attackBlock');
		});*/
		this.aux = new InputMan(this);
		this.bg = this.add.image(-150, 0, 'fightBg').setOrigin(0, 0);
		this.bg.setScale(0.8);

		// Ahora mismo tenemos que crear el character porque no nos lo está pasando el EnviromentInfo. Tenemos que hacerlo uwu
		this.character = new Character(this,this.sys.game.canvas.width/2 - 50, 0, 'manin', 100, 100).setOrigin(0,0);
		this.character.visible = false;
		this.character.SetAttacks(0,0,0,0);
		this.character.SetStats(5,0,0,0,0,0,100);

		this.enemy = new Character(this,this.sys.game.canvas.width/2, this.sys.game.canvas.height/2,'dinoseto',100,100);
		this.enemy.visible = false;
		this.enemy.SetAttacks(0,0,0,0);
		this.enemy.SetStats(5,0,0,0,0,0,100);

		this.allyHud = new AllyHUD(this, this.character, 'AllyBlock', 'attackBlock');
		this.enemyHud = new EnemyHUD(this,this.enemy);

		this.pointer = this.add.image(0,0,'attackPointer');
		this.pointer.visible = false;

		this.CreateButtons();
	}

	attack=-1;
	combat=false;
	cursor=false;
	update(t,dt){
		// if(Phaser.Input.Keyboard.JustDown(this.aux.spaceKey)){
		// 	this.scene.wake('movement');
		// 	this.scene.sleep('fightscene');
		// }
	
		
		if(Phaser.Input.Keyboard.JustDown(this.aux.aKey)){	
			this.allyHud.DisplayAttacks();
			//this.attack=0;
		}
		if(this.combat===true)
		{
			
			if(Phaser.Input.Keyboard.JustDown(this.aux.dKey)){
			
		
				this.SelectTarget(this.allyHud.attackText[this.attack].srcAttack);
				this.enemyHud.Update();
				if(this.enemy.Dead){
					
					this.scene.wake('movement');				
					this.scene.sleep('fightscene');
					this.allyHud.DisplayAttacks();
					
					
				}
	
			}
			if(this.cursor===false){
				if(Phaser.Input.Keyboard.JustDown(this.aux.sKey)){
				
					if(this.attack<3)
					this.attack++;
					else this.attack=0;
				}
				if(Phaser.Input.Keyboard.JustDown(this.aux.wKey)){
					if(this.attack>0)
					this.attack--;
					else this.attack=3;
				}
			}
			if(this.attack!=-1){
				this.pointer.x = this.allyHud.attackText[this.attack].text.x-15;
				this.pointer.y = this.allyHud.attackText[this.attack].text.y+this.allyHud.attackText[this.attack].text.displayHeight/2;
			}
		}
	}
}

class HealthBar {

	constructor (scene, x, y, width, type, maxValue)
	{
		this.bar = new Phaser.GameObjects.Graphics(scene);

		this.x = x;
		this.y = y;
		this.value = 100;
		this.width = width;
		this.type = type;
		this.maxValue = maxValue;
		this.height = 10;
		scene.add.existing(this.bar);
		this.texto = scene.add.text(x + this.width/2.4, y + this.height/1.5, this.value + ' / '+maxValue + ' ' + type, { font: '"Press Start 2P"' });
		this.draw();
	}

	updateValue(newValue){
		this.value = newValue;
	}

	draw ()
	{
		this.bar.clear();

		this.texto.setText(this.value + ' / '+this.maxValue + ' ' + this.type)

		//  BG
		this.bar.fillStyle(0x000000);
		this.bar.fillRect(this.x, this.y, this.width, 10);
		//  Health
		if (this.value < 30 && this.type == 'HP')
		{
			this.bar.fillStyle(0xff0000);
		}
		else
		{
			if(this.type == 'HP') this.bar.fillStyle(0x00ff00);
			else this.bar.fillStyle(0x0000ff);
		}

		let barWidth = (this.value*this.width) / this.maxValue;

		this.bar.fillRect(this.x + 2, this.y + 2, barWidth - 4, 6);
	}
}
var colors = ['#cccccc','#aaaaaa','#ff0000','#00ffff','#ff00ff','#00ff00'];

class EnemyHUD{
	constructor(scene, character)
	{
		// cambiar esto por el propio character :)
		this.character = character;
		this.enemyImg = scene.add.image(scene.sys.game.canvas.width/2,scene.sys.game.canvas.height/2, character.imageId);
		this.enemyImg.setScale(3);
		this.healthBar = new HealthBar(scene,this.enemyImg.x - this.enemyImg.displayWidth/2, this.enemyImg.y + 11*this.enemyImg.displayHeight/20,this.enemyImg.displayWidth, 'HP',character.maxHp);
	}
	
	Update(){
		this.healthBar.updateValue(this.character.hp);
		this.healthBar.draw();
	}
}

class AllyHUD{
	constructor(scene, character, imgID, attackBlockID){
		// hacer offsets en función de la posición del Ally dado. Su posición será en función del número de integrantes de la party
		this.block = scene.add.image(scene.sys.game.canvas.width/2, 0, imgID);
		this.block.y = this.block.displayHeight/2;
		
		this.character = character;
		
		this.attackBlock = scene.add.image(this.block.x - 3*this.block.displayWidth/4, this.block.y*2, attackBlockID).setOrigin(0,0);
		this.attackBlock.setScale(1.5,1);
		this.attackBlock.visible = false;

		this.attacks = [character.GetAttack(0), character.GetAttack(1), character.GetAttack(2), character.GetAttack(3)];
		this.CreateAttacks(scene);
		
		// cambiar esto por el propio character :)
		this.charImg = scene.add.image(this.block.x, this.block.y - this.block.displayHeight / 5, character.imageId);
		this.charImg.setScale(0.13);
		
		this.HealthBar = new HealthBar(scene, this.block.x - this.block.displayWidth/2.5, this.block.y + this.block.displayHeight/6, 8*this.block.displayWidth/10, 'HP', this.character.maxHp);
		this.ManaBar = new HealthBar(scene, this.block.x - this.block.displayWidth/2.5, this.block.y + this.block.displayHeight/3.2, 8*this.block.displayWidth/10, 'MP', this.character.maxMp);
		this.scene = scene;
	}


	CreateAttacks(scene){
		this.attackText = [];
		let self = this;
		this.attacks.forEach(function (attack, index) {
			self.attackText[index] = {
				text: scene.add.text(self.attackBlock.x + self.attackBlock.displayWidth / 14, self.attackBlock.y + index * self.attackBlock.displayHeight / 4 + self.attackBlock.displayHeight/16, attack.name, 
				{
				font: '12px "Press Start 2P"',
				color: '#ffffff',
				align: 'left',}), 

				mp: scene.add.text(self.attackBlock.x + 7.5*self.attackBlock.displayWidth/10, self.attackBlock.y + index * self.attackBlock.displayHeight / 4 + self.attackBlock.displayHeight/16, attack.requiredMps + " MP", 
				{
				font: '12px "Press Start 2P"',
				fontStyle: 'bold',
				color: colors[attack.type],
				align: 'left',
				}), srcAttack: attack } 
			
			
			self.attackText[index].text.visible = false;
			self.attackText[index].mp.visible = false;

			self.attackText[index].text.setInteractive();
			self.CreateAttackButton(self.attackText[index]);
		});
	}

	i=0;
	CreateAttackButton(attackText){
		attackText.text.on('pointerover', () => {
			this.scene.cursor=true;
			// Esto funciona PERO no cambia el color, que era la forma isi. a ver si se puede hacer otra cosa para que se note que se está haciendo hover
			console.log("AA SUSTO");

				this.scene.pointer.x = attackText.text.x-15;
				this.scene.pointer.y = attackText.text.y+attackText.text.displayHeight/2;
				while(this.i<4)
				{
					if(this.attackText[this.i]===attackText) this.scene.attack=this.i;
					this.i++;
				}
				
			

		});
		attackText.text.on('pointerout', () => {
			this.scene.cursor=false;
			this.i=0;
		});
		attackText.text.on('pointerup', () => {
			this.scene.SelectTarget(attackText.srcAttack);
		})
		// attackText.text.on('pointerout', () =>{
		// 	attackText.color = "#ffffff";
		// 	this.scene.pointer.visible = false;
		// })
	}

	DisplayAttacks(){
		this.attackBlock.visible = !this.attackBlock.visible;
		this.attackText.forEach(function (attack){
			attack.text.visible = !attack.text.visible;
			attack.mp.visible = !attack.mp.visible;
		});
		
		
		if(this.scene.combat===false)
		{
			this.scene.combat=true;
			this.scene.pointer.visible = true;
			this.scene.attack=0;
			
		}
		else if(this.scene.combat===true)
		{
			this.scene.combat=false;
			this.scene.pointer.visible = false;
			this.scene.attack=-1;
		}
			
		
	}

	Update(){
		this.healthBar.draw();
	}
}

class InputMan extends Phaser.GameObjects.Sprite{
	constructor(scene){
		super(scene,-100,-100,'pixel1x1');
		this.scene.add.existing(this); //Añadimos a Manín a la escena
        
		this.wKey = this.scene.input.keyboard.addKey('W'); // move up
		this.aKey = this.scene.input.keyboard.addKey('A'); // Attack
		this.sKey = this.scene.input.keyboard.addKey('S'); // move down
		this.dKey = this.scene.input.keyboard.addKey('D'); // move right
		this.spaceKey = this.scene.input.keyboard.addKey('SPACE'); // interact
		
	}
}