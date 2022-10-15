export default class FightScene extends Phaser.Scene {
	
	constructor() {
		super({ key: 'fightscene' });
	}
	
	preload(){
		// Cargar imagenes de todos los enemigos y jugadores
		this.load.image('manin', 'assets/Manín.png');
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {

		//Imagen de fondo
		this.add.image(0, 0, 'castle').setOrigin(0, 0);

		//Instanciamos nuestro personaje, que es un caballero, y la plataforma invisible que hace de 



	}

}