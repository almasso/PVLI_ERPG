import Attack from './Attack.js'

export default class Character extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, imageId, initialHP, initialMP){
		super(scene, x, y, imageId);

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
		attacks[0] = attack1;
		attacks[1] = attack2;
		attacks[2] = attack3;
		attacks[3] = attack4;
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