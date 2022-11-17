import NPC from "./npc.js";

export default class Manin extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, uiScene) {
		super(scene, x, y, 'manin');
		this.speed = 300; // Nuestra velocidad de movimiento será 100
        this.setScale(3,3);
		this.depth = 2;
		this.scene.add.existing(this); //Añadimos a Manín a la escena
        this.stepsWalked = 0;
        this.touchingGrass = false;
		this.collider = null;
		this.uiScene = uiScene;

		// Seteamos las teclas para mover al personaje
		this.wKey = this.scene.input.keyboard.addKey('W'); // move up
		this.aKey = this.scene.input.keyboard.addKey('A'); // move left
		this.sKey = this.scene.input.keyboard.addKey('S'); // move down
		this.dKey = this.scene.input.keyboard.addKey('D'); // move right
		this.spaceKey = this.scene.input.keyboard.addKey('SPACE'); // interact

		// añadimos físicas
		scene.physics.add.existing(this);

		// Ajustamos el "collider" de manín
		this.bodyOffset = this.body.height/5;
		this.bodyWidth = this.body.width/2;
		this.body.setOffset(0, -this.bodyOffset);
		this.body.height *= 2;
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
		super.preUpdate(t, dt);

		// Mientras pulsemos la tecla 'A' movemos el personaje en -X
		if(this.aKey.isDown){
			this.setFlip(false, false)
			//this.x -= this.speed*dt / 1000;
			this.body.setVelocityX(-100*dt*this.speed/1000);
            if(this.touchingGrass)this.stepsWalked++;
		}

		// Mientras pulsemos la tecla 'D' movemos el personaje en +X
		if(this.dKey.isDown){
			this.setFlip(true, false)
			//this.x += this.speed*dt / 1000;
			this.body.setVelocityX(100*dt*this.speed/1000);
			if(this.touchingGrass) this.stepsWalked++;
		}

		// Phaser.Input.Keyboard.JustUp y Phaser.Input.Keyboard.JustDown nos aseguran detectar la tecla una sola vez (evitamos repeticiones)
		if(Phaser.Input.Keyboard.JustUp(this.aKey) || Phaser.Input.Keyboard.JustUp(this.dKey)){
			this.body.setVelocityX(0);
		}
		// Mientras pulsemos la tecla 'S' movemos el personaje en -Y
		if(this.sKey.isDown){
            this.body.setVelocityY(100*dt*this.speed/1000);
            if(this.touchingGrass)this.stepsWalked++;
		}

		// Mientnras pulsemos la tecla 'W' movemos el personaje en -Y
		if(this.wKey.isDown){
            this.body.setVelocityY(-100*dt*this.speed/1000);
            if(this.touchingGrass)this.stepsWalked++;
		}

        if(Phaser.Input.Keyboard.JustUp(this.wKey) || Phaser.Input.Keyboard.JustUp(this.sKey)){
            this.body.setVelocityY(0);
        }

		// Si pulsamos 'SPACE' interactuamos con nuestro entorno
		if(Phaser.Input.Keyboard.JustDown(this.spaceKey)){
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