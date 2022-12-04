import { walkingHUD, ExploreMenu } from "../fight/HUD.js";
import { InputMan } from "../fight/InputManager.js";


const State = {
    Fight: 0,
    Walk: 1
}

export default class HUDScene extends Phaser.Scene {

    constructor() {
		super({ key: 'hud'});
		this.state = State.Walk;
	}

    create(){
        // generamos HUD de estado de party
		this.inputMan = new InputMan(this);
		this.walkingHUD = new walkingHUD(40, 500, this, 'miniHUD')
		this.walkingHUD.depth = 3;

		this.pointer = this.add.image(0,0,'pointer').setOrigin(0,0);
		this.pointer.visible = false;
		this.pointer.depth = 3;
		// generamos el Menú
		this.menu = new ExploreMenu(620,100,this,'menuBG', this.pointer, this.walkingHUD);
		this.showMenu = false;
		this.menu.Show(this.showMenu);
    }
    
    update(){
		if(this.state === State.Walk){
			if(Phaser.Input.Keyboard.JustDown(this.inputMan.qKey)) {this.showMenu = !this.showMenu; this.menu.Show(this.showMenu); }
		}
		else {

		}
	}

	UpdateHUD(){
		this.walkingHUD.Update();
		this.menu.Update();
	}

	Fight(){
		this.state = State.Fight;
		this.walkingHUD.Hide(true);
		this.menu.Hide(true);
	}

	Walk(){
		this.state = State.Walk;
		this.walkingHUD.Hide(false);
	}
}