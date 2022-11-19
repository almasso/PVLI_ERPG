import Character from '../fight/Character.js'
import {allyParty} from '../fight/Party.js'
import {EnemiesInfo} from '../fight/EnviromentInfo.js'
import {InputMan} from '../fight/InputManager.js'
import {Log, AllyHUD, EnemyHUD} from '../fight/HUD.js'


const FightState = {
	SelectTurn: 0,
	ChooseAttack: 1,
	EnemyChooseAttack: 2,
	ChooseEnemy: 3,
	ChooseAlly: 4,
	ExecuteAttack: 5,
	TimeUntilNextTurn: 6,
	Finish: 7
};

export class FightScene extends Phaser.Scene {
	constructor() {
		super({ key: 'fightscene'});
		this.bg;
		this.enemiesInfo = EnemiesInfo;
		this.selectedAttack;
		this.timeBetweenAttacks = 2000;
		this.state = FightState.SelectTurn;
	}

	preload(){
		// cargar personajes
		this.load.image('manin', 'assets/textures/Characters/Manin.png');
		this.load.image('fightBg','assets/textures/Backgrounds/parqueLucha.png')
		this.load.image('melendi','assets/textures/Characters/Melendi.png')
		//this.load.image('artista','assets/textures/Artista.png')
		this.load.image('artista2','assets/textures/Characters/Artista2.png')
		this.load.image('culturista','assets/textures/Characters/Culturista.png')
		this.load.image('dinoseto','assets/textures/Characters/Dinoseto.png')
		this.load.image('angel','assets/textures/Characters/AngelCaido.png')
		this.load.image('attackPointer','assets/textures/HUD/attackPointer.png');
		
		// cargar los botones
		this.load.image('log','assets/textures/HUD/log.png');
		this.load.image('logButton','assets/textures/HUD/logButton.png');
		this.load.image('attackButton','assets/textures/HUD/attackButton.png');
		this.load.image('attackButtonHover','assets/textures/HUD/attackButtonHover.png');
		this.load.image('objectButton','assets/textures/HUD/objectButton.png');
		this.load.image('objectButtonHover','assets/textures/HUD/objectButtonHover.png');
		//this.load.image('fleeButton','assets/textures/fleeButton.png');
		this.load.image('AllyBlock','assets/textures/HUD/AllyBlock.png');
		this.load.image('attackBlock','assets/textures/HUD/AllyAttack.png');
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
		
		this.logUp = this.add.image(620, 515,'logButton');
		this.logDown = this.add.image(620,this.logUp.y + 50,'logButton');
		this.logUp.setInteractive();
		this.logDown.setInteractive();
		this.logUp.setScale(2);
		this.logDown.setScale(2);
		this.logDown.angle = 180;
		// Falta botón de Huída.

		//#region input de Botones
		// Escuchamos los eventos del ratón cuando interactual con nuestro sprite de "Start"
		
		this.attackButton.on('pointerover', () => {
			// Hacer que el botón tenga otra imagen haciendo hover
			this.attackButton.visible = false;
			this.attackButtonHover.visible = true;
		});

		this.attackButtonHover.on('pointerup',()=>{
			this.alliesHud[this.currentAlly].DisplayAttacks(true);
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

		this.logUp.on('pointerup', () =>{
			// Mover el Log hacia arriba
			this.log.Up();
		})

		this.logDown.on('pointerup', () =>{
			// Mover el Log hacia abajo
			this.log.Down();
		})
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
		this.attack=-1;
		this.allaySelected=-1;
		this.enemyselected=-1;
		this.choseA=false;
		this.choseE=false;
		this.combat=false;
		if(!this.CheckState(this.allies))
		{
			this.scene.wake('movement');
		}
		else
		{
			this.scene.launch('final');
			this.scene.stop('movement');
		}
		this.state = FightState.SelectTurn;
		this.scene.stop('fightscene');
	}

	LoadParty(){
		this.allies = [];
		let self = this;
		allyParty.party.forEach(function (ally, index){
			self.allies[index] = new Character(self,ally.name,(index+1)*self.sys.game.canvas.width/(allyParty.party.length+1), 38, ally.imgID, ally.actualHp, ally.maxHp, ally.actualMp, ally.maxMp);
			self.allies[index].SetStats(ally.rP, ally.rR, ally.rF, ally.rE,ally.rT, ally.acurracy, ally.speed);
			self.allies[index].dead = ally.dead;
			let scene = self;
			ally.attack.forEach(function (attack) {
				scene.allies[index].SetAttacks(attack);
			})
			self.alliesHud.push(new AllyHUD(self,self.allies[index]));
			self.allies[index].scale = 2;
			self.allies[index].depth = 1;
			self.AddPartySelector(self.allies[index]);
		})
	}
	
    k=0;//···RAUL PRUEBAS···
	AddPartySelector(ally){
		ally.on("pointerover",() => {
			//console.log("SELECCIONANDO A " + enemy.imageId);
			this.pointer.visible = true;
			this.cursor=true;//···RAUL PRUEBAS···
			this.pointer.x = ally.x - 75;
			this.pointer.y = ally.y;
			this.pointer.angle = 0;
			//···RAUL PRUEBAS···
			while(this.k<this.allies.length)
			{
				if(this.allies[this.k]===ally)this.allaySelected=this.k;
				this.k++;
			}
		})
		ally.on("pointerout",() => {
			//this.pointer.visible = false;
			//···RAUL PRUEBAS···
			this.cursor=false;
			this.k=0;
			//console.log("YA NO ESTÁ SELECCIONANDO A " + enemy.imageId);			
		})
		ally.on("pointerup",() => {
			console.log("SUPPORTEANDO A " + ally.imageId);
			this.allies[this.currentAlly].targets.push(ally);
			if(this.selectedAttack.targets === this.allies[this.currentAlly].targets.length) {this.RequestChangeState()}
		})
	}

	BuildLog(chName,attackInfo, effective,enemy, index){
		let text = chName+" atacó con "+attackInfo.name+" a "+enemy.name+". ";
		if(effective[index] === -1) {text+="¡Es super efectivo!";}
		else if (effective[index] === 1) {text+= "No es muy efectivo..."}
		else if(effective[index] === 2){text+="Pero no tuvo efecto."}
		if(attackInfo.type === 5) // Si el ataque es de tipo support
		{
			text = chName+" curó con "+attackInfo.name+" a "+enemy.name+". ";
		}
		this.log.AddText(text);
		this.log.UpdateLog();
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
		let height = 360;
		let enemiesNumber = 1;//this.GetRandom(5, false);
		for(let i = 0; i < enemiesNumber; i++){
			let enemyType = this.GetRandom(this.enemiesInfo.length, true);
			if(i === 0) {
				this.enemies[0] = new Character(this,this.enemiesInfo[enemyType].name,this.sys.game.canvas.width/2-(75*enemiesNumber/2) +50, height, this.enemiesInfo[enemyType].imgID, this.enemiesInfo[enemyType].actualHp, this.enemiesInfo[enemyType].maxHp, this.enemiesInfo[enemyType].actualMp, this.enemiesInfo[enemyType].maxMp);
			}
			else{
				this.enemies[i] = new Character(this,this.enemiesInfo[enemyType].name,this.enemies[i-1].x +100, height, this.enemiesInfo[enemyType].imgID, this.enemiesInfo[enemyType].actualHp, this.enemiesInfo[enemyType].maxHp, this.enemiesInfo[enemyType].actualMp, this.enemiesInfo[enemyType].maxMp);
			}
			this.enemies[i].SetStats(this.enemiesInfo[enemyType].rP, this.enemiesInfo[enemyType].rR, this.enemiesInfo[enemyType].rF, this.enemiesInfo[enemyType].rE,
			this.enemiesInfo[enemyType].rT, this.enemiesInfo[enemyType].acurracy, this.enemiesInfo[enemyType].speed);
			this.enemiesHud.push(new EnemyHUD(this,this.enemies[i]));
			
			for(let o = 0; o < this.enemiesInfo[enemyType].attack.length; o++)
			{
				this.enemies[i].SetAttacks(this.enemiesInfo[enemyType].attack[o]);
			}
			this.enemies[i].scale = 4;
			this.AddEnemySelector(this.enemies[i]);
		}
	}

	// Genera un random de 0 a maxRange (enteros)
	GetRandom(maxRange, bool){
		// esto nos sirve para sumar 1 al resultado o no dependiendo si buscamos un índice o qué onda
		if(bool) return Math.floor(Math.random()*maxRange); 
		else return Math.floor(Math.random()*maxRange + 1);
	}


	EnemyAttacks(i){
		console.log("AtacandO!");
		let selectedAttack = this.GetRandom(this.enemies[i].attacks.length, true);
		let selectedTarget = [];
		for(let o = 0; o < this.enemies[i].GetAttack(selectedAttack).targets; o++){
			let random = this.GetRandom(this.allies.length, true);
			while(this.allies[random].dead) { random = (random +1) % this.allies.length};
			selectedTarget.push(random);
			this.enemies[i].targets.push(this.allies[selectedTarget[o]]);
		}

		let effective = this.enemies[i].Attack(this.enemies[i].GetAttack(selectedAttack));
		
		for(let j = 0; j < this.enemies[i].targets.length; j++){
			this.BuildLog(this.enemies[i].name,this.enemies[i].GetAttack(selectedAttack), effective, this.allies[selectedTarget[j]])
		}
		
		for(let h = 0; h < selectedTarget.length; h++){
			this.alliesHud[selectedTarget[h]].Update();
		}
		console.log(this.enemies[i].GetAttack(selectedAttack).name + this.enemies[i].GetAttack(selectedAttack).dmg)
		console.log(selectedTarget);
		this.enemies[i].targets = [];
		this.RequestChangeState();
	}

	CreateTurns(){
		let self = this;
		this.allies.forEach(function (ally, i)
		{
			self.turns.push({char: ally, type: true, index: i});
		})
		this.enemies.forEach(function (enemy, i)
		{
			self.turns.push({char: enemy, type: false, index: i});
		})


		this.turns.sort(function(char1, char2)
		{
			if(char1.char.speed < char2.char.speed)
			{
				return -1;
			}
			else if(char1.char.speed > char2.char.speed)
			{
				return 1;
			}
			else return 0;
		})
	}

	NextTurn(){
		this.currentTurn = (this.currentTurn + 1) % this.turns.length;

		if(!this.turns[this.currentTurn].char.dead)
		{
			if(this.turns[this.currentTurn].type) // ALIADOS
			{
				this.ToggleButtons(true);
				this.state = FightState.ChooseAttack;
				this.currentAlly = this.turns[this.currentTurn].index;

				//···RAUL PRUEBAS···
				this.choseA=false;
				this.choseE=false;
				this.pointer.visible=false;
			}
			else    // ENEMIGOS
			{   
				this.state = FightState.ExecuteAttack;
			}
		}
	}


	AllyAttack(){
		let effective = this.allies[this.currentAlly].Attack(this.selectedAttack);
		let self = this;
		this.allies[this.currentAlly].targets.forEach(function (enemy, index) {
			let i = 0;
			
			if(self.selectedAttack.isSupport()){
				while(self.alliesHud[i].character !== enemy){i++;}
				self.alliesHud[i].Update();
			}
			else{
				while(self.enemiesHud[i].character !== enemy){i++;}
				self.enemiesHud[i].Update();
			}
			self.BuildLog(self.allies[self.currentAlly].name,self.selectedAttack, effective, enemy, index);

			
		})
		this.allies[this.currentAlly].targets = [];
		this.alliesHud[this.currentAlly].Update();
		
		this.RequestChangeState();
	}

	i=0;//···RAUL PRUEBAS···
	AddEnemySelector(enemy){
		enemy.on("pointerover",() => {
			//console.log("SELECCIONANDO A " + enemy.imageId);
			this.pointer.visible = true;
			this.cursor=true;//···RAUL PRUEBAS···
			this.pointer.x = enemy.x;
			this.pointer.y = enemy.y - 75;
			this.pointer.angle = 90;
			
			//···RAUL PRUEBAS···
			while(this.i<this.enemies.length)
			{
				if(this.enemies[this.i]===enemy)this.enemyselected=this.i;
				this.i++;
			}
		})
		enemy.on("pointerout",() => {
			//this.pointer.visible = false;
			//···RAUL PRUEBAS···
			this.cursor=false;
			this.i=0;
			//console.log("YA NO ESTÁ SELECCIONANDO A " + enemy.imageId);			
		})
		enemy.on("pointerup",() => {
			console.log("ATACANDO A " + enemy.imageId);
			this.allies[this.currentAlly].targets.push(enemy);
			if(this.selectedAttack.targets === this.allies[this.currentAlly].targets.length) {this.RequestChangeState();}
			//this.chose=false;
			//this.pointer.visible = false;
		})
	}

	create(){
		// INPUT
		this.aux = new InputMan(this);
		
		this.count = 0

		// FONDO
		this.bg = this.add.image(0, 0, 'fightBg').setOrigin(0, 0);

		// Creación de Party
		this.alliesHud = [];
		this.LoadParty();
		// Creación de enemigos
		this.enemiesHud = [];
		this.GenerateRandomEncounter();

		this.turns = [];
		this.finishedTurn = false;
		this.currentTurn = -1;
		this.CreateTurns();

		this.log = new Log(this);

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
		this.ToggleButtons(false);
	}

	

	//···RAUL PRUEBAS···
	attack=-1;
	enemyselected=-1;
	combat=false;
	cursor=false;
	choseE=false;
	choseA=false;
	//···RAUL PRUEBAS···


	RequestChangeState(){
		if(this.state === FightState.SelectTurn){ // Roi
			if(this.CheckState(this.enemies) || this.CheckState(this.allies)){ console.log("aaa"); this.state = FightState.Finish;}
			else this.NextTurn();
		}
		else if(this.state === FightState.ChooseAttack){
			this.ToggleButtons(false);
			if(this.alliesHud[this.currentAlly].attackText[this.attack].srcAttack.isSupport())
			{
				this.state = FightState.ChooseAlly;			
				this.EnableTargetting(this.allies);
			}
			else {
				this.state = FightState.ChooseEnemy;
				this.EnableTargetting(this.enemies);
			}
		}
		else if(this.state === FightState.ChooseEnemy){
			this.state = FightState.ExecuteAttack
			this.DisableTargetting(this.enemies);
		}
		else if(this.state === FightState.ChooseAlly){
			this.state = FightState.ExecuteAttack;
			this.DisableTargetting(this.allies);
		}
		else if(this.state === FightState.ExecuteAttack){
			this.state = FightState.TimeUntilNextTurn;
		}
		else if(this.state === FightState.TimeUntilNextTurn){
			this.state = FightState.SelectTurn;
		}
	}

	update(t,dt){
		console.log("estado: " + this.state);
	/*	if(Phaser.Input.Keyboard.JustDown(this.aux.spaceKey)){
			this.scene.wake('movement');
			this.scene.sleep('fightscene');
		}*/
		this.alliesHud.forEach(function (hud){ // Roi
			if(hud.HealthBar.keepDrawing().changing) hud.HealthBar.draw();
			if(hud.ManaBar.keepDrawing().changing) hud.ManaBar.draw();
		})

		this.enemiesHud.forEach(function (hud){
			if(hud.healthBar.keepDrawing().changing) hud.healthBar.draw();
		})

		if(this.state === FightState.SelectTurn){ // Roi
			this.RequestChangeState();
		}
		else if(this.state === FightState.ChooseAttack){
			
		
		}
		else if(this.state === FightState.ChooseEnemy){
		}
		else if(this.state === FightState.ChooseAlly){
		}
		else if(this.state === FightState.ExecuteAttack){

			if(this.turns[this.currentTurn].type) // ALIADOS
			{
				this.AllyAttack();
			}
			else
			{
				this.EnemyAttacks(this.turns[this.currentTurn].index);
			}
		}
		else if(this.state === FightState.TimeUntilNextTurn){
			this.count += dt;
			if(this.count > this.timeBetweenAttacks)
			{
				this.RequestChangeState();
				this.count = 0;
			}
		}
		else{
			this.EndCombat();
		}


		
		/*  COSAS DE RAUL
		if(this.choseE && !this.choseA){
			if(Phaser.Input.Keyboard.JustDown(this.aux.qKey))
			{
				this.alliesHud[this.currentAlly].DisplayAttacks();
			}
			if(this.combat===true)
			{
				if(Phaser.Input.Keyboard.JustDown(this.aux.eKey))
				{
					if(this.allies[this.currentAlly].CanAttack(this.alliesHud[this.currentAlly].attackText[this.attack].srcAttack)){
						this.selectedAttack = this.alliesHud[this.currentAlly].attackText[this.attack].srcAttack;
						if(this.alliesHud[this.currentAlly].attackText[this.attack].srcAttack.isSupport())
						{ 
						  this.EnableTargetting(this.allies);
						  this.choseA=true;
						  this.allaySelected=0;
						  console.log(this.allaySelected);
						  console.log(this.allies.length);
					
						}
						else{
						 this.EnableTargetting(this.enemies);
						 this.choseE=true;
						 this.enemyselected=0;
						 console.log(this.enemyselected);
						 console.log(this.enemies.length);						

						}
						this.alliesHud[this.currentAlly].DisplayAttacks();
						this.ToggleButtons(false);
						this.pointer.visible = true;
						this.combat=false;
						
					} else console.log("No hay maná ;-;");

					
				}

				if(this.cursor===false)
				{
					if(Phaser.Input.Keyboard.JustDown(this.aux.sKey))
					{
						if(this.attack<3)
						{
							this.attack++;

							
						} 
						else this.attack=0;
						while(!this.allies[this.currentAlly].CanAttack(this.alliesHud[this.currentAlly].attackText[this.attack].srcAttack)){
								
							if(this.attack<3)this.attack++;
							else this.attack=0;
						}
					}
					if(Phaser.Input.Keyboard.JustDown(this.aux.wKey))
					{
						if(this.attack>0)
						{
							this.attack--;
							
						}
						else this.attack=3;
						while(!this.allies[this.currentAlly].CanAttack(this.alliesHud[this.currentAlly].attackText[this.attack].srcAttack)){
								
							if(this.attack>0)this.attack--;
							else this.attack=3;
						}
					}
				}
				if(this.attack!=-1)
				{
					
					this.pointer.x=this.alliesHud[this.currentAlly].attackText[this.attack].text.x-15;
					this.pointer.angle = 0;
					this.pointer.y=this.alliesHud[this.currentAlly].attackText[this.attack].text.y+this.alliesHud[this.currentAlly].attackText[this.attack].text.displayHeight/2;
				}
			}
			
		}
		else if(this.choseE===true)
		{
			while(this.enemies[this.enemyselected].dead ){
								
				if(this.enemyselected<this.enemies.length-1)this.enemyselected++;
				else this.enemyselected=0;
			}	
			
			if(Phaser.Input.Keyboard.JustDown(this.aux.eKey) && !this.enemies[this.enemyselected].dead)
			{					
				this.allies[this.currentAlly].targets.push(this.enemies[this.enemyselected]);
				
				if(this.selectedAttack.targets === this.allies[this.currentAlly].targets.length) 
				{
					for(let i=0;i<this.enemies.length;i++)
				{
				
				//this.enemies[i].stop();
				this.enemies[i].play(this.enemies[i].imageId+'_wow');
				}
					this.AllyAttack();

				}
				//this.chose=false;
				//this.pointer.visible=false;
			}
			if(this.cursor===false)
			{
				if(Phaser.Input.Keyboard.JustDown(this.aux.dKey))
				{
					if(this.enemyselected<this.enemies.length-1) 
					{
						this.enemyselected++;					
					
					}	else this.enemyselected=0;

					while(this.enemies[this.enemyselected].dead ){
								
						if(this.enemyselected<this.enemies.length-1)this.enemyselected++;
						else this.enemyselected=0;
					}	
				}
				if(Phaser.Input.Keyboard.JustDown(this.aux.aKey))
				{
					if(this.enemyselected>0)
					{
						this.enemyselected--;
				
					}
					else this.enemyselected=this.enemies.length-1;

					while(this.enemies[this.enemyselected].dead){
								
						if(this.enemyselected>0)this.enemyselected--;
						else this.enemyselected=this.enemies.length-1;
					}
				}
			}
			if(this.enemyselected!=-1)
			{
				
				this.pointer.x = this.enemies[this.enemyselected].x;
				this.pointer.y = this.enemies[this.enemyselected].y - 75;
				this.pointer.angle = 90;
			}
		}
		else if(this.choseA===true)
		{
			if(Phaser.Input.Keyboard.JustDown(this.aux.eKey))
			{					
				this.allies[this.currentAlly].targets.push(this.allies[this.allaySelected]);
				if(this.selectedAttack.targets === this.allies[this.currentAlly].targets.length) {this.AllyAttack()}
				//this.chose=false;
				//this.pointer.visible=false;
			}
			if(this.cursor===false)
			{
				if(Phaser.Input.Keyboard.JustDown(this.aux.dKey))
				{
					if(this.allaySelected<this.allies.length-1) this.allaySelected++;
					else this.allaySelected=0;
				}
				if(Phaser.Input.Keyboard.JustDown(this.aux.aKey))
				{
					if(this.allaySelected>0)this.allaySelected--;
					else this.allaySelected=this.allies.length-1;
				}
			}
			if(this.allaySelected!=-1 )
			{
				this.pointer.x = this.allies[this.allaySelected].x-75;
				this.pointer.y = this.allies[this.allaySelected].y;
				this.pointer.angle = 0;

	
			}
		}  */
	}
}







