import { allyParty } from "./Party.js";

// LOG DE COMBATE
export class Log {
	constructor(scene){
		this.scene = scene; // referencia a escena
		this.log = ["¡Comienza el combate!"]; // inicializamos el LOG
		this.img = this.scene.add.image(10, 490, 'log').setOrigin(0,0); // añadimos la imagen de fondo
		this.img.setScale(2,1); // setteamos su tamaño
		this.currentText = 0; // índice del texto actual
		this.verticalOffset = 25; // offset vertical
		this.CreateTexts(); // creamos los textos
		this.ShowLog();
	}

	// creación de textos
	CreateTexts(){
		// creamos los textos con vlaor base ---
		this.text3 = this.scene.add.text(this.img.x + 25, this.img.y + 15, "---", 
			{
			font: '20px "Press Start 2P"',
			color: '#ffffff',
			align: 'left',
			});
	
		this.text2 = this.scene.add.text(this.text3.x, this.text3.y + this.verticalOffset, "---", 
			{
			font: '20px "Press Start 2P"',
			color: '#ffffff',
			align: 'left',
			});
		
		// este texto se crea con el valor que tenga el array en la posición 0. será el primero que se cree
		this.text1 = this.scene.add.text(this.text2.x, this.text2.y + this.verticalOffset, this.log[this.currentText], 
			{
			font: '20px "Press Start 2P"',
			color: '#ffffff',
			align: 'left',
			});

		// cambiamos su profundidad
		this.text1.depth = 3;
		this.text2.depth = 3;
		this.text3.depth = 3;
	}

	// añadimos un nuevo texto
	AddText(text){
		this.log.push(text);
	}

	// actualizamos el texto
	UpdateLog(){
		this.currentText++; // movemos el índice
		this.ShowLog(); // mostramos esto
	}

	// vamos hacia arriba
	Up(){
		if(this.currentText !== 0){
			this.currentText--;
			this.ShowLog();
		}
	}

	// vamos hacia abajo
	Down(){
		if(this.currentText < this.log.length - 1){
			this.currentText++;
			this.ShowLog();
		}
	}

	// mostramos el log en función de la posición del currentText
	ShowLog(){
		console.log(this.currentText);
		this.text1.text = this.log[this.currentText];
		if(this.currentText - 1 < 0){
			this.text2.text = "---";
		}
		else this.text2.text = this.log[(this.currentText - 1)];
		if(this.currentText - 2 < 0){
			this.text3.text = "---";
		}
		else this.text3.text = this.log[(this.currentText - 2)];
	}
}

// ALIADOS EN COMBATE
export class AllyHUD{
	constructor(scene, character){
		this.block = scene.add.image(character.x, 0, 'AllyBlock'); // añadimos el fondo a la escena
		this.block.y += this.block.displayHeight/2; // setteamos su posición
		
		this.character = character; // referencia al personaje que representa el HUD
		
		// setteamos su bloque de ataques
		this.attackBlock = scene.add.image(this.block.x - 3*this.block.displayWidth/4, this.block.y*1.94, 'attackBlock').setOrigin(0,0);
		this.attackBlock.setScale(1.5,1);
		this.attackBlock.visible = false;

		// setteamos el texto de sus ataques
		this.attacks = [character.GetAttack(0), character.GetAttack(1), character.GetAttack(2), character.GetAttack(3)];
		this.CreateAttacks(scene);
		
		// setteamos las barras
		this.HealthBar = new HealthBar(scene, this.block.x - this.block.displayWidth/2.5, this.block.y + this.block.displayHeight/6, 8*this.block.displayWidth/10, 'HP', this.character.actualHp, this.character.maxHp);
		this.ManaBar = new HealthBar(scene, this.block.x - this.block.displayWidth/2.5, this.block.y + this.block.displayHeight/3.2, 8*this.block.displayWidth/10, 'MP', this.character.actualMp, this.character.maxMp);
		this.scene = scene;
	}

	// setteamos el texto de los ataques
	CreateAttacks(scene){
		this.attackText = []; // array de objetos: text, mp y srcAttack
		let self = this; // referencia al this
		this.attacks.forEach(function (attack, index) { // recorremos los ataques
			self.attackText[index] = { // creamos el texto
				text: scene.add.text(self.attackBlock.x + self.attackBlock.displayWidth / 14, self.attackBlock.y + index * self.attackBlock.displayHeight / 4 + self.attackBlock.displayHeight/16, attack.name, 
				{
				font: '12px "Press Start 2P"',
				color: '#ffffff',
				align: 'left',}), 

				mp: scene.add.text(self.attackBlock.x + 7.5*self.attackBlock.displayWidth/10, self.attackBlock.y + index * self.attackBlock.displayHeight / 4 + self.attackBlock.displayHeight/16, attack.requiredMps + " MP", 
				{ // puntos de mana
				font: '12px "Press Start 2P"',
				fontStyle: 'bold',
				color: colors[attack.type], // color en función de tipo
				align: 'left',
				}), srcAttack: attack } // setteamos el ataque base al ataque que queramos
			
			
			self.attackText[index].text.visible = false; // invisible
			self.attackText[index].mp.visible = false;

			self.attackText[index].text.setInteractive(); // hacemos que sea interactuable
			self.CreateAttackButton(self.attackText[index]); // creamos el botón de ataque
		});
	}
	i=0; // RAÚL explícame esto por fa
	CreateAttackButton(attackText){ // creamos los botones de ataque
		attackText.text.on('pointerover', () => { // puntero encima
			if(this.scene.allies[this.scene.currentAlly].CanAttack(attackText.srcAttack)){
				this.scene.cursor=true; //···RAUL PRUEBAS···
			this.scene.pointer.visible = true;
			this.scene.pointer.x = attackText.text.x-15;
			this.scene.pointer.angle = 0;
			this.scene.pointer.y = attackText.text.y+attackText.text.displayHeight/2;
			this.scene.pointer.setScale(1);
			
			//···RAUL PRUEBAS···
			while(this.i<4)
			{
				if(this.attackText[this.i]===attackText) this.scene.attack=this.i;
				this.i++;
			}
			} else console.log("NO HAY PUNTERO ;-;");
		});
		attackText.text.on('pointerup', () => { // hemos pulsado el botón
			if(this.scene.allies[this.scene.currentAlly].CanAttack(attackText.srcAttack)){
				this.scene.selectedAttack = attackText.srcAttack;
				if(attackText.srcAttack.isSupport())
				{
					 this.scene.EnableTargetting(this.scene.allies);

					 //···RAUL PRUEBAS···
					 this.scene.choseA=true;
					this.scene.cursor=false;
					this.scene.allaySelected=0;
					console.log(this.scene.allaySelected);
					console.log(this.scene.allies.length);
				}
				else {
					this.scene.EnableTargetting(this.scene.enemies);
					this.scene.choseE=true;
					this.scene.cursor=false;
					this.scene.enemyselected=0;
					console.log(this.scene.enemyselected);
					console.log(this.scene.enemies.length);
				}
				this.DisplayAttacks();
				this.scene.ToggleButtons(false);
				this.scene.pointer.visible = true;
				this.scene.combat=false;
				
			} else console.log("No hay maná ;-;");
		})
		attackText.text.on('pointerout', () =>{ // hemos qutiado el botón
			this.scene.cursor=false;
			this.i=0;
		})
	}

	// mostrar ataques
	DisplayAttacks(){
		this.attackBlock.visible = !this.attackBlock.visible; // este método sirve para mostrar y esconder ataques
		this.attackText.forEach(function (attack){
			attack.text.visible = !attack.text.visible;
			attack.mp.visible = !attack.mp.visible;
		});
		this.scene.ToggleObjectButtons(!this.attackBlock.visible); // desactivamos / activamos botones

		// updateamos cosas para el uso del ratón en combate
		if(!this.scene.combat)
		{
			this.scene.combat=true;
			this.scene.pointer.visible=true;
			this.scene.attack=0;
		}
		else
		{
			this.scene.combat=false;
			this.scene.pointer.visible=false;
			this.scene.attack=-1;
		}
	}
	
	// actualizamos las barras
	Update(){
		this.HealthBar.Update(this.character.actualHp);
		this.ManaBar.Update(this.character.actualMp);
	}
}

// ENEMIGOS EN COMBATE
export class EnemyHUD{
	constructor(scene, character)
	{
		this.character = character; // referencia al enemigo
		// barra de vida con texto
		this.healthBar = new HealthBar(scene,this.character.x-this.character.displayWidth/1.5, this.character.y + this.character.displayHeight*2.1,this.character.displayWidth*1.8, 'HP', this.character.actualHp, this.character.maxHp);
	}
	
	// actualizamos la barra de vida
	Update(){
		this.healthBar.Update(this.character.actualHp);
		// cambiarle la pos
	}
}

// BARRAS DE VIDA / MANÁ
class HealthBar {

	constructor (scene, x, y, width, type, initialValue, maxValue, hasText = true)
	{
		this.bar = new Phaser.GameObjects.Graphics(scene); // Generamos el tipo de objeto
		// posición
		this.x = x;
		this.y = y;
		this.value = initialValue; // valor incial
		this.width = width; // ancho
		this.type = type; // tipo: VIDA / MANÁ
		this.maxValue = maxValue; // valor máximo
		this.height = 10; // altura
		scene.add.existing(this.bar); // añadimos la barra a la escena
		this.hasText = hasText; // tiene texto?
		if(this.hasText){ // si lo tiene, se crea
			this.texto = scene.add.text(x + this.width/3.2, y + this.height/1.5, this.value + ' / '+maxValue + ' ' + type, { font: '"Press Start 2P"' });
		}
		this.draw(); // dibujamos la barra en la escena
	}

	// actualizamos la barra
	Update(newValue){
		this.updateValue(newValue); // actualizamos su valor
		this.draw(); // dibujado
	}

	// actualización de valor (método "interno")
	updateValue(newValue){
		this.value = newValue;
	}

	// dibujado
	draw ()
	{
		this.bar.clear(); // limpiamos la barra

		// si tiene texto...
		if(this.hasText) this.texto.setText(this.value + ' / '+this.maxValue + ' ' + this.type)

		//  fondo
		this.bar.fillStyle(0x000000);
		this.bar.fillRect(this.x, this.y, this.width, 10);
		//  fill
		if (this.value < 30 && this.type == 'HP') // en rojo si está a poca vida
		{
			this.bar.fillStyle(0xff0000);
		}
		else // color base con más vida
		{
			if(this.type == 'HP') this.bar.fillStyle(0x00ff00);
			else this.bar.fillStyle(0x0000ff);
		}

		let barWidth = (this.value*this.width) / this.maxValue; // ancho

		this.bar.fillRect(this.x + 2, this.y + 2, barWidth - 4, 6); // dibujado
	}
}
var colors = ['#cccccc','#aaaaaa','#ff0000','#00ffff','#ff00ff','#00ff00'];

// MODO EXPLORACIÓN 
export class walkingHUD {
	constructor(x,y,scene,img){
		this.x = x; // posición
		this.y = y;
		this.scene = scene; // escena
		this.imgID = img; // id imagen
		let bgIMG = this.scene.add.image(this.x, this.y, this.imgID).setOrigin(0,0); // imagen como tal
		bgIMG.setScale(0.4 * allyParty.party.length,1) // setteamos la escala en función del tamaño de la party
		this.charInfo = {image:"",health:"", mana: ""};	// objeto de información del HUD
		this.characters = []; // array de objetos de información
		this.GenerateImages(); // generamos las imágenes de cada bichito
	}

	GenerateImages(){
		let self = this; // guardamos referencia al this
		allyParty.party.forEach(function(ally, index){ // recorremos toda la party
			self.characters[index] = self.charInfo; // metemos un nuevo objeto de info al array de info
			let offset = 28; // offset que cuadra bien 
			let x = self.x+ offset + index * 50; // x para las imágenes
			let barX = x - offset/2; // x para las barras
			self.characters[index].image = self.scene.add.image(x, self.y + 25, ally.imgID + 'Head'); // generar imagen
			self.characters[index].image.setScale(2); // escalarla
			// generar barras de vida
			// usamos la allyParty para acceder a los valores de vida de cada PJ
			self.characters[index].health = new HealthBar(self.scene,barX,self.y + 35,30,"HP",ally.actualHp, ally.maxHp, false);
			self.characters[index].mana = new HealthBar(self.scene,barX,self.y + 45,30,"MP",ally.actualMp, ally.maxMp, false);
		});
	}

	// actualización de valores
	// AHORA MISMO NO FUNCIONA PARA EL PRIMERO DEL ARRAY DE PARTY NO SÉ POR QUÉ
	Update(){
		// guardamos referencia al this
		let self = this;
		allyParty.party.forEach(function(ally, index){ // recorremos toda la party
			// console.log(ally.actualHp, ally.actualMp); // DEBUG que no entiendo por qué no actualiza a manín
			// actualizamos las barras de vida y maná
			self.characters[index].health.Update(ally.actualHp); 
			self.characters[index].mana.Update(ally.actualMp);
		});
	}
}

export class ExploreMenu {
	constructor(x,y,scene, imgID){
		this.x = x; // posición
        this.y = y;
        this.scene = scene; // escena
		this.imgID = imgID; // imagen
		this.bImage = this.scene.add.image(x,y,imgID);
		this.viewPartyButton = this.scene.add.text(this.x,this.y,"PARTY", {font: '"Press Start 2P"'}); // botón para ver el estado de la party
		this.changePartyButton;
		this.backButton; // salir del menú actual
		this.currentMenu; // variable que ayude al backButton a gestionar la salida de los menús
		this.objectButton;
	}

	Show(bool){ // mostrar/ocultar el menú
		ToggleButtons(bool); // activar o desactivar botones
	}

	ToggleButtons(bool){ // activar o desactivar botones 
		if(bool){
			viewPartyButton.disableInteractive();
		} 
		else{
			viewPartyButton.setInteractive();
		}
	}

	ShowParty(bool){ // activamos/desactivamos el submenú de estado de la party
		// aquí se podrán seleccionar los diferentes integrantes de la party para ver sus stats.
	}

	ShowChangeParty(bool){ // activamos/desactivamos el submenú de cambiar integrantes y orden en la party
		// se mostrarán los personajes activmos en grande en el centro de la pantalla y debajo
		// los personajes disponibles para intercambiar
	}

	Back(){ // ejecutado al pulsar el botón back
		// en función del menú actual, se irá a uno anterior
	}



}