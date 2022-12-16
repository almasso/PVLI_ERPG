import {allyParty} from '../fight/Party.js'
import FatherScene from './FatherScene.js';
// Escena de exploración (temporal de momento)
export default class Square extends FatherScene {
	// construimos la escena
	constructor() {
		super('square');
	}
	
	// inicializamos la escena
	create() {
		
		const config = {
			mute: false,
			volume: 0.5,
			rate: 1,
			detune: 0,
			seek: 0,
			loop: true,
			delay: 0,
		};
		this.musica = this.sound.add('square', config);
		this.musica.play();
		super.create();
		this.manin.x=600;
		this.manin.y=150;
		for(let i=0;i<this.eObjs.length;i++)this.eObjs[i].setVisible(false)
		
		for(let i=0;i<this.sceneChangerCoords.length;i++)this.sceneChangerCoords[i].setVisible(false)
		this.qFunctions = [];

		let self = this;
		this.qFunctions.push(function(){
			self.scene.sleep('hud');
			self.scene.sleep('square');
			self.scene.launch('fightscene', {loadFromEnviroment: true, index: 0})
			self.scene.get('fightscene').LoadInventory(allyParty.inventory);
		})
		
		super.generateQuests(this.qFunctions);
		//this.npcs[this.npcs.lengt-1].collider.destroy()
		this.npcs[this.npcs.length-1].setScale(5,5)
		this.npcs[this.npcs.length-1].trigger.setScale(4,4)
		
		this.anims.create({
			
			key: 'wake', //identificador de la animación
			frames: this.anims.generateFrameNumbers('dino_wake',  // cambiar animaciones cuando esten hechas
			{
				start:0, // primera imagen del Spritesheet que se ejecuta en la animación
				end:11 // última imagen del Spritesheet que se ejecuta en la animación
			}), 
			frameRate: 5, // imágenes/frames por segundo
			repeat: -1
		});
		this.npcs[11].play('wake')
	}
	
	// comprobación de colisiones y apertura de menús
	update(){
		super.update();
	}
}