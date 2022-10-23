import Character from '../fight/Character.js'
import {allyParty} from '../fight/Party.js'
import {EnemiesInfo} from '../fight/EnviromentInfo.js'

export class FightScene extends Phaser.Scene {
	constructor() {
		super({ key: 'fightscene'});
		this.bg;
		this.enemiesInfo = EnemiesInfo;
		this.selectedAttack;
	}

	preload(){
		// cargar personajes
		this.load.image('manin', 'assets/Manín.png');
		this.load.image('fightBg','assets/bgFight.png')
		this.load.image('melendi','assets/Melendi.png')
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
			this.alliesHud[this.currentAlly].DisplayAttacks();
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


	ToggleAttackButtons(bool)
	{
		if(bool)
		{
			this.attackButton.setInteractive();
			this.attackButtonHover.setInteractive();
		}
		else
		{
			this.attackButton.disableInteractive();
			this.attackButtonHover.disableInteractive();
		}
	}

	ToggleObjectButtons(bool)
	{
		if(bool)
		{
			this.objectButton.setInteractive();
			this.objectButtonHover.setInteractive();
		}
		else
		{
			this.objectButton.disableInteractive();
			this.objectButtonHover.disableInteractive();
		}
	}

	ToggleButtons(bool){

		this.ToggleAttackButtons(bool);
		this.ToggleObjectButtons(bool);
	}

	EnableTargetting(array){ // Falta implementar esto con varios personajes y enemigos (¿Arrays de personajes y enemigos con un index que se le pase al metodo?)
		
		for(let i = 0; i < array.length; i++){
			if(!array[i].dead) array[i].setInteractive();
		}
	}
	DisableTargetting(array){ // Falta implementar esto con varios personajes y enemigos (¿Arrays de personajes y enemigos con un index que se le pase al metodo?)
		
		for(let i = 0; i < array.length; i++){
			array[i].disableInteractive();
		}
		this.pointer.visible = false;
	}

	CheckState(array){
		let i = 0;
		while(i < array.length && array[i].dead){
			i++;
		}
		return i === array.length;
	}

	EndCombat(){
		this.ReturnParty();
		this.scene.wake('movement');
		this.scene.stop('fightscene');
	}

	LoadParty(){
		this.allies = [];
		let self = this;
		allyParty.party.forEach(function (ally, index){
			self.allies[index] = new Character(self,(index+1)*self.sys.game.canvas.width/(allyParty.party.length+1), 38, ally.imgID, ally.actualHp, ally.maxHp, ally.actualMp, ally.maxMp);
			self.allies[index].SetStats(ally.rP, ally.rR, ally.rF, ally.rE,ally.rT, ally.acurracy, ally.speed);
			self.allies[index].dead = ally.dead;
			let scene = self;
			ally.attack.forEach(function (attack) {
				scene.allies[index].SetAttacks(attack);
			})
			self.alliesHud.push(new AllyHUD(self,self.allies[index]));
			self.allies[index].scale = 0.08;
			self.allies[index].depth = 1;
			self.AddPartySelector(self.allies[index]);
		})
	}

	AddPartySelector(ally){
		ally.on("pointerover",() => {
			//console.log("SELECCIONANDO A " + enemy.imageId);
			this.pointer.visible = true;
			this.pointer.x = ally.x - 75;
			this.pointer.y = ally.y;
			this.pointer.angle = 0;
		})
		ally.on("pointerout",() => {
			this.pointer.visible = false;
			//console.log("YA NO ESTÁ SELECCIONANDO A " + enemy.imageId);			
		})
		ally.on("pointerup",() => {
			console.log("SUPPORTEANDO A " + ally.imageId);
			this.allies[this.currentAlly].targets.push(ally);
			if(this.selectedAttack.targets === this.allies[this.currentAlly].targets.length) {this.AllyAttack()}
		})
	}

	ReturnParty()
	{
		let self = this;
		allyParty.party.forEach(function (ally, index)
		{
			ally.actualHp = self.allies[index].actualHp;
			ally.actualMp = self.allies[index].actualMp;
			ally.dead = self.allies[index].dead;
		})
	}

	// physicalRes, rangedRes, fireRes, electricalRes, toxicRes, acurracy, speed
	GenerateRandomEncounter(){
		this.enemies = [];
		let enemiesNumber = 2//this.GetRandom(5, false);
		for(let i = 0; i < enemiesNumber; i++){
			let enemyType = this.GetRandom(this.enemiesInfo.length, true);
			if(i === 0) {
				this.enemies[0] = new Character(this,this.sys.game.canvas.width/2 +50, 400, this.enemiesInfo[enemyType].imgID, this.enemiesInfo[enemyType].actualHp, this.enemiesInfo[enemyType].maxHp, this.enemiesInfo[enemyType].actualMp, this.enemiesInfo[enemyType].maxMp);
			}
			else{
				this.enemies[i] = new Character(this,this.enemies[0].x + Math.pow(-1,i - 1)*(Math.floor(i-1/2 + 1))*75+(75*Math.floor(i/2)* Math.pow(-1,i)), 400, this.enemiesInfo[enemyType].imgID, this.enemiesInfo[enemyType].actualHp, this.enemiesInfo[enemyType].maxHp, this.enemiesInfo[enemyType].actualMp, this.enemiesInfo[enemyType].maxMp);
			}
			this.enemies[i].SetStats(this.enemiesInfo[enemyType].rP, this.enemiesInfo[enemyType].rR, this.enemiesInfo[enemyType].rF, this.enemiesInfo[enemyType].rE,
			this.enemiesInfo[enemyType].rT, this.enemiesInfo[enemyType].acurracy, this.enemiesInfo[enemyType].speed);
			this.enemiesHud.push(new EnemyHUD(this,this.enemies[i]));
			
			for(let o = 0; o < this.enemiesInfo[enemyType].attack.length; o++)
			{
				this.enemies[i].SetAttacks(this.enemiesInfo[enemyType].attack[o]);
			}
			this.enemies[i].scale = 0.13;
			this.AddEnemySelector(this.enemies[i]);
		}
	}

	// Genera un random de 0 a maxRange (enteros)
	GetRandom(maxRange, bool){
		// esto nos sirve para sumar 1 al resultado o no dependiendo si buscamos un índice o qué onda
		if(bool) return Math.floor(Math.random()*maxRange); 
		else return Math.floor(Math.random()*maxRange + 1);
	}

	EnemyAttacks(){
		let i = 0;
		while(i < this.enemies.length && !this.CheckState(this.allies)){
			if(!this.enemies[i].dead){
				console.log("AtacandO!");
				let selectedAttack = 0;//this.GetRandom(this.enemies[i].attacks.length, true);
				let selectedTarget = [];
				for(let o = 0; o < this.enemies[i].GetAttack(selectedAttack).targets; o++){
					let random = this.GetRandom(this.allies.length, true);
					while(this.allies[random].dead) { random = (random +1) % this.allies.length};
					selectedTarget.push(random);
					this.enemies[i].targets.push(this.allies[selectedTarget[o]]);
				}
				this.enemies[i].Attack(this.enemies[i].GetAttack(selectedAttack));
				for(let h = 0; h < selectedTarget.length; h++){
					this.alliesHud[selectedTarget[h]].Update();
				}
				console.log(this.enemies[i].GetAttack(selectedAttack).name + this.enemies[i].GetAttack(selectedAttack).dmg)
				console.log(selectedTarget);
				this.enemies[i].targets = [];
			}
			i++;
		}
		if(i < this.enemies.length) this.EndCombat();
	}

	NextAlly(){
		if(this.CheckState(this.enemies) || this.CheckState(this.allies)){ this.EndCombat(); }
		else {
			if (this.currentAlly + 1 === this.allies.length){
				// PUM ataque enemigos
				this.EnemyAttacks();
			}

			this.currentAlly = (this.currentAlly + 1) % this.allies.length;
			if(this.allies[this.currentAlly].dead) this.NextAlly();
		}
	}

	AllyAttack(){
		this.allies[this.currentAlly].Attack(this.selectedAttack);
		let self = this;
		this.allies[this.currentAlly].targets.forEach(function (enemy) {
			let i = 0;
			if(self.selectedAttack.isSupport()){
				while(self.alliesHud[i].character !== enemy){i++;}
				self.alliesHud[i].Update();
			}
			else{
				while(self.enemiesHud[i].character !== enemy){i++;}
				self.enemiesHud[i].Update();
			}
		})
		this.allies[this.currentAlly].targets = [];
		if(this.selectedAttack.isSupport())this.DisableTargetting(this.allies);
		this.DisableTargetting(this.enemies);
		this.ToggleButtons(true);
		this.alliesHud[this.currentAlly].Update();
		this.NextAlly();
	}

	AddEnemySelector(enemy){
		enemy.on("pointerover",() => {
			//console.log("SELECCIONANDO A " + enemy.imageId);
			this.pointer.visible = true;
			this.pointer.x = enemy.x;
			this.pointer.y = enemy.y - 75;
			this.pointer.angle = 90;
		})
		enemy.on("pointerout",() => {
			this.pointer.visible = false;
			//console.log("YA NO ESTÁ SELECCIONANDO A " + enemy.imageId);			
		})
		enemy.on("pointerup",() => {
			console.log("ATACANDO A " + enemy.imageId);
			this.allies[this.currentAlly].targets.push(enemy);
			if(this.selectedAttack.targets === this.allies[this.currentAlly].targets.length) {this.AllyAttack()}
		})
	}

	create(){
		/*
		Esto de aquí lo usaremos cuando le pasemos la party a esta escena, aunque no sé muy bien cómo
		this.party.foreach(function (character){
			this.charBlocks[0] = new AllyHUD(this,character, 'AllyBlock', 'attackBlock');
		});*/
		
		// INPUT
		this.aux = new InputMan(this);
		
		// FONDO
		this.bg = this.add.image(-150, 0, 'fightBg').setOrigin(0, 0);
		this.bg.setScale(0.8);

		// Creación de Party
		this.alliesHud = [];
		this.LoadParty();
		// Creación de enemigos
		this.enemiesHud = [];
		this.GenerateRandomEncounter();

		this.currentAlly = 0;

		// Ahora mismo tenemos que crear el character porque no nos lo está pasando el EnviromentInfo. Tenemos que hacerlo uwu
		this.character = new Character(this,this.sys.game.canvas.width/2, 10, 'manin', 100, 100).setOrigin(0,0);
		this.character.scale = 0.13;
		this.character.depth = 1;
		this.character.visible = false;

		//this.character.visible = false;
		for(let i = 0; i < 4; i++)
		{
			this.character.SetAttacks({name: 'cosa', type: 0, dmg: 20, requiredMps: 10, targets: 1});
		}
		this.character.SetStats(5,0,0,0,0,0,100);

		this.pointer = this.add.image(0,0,'attackPointer');
		this.pointer.visible = false;
		this.pointer.depth = 2;

		this.CreateButtons();

		if(this.allies[0].dead) this.NextAlly(); // Si el primer personaje está muerto, que se actualice el turno
	}
	update(t,dt){
	/*	if(Phaser.Input.Keyboard.JustDown(this.aux.spaceKey)){
			this.scene.wake('movement');
			this.scene.sleep('fightscene');
		}
		if(Phaser.Input.Keyboard.JustDown(this.aux.dKey)){
			this.enemy.Damage(this.character.GetAttack(0));
			this.enemyHud.Update();
			if(this.enemy.Dead){
				this.scene.wake('movement');
				this.scene.sleep('fightscene');
			}
		}*/
	}
}

class HealthBar {

	constructor (scene, x, y, width, type, initialValue, maxValue)
	{
		this.bar = new Phaser.GameObjects.Graphics(scene);
		this.x = x;
		this.y = y;
		this.value = initialValue;
		this.width = width;
		this.type = type;
		this.maxValue = maxValue;
		this.height = 10;
		scene.add.existing(this.bar);
		this.texto = scene.add.text(x + this.width/3.2, y + this.height/1.5, this.value + ' / '+maxValue + ' ' + type, { font: '"Press Start 2P"' });
		this.draw();
	}

	Update(newValue){
		this.updateValue(newValue);
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
		this.healthBar = new HealthBar(scene,this.character.x - this.character.displayWidth/16, this.character.y + this.character.displayHeight/15,this.character.displayWidth/8, 'HP', this.character.actualHp, this.character.maxHp);
	}
	
	Update(){
		this.healthBar.Update(this.character.actualHp)
	}
}

class AllyHUD{
	constructor(scene, character){
		// hacer offsets en función de la posición del Ally dado. Su posición será en función del número de integrantes de la party
		this.block = scene.add.image(character.x, 0, 'AllyBlock');
		this.block.y += this.block.displayHeight/2;
		
		this.character = character;
		
		this.attackBlock = scene.add.image(this.block.x - 3*this.block.displayWidth/4, this.block.y*1.94, 'attackBlock').setOrigin(0,0);
		this.attackBlock.setScale(1.5,1);
		this.attackBlock.visible = false;

		this.attacks = [character.GetAttack(0), character.GetAttack(1), character.GetAttack(2), character.GetAttack(3)];
		this.CreateAttacks(scene);
		
		
		this.HealthBar = new HealthBar(scene, this.block.x - this.block.displayWidth/2.5, this.block.y + this.block.displayHeight/6, 8*this.block.displayWidth/10, 'HP', this.character.actualHp, this.character.maxHp);
		this.ManaBar = new HealthBar(scene, this.block.x - this.block.displayWidth/2.5, this.block.y + this.block.displayHeight/3.2, 8*this.block.displayWidth/10, 'MP', this.character.actualMp, this.character.maxMp);
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

	CreateAttackButton(attackText){
		attackText.text.on('pointerover', () => {
			// Esto funciona PERO no cambia el color, que era la forma isi. a ver si se puede hacer otra cosa para que se note que se está haciendo hover
			if(this.scene.allies[this.scene.currentAlly].CanAttack(attackText.srcAttack)){
			this.scene.pointer.visible = true;
			this.scene.pointer.x = attackText.text.x-15;
			this.scene.pointer.angle = 0;
			this.scene.pointer.y = attackText.text.y+attackText.text.displayHeight/2;
			this.scene.pointer.setScale(1);
			} else console.log("NO HAY PUNTERO ;-;");
		});
		attackText.text.on('pointerup', () => {
			if(this.scene.allies[this.scene.currentAlly].CanAttack(attackText.srcAttack)){
				this.scene.selectedAttack = attackText.srcAttack;
				if(attackText.srcAttack.isSupport()) this.scene.EnableTargetting(this.scene.allies);
				else {this.scene.EnableTargetting(this.scene.enemies)};
				this.DisplayAttacks();
				this.scene.ToggleButtons(false);
				this.scene.pointer.visible = false;
			} else console.log("No hay maná ;-;");
		})
		attackText.text.on('pointerout', () =>{
			this.scene.pointer.visible = false;
		})
	}

	DisplayAttacks(){
		this.attackBlock.visible = !this.attackBlock.visible;
		this.attackText.forEach(function (attack){
			attack.text.visible = !attack.text.visible;
			attack.mp.visible = !attack.mp.visible;
		});
		this.scene.ToggleObjectButtons(!this.attackBlock.visible);
	}

	Update(){
		this.HealthBar.Update(this.character.actualHp);
		this.ManaBar.Update(this.character.actualMp);
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