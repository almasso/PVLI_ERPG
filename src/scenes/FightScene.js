import Character from '../fight/Character.js'
import {elementalAttackDifference, typeOfAttack} from '../fight/Attack.js'
import {allyParty} from '../fight/Party.js'
import {EnemiesInfo} from '../fight/EnviromentInfo.js'
import {InputMan} from '../fight/InputManager.js'
import {Log, AllyHUD, EnemyHUD, InventoryHUD} from '../fight/HUD.js'
import Inventory from '../obj/Inventory.js'


const FightState = {
	SelectTurn: 0,
	ChooseAttack: 1,
	EnemyChooseAttack: 2,
	ChooseEnemy: 3,
	ChooseAlly: 4,
	ExecuteAttack: 5,
	TimeUntilNextTurn: 6,
	Finish: 7,
	Item: 8,
	AlteratedStatesFire: 9,
	AlteratedStatesToxic: 10
};

export class FightScene extends Phaser.Scene {
	constructor() {
		super({ key: 'fightscene'});
		this.bg;
		this.enemiesInfo = EnemiesInfo; // información de enemigos que conseguimos del script EnviromentInfo
		this.selectedAttack; // ataque seleccionado actualmente con el puntero
		this.selectedItem;
		this.timeBetweenAttacks = 2000;
		this.state = FightState.SelectTurn;
	}

	preload(){
		// cargar personajes
		this.load.image('manin', 'assets/textures/Characters/manin_new.png');
		this.load.image('fightBg','assets/textures/Backgrounds/parqueLucha.png')
		this.load.image('melendi','assets/textures/Characters/Melendi.png')
		this.load.image('jarfaiter','assets/textures/Characters/Jarfaiter.png')
		//this.load.image('artista','assets/textures/Artista.png')
		this.load.image('artista2','assets/textures/Characters/Artista2.png')
		this.load.image('culturista','assets/textures/Characters/Culturista.png')
		this.load.image('dinoseto','assets/textures/Characters/Dinoseto.png')
		this.load.image('angel','assets/textures/Characters/AngelCaido.png')
		this.load.image('attackPointer','assets/textures/HUD/attackPointer.png');

		//ANIMACON
		this.load.spritesheet('people_daño','assets/textures/Characters/people_daño.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('people_idle','assets/textures/Characters/people_idle.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('people_wow','assets/textures/Characters/people_wow.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('people_dead','assets/textures/Characters/people_dead.png',{frameWidth:19, frameHeight:26});

		this.load.spritesheet('artist_daño','assets/textures/Characters/artist_daño.png',{frameWidth:24, frameHeight:32});
		this.load.spritesheet('artist_idle','assets/textures/Characters/artist_idle.png',{frameWidth:24, frameHeight:32});
		this.load.spritesheet('artist_wow','assets/textures/Characters/artist_wow.png',{frameWidth:24, frameHeight:32});
		this.load.spritesheet('artist_dead','assets/textures/Characters/artist_dead.png',{frameWidth:24, frameHeight:32});
		this.load.spritesheet('artist_burn','assets/textures/Characters/artist_burn.png',{frameWidth:24, frameHeight:32});
		this.load.spritesheet('artist_shock','assets/textures/Characters/artist_shock.png',{frameWidth:24, frameHeight:32});
		this.load.spritesheet('artist_poison','assets/textures/Characters/artist_poison.png',{frameWidth:24, frameHeight:32});

		this.load.spritesheet('manin_daño','assets/textures/Characters/manin_daño.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('manin_idle','assets/textures/Characters/manin_idle.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('manin_wow','assets/textures/Characters/manin_wow.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('manin_dead','assets/textures/Characters/manin_dead.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('manin_burn','assets/textures/Characters/manin_burn.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('manin_poison','assets/textures/Characters/manin_poison.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('manin_shock','assets/textures/Characters/manin_shock.png',{frameWidth:19, frameHeight:26});

		this.load.spritesheet('melendi_daño','assets/textures/Characters/melendi_daño.png',{frameWidth:22, frameHeight:27});
		this.load.spritesheet('melendi_idle','assets/textures/Characters/melendi_idle.png',{frameWidth:22, frameHeight:27});
		this.load.spritesheet('melendi_wow','assets/textures/Characters/melendi_wow.png',{frameWidth:22, frameHeight:27});
		this.load.spritesheet('melendi_dead','assets/textures/Characters/melendi_dead.png',{frameWidth:22, frameHeight:27});
		this.load.spritesheet('melendi_burn','assets/textures/Characters/melendi_burn.png',{frameWidth:22, frameHeight:27});
		this.load.spritesheet('melendi_shock','assets/textures/Characters/melendi_shock.png',{frameWidth:22, frameHeight:27});
		this.load.spritesheet('melendi_poison','assets/textures/Characters/melendi_poison.png',{frameWidth:22, frameHeight:27});


		this.load.spritesheet('jarfaiter_idle', 'assets/textures/Characters/Jarfaiter_idle.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('jarfaiter_wow', 'assets/textures/Characters/Jarfaiter_wow.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('jarfaiter_daño', 'assets/textures/Characters/Jarfaiter_daño.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('jarfaiter_dead', 'assets/textures/Characters/Jarfaiter_dead.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('jarfaiter_burn', 'assets/textures/Characters/Jarfaiter_burn.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('jarfaiter_shock', 'assets/textures/Characters/Jarfaiter_shock.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('jarfaiter_poison', 'assets/textures/Characters/Jarfaiter_poison.png',{frameWidth:19, frameHeight:26});

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

	// Creación de botones de ataque y Objetos (este último no hace nada todavía)
	CreateButtons(){
		// añadimos la imagen
		this.attackButton = this.add.image(this.sys.game.canvas.width/15,this.sys.game.canvas.height/2 + this.sys.game.canvas.height/30,'attackButton');
		this.attackButton.setScale(1.5); // setteamos la escala
		this.attackButton.setInteractive(); // Hacemos el sprite interactivo para que lance eventos
		// repeat (Hover)
		this.attackButtonHover = this.add.image(this.attackButton.x,this.attackButton.y,'attackButtonHover');
		this.attackButtonHover.setScale(1.5); 
		this.attackButtonHover.setInteractive(); // Hacemos el sprite interactivo para que lance eventos
		this.attackButtonHover.visible = false;
		// repeat
		this.objectButton = this.add.image(this.attackButton.x,this.attackButton.y + this.attackButton.displayHeight,'objectButton');
		this.objectButton.setScale(1.5);
		this.objectButton.setInteractive(); // Hacemos el sprite interactivo para que lance eventos
		this.inventoryUp = this.add.image(590, 200, 'logButton');
		this.inventoryUp.setScale(1.5);
		this.inventoryDown = this.add.image(590, 200 + this.inventoryUp.displayHeight, 'logButton');
		this.inventoryDown.setScale(1.5);
		this.inventoryUp.setInteractive();
		this.inventoryDown.setInteractive();
		this.inventoryDown.angle = 180;
		this.inventoryUp.visible = false;
		this.inventoryDown.visible = false;


		// repeat (Hover)
		this.objectButtonHover = this.add.image(this.objectButton.x,this.objectButton.y,'objectButtonHover');
		this.objectButtonHover.setScale(1.5);
		this.objectButtonHover.setInteractive(); // Hacemos el sprite interactivo para que lance eventos
		this.objectButtonHover.visible = false;
		// repeat: creamos los botones para el Log
		this.logUp = this.add.image(620, 515,'logButton');
		this.logDown = this.add.image(620,this.logUp.y + 50,'logButton');
		this.logUp.setInteractive();
		this.logDown.setInteractive();
		this.logUp.setScale(2);
		this.logDown.setScale(2);
		this.logDown.angle = 180;

		//#region input de Botones
		// Escuchamos los eventos del ratón cuando interactual con nuestro sprite de "Start"
		
		this.attackButton.on('pointerover', () => {
			// Hacer que el botón tenga otra imagen haciendo hover
			this.attackButton.visible = false;
			this.attackButtonHover.visible = true;
		});

		this.attackButtonHover.on('pointerup',()=>{
			// mostramos los ataques del aliado seleccionado
			this.alliesHud[this.currentAlly].DisplayAttacks(true);
		})
		
		this.attackButtonHover.on('pointerout', () => {
			// quitamos el Hover y ponemos el botón "normal"
			this.attackButton.visible = true;
			this.attackButtonHover.visible = false;
		})

		this.objectButton.on('pointerover', () => {
			// Hacer que el botón tenga otra imagen haciendo hover
			this.objectButton.visible = false;
			this.objectButtonHover.visible = true;
		});

		this.objectButtonHover.on('pointerup', () =>{
			this.inventoryHUD.DisplayItems();
			this.inventoryUp.visible = !this.inventoryUp.visible;
			this.inventoryDown.visible = !this.inventoryDown.visible;
		});

	    this.objectButtonHover.on('pointerout', () => {
			// quitamos el Hover y ponemos el botón "normal"
			this.objectButton.visible = true;
			this.objectButtonHover.visible = false;
		});

		this.inventoryUp.on('pointerup', () => {
			this.inventoryHUD.Up();
		})

		this.inventoryDown.on('pointerup', () => {
			this.inventoryHUD.Down();
		})

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

	// Desactivar botones de ataque
	ToggleAttackButtons(bool)
	{
		if(bool) // activamos
		{
			this.attackButton.setInteractive();
			this.attackButtonHover.setInteractive();
		}
		else // desactivamos
		{
			this.attackButton.disableInteractive();
			this.attackButtonHover.disableInteractive();
		}
	}

	// Desactivar botones de objeto
	ToggleObjectButtons(bool)
	{
		if(bool) // activamos
		{
			this.objectButton.setInteractive();
			this.objectButtonHover.setInteractive();
		}
		else // desactivamos
		{
			this.objectButton.disableInteractive();
			this.objectButtonHover.disableInteractive();
		}
	}

	// Desactivar botones de ataque y de objeto (esta función solo agrupa otras 2)
	ToggleButtons(bool){
		this.ToggleAttackButtons(bool);
		this.ToggleObjectButtons(bool);
	}

	// Activamos el targetting para el grupo de entidades que se pasen como argumento
	EnableTargetting(array){
		
		for(let i = 0; i < array.length; i++){
			if(!array[i].dead) array[i].setInteractive();
		}
	}
	// Desactivamos el targetting para el grupo de entidades que se pasen como argumento
	DisableTargetting(array){ 
		
		for(let i = 0; i < array.length; i++){
			array[i].disableInteractive();
		}
		this.pointer.visible = false; // ponemos en invisible el puntero
	}

	// Ver el estado de las entidades que se pasan como argumento
	CheckState(array){
		let i = 0;
		while(i < array.length && array[i].dead){
			i++;
		}
		return i === array.length;
	}

	// Acabamos el combate
	EndCombat(){
		this.ReturnParty(); // reescribimos los valores de la Party
		//#region input teclado
		// ponemos las variables usadas para input por teclado a valores no válidos
		this.attack=-1; 
		this.allaySelected=-1;
		this.enemyselected=-1;
		this.choseA=false;
		this.choseE=false;
		this.combat=false;
		//#endregion
		if(!this.CheckState(this.allies)) // Si se ha acabado el combate porque el jugador ha perdido...
		{
			this.scene.wake(this.oldScene);
			this.scene.get('hud').Walk();
			this.scene.get('hud').UpdateHUD();
			let movement = this.scene.get('movement');
			//movement.updateInventory(this.inventory);
		}
		else // Si se han matado a todos los enemigos...
		{
			this.scene.launch('final');
			this.scene.stop('movement');
		}
		this.state = FightState.SelectTurn;
		this.scene.stop('fightscene'); // en cualquier caso paramos esta escena
	}

	//Cargamos el inventario desde la escena de exploración
	LoadInventory(inv){
		this.inventory = inv;
	}

	// cargamos a los aliados
	LoadParty(){
		console.log("LOAD PARTY");
		this.allies = []; // incializamos el array de aliados
		let self = this; 
		allyParty.party.forEach(function (ally, index){ // recorremos todo el array de objetos con info de la party
			// creamos al character en función de su información
			if(index < allyParty.alliesNum){
				self.allies[index] = new Character(self,ally.name,(index+1)*self.sys.game.canvas.width/(allyParty.alliesNum+1), 38, ally.imgID, ally.actualHp, ally.maxHp, ally.actualMp, ally.maxMp);
				self.allies[index].SetStats(ally.rP, ally.rR, ally.rF, ally.rE,ally.rT, ally.acurracy, ally.speed);
				self.allies[index].dead = ally.dead;
				let scene = self;
				ally.attack.forEach(function (attack) { // setteamos sus ataques
					scene.allies[index].SetAttacks(attack);
				})

				self.allies[index].SetAlteredStates(ally.alteredStates);
				// añadimos un nuevo HUD
				self.alliesHud.push(new AllyHUD(self,self.allies[index]));
				self.allies[index].scale = 2;
				self.allies[index].depth = 1;
				self.AddPartySelector(self.allies[index]); // añadimos un selector para este personaje
			}
			else return;
		})
		//this.inventoryHUD = new InventoryHUD(this, this.inventory, 600, 180);
	}
	
    k=0;//···RAUL PRUEBAS···
	// Añadimos eventos para seleccionar a aliados como objetivos
	AddPartySelector(ally){
		ally.on("pointerover",() => {
			// ponemos el cursor encima del personaje aliado
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
			//···RAUL PRUEBAS···
			// quitamos el cursor
			this.cursor=false;
			this.k=0;
		})
		ally.on("pointerup",() => {
			// hacemos el ataque de support sobre el aliado ojetivo
			this.allies[this.currentAlly].targets.push(ally);
			if(this.state === FightState.Item || this.state === FightState.ChooseAlly && this.selectedAttack.targets === this.allies[this.currentAlly].targets.length) {this.RequestChangeState(false)}
		})
	}

	// construimos una nueva frase para el Log
	BuildLog(chName,attackInfo, effective,enemy, index){
		let text;
		// dependiendo del valor que recibamos ponemos un texto u otro
		console.log(effective);
		if(attackInfo.type === 5) // Si el ataque es de tipo support
		{
			text = chName+" curó con "+attackInfo.name+" a "+enemy.name+". ";
		}
		else{
			text = chName+" atacó con "+attackInfo.name+" a "+enemy.name+". ";
		}
		if(effective[index].hit === -1) {text+="¡Es super efectivo!";}
		else if (effective[index].hit === 1) {text+= "No es muy efectivo..."}
		else if(effective[index].hit === 2){text+="Pero no tuvo efecto."}
		this.log.AddText(text); // añadimos el texto al log
		this.log.UpdateLog(); // y lo mostramos (quizá esto podría hacerlo el propio log cuando se añade un texto?)
		this.BuildLogState(enemy, effective, index);
	}

	BuildLogState(enemy, effective, index){
		if(effective[index].state != -1){ // Creo que se puede hacer solo un update, pero por ahora no lo he hecho
			let text;
			if(effective[index].state == 2){
				text = enemy.name +" fue quemado.";
			}
			else if (effective[index].state == 3){
				text = enemy.name +" fue paralizado.";
			}
			else{
				text = enemy.name +" fue envenenado.";
			}
			this.log.AddText(text);
			this.log.UpdateLog();
		}
	}

	BuildEndTurnLog(text){
		this.log.AddText(text);
		this.log.UpdateLog();
	}

	CheckBurnState(){
		let self = this;
		let areAlteredStates = false; // Variable para no esperar si no hay ningun estado alterado
		this.turns.forEach(function (character){
			let hasAlteredStates = false; // variable para mantener las animaciones coordinadas
			if(character.type) // ALIADO
			{
				let ally = self.allies[character.index];
				if(!ally.dead){
					if(ally.alteredStates[typeOfAttack.Fire - elementalAttackDifference]){
						console.log(ally);
						areAlteredStates = true;
						let text = ally.name + " sufrio daño por estar quemado.";
						ally.Burned();
						ally.play(ally.imageId+'_burn');
						self.BuildEndTurnLog(text);
						hasAlteredStates = true;
					} 
					if(!hasAlteredStates) ally.play(ally.imageId + '_wow'); 
					self.alliesHud[character.index].Update();
				}

			}
			else{
				let enemy= self.enemies[character.index];
				if(!enemy.dead){
					if(enemy.alteredStates[typeOfAttack.Fire - elementalAttackDifference]){
						let text = enemy.name + " sufrio daño por estar quemado.";
						areAlteredStates = true;
						enemy.Burned();
						enemy.play(enemy.imageId+'_burn');

						self.BuildEndTurnLog(text);
						hasAlteredStates = true;

					} 
					if(!hasAlteredStates) enemy.play(enemy.imageId + '_wow')
					self.enemiesHud[character.index].Update();
				}
			}
		});
		return areAlteredStates;
	}

	CheckToxicState(){
		let self = this;
		let areAlteredStates = false; // Variable para no esperar si no hay ningun estado alterado
		this.turns.forEach(function (character){
			let hasAlteredStates = false; // variable para mantener las animaciones coordinadas
			if(character.type) // ALIADO
			{
				let ally = self.allies[character.index];
				if(!ally.dead){
					if(ally.alteredStates[typeOfAttack.Toxic - elementalAttackDifference]){
						console.log(ally);
						areAlteredStates = true;
						let text = ally.name + " sufrio daño por estar envenenado.";
						ally.Poisoned();
						ally.play(ally.imageId+'_poison');
						self.BuildEndTurnLog(text);
						hasAlteredStates = true;
					}
					if(!hasAlteredStates) ally.play(ally.imageId + '_wow'); 
					self.alliesHud[character.index].Update();
				}

			}
			else{
				let enemy= self.enemies[character.index];
				if(!enemy.dead){
					if(enemy.alteredStates[typeOfAttack.Toxic - elementalAttackDifference]){
						let text = enemy.name + " sufrio daño por estar envenenado.";
						areAlteredStates = true;
						enemy.Poisoned();
						enemy.play(enemy.imageId+'_poison');
						self.BuildEndTurnLog(text);
						hasAlteredStates = true;

					}
					if(!hasAlteredStates) enemy.play(enemy.imageId + '_wow')
					self.enemiesHud[character.index].Update();
				}
			}
		});
		return areAlteredStates;
	}

	// actualizamos el objeto con info de la party
	ReturnParty()
	{
		let self = this;
		allyParty.party.forEach(function (ally, index)
		{
			if(index < allyParty.alliesNum){
				console.log(index);
				ally.actualHp = self.allies[index].actualHp;
				ally.actualMp = self.allies[index].actualMp;
				ally.dead = self.allies[index].dead;
				ally.alteredStates = self.allies[index].alteredStates;
			} else return;
		})
	}

	// generamos a los enemigos en función de la información que nos llega desde enemiesInfo
	GenerateRandomEncounter(){

		this.enemies = []; // inicializamos el array de enemigos
		let height = 360; 
		let enemiesNumber = this.GetRandom(1, false); // número de enemigos

		for(let i = 0; i < enemiesNumber; i++){
			let enemyType = this.GetRandom(1,true);//this.enemiesInfo.length, true); // tipo de enemigo
			if(i === 0) {
				// primer enemigo colocado con una posición específica
				this.enemies[0] = new Character(this,this.enemiesInfo[enemyType].name,this.sys.game.canvas.width/2-(75*enemiesNumber/2) +50, height, this.enemiesInfo[enemyType].imgID, this.enemiesInfo[enemyType].actualHp, this.enemiesInfo[enemyType].maxHp, this.enemiesInfo[enemyType].actualMp, this.enemiesInfo[enemyType].maxMp);
			}
			else{
				// resto de enemigos colocados en función de los enemigos anteriores
				this.enemies[i] = new Character(this,this.enemiesInfo[enemyType].name,this.enemies[i-1].x +100, height, this.enemiesInfo[enemyType].imgID, this.enemiesInfo[enemyType].actualHp, this.enemiesInfo[enemyType].maxHp, this.enemiesInfo[enemyType].actualMp, this.enemiesInfo[enemyType].maxMp);
			}
			// setteamos sus stats
			this.enemies[i].SetStats(this.enemiesInfo[enemyType].rP, this.enemiesInfo[enemyType].rR, this.enemiesInfo[enemyType].rF, this.enemiesInfo[enemyType].rE,
			this.enemiesInfo[enemyType].rT, this.enemiesInfo[enemyType].acurracy, this.enemiesInfo[enemyType].speed);

			// creamos el nuevo HUD para enemigo
			this.enemiesHud.push(new EnemyHUD(this,this.enemies[i]));
			
			// creamos sus ataques
			for(let o = 0; o < this.enemiesInfo[enemyType].attack.length; o++)
			{
				this.enemies[i].SetAttacks(this.enemiesInfo[enemyType].attack[o]);
			}
			this.enemies[i].scale = 4;
			this.AddEnemySelector(this.enemies[i]); // escuchamos eventos para seleccionar al enemigo
		}
	}

	// Genera un random de 0 a maxRange (enteros)
	GetRandom(maxRange, bool){
		// esto nos sirve para sumar 1 al resultado o no dependiendo si buscamos un índice o qué onda
		if(bool) return Math.floor(Math.random()*maxRange); 
		else return Math.floor(Math.random()*maxRange + 1);
	}

	// Ataque de enemigos
	EnemyAttacks(i){
		// el ataque seleccionado será aleatorio para los enemigos
		let selectedAttack = this.GetRandom(this.enemies[i].attacks.length, true);
		let selectedTarget = []; // también lo serán sus targets. esto es un array de índices

		//animación de la party al ser atacada
		for(let w=0;w<this.allies.length;w++)
		{				
			
			if(!this.allies[w].dead)
			{
				//console.log('SI');
				 this.allies[w].play(this.allies[w].imageId+'_wow');
		
			}
		}

		// se seleccionarán tantos objetivos como diga el ataque que se ha seleccionado
		for(let o = 0; o < this.enemies[i].GetAttack(selectedAttack).targets; o++){
			let random = this.GetRandom(this.allies.length, true); // escogemos al target
			while(this.allies[random].dead) { random = (random +1) % this.allies.length}; // si ese aliado está muerto, pasamos al siguiente
			selectedTarget.push(random); // añadimos el target
			this.enemies[i].targets.push(this.allies[selectedTarget[o]]); // añadimos el target al propio del character
		}

		// ataque. también se recibe el texto del log
		let effective = this.enemies[i].Attack(this.enemies[i].GetAttack(selectedAttack));
		
		// construimos el log
		for(let j = 0; j < this.enemies[i].targets.length; j++){
			this.BuildLog(this.enemies[i].name,this.enemies[i].GetAttack(selectedAttack), effective, this.allies[selectedTarget[j]], j)
		}
		
		
		// cambiamos el HUD de aliados
		for(let h = 0; h < selectedTarget.length; h++){
			this.alliesHud[selectedTarget[h]].Update();
		}

		// vaciamos sus targets
		this.enemies[i].targets = [];

		this.RequestChangeState(false);  // Su turno acaba.
	}

	// generamos los turnos en función de la velocidad de los aliados y enemigos
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

		// ordenamos el array de turnos
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

	// pasamos al siguiente turno
	NextTurn(){
		this.currentTurn = (this.currentTurn + 1) % this.turns.length;

		if(!this.turns[this.currentTurn].char.dead) // si no ha terminado y no está muerto el personaje actual...
		{
			if(this.turns[this.currentTurn].type) // ALIADOS
			{
				this.ToggleButtons(true);
				// cambiamos el aliado actual
				this.currentAlly = this.turns[this.currentTurn].index;
				if(!this.allies[this.currentAlly].alteredStates[typeOfAttack.Electrical - elementalAttackDifference]){ // Paralizado
					this.state = FightState.ChooseAttack;
				}
				else{
					this.state = FightState.TimeUntilNextTurn;
					this.BuildEndTurnLog(this.allies[this.currentAlly].name + " no se pudo mover.");
					this.allies.forEach(function(ally){
						ally.play(ally.imageId + '_wow');  
					})
					this.allies[this.currentAlly].play(this.allies[this.currentAlly].imageId + '_shock');// Insertar animación paralizado
				}


				//···RAUL PRUEBAS···
				// Input teclado
				this.choseA=false;
				this.choseE=false;
				this.pointer.visible=false;
			}
			else    // ENEMIGOS
			{   
				if(!this.enemies[this.turns[this.currentTurn].index].alteredStates[typeOfAttack.Electrical - elementalAttackDifference]){ // Paralizado
					this.state = FightState.ExecuteAttack;
				}
				else{
					this.state = FightState.TimeUntilNextTurn;
					this.BuildEndTurnLog(this.enemies[this.turns[this.currentTurn].index].name + " no se pudo mover.");
					this.enemies.forEach(function(enemy){
						enemy.play(enemy.imageId + '_wow');
					})
					this.enemies[this.turns[this.currentTurn].index].play(this.enemies[this.turns[this.currentTurn].index].imageId + '_shock');// Insertar animación paralizado

				}
			}
		}
	}


	AllyAttack(){

		
		let self = this;
		if(!self.selectedAttack.isSupport())
		{
			for(let i=0;i<this.enemies.length;i++)
			{			
				//this.enemies[i].stop();
				if(!this.enemies[i].dead)this.enemies[i].play(this.enemies[i].imageId+'_wow');
			}
		}
		// se realiza el ataque y se recibe el texto de log
		let effective = this.allies[this.currentAlly].Attack(this.selectedAttack);
		//let self = this;
		
		// 
		this.allies[this.currentAlly].targets.forEach(function (enemy, index) {
			let i = 0;
			// actulizamos HUD
			if(self.selectedAttack.isSupport()){
				while(self.alliesHud[i].character !== enemy){i++;}
				self.alliesHud[i].Update();
			}
			else{
				while(self.enemiesHud[i].character !== enemy){i++;}
				self.enemiesHud[i].Update();
			}
			// construimos el log
			self.BuildLog(self.allies[self.currentAlly].name,self.selectedAttack, effective, enemy, index)
		})

		// vaciamos los targets (creo que debería ser en una función propia del character)
		this.allies[this.currentAlly].targets = [];
		this.alliesHud[this.currentAlly].Update(); // actualizamos el HUD de aliado
		
		this.RequestChangeState(false);
	}

	// Hacemos que los enemigos puedan escuchar eventos de ratón
	i=0;//···RAUL PRUEBAS···
	AddEnemySelector(enemy){
		enemy.on("pointerover",() => {
			// activamos el cursor encima del enemigo
			this.cursor=true; //···RAUL PRUEBAS···
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
			//···RAUL PRUEBAS···
			// quitamos el cursor de encima del enemigo
			this.cursor=false;
			this.i=0;
		})
		enemy.on("pointerup",() => {
			// realizamos el ataque sobre el enemigos seleccionado
			this.allies[this.currentAlly].targets.push(enemy); // añadimos el target
			// si el ataque tiene más de un objetivo, se tendrá que selecccionar a otro objetivo
			if(this.selectedAttack.targets === this.allies[this.currentAlly].targets.length) {this.RequestChangeState(false);}
		})
	}

	// Creación de la escena
	create(){

		// INPUT
		this.aux = new InputMan(this);
		
		this.count = 0

		// FONDO
		this.bg = this.add.image(0, 0, 'fightBg').setOrigin(0, 0);

		// Creación de Party
		this.alliesHud = []; // huds de aliados
		this.LoadParty(); // cargamos la party
		// Creación de enemigos
		this.enemiesHud = []; // huds de enemigos
		this.GenerateRandomEncounter(); // generamos a los enemigos

		// Creación de gestión de Turnos
		this.turns = []; // creamos un array para ordenar a aliados y enemigos por velocidad 
		this.currentTurn = -1; // turno actual
		this.CreateTurns(); // creamos los turnos

		this.log = new Log(this); // añadimos el Log a la escena

		this.currentAlly = 0; // aliado actualmente seleccionado


		this.pointer = this.add.image(0,0,'attackPointer'); // puntero que muestra la selección de algo en los menús

		this.pointer.visible = false;
		this.pointer.depth = 2;

		this.CreateButtons(); // creamos los botones
		this.ToggleButtons(false); // se deshabilitan los botones

	}

	UseItem(){
		if(this.allies[this.currentAlly].targets[0].actualHp + this.selectedItem.hp >= this.allies[this.currentAlly].targets[0].maxHp) this.allies[this.currentAlly].targets[0].actualHp = this.allies[this.currentAlly].targets[0].maxHp;
		else this.allies[this.currentAlly].targets[0].actualHp += this.selectedItem.hp;

		if(this.allies[this.currentAlly].targets[0].actualMp + this.selectedItem.mp >= this.allies[this.currentAlly].targets[0].maxMp) this.allies[this.currentAlly].targets[0].actualMp = this.allies[this.currentAlly].targets[0].maxMp;
		else this.allies[this.currentAlly].targets[0].actualMp += this.selectedItem.mp;

		let i = 0;
		while(this.alliesHud[i].character !== this.allies[this.currentAlly].targets[0]){i++;}
		this.alliesHud[i].Update();

		this.allies[this.currentAlly].targets = [];
		
		console.log(this.selectedItem);

		this.inventory.removeItem(this.selectedItem);
		this.allaySelected = -1;
		this.selectedItem = -1;
	}
	CurrentScene(sceneName)
	{
		this.oldScene=sceneName;
	}





	//···RAUL PRUEBAS···
	attack=-1;
	enemyselected=-1;
	combat=false;
	cursor=false;
	choseE=false;
	choseA=false;
	//···RAUL PRUEBAS···


	RequestChangeState(item){
		if(this.state === FightState.SelectTurn){ // Roi
			if(this.CheckState(this.enemies) || this.CheckState(this.allies)){ console.log("aaa"); this.state = FightState.Finish;}
			else this.NextTurn();
		}
		else if(this.state === FightState.ChooseAttack){
			this.ToggleButtons(false);
			if(item){
				this.state = FightState.Item;
				this.EnableTargetting(this.allies);
			}
			else{
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
			if(this.currentTurn === this.turns.length - 1) {
				let areAlteredStates = this.CheckBurnState();
				this.state = FightState.AlteratedStatesFire;
				if(!areAlteredStates) {
					this.BuildEndTurnLog("Nadie ha sido quemado");
				}
			}
			else this.state = FightState.SelectTurn;	
		}
		else if(this.state === FightState.AlteratedStatesFire){
			let areAlteredStates = this.CheckToxicState();
			this.state = FightState.AlteratedStatesToxic;
			if(!areAlteredStates) {
				this.BuildEndTurnLog("Nadie ha sido envenenado");
			}
		}
		else if(this.state === FightState.AlteratedStatesToxic){
			this.state = FightState.SelectTurn;
		}
		else if(this.state === FightState.Item){
			this.UseItem();
			this.inventoryHUD.UpdateItem(this.inventory);
			this.ToggleButtons(true);
			this.state = FightState.ChooseAttack;
			this.DisableTargetting(this.allies);
			console.log(this.state);
		}
	}

	update(t,dt){

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


		// INPUT DE TECLADO POR FA RAÚL COMENTA ESTO
		if(this.state === FightState.SelectTurn){ // Roi
			this.RequestChangeState(false);
		}
		else if(this.state === FightState.ChooseAttack){
			if(Phaser.Input.Keyboard.JustDown(this.aux.qKey))
			{
				this.alliesHud[this.currentAlly].DisplayAttacks();
			}

			if(this.combat){
				if(Phaser.Input.Keyboard.JustDown(this.aux.eKey))
				{
					if(this.allies[this.currentAlly].CanAttack(this.alliesHud[this.currentAlly].attackText[this.attack].srcAttack)){
						this.selectedAttack = this.alliesHud[this.currentAlly].attackText[this.attack].srcAttack;
						if(this.alliesHud[this.currentAlly].attackText[this.attack].srcAttack.isSupport())
						{ 
							this.allaySelected=0;
							console.log(this.allaySelected);
							console.log(this.allies.length);
					
						}
						else{
							this.enemyselected=0;
							console.log(this.enemyselected);
							console.log(this.enemies.length);						

						}
						this.RequestChangeState(false);
						this.alliesHud[this.currentAlly].DisplayAttacks();
						this.pointer.visible = true;
						
					} else console.log("No hay maná ;-;");

					
				}
				
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

				if(this.attack!=-1)
				{
					
					this.pointer.x=this.alliesHud[this.currentAlly].attackText[this.attack].text.x-15;
					this.pointer.angle = 0;
					this.pointer.y=this.alliesHud[this.currentAlly].attackText[this.attack].text.y+this.alliesHud[this.currentAlly].attackText[this.attack].text.displayHeight/2;
				}
			}
			
		}
		else if(this.state === FightState.ChooseEnemy){
			while(this.enemies[this.enemyselected].dead ){
								
				if(this.enemyselected<this.enemies.length-1)this.enemyselected++;
				else this.enemyselected=0;
			}	
			
			if(Phaser.Input.Keyboard.JustDown(this.aux.eKey) && !this.enemies[this.enemyselected].dead)
			{					
				this.allies[this.currentAlly].targets.push(this.enemies[this.enemyselected]);
				
				if(this.selectedAttack.targets === this.allies[this.currentAlly].targets.length) 
				{
					this.RequestChangeState(false);
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
			if(Phaser.Input.Keyboard.JustDown(this.aux.escKey)){
				console.log("entre");
				this.state = FightState.ChooseAttack;
			}
		}
		
		else if(this.state === FightState.ChooseAlly || this.state === FightState.Item){
			if(Phaser.Input.Keyboard.JustDown(this.aux.eKey))
			{					
				this.allies[this.currentAlly].targets.push(this.allies[this.allaySelected]);
				if(this.state === FightState.Item || this.selectedAttack.targets === this.allies[this.currentAlly].targets.length) {this.RequestChangeState(false);}
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
			if(this.allaySelected !=-1 && this.allaySelected != undefined)
			{
				console.log(this.allaySelected);
				this.pointer.x = this.allies[this.allaySelected].x-75;
				this.pointer.y = this.allies[this.allaySelected].y;
				this.pointer.angle = 0;
			}
			if(Phaser.Input.Keyboard.JustDown(this.aux.escKey)){
				console.log("entre");
				this.state = FightState.ChooseAttack;
			}
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
				this.RequestChangeState(false);
				this.count = 0;
			}
		}
		else if(this.state === FightState.Item){
		
		}
		else if(this.state === FightState.AlteratedStatesFire){
			this.count += dt;
			if(this.count > this.timeBetweenAttacks)
			{
				this.RequestChangeState();
				this.count = 0;
			}
		}
		else if(this.state === FightState.AlteratedStatesToxic){
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
					if(!this.enemies[i].dead) this.enemies[i].play(this.enemies[i].imageId+'_wow');
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