import { walkingHUD, ExploreMenu } from "../fight/HUD.js";
import { InputMan } from "../fight/InputManager.js";


const State = {
    Fight: 0,
    Walk: 1
}

export default class HUDScene extends Phaser.Scene {

    constructor() { // constructora
		super({ key: 'hud'});
		this.state = State.Walk;
	}

    create(){
        // generamos HUD de estado de party
		this.inputMan = new InputMan(this); // input manager
		this.walkingHUD = new walkingHUD(40, 500, this, 'miniHUD') // HUD de cabezas pequeñas

		this.pointer = this.add.image(0,0,'pointer').setOrigin(0,0); // puntero para apuntar a las diferentes opciones
		this.pointer.visible = false;
		this.pointer.depth = 3;
		// generamos el Menú general
		this.menu = new ExploreMenu(620,100,this,'menuBG', this.pointer, this.walkingHUD);
		this.showMenu = false;
		this.menu.Show(this.showMenu);
    }
    
    update(){ // checkeo de variables e input
		if(this.state === State.Walk){ // mostramos menú a la Q
			if(Phaser.Input.Keyboard.JustDown(this.inputMan.qKey)) {
				this.showMenu = !this.showMenu; 
				if(this.showMenu) this.menu.Show(this.showMenu);
				else {
					this.menu.Hide(!this.showMenu);
					this.menu.viewParty = false;
					this.menu.manageParty = false;
				} 
			}
		}
	}

	UpdateHUD(){ // updateamos el HUD
		this.walkingHUD.Update();
	}

	Fight(){
		this.state = State.Fight;
		this.showMenu = false;
		this.walkingHUD.Hide(true);
		this.menu.Hide(true);
	}

	Walk(){
		this.state = State.Walk;
		this.walkingHUD.Hide(false);
	}

	Reset(){
		this.walkingHUD = new walkingHUD(40, 500, this, 'miniHUD');		
		this.menu = new ExploreMenu(620,100,this,'menuBG', this.pointer, this.walkingHUD);
		this.showMenu = false;
		this.menu.Show(this.showMenu);
	}
}