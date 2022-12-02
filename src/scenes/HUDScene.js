const State = {
    Fight: 0,
    Walk: 1
}

export default class HUDScene extends Phaser.Scene {

    constructor() {
		super({ key: 'hud' });

	}

    create(){
        // generamos HUD de estado de party
		this.walkingHUD = new walkingHUD(40, 500, this, 'miniHUD')
		this.walkingHUD.depth = 3;

		this.pointer = this.add.image(0,0,'pointer').setOrigin(0,0);
		this.pointer.visible = false;
		this.pointer.depth = 3;
		// generamos el Menú
		this.menu = new ExploreMenu(620,100,this,'menuBG', this.pointer, this.walkingHUD);
		this.menu.Show(false);
		this.showMenu = false;
    }
    
    update(){
		if(Phaser.Input.Keyboard.JustDown(this.qKey)) {this.showMenu = !this.showMenu; this.menu.Show(this.showMenu); }
	}

}
