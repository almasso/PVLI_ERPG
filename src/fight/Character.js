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
	constructor(scene, x, y, imageId, initialHP, initialMP){
		super(scene, x, y, imageId);
		this.imageId = imageId;
		this.scene.add.existing(this);
		
		this.hp = initialHP;
		this.maxHp = initialHP;
		this.mp = initialMP;
		this.maxMp = initialMP;
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

	Attack(attack){
		if(this.mp >= attack.requiredMps){
			this.targets.forEach(function (enemy) {
				enemy.Damage(attack);
			})
			this.mp -= attack.requiredMps;
		}
		else console.log("NO TENGO MANÁ PAPÁ");
	}

	Damage(attack)
	{
		// Hacer que reciba daño
		this.hp -= attack.GetDmg() * (10 - this.resistances[attack.GetType()]) / 10;
		this.hp = Math.floor(this.hp);
		if(this.hp <= 0) 
		{
			this.hp = 0;
			this.Die();
		}
	}

	Die()
	{
		this.dead = true;
	}

}