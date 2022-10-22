import Character from './Character.js'

//Importa y crea nuevos tipos de enemigo
class Party{
	constructor()
	{
		this.party = [];
	}

	Add(character){
		this.party.push(character);


	}
};

export let allyParty = new Party();
// exportar instancia de Party! YAY FIESTA :)