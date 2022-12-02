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
		this.enemiesInfo = EnemiesInfo; // información de enemigos que conseguimos del script EnviromentInfo
		this.selectedAttack; // ataque seleccionado actualmente con el puntero
		this.timeBetweenAttacks = 2000;
		this.state = FightState.SelectTurn;
	}

	preload(){
		// cargar personajes
		this.load.image('manin', 'assets/textures/Characters/manin_new.png');
		this.load.image('fightBg','assets/textures/Backgrounds/parqueLucha.png')
		this.load.image('melendi','assets/textures/Characters/Melendi.png')
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

		this.load.spritesheet('manin_daño','assets/textures/Characters/manin_daño.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('manin_idle','assets/textures/Characters/manin_idle.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('manin_wow','assets/textures/Characters/manin_wow.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('manin_dead','assets/textures/Characters/manin_dead.png',{frameWidth:19, frameHeight:26});

		this.load.spritesheet('melendi_daño','assets/textures/Characters/melendi_daño.png',{frameWidth:22, frameHeight:27});
		this.load.spritesheet('melendi_idle','assets/textures/Characters/melendi_idle.png',{frameWidth:22, frameHeight:27});
		this.load.spritesheet('melendi_wow','assets/textures/Characters/melendi_wow.png',{frameWidth:22, frameHeight:27});
		this.load.spritesheet('melendi_dead','assets/textures/Characters/melendi_dead.png',{frameWidth:22, frameHeight:27});


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

	    this.objectButtonHover.on('pointerout', () => {
			// quitamos el Hover y ponemos el botón "normal"
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

	// Desactivar botones de objeto (aunque este todavía no hace más que el hover)
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
			this.scene.wake('movement');
			let movement = this.scene.get('movement');
			movement.UpdateHUD();
		}
		else // Si se han matado a todos los enemigos...
		{
			this.scene.launch('final');
			this.scene.stop('movement');
		}
		this.state = FightState.SelectTurn;
		this.scene.stop('fightscene'); // en cualquier caso paramos esta escena
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
				// añadimos un nuevo HUD
				self.alliesHud.push(new AllyHUD(self,self.allies[index]));
				self.allies[index].scale = 2;
				self.allies[index].depth = 1;
				self.AddPartySelector(self.allies[index]); // añadimos un selector para este personaje
			}
			else return;
		})
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
			if(this.selectedAttack.targets === this.allies[this.currentAlly].targets.length) {this.RequestChangeState()}
		})
	}

	// construimos una nueva frase para el Log
	BuildLog(chName,attackInfo, effective,enemy, index){
		let text = chName+" atacó con "+attackInfo.name+" a "+enemy.name+". ";
		// dependiendo del valor que recibamos ponemos un texto u otro
		if(effective[index] === -1) {text+="¡Es super efectivo!";}
		else if (effective[index] === 1) {text+= "No es muy efectivo..."}
		else if(effective[index] === 2){text+="Pero no tuvo efecto."}
		if(attackInfo.type === 5) // Si el ataque es de tipo support
		{
			text = chName+" curó con "+attackInfo.name+" a "+enemy.name+". ";
		}
		this.log.AddText(text); // añadimos el texto al log
		this.log.UpdateLog(); // y lo mostramos (quizá esto podría hacerlo el propio log cuando se añade un texto?)
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
			} else return;
		})
	}

	// generamos a los enemigos en función de la información que nos llega desde enemiesInfo
	GenerateRandomEncounter(){

		this.enemies = []; // inicializamos el array de enemigos
		let height = 360; 
		let enemiesNumber = this.GetRandom(1, false); // número de enemigos

		for(let i = 0; i < enemiesNumber; i++){
			let enemyType = this.GetRandom(this.enemiesInfo.length, true); // tipo de enemigo
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
			this.BuildLog(this.enemies[i].name,this.enemies[i].GetAttack(selectedAttack), effective, this.allies[selectedTarget[j]])
		}
		
		
		// cambiamos el HUD de aliados
		for(let h = 0; h < selectedTarget.length; h++){
			this.alliesHud[selectedTarget[h]].Update();
		}

		// vaciamos sus targets
		this.enemies[i].targets = [];

		this.RequestChangeState();  // Su turno acaba.
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
				this.state = FightState.ChooseAttack;
				// cambiamos el aliado actual
				this.currentAlly = this.turns[this.currentTurn].index;

				//···RAUL PRUEBAS···
				// Input teclado
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
		// se realiza el ataque y se recibe el texto de log
		let effective = this.allies[this.currentAlly].Attack(this.selectedAttack); 
		let self = this;
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
		
		this.RequestChangeState();
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
			if(this.selectedAttack.targets === this.allies[this.currentAlly].targets.length) {this.RequestChangeState();}
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
			this.RequestChangeState();
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
						this.RequestChangeState();
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
					for(let i=0;i<this.enemies.length;i++)
					{
					
					//this.enemies[i].stop();
					this.enemies[i].play(this.enemies[i].imageId+'_wow');
					}
					this.RequestChangeState();
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
		else if(this.state === FightState.ChooseAlly){
			if(Phaser.Input.Keyboard.JustDown(this.aux.eKey))
			{					
				this.allies[this.currentAlly].targets.push(this.allies[this.allaySelected]);
				if(this.selectedAttack.targets === this.allies[this.currentAlly].targets.length) {this.RequestChangeState();}
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