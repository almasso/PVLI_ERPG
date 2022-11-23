import NPC from "./npc.js";
import { InputMan } from "../fight/InputManager.js";

export default class Manin extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, uiScene) {
		super(scene, x, y, 'manin_move');
		this.speed = 300; // Nuestra velocidad de movimiento será 100
        this.setScale(3,3);
		this.depth = 2;
		this.scene.add.existing(this); //Añadimos a Manín a la escena
        this.stepsWalked = 0;
        this.touchingGrass = false;
		this.collider = null;
		this.uiScene = uiScene;

		// Seteamos las teclas para mover al personaje
		this.input = new InputMan(this.scene);

		// añadimos físicas
		scene.physics.add.existing(this);

		// Ajustamos el "collider" de manín
		this.bodyOffset = this.body.height/5;
		this.bodyWidth = this.body.width/2;
		this.body.setOffset(0, -this.bodyOffset);
		this.body.height *= 2;


		this.scene.anims.create({
			key: 'move', //identificador de la animación
			frames: scene.anims.generateFrameNumbers('manin_move', 
			{
				start:0, // primera imagen del Spritesheet que se ejecuta en la animación
				end:7 // última imagen del Spritesheet que se ejecuta en la animación
			}), 
			frameRate: 10, // imágenes/frames por segundo
			repeat: 0
		});

		this.scene.anims.create({
			key: 'pop', //identificador de la animación
			frames: scene.anims.generateFrameNumbers('manin_pop', 
			{
				start:0, // primera imagen del Spritesheet que se ejecuta en la animación
				end:27 // última imagen del Spritesheet que se ejecuta en la animación
			}), 
			frameRate: 7, // imágenes/frames por segundo
			repeat: 0
		});
		this.scene.anims.create({
			key: 'pose', //identificador de la animación
			frames: scene.anims.generateFrameNumbers('manin_pose', 
			{
				start:0, // primera imagen del Spritesheet que se ejecuta en la animación
				end:27 // última imagen del Spritesheet que se ejecuta en la animación
			}), 
			frameRate: 10, // imágenes/frames por segundo
			repeat: 0
		});

		this.on('animationcomplete', end =>{ //evento que se ejecuta cuando una animación ha terminado
			//console.log(this.anims.currentAnim.key)
			if(this.anims.currentAnim.key === 'pose') this.play('pop');
			else if(this.anims.currentAnim.key === 'pop')this.play('pose');
			else if(this.anims.currentAnim.key === 'move' &&(this.dKey.isDown||this.aKey.isDown||this.sKey.isDown||this.wKey.isDown)){ //comprobamos si la animación que ha terminado es 'attack'
				this.play('move'); //ejecutamos la animación 'idle'
			}
			else{
				this.play('pose');
			}
			
		});

		this.play('pose');

		
	}

	// interacción 
    interact(){
		if(this.collider instanceof NPC) {
			this.collider.readDialogues(this.uiScene);
		}
		else { /*Aquí interactuaremos en el futuro con otras cosas*/}
    }

	// quitamos collider
	clearCollider() {
		this.collider = null;
	}
	
	preUpdate(t, dt) {
		// Es muy imporante llamar al preUpdate del padre (Sprite), sino no se ejecutará la animación
		super.preUpdate(t, dt);

		
		if(Phaser.Input.Keyboard.JustDown(this.wKey)||Phaser.Input.Keyboard.JustDown(this.sKey)||Phaser.Input.Keyboard.JustDown(this.dKey)||Phaser.Input.Keyboard.JustDown(this.aKey))
		{
			this.play('move');
			
		}
		this.dKey.isDown
		// Mientras pulsemos la tecla 'A' movemos el personaje en -X

		if(this.aKey.isDown){
			//this.play('move');
			this.setFlip(true, false)

			//this.x -= this.speed*dt / 1000;
			this.body.setVelocityX(-100*dt*this.speed/1000);
            if(this.touchingGrass)this.stepsWalked++;
		}

		// Mientras pulsemos la tecla 'D' movemos el personaje en +X
		if(this.dKey.isDown){
			//this.play('move');	
			this.setFlip(false, false)
			//this.x += this.speed*dt / 1000;
			this.body.setVelocityX(100*dt*this.speed/1000);
			if(this.touchingGrass) this.stepsWalked++;
			
		}

		// Phaser.Input.Keyboard.JustUp y Phaser.Input.Keyboard.JustDown nos aseguran detectar la tecla una sola vez (evitamos repeticiones)
		if(Phaser.Input.Keyboard.JustUp(this.input.aKey) || Phaser.Input.Keyboard.JustUp(this.input.dKey)){
			this.body.setVelocityX(0);
		
		}
		// Mientras pulsemos la tecla 'S' movemos el personaje en -Y
		if(this.sKey.isDown){
			//this.play('move');
            this.body.setVelocityY(100*dt*this.speed/1000);
            if(this.touchingGrass)this.stepsWalked++;
		}

		// Mientnras pulsemos la tecla 'W' movemos el personaje en -Y
		if(this.wKey.isDown){
			//this.play('move');
            this.body.setVelocityY(-100*dt*this.speed/1000);
            if(this.touchingGrass)this.stepsWalked++;
		}

        if(Phaser.Input.Keyboard.JustUp(this.input.wKey) || Phaser.Input.Keyboard.JustUp(this.input.sKey)){
            this.body.setVelocityY(0);
        }

		// Si pulsamos 'SPACE' interactuamos con nuestro entorno
		if(Phaser.Input.Keyboard.JustDown(this.input.spaceKey)){
			this.interact();
		}


        console.log(this.stepsWalked);
		// si hemos caminado 100 pasos, entramos en combate (TEMPORAL)
        if(this.stepsWalked > 100){
            this.stepsWalked = 0;
            this.body.setVelocityX(0);
            this.body.setVelocityY(0);
            this.scene.Fight()
        }
	}
}
