export class Attack{
	constructor(name, type, dmg, requiredMps, targets){
		this.type = type;
		this.dmg = dmg;
		this.requiredMps = requiredMps; 
		this.targets = targets;
		this.name = name;
		// Estados Alterados
	}

	GetDmg()
	{
		return this.dmg;
	}

	GetType()
	{
		return this.type;
	}
}

export class Ultimate extends Attack{
	constructor(type, dmg, requiredMps, targets, turnsToActivate){
		super(type, dmg, requiredMps, targets);
		this.turnsToActivate = turnsToActivate;
		this.currentTurns = 0;
		this.activated = false;
		this.used = false;
	}

	UpdateUltimate()
	{
		if(this.currentTurns < this.turnsToActivate)
			this.currentTurns++;
		else
			this.activated = true;
	}

	IsUsed(){
		return this.used;
	}

	Used()
	{
		this.used = true;
	}

	Reset()
	{
		this.currentTurns = 0;
		this.used = false;
		this.activated = false;
	}
}

export function attackInfo(name,type,dmg,requiredMps,targets){
	return {name:name,type:type,dmg:dmg,requiredMps:requiredMps,targets:targets}
}


const typeOfAttack = {
	Physical: 0,
	Ranged: 1,
	Fire: 2,
	Electrical: 3,
	Toxic: 4,
	Support: 5
};

export let maninAttacks = [
	new Attack(typeOfAttack.Physical,50,0,1),
	new Attack(typeOfAttack.Physical,50,0,1),
	new Attack(typeOfAttack.Physical,50,0,1),
	new Ultimate(typeOfAttack.Physical,50,0,1)
];

export let Attacks = [
	new Attack(),
	new Attack(),
	new Attack(),
	new Ultimate()
];





