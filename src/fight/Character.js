import {Attack, Ultimate} from './Attack.js'
const typeOfAttack = {
	Physical: 0,
	Ranged: 1,
	Fire: 2,
	Electrical: 3,
	Toxic: 4,
	Support: 5
};

export default class Character extends Phaser.GameObjects.Sprite {
	constructor(scene, name,x, y, imageId, actualHp, maxHp, actualMp, maxMp){
		super(scene, x, y, imageId);
		this.imageId = imageId;
		this.scene.add.existing(this);
		this.name = name;
		this.actualHp = actualHp;
		this.maxHp = maxHp;
		this.actualMp = actualMp;
		this.maxMp = maxMp;
		this.lvl = 1;
		this.resistances = [0, 0, 0, 0, 0, 0]; 
		this.acurracy = 0;
		this.dead = false;
		this.speed = 0;
		this.attacks = [];
		this.targets = [];

		// Estados Alterados
	}

	SetAttacks(attack)
	{
		this.attacks.push(new Attack(attack.name, attack.type,attack.dmg,attack.requiredMps,attack.targets))
	}

	GetAttack(index){
		return this.attacks[index];
	}

	SetStats(physicalRes, rangedRes, fireRes, electricalRes, toxicRes, acurracy, speed){
		this.resistances = [physicalRes, rangedRes, fireRes, electricalRes, toxicRes, 0];
		this.acurracy = acurracy;
		this.speed = speed;
	}

	LevelUp(){
		this.lvl++;
		this.maxHp += this.maxHp * 2 / 5;
		this.maxMp += this.maxMp * 1 / 5;	
	}

	CanAttack(attack){
		return this.actualMp >= attack.requiredMps;
	}

	Attack(attack){
		let effective = [];
		this.targets.forEach(function (enemy) {
			effective.push(enemy.Damage(attack));
		})
		this.actualMp -= attack.requiredMps;
		return effective;
	}

	Damage(attack)
	{
		let effective = 0;
		if(this.resistances[attack.GetType()] <= 3) effective = -1;
		else if(this.resistances[attack.GetType()] >= 7) effective = 1;
		let lastHp = this.actualHp;
		// Hacer que reciba daño
		let acurracy = 1;
		let prueba = Math.floor(Math.random()*100 + 1);
		if(prueba > this.acurracy) acurracy = 0;
		console.log("HE ACERTADO: " + acurracy + "   " + prueba);

		this.actualHp -= attack.GetDmg() * (10 - this.resistances[attack.GetType()]) / 10 * acurracy;
		this.actualHp = Math.floor(this.actualHp);
		if(this.actualHp <= 0) 
		{
			this.actualHp = 0;
			this.Die();
		}
		else if (this.actualHp > this.maxHp) this.actualHp = this.maxHp;

		if(lastHp === this.actualHp) effective = 2;   // Si no le ha bajado vida, el ataque falló
		return effective;
	}

	Die()
	{
		this.dead = true;
	}
}