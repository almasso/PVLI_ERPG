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
					//···RAUL PRUEBAS···
					this.scene.choseA=true;
					this.scene.cursor=false;
					this.scene.allaySelected=0;
					console.log(this.scene.allaySelected);
					console.log(this.scene.allies.length);
				}
				else {
					//···RAUL PRUEBAS···
					this.scene.choseE=true;
					this.scene.cursor=false;
					this.scene.enemyselected=0;
					console.log(this.scene.enemyselected);
					console.log(this.scene.enemies.length);
				}
				this.scene.RequestChangeState();
				this.DisplayAttacks(false);
				this.scene.pointer.visible = true;//···RAUL PRUEBAS···
				this.scene.combat=false;//···RAUL PRUEBAS···
				
			} else console.log("No hay maná ;-;");
		})
		attackText.text.on('pointerout', () =>{ // hemos qutiado el botón
			this.scene.cursor=false;
			this.i=0;
		})
	}

	// mostrar ataques
	DisplayAttacks(hideObjects){
		this.attackBlock.visible = !this.attackBlock.visible; // este método sirve para mostrar y esconder ataques
		this.attackText.forEach(function (attack){
			attack.text.visible = !attack.text.visible;
			attack.mp.visible = !attack.mp.visible;
		});
		if(hideObjects) this.scene.ToggleObjectButtons(!this.attackBlock.visible); // desactivamos / activamos botones
			//···RAUL PRUEBAS···
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

export class InventoryHUD{
	constructor(scene, inv, x, y){
		this.inventoryBlock = scene.add.image(x, y, 'attackBlock').setOrigin(0,0);
		this.inventoryBlock.setScale(1.5,1);
		this.inventoryBlock.visible = false;

		this.initialItem = 0;
		this.finalItem = 3;

		this.inventory = inv;
		this.scene = scene;

		this.CreateItems(scene)
	}

	CreateItems(scene){
		this.itemsText = [];
		let self = this;
		this.inventory.inv.forEach(function(item, index){
			self.itemsText[index] = {
				text: scene.add.text(self.inventoryBlock.x + self.inventoryBlock.displayWidth / 14, self.inventoryBlock.y + index * self.inventoryBlock.displayHeight / 4 + self.inventoryBlock.displayHeight / 16, item.name,
				{
					font: '12px "Press Start 2P"',
					color: '#ffffff',
					align: 'left',}),
				
				quantity: scene.add.text(self.inventoryBlock.x + 7.5 * self.inventoryBlock.displayWidth / 10, self.inventoryBlock.y + index * self.inventoryBlock.displayHeight / 4 + self.inventoryBlock.displayHeight / 16, item.quantity,
				{
					font: '12px "Press Start 2P"',
					color: '#ffffff',
					align: 'left',})}

			self.itemsText[index].text.visible = false;
			self.itemsText[index].quantity.visible = false;

			self.itemsText[index].text.setInteractive();
		});
		if(this.inventory.inv.length < 4) this.finalItem = this.inventory.inv.length - 1;
	}

	DisplayItems(){
		let i = 0;
		this.inventoryBlock.visible = !this.inventoryBlock.visible;
		for(i = this.initialItem; i <= this.finalItem; i++){
			this.itemsText[i].text.x = this.inventoryBlock.x + this.inventoryBlock.displayWidth / 14;
			this.itemsText[i].text.y = this.inventoryBlock.y + (i - this.initialItem) * this.inventoryBlock.displayHeight/4 + this.inventoryBlock.displayHeight / 16;
			this.itemsText[i].quantity.x = this.inventoryBlock.x + 7.5 * this.inventoryBlock.displayWidth / 10;
			this.itemsText[i].quantity.y = this.inventoryBlock.y + (i - this.initialItem) * this.inventoryBlock.displayHeight / 4 + this.inventoryBlock.displayHeight / 16
			this.itemsText[i].text.visible = this.inventoryBlock.visible;
			this.itemsText[i].quantity.visible = this.inventoryBlock.visible;
			this.ItemButtom(this.itemsText[i], i)
		}
	}

	// vamos hacia arriba
	Up(){
		if(this.initialItem !== 0){
			this.DisplayItems();
			this.initialItem--;
			this.finalItem--;
			this.DisplayItems();
		}
	}

	// vamos hacia abajo
	Down(){
		if(this.finalItem < this.itemsText.length - 1){
			this.DisplayItems();
			this.initialItem++;
			this.finalItem++;
			this.DisplayItems();
		}
	}

	//Le damos funcionalidad a cada objeto del inventario
	ItemButtom(itemText, index){
		let self = this;
		itemText.text.on('pointerup', () =>{ //Cuando se pulsa:
			self.scene.selectedItem = self.inventory.inv[index]; //Se selecciona el objeto que queremos usar
			self.scene.inventoryUp.visible = !self.scene.inventoryUp.visible //Hacemos invisible las flechas de navegación 
			self.scene.inventoryDown.visible = !self.scene.inventoryDown.visible //del inventario
			self.DisplayItems(); //Quitamos el inventario
			self.scene.RequestChangeState(true); //Se cambia el estado de combate al uso de objetos
		})
	}

	//Se cambia el inventario en caso de que haya sido usado
	UpdateItem(inv){
		this.inventory = inv;
		this.CreateItems(this.scene);
	}
}

export class shopHUD{
	constructor(scene, x, y, items){
		this.scene = scene;
		this.shopBlock = scene.add.image(x, y, 'log').setOrigin(0, 0);
		this.currentItem = 0;
		this.verticalOffset = 25;
		this.items = items;
		this.createItems();
	}

	createItems(){
		this.itemsText = [];
		let self = this;
		this.items.forEach(function(item, index){
			self.itemsText[index] = {
				name: scene.add.text(self.shopBlock.x + self.shopBlock.displayWidth / 14, self.shopBlock.y + index * self.shopBlock.displayHeight / 2 + self.shopBlock.displayHeight / 16, item.name,
				{
					font: '12px "Press Start 2P"',
					color: '#ffffff',
					align: 'left',}),
				}
			self.itemsText[index].name.visible = false;

			self.itemsText[index].name.setInteractive();
		});
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

	constructor (scene, x, y, width, type, initialValue, maxValue, hasText = true, height = 10)
	{
		this.bar = new Phaser.GameObjects.Graphics(scene); // Generamos el tipo de objeto
		// posición
		this.x = x;
		this.y = y;
		this.value = initialValue; // valor incial
		this.renderDiff = 0.5;
		this.renderingValue = initialValue;
		this.increase = 0; // 1 suma, 0 nada, -1 resta
		this.width = width; // ancho
		this.type = type; // tipo: VIDA / MANÁ
		this.maxValue = maxValue; // valor máximo
		this.height = height; // altura
		scene.add.existing(this.bar); // añadimos la barra a la escena
		this.hasText = hasText; // tiene texto?
		this.bar.depth = 3;
		if(this.hasText){ // si lo tiene, se crea
			this.texto = scene.add.text(x + this.width/3.2, y + this.height, this.value + ' / '+maxValue + ' ' + type, { font: '"Press Start 2P"' });
			this.texto.depth = 7;
			this.bar.depth = 7;
		}
		this.hidden;
		this.draw(); // dibujamos la barra en la escena
	}

	// actualizamos la barra
	Update(newValue){
		console.log(newValue + this.type);
		this.updateValue(newValue); // actualizamos su valor
		this.draw(); // dibujado
	}

	// actualización de valor (método "interno")
	updateValue(newValue){
		this.value = Math.floor(newValue);
	}

	// ocultar barra
	hide(bool){
		this.hidden = bool;
		this.draw();
	}

	// dibujado
	draw ()
	{
		this.bar.clear(); // limpiamos la barra
		if(this.hasText) this.texto.visible = !this.hidden;
		if(!this.hidden){
			// si tiene texto...
			if(this.hasText){ this.texto.setText(this.value + ' / '+this.maxValue + ' ' + this.type); }
			
			//  fondo
			this.bar.fillStyle(0x000000);
			this.bar.fillRect(this.x, this.y, this.width, this.height);
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
	
			let keepDrawing = this.keepDrawing();
			if(keepDrawing.changing && this.renderingValue > 0) {        // La barra de vida puede ser negativa por el renderingvalue, retocar esto
				if(keepDrawing.decrease) this.renderingValue -= this.renderDiff;
				else this.renderingValue += this.renderDiff;
			}

			let barWidth = (this.renderingValue*this.width) / this.maxValue; // ancho
	
			this.bar.fillRect(this.x + 2, this.y + 2, barWidth - 4, this.height - 4); // dibujado
		}
	}

	keepDrawing()
	{
		if(this.renderingValue > this.value) return { changing: true, decrease: true };
		else if (this.renderingValue < this.value) return { changing: true, decrease: false };
		else return { changing: false, decrease: false };
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
		this.characters = []; // array de objetos de información
		this.GenerateImages(); // generamos las imágenes de cada bichito
	}

	charInfo(){
		return {image: "", health: "", mana: ""};	// objeto de información del HUD
	}

	GenerateImages(){
		let self = this; // guardamos referencia al this
		allyParty.party.forEach(function(ally, index){ // recorremos toda la party
			self.characters[index] = self.charInfo(); // metemos un nuevo objeto de info al array de info
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
			console.log("COSAS:");
			console.log(self.characters[index].health.x, self.characters[index].health.y)
			console.log(self.characters[index].health.renderingValue);
			console.log(self.characters[index].mana.renderingValue);

			self.characters[index].health.renderingValue = ally.actualHp;
			self.characters[index].mana.renderingValue = ally.actualMp;

			console.log(self.characters[index].health.renderingValue);
			console.log(self.characters[index].mana.renderingValue);

			self.characters[index].health.Update(ally.actualHp); 
			self.characters[index].mana.Update(ally.actualMp);
		});
	}
}

// enumerador de tipos de ataque
const typeOfAttack = {
	0: "Físco",
	1: "Rango",
	2: "Fuego",
	3: "Eléctrico",
	4: "Tóxico",
	5: "Apoyo"
};

export class ExploreMenu {
	constructor(x,y,scene, imgID, pointer){
		this.x = x; // posición
        this.y = y;
        this.scene = scene; // escena
		this.imgID = imgID; // imagen
		this.bImage = this.scene.add.image(x,y,imgID).setOrigin(0,0);
		this.bImage.setScale(1.5);
		this.bImage.depth = 5;
		this.pointer = pointer;
		this.AddPartyMenu(); // añadir el submenú de la party
		this.AddPartyManagementMenu()
		this.AddButtons(); // añadir botones para los submenús
		this.backButton; // salir del menú actual
		this.currentMenu; // variable que ayude al backButton a gestionar la salida de los menús
		this.objectButton;
		this.alliesToSwap = [];
	}

	AddPartyManagementMenu(){
		let x = 0;
		let y = 2;
		this.managerImages = [];
		let self = this;
		allyParty.party.forEach(function(ally, index){
			// declaración de variables
			let images = self.managerImages[index];
			if(index < allyParty.alliesNum){
				let scale = 1.5;
				let newX = x+98 * scale *index;
				images = {bgIMG: self.scene.add.image(newX,y,'partyStateBG').setOrigin(0,0).setScale(scale), 
						  charIMG: self.scene.add.image(newX + 49 * scale,y +49 * scale,ally.imgID).setScale(2*scale),
						  index: index};				
				images.bgIMG.depth = 7;
				images.charIMG.depth = 8;
				images.bgIMG.visible = false;
				images.charIMG.visible = false;
			}
			else{

			}
			self.managerImages[index] = images;
		})
	}
	SwapAllies(images, index){
		this.alliesToSwap.push(images[index]); // acordarse de borrar el array cuando quites el menú
		if(this.alliesToSwap.length == 2){
			console.log("2 selected");
			[this.alliesToSwap[0].charIMG,this.alliesToSwap[1].charIMG] = 
			[this.alliesToSwap[1].charIMG,this.alliesToSwap[0].charIMG];

			[this.alliesToSwap[0].charIMG.x,this.alliesToSwap[1].charIMG.x] =
			[this.alliesToSwap[1].charIMG.x,this.alliesToSwap[0].charIMG.x];

			[this.alliesToSwap[0].index, this.alliesToSwap[1].index] =
			[this.alliesToSwap[1].index, this.alliesToSwap[0].index];

			this.alliesToSwap = [];
		}
	}

	// usado solo para crear los botones
	AddButtons(){
		let buttonX = this.x+20;
		let buttonY = this.y+60;
		//#region MAIN MENU BUTTONS
		// PARTY STATE BUTTONS
		this.viewPartyButton = this.scene.add.image(buttonX, buttonY, 'menuPartyButton').setOrigin(0,0); // botón para ver el estado de la party
		this.viewPartyButton.setInteractive();
		this.viewPartyButton.setScale(1.5);
		this.viewPartyButton.depth = 6;
		this.pointer.depth = 6;
		let self = this;
		let viewParty = false;
		let manageParty = false;
		this.viewPartyButton.on("pointerup", function(){
			viewParty = !viewParty;
			manageParty = false;
			self.ManageParty(manageParty);
			self.ShowParty(viewParty);
		});

		this.viewPartyButton.on("pointerover", function(){
			self.pointer.x = buttonX - self.viewPartyButton.displayWidth / 6;
			self.pointer.y = buttonY + self.viewPartyButton.displayHeight / 3;
			self.pointer.visible = true;
		});
		
		this.viewPartyButton.on("pointerout", function(){
			self.pointer.visible = false;
		});

		// PARTY MANAGER BUTTON
		this.managePartyButton = this.scene.add.image(buttonX, buttonY + 60, 'menuOrderButton').setOrigin(0,0).setInteractive().setScale(1.5);
		this.managePartyButton.depth = 6;
		this.managePartyButton.visible = false;
		this.managePartyButton.on("pointerup", function(){
			manageParty = !manageParty;
			viewParty = false;
			self.ShowParty(viewParty);
			self.ManageParty(manageParty);
		});
		this.managePartyButton.on("pointerover", function(){
			self.pointer.x = buttonX - self.managePartyButton.displayWidth / 6;
			self.pointer.y = buttonY +60 + self.managePartyButton.displayHeight / 3;
			self.pointer.visible = true;
		});
		this.managePartyButton.on("pointerout", function(){
			self.pointer.visible = false;
		});
		//#endregion

		//#region PARTY MENU BUTTONS
		
		//#endregion
		//#region MANAGE PARTY MENU BUTTONS
		console.log("NAJS D");
		this.managerImages.forEach(function(image, index){
			image.bgIMG.setInteractive();

			image.bgIMG.on("pointerover", function(){
				console.log("HOVER ON PARTY BUTTON")
			})

			image.bgIMG.on("pointerout", function(){
				console.log("NOT HOVER")
			})
			
			image.bgIMG.on("pointerup", function(){
				console.log("INTERACTUASDS");
				self.SwapAllies(self.managerImages, index);
			})
		});

		//#endregion
	}
	// devuelve un objeto con dos imágenes dadas (usado en AddPartyMenu)
	imageInfo(char, bg, statsBG){
		return {charIMG: bg, bImage: char, statIMG: statsBG, stats:{
			hp: 100,
			maxHp: 100,
            mp: 100,
			maxMp: 100,
			attacks: [],
			resistances: [],
			acurracy: 95,
			speed: 50,
			resP: 0,resR: 0,resE: 0,resF: 0,resT: 0
		} };
	}
	
	// usado solo para crear el menú de la party	
	AddPartyMenu(){
		let x = 0;
		let y = 2;
		this.partyImages = [];
		let self = this;
		allyParty.party.forEach(function(ally, index){
			// declaración de variables
			let scale = 1.5;
			let newY = y+98 * scale *index;
			let images = self.partyImages[index];
			
			// imágenes de fondo
			images = self.imageInfo(self.scene.add.image(x,newY,'partyStateBG').setOrigin(0,0),
			self.scene.add.image(x + 49*scale, newY + 49*scale, ally.imgID), self.scene.add.image(x + 100 * scale, newY, 'partyStats').setOrigin(0,0));

			// cambiar escala
			images.bImage.setScale(scale);
			images.charIMG.setScale(scale*2);
			images.statIMG.setScale(0.72,1);
			
			// generación de textos
			let resOffset = 63;
			let resOffset1 = 35;
			let res = ally.rP + " " + ally.rR + " "+ ally.rE + " " + ally.rF + " " + ally.rT;
			images.stats.rP = self.scene.add.image(x+ 100*scale + resOffset, newY +90, 'resP');
			images.stats.rR = self.scene.add.image(x+ 100*scale + resOffset + resOffset1, newY +90, 'resR');
			images.stats.rE = self.scene.add.image(x+ 100*scale + resOffset + resOffset1 * 2, newY +90, 'resE');
			images.stats.rF = self.scene.add.image(x+ 100*scale + resOffset + resOffset1 * 3, newY +90, 'resF');
			images.stats.rT = self.scene.add.image(x+ 100*scale + resOffset + resOffset1 * 4, newY +90, 'resT');
			images.stats.resistances = self.scene.add.text(x+ 100*scale + 50, newY + 115, res,{font: "30px Courier New"});
			images.stats.hp = new HealthBar(self.scene, x+100*scale + 50, newY +10, 170, 'HP', ally.actualHp, ally.maxHp, true, 15);
			images.stats.mp = new HealthBar(self.scene, x+100*scale + 50, newY +40, 170, 'MP', ally.actualMp, ally.maxMp, true, 15);

			images.stats.speed = ally.speed;
			images.stats.attacks[0] = self.scene.add.text(x + 200 * scale + 100, newY + 20, ally.attack[0].name +" "+ ally.attack[0].requiredMps+" MP",{font: "14px Courier New", color: colors[ally.attack[0].type]} );
			images.stats.attacks[1] = self.scene.add.text(x + 200 * scale + 100, newY + 50, ally.attack[1].name +" "+ ally.attack[1].requiredMps+" MP",{font: "14px Courier New", color: colors[ally.attack[1].type]} );
			images.stats.attacks[2] = self.scene.add.text(x + 200 * scale + 100, newY + 80, ally.attack[2].name +" "+ ally.attack[2].requiredMps+" MP",{font: "14px Courier New", color: colors[ally.attack[2].type]} );
			images.stats.attacks[3] = self.scene.add.text(x + 200 * scale + 100, newY + 110, ally.attack[3].name +" "+ ally.attack[3].requiredMps+" MP",{font: "14px Courier New", color: colors[ally.attack[3].type]} );
			
			self.SetAttackInfo(images.stats.attacks, index, ally.attack);

			// cambio de depth
			images.stats.rP.depth = 7;
			images.stats.rR.depth = 7;
			images.stats.rE.depth = 7;
			images.stats.rF.depth = 7;
			images.stats.rT.depth = 7;
			images.charIMG.depth = 6;
			images.bImage.depth = 5;
			images.statIMG.depth = 5;
			images.stats.resistances.depth = 7;
			//images.stats.maxHp.depth = 7;
			images.stats.hp.depth = 7;
			images.stats.attacks[0].depth = 7;
			images.stats.attacks[1].depth = 7;
			images.stats.attacks[2].depth = 7;
			images.stats.attacks[3].depth = 7;

			// invisible
			images.stats.rP.visible = false;
			images.stats.rR.visible = false;
			images.stats.rE.visible = false;
			images.stats.rF.visible = false;
			images.stats.rT.visible = false;
			images.bImage.visible = false;
			images.charIMG.visible = false;
			images.statIMG.visible = false;
			images.stats.resistances.visible = false;
			images.stats.hp.hide(true);
			images.stats.mp.hide(true);
			images.stats.attacks[0].visible = false;
			images.stats.attacks[1].visible = false;
			images.stats.attacks[2].visible = false;
			images.stats.attacks[3].visible = false;

			self.partyImages[index] = images;
		})
	}

	// Crear la información de los ataques
	SetAttackInfo(attacks,oldIndex, srcAttack){
		this.attackInfo = [];
		let self = this;
		attacks.forEach(function(attack, index) {
			attack.setInteractive();
			let newIndex = (oldIndex +1)* (index+1) + index;
			let info = self.attackInfo[newIndex];
			let attType = "Tipo: " + typeOfAttack[srcAttack[index].type];
			let attDmg = srcAttack[index].dmg;
			if(attType === "Tipo: " + typeOfAttack[5]) attDmg = 'Cura: ' + (-attDmg);
			else attDmg = 'Daño: ' + attDmg;
			info = {
				bgIMG: self.scene.add.image(attack.x, attack.y, 'partyStateBG').setOrigin(0,0),
				type: self.scene.add.text(attack.x + 15, attack.y + 15, attType, {font: "12px Courier New"}).setOrigin(0,0),
				dmg: self.scene.add.text(attack.x+15, attack.y + 30, attDmg, {font: "12px Courier New"}).setOrigin(0,0),
				targets: self.scene.add.text(attack.x+15, attack.y + 45, 'Nº Obj.: ' + srcAttack[index].targets, {font: "12px Courier New"}).setOrigin(0,0)
			};

			info.bgIMG.setScale(1.2,0.8);

			info.bgIMG.depth = 8;
			info.dmg.depth = 8;
			info.type.depth = 8;
			info.targets.depth = 8;

			info.bgIMG.visible = false;
			info.dmg.visible = false;
			info.type.visible = false;
			info.targets.visible = false;

			attack.on("pointerover", function (){
				info.bgIMG.visible = true;
				info.dmg.visible = true;
				info.type.visible = true;
				info.targets.visible = true;
			})
			attack.on("pointerout", function (){
				info.bgIMG.visible = false;
				info.dmg.visible = false;
				info.type.visible = false;
				info.targets.visible = false;
			})
		});
	}

	Show(bool){ // mostrar/ocultar el menú
		this.bImage.visible = bool;
		this.ToggleButtons(bool); // activar o desactivar botones
	}

	ToggleButtons(bool){ // activar o desactivar botones 
		if(!bool){
			this.viewPartyButton.disableInteractive();
			this.managePartyButton.disableInteractive();
		} 
		else{
			this.viewPartyButton.setInteractive();
			this.managePartyButton.setInteractive();
		}
		this.viewPartyButton.visible = bool;
		this.managePartyButton.visible = bool;
		this.pointer.visible = false;
	}

	ShowParty(bool){ // activamos/desactivamos el submenú de estado de la party
		// aquí se podrán seleccionar los diferentes integrantes de la party para ver sus stats.
		this.partyImages.forEach(function(images){
			images.charIMG.visible = bool;
			images.bImage.visible = bool;
			images.statIMG.visible = bool;
			images.stats.resistances.visible = bool;
			//images.stats.maxHp.visible = bool;
			images.stats.rP.visible = bool;
			images.stats.rR.visible = bool;
			images.stats.rE.visible = bool;
			images.stats.rF.visible = bool;
			images.stats.rT.visible = bool;
			images.stats.hp.hide(!bool);
			images.stats.mp.hide(!bool);
			images.stats.attacks[0].visible = bool;
			images.stats.attacks[1].visible = bool;
			images.stats.attacks[2].visible = bool;
			images.stats.attacks[3].visible = bool;
		})
	}

	ManageParty(bool){
		this.managerImages.forEach(function(image){
			image.bgIMG.visible = bool;
			image.charIMG.visible = bool;
		});
		if(!bool){
			allyParty.swapAllies(this.managerImages);
		}
	}

	ShowChangeParty(bool){ // activamos/desactivamos el submenú de cambiar integrantes y orden en la party
		// se mostrarán los personajes activmos en grande en el centro de la pantalla y debajo
		// los personajes disponibles para intercambiar
	}

	Back(){ // ejecutado al pulsar el botón back
		// en función del menú actual, se irá a uno anterior
	}
}