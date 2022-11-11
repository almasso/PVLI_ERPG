import { allyParty } from "./Party.js";


export class Log {
	constructor(scene){
		this.scene = scene;
		this.log = ["¡Comienza el combate!"];
		this.img = this.scene.add.image(10, 490, 'log').setOrigin(0,0);
		this.img.setScale(2,1);
		this.currentText = 0;
		this.verticalOffset = 25;
		this.CreateTexts();
		this.ShowLog();
	}

	CreateTexts(){
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

		this.text1 = this.scene.add.text(this.text2.x, this.text2.y + this.verticalOffset, this.log[this.currentText], 
			{
			font: '20px "Press Start 2P"',
			color: '#ffffff',
			align: 'left',
			});

		this.text1.depth = 3;
		this.text2.depth = 3;
		this.text3.depth = 3;
	}

	AddText(text){
		this.log.push(text);
	}

	UpdateLog(){
		this.currentText++;
		this.ShowLog();
	}

	Up(){
		if(this.currentText !== 0){
			this.currentText--;
			this.ShowLog();
		}
	}

	Down(){
		if(this.currentText < this.log.length - 1){
			this.currentText++;
			this.ShowLog();
		}
	}

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

export class AllyHUD{
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
	//···RAUL PRUEBAS···
	i=0;
	CreateAttackButton(attackText){
		attackText.text.on('pointerover', () => {
			// Esto funciona PERO no cambia el color, que era la forma isi. a ver si se puede hacer otra cosa para que se note que se está haciendo hover
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
		attackText.text.on('pointerup', () => {
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
					//···RAUL PRUEBAS···
					this.scene.choseE=true;
					this.scene.cursor=false;
					this.scene.enemyselected=0;
					console.log(this.scene.enemyselected);
					console.log(this.scene.enemies.length);
				}
				this.DisplayAttacks();
				this.scene.ToggleButtons(false);
				this.scene.pointer.visible = true;//···RAUL PRUEBAS···
				this.scene.combat=false;//···RAUL PRUEBAS···
				
			} else console.log("No hay maná ;-;");
		})
		attackText.text.on('pointerout', () =>{
			//this.scene.pointer.visible = false;
			//···RAUL PRUEBAS···
			this.scene.cursor=false;
			this.i=0;
		})
	}

	DisplayAttacks(){
		this.attackBlock.visible = !this.attackBlock.visible;
		this.attackText.forEach(function (attack){
			attack.text.visible = !attack.text.visible;
			attack.mp.visible = !attack.mp.visible;
		});
		this.scene.ToggleObjectButtons(!this.attackBlock.visible);
			//···RAUL PRUEBAS···
		if(this.scene.combat===false)
		{
			this.scene.combat=true;
			this.scene.pointer.visible=true;
			this.scene.attack=0;
		}
		else if (this.scene.combat===true)
		{
			this.scene.combat=false;
			this.scene.pointer.visible=false;
			this.scene.attack=-1;
		}
	}

	Update(){
		this.HealthBar.Update(this.character.actualHp);
		this.ManaBar.Update(this.character.actualMp);
	}
}

export class EnemyHUD{
	constructor(scene, character)
	{
		// cambiar esto por el propio character :)
		this.character = character;
		this.healthBar = new HealthBar(scene,this.character.x-this.character.displayWidth/1.5, this.character.y + this.character.displayHeight*2.1,this.character.displayWidth*1.8, 'HP', this.character.actualHp, this.character.maxHp);
	}
	
	Update(){
		this.healthBar.Update(this.character.actualHp)
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

export class walkingHUD {
	constructor(x,y,scene,img){
		this.x = x;
		this.y = y;
		this.scene = scene;
		this.imgID = img;
		scene.add.image(x, y, imgID);
		this.GenerateImages();
	}
	GenerateImages(){
		let self = this;
		allyParty.party.forEach(function(ally, index){
			let offset = index * 50 + 30;
			this.add.image(self.x + offset, self.y + offset, ally.imgID);
		});
	}
}