import {Attack, Ultimate} from './Attack.js'
const typeOfAttack = { // enumerador de tipo de ataque (CONECTAR ESTO CON ATTACK PARA NO VOLVER A ESCRIBIRLO)
	Physical: 0,
	Ranged: 1,
	Fire: 2,
	Electrical: 3,
	Toxic: 4,
	Support: 5
};

// clase de personaje en combate
export default class Character extends Phaser.GameObjects.Sprite {
	constructor(scene, name,x, y, imageId, actualHp, maxHp, actualMp, maxMp){
		super(scene, x, y, imageId);
		this.imageId = imageId; // imagen
		this.scene.add.existing(this); // añadimos a la escena de combate
		this.name = name; // nombre
		this.actualHp = actualHp; // vida actual
		this.maxHp = maxHp; // vida máxima
		this.actualMp = actualMp; // puntos de maná 
		this.maxMp = maxMp; // maná máximo
		this.lvl = 1; // nivel (NO IMPLEMENTADO)
		this.resistances = [0, 0, 0, 0, 0, 0]; // resistencias
		this.acurracy = 0; // puntería
		this.dead = false; // muerto
		this.speed = 0; // velocidad
		this.attacks = []; // ataques
		this.targets = []; // objetivos
		
		//#region  animaciones (PRUEBAS RAÚL)
		this.mon='artist'; // pruebas animación
		console.log(imageId);
		if(imageId!='manin'){						
				this.mon=imageId;	
		}

		this.scene.anims.create({
			
			key: this.mon+'_daño', //identificador de la animación
			frames: scene.anims.generateFrameNumbers(this.mon+'_daño', 
			{
				start:0, // primera imagen del Spritesheet que se ejecuta en la animación
				end:2 // última imagen del Spritesheet que se ejecuta en la animación
			}), 
			frameRate: 5, // imágenes/frames por segundo
			repeat: 1
		});

		this.scene.anims.create({
			key: this.mon+'_wow', //identificador de la animación
			frames: scene.anims.generateFrameNumbers(this.mon+'_wow', 
			{
				start:0, // primera imagen del Spritesheet que se ejecuta en la animación
				end:2 // última imagen del Spritesheet que se ejecuta en la animación
			}), 
			frameRate: 5, // imágenes/frames por segundo
			repeat: 1
		});

		this.scene.anims.create({
			key: this.mon+'_idle', //identificador de la animación
			frames: scene.anims.generateFrameNumbers(this.mon, 
			{
				start:0, // primera imagen del Spritesheet que se ejecuta en la animación
				end:2 // última imagen del Spritesheet que se ejecuta en la animación
			}), 
			frameRate: 5, // imágenes/frames por segundo
			repeat: -1
		});

		this.on('animationcomplete', end =>{ //evento que se ejecuta cuando una animación ha terminado
			//console.log(this.anims.currentAnim.key)
			if(this.anims.currentAnim.key === this.mon+'_daño' || this.anims.currentAnim.key === this.mon+'_wow'){ //comprobamos si la animación que ha terminado es 'attack'
				this.play(this.mon+'_idle'); //ejecutamos la animación 'idle'
			}
			
		});

		this.play(this.mon+'_idle');

		//#endregion
		// Estados Alterados (POR IMPLEMENTAR)
	}

	// Settear ataques
	SetAttacks(attack)
	{
		this.attacks.push(new Attack(attack.name, attack.type,attack.dmg,attack.requiredMps,attack.targets))
	}

	// getter de un ataque dado un index
	GetAttack(index){
		return this.attacks[index];
	}

	// setteamos las resistencias, la velocidad y la puntería
	SetStats(physicalRes, rangedRes, fireRes, electricalRes, toxicRes, acurracy, speed){
		this.resistances = [physicalRes, rangedRes, fireRes, electricalRes, toxicRes, 0];
		this.acurracy = acurracy;
		this.speed = speed;
	}

	// subimos de nivel (NO IMPLEMENTADO)
	LevelUp(){
		this.lvl++;
		this.maxHp += this.maxHp * 2 / 5;
		this.maxMp += this.maxMp * 1 / 5;	
	}

	// puede atacar el personaje?
	CanAttack(attack){
		return this.actualMp >= attack.requiredMps;
	}

	// ataca 
	Attack(attack){
		let effective = [];
		this.targets.forEach(function (enemy) {
			effective.push(enemy.Damage(attack));

		})
		this.actualMp -= attack.requiredMps;
		return effective; // devuelve la efectividad de un ataque frente a un target
	}

	// recibir daño
	Damage(attack)
	{
		// animación
		this.play(this.mon+'_daño');

		let effective = 0;
		// ROI AYUDA
		if(this.resistances[attack.GetType()] <= 3) effective = -1;
		else if(this.resistances[attack.GetType()] >= 7) effective = 1;
		
		let lastHp = this.actualHp; // última HP

		let acurracy = 1;
		let prueba = Math.floor(Math.random()*100 + 1);
		if(prueba > this.acurracy) acurracy = 0;
		console.log("HE ACERTADO: " + acurracy + "   " + prueba);

		// Bajamos vida en función de la resistencia y tipo del ataque
		this.actualHp -= attack.GetDmg() * (10 - this.resistances[attack.GetType()]) / 10 * acurracy;
		this.actualHp = Math.floor(this.actualHp);
		if(this.actualHp <= 0) 
		{
			this.actualHp = 0;
			this.Die(); // morir si estamos a 0 o menor vida
		}
		else if (this.actualHp > this.maxHp) this.actualHp = this.maxHp;

		if(lastHp === this.actualHp) effective = 2;   // Si no le ha bajado vida, el ataque falló

		// devuelve la efectividad de un ataque 
		return effective;
	}

	// morir
	Die()
	{
		this.dead = true; // se muere
	}
}