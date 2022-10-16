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
		
		this.hp = 0;
		this.maxHp = initialHP;
		this.mp = 0;
		this.maxMp = initialMP;
		this.lvl = 1;
		this.resistances = [0, 0, 0, 0, 0, 0]; 
		this.acurracy = 0;
		this.dead = false;
		this.speed = 0;

		this.attacks = [];

		// Estados Alterados
	}

	SetAttacks(attack1, attack2, attack3, attack4)
	{
		this.attacks[0] = new Attack("PUM te pego", typeOfAttack.Physical,50,0,1);
		this.attacks[1] = new Attack("PUM te flecheo",typeOfAttack.Ranged,50,20,1);
		this.attacks[2] = new Attack("PUM te apoyo",typeOfAttack.Support,50,40,1);
		this.attacks[3] = new Ultimate("PUM ulti", typeOfAttack.Electrical,50,this.maxMp/2 + 10,1);
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

	Damage(attack)
	{
		// Hacer que reciba daño
		hp -= attack.GetDmg() * (10 - resistances[attack.GetType()]) / 10;

		if(this.HP <= 0) 
		{
			this.HP = 0;
			this.Die();
		}
	}

	Die()
	{
		this.Dead = true;
	}

}