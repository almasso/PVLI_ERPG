import Character from './Character.js'

//Importa y crea nuevos tipos de enemigo
export default class Party{
	constructor()
	{
		this.party = [];
	}

	Add(character){
		this.party.push(character);
	}
}
