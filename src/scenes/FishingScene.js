

export default class FishingScene extends Phaser.Scene {
    constructor(){
        super({key: 'fishing'});
    }

    create(){
        this.count = 0;
    }
    
    update(t,dt){
        super.update(t,dt);
        this.count += dt;
        if(this.count > 1000){
            this.Return();
        }
    }

    Return(){
        this.scene.wake('hud');
        this.scene.wake('park');
        this.scene.stop('fishing');
    }
}