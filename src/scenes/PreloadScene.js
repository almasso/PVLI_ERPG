export default class Preload extends Phaser.Scene {
    constructor() {
        super({key : 'preload'});
    }

    preload() {
        //Cargamos todas las imágenes de nuestro juego:

        //HUD
        this.load.image('logButton','assets/textures/HUD/logButton.png');
        this.load.image('resP', 'assets/textures/HUD/explore/resP.png');
		this.load.image('resR', 'assets/textures/HUD/explore/resR.png');
		this.load.image('resE', 'assets/textures/HUD/explore/resE.png');
		this.load.image('resF', 'assets/textures/HUD/explore/resF.png');
		this.load.image('resT', 'assets/textures/HUD/explore/resT.png');
        this.load.image('maninHead', 'assets/textures/HUD/explore/maninHead.png');
		this.load.image('melendiHead', 'assets/textures/HUD/explore/melendiHead.png');
		this.load.image('miniHUD', 'assets/textures/HUD/explore/miniHUD.png');
		this.load.image('menuBG', 'assets/textures/HUD/explore/menuBG.png');
		this.load.image('menuPartyButton', 'assets/textures/HUD/explore/menuPartyButton.png');
		this.load.image('menuOrderButton', 'assets/textures/HUD/explore/menuOrderButton.png');
		this.load.image('pointer', 'assets/textures/HUD/explore/pointer.png');
		this.load.image('partyStateBG', 'assets/textures/HUD/explore/partyStateBG.png');
		this.load.image('resistancesText', 'assets/textures/HUD/explore/resistancesText.png');
		this.load.image('partyStats', 'assets/textures/HUD/explore/partyStats.png');
        this.load.image('artistHead','assets/textures/HUD/explore/artista2Head.png');
        this.load.image('initialBg', 'assets/textures/HUD/Inicio.png');
		this.load.image('startButton', 'assets/textures/HUD/StartInicio.png');
        this.load.image('finalBg', 'assets/textures/HUD/Gameover.png');
		this.load.image('retryButton', 'assets/textures/HUD/Retry.png'); 
        this.load.image('attackPointer','assets/textures/HUD/attackPointer.png');
        this.load.image('log','assets/textures/HUD/log.png');
		this.load.image('logButton','assets/textures/HUD/logButton.png');
		this.load.image('attackButton','assets/textures/HUD/attackButton.png');
		this.load.image('attackButtonHover','assets/textures/HUD/attackButtonHover.png');
		this.load.image('objectButton','assets/textures/HUD/objectButton.png');
		this.load.image('objectButtonHover','assets/textures/HUD/objectButtonHover.png');
        this.load.image('AllyBlock','assets/textures/HUD/AllyBlock.png');
		this.load.image('attackBlock','assets/textures/HUD/AllyAttack.png');


        //PERSONAJES Y NPCS
		this.load.image('manin', 'assets/textures/Characters/manin_new.png');
		this.load.image('melendi','assets/textures/Characters/Melendi.png'); 
		this.load.image('artist','assets/textures/Characters/Artista2.png'); 
		this.load.image('melendi','assets/textures/Characters/Melendi.png');
		this.load.image('elmotivao', 'assets/textures/Characters/elmotivao.png');
		this.load.image('vovovo', 'assets/textures/Characters/vovovo.png');
		this.load.image('jatsune', 'assets/textures/Characters/jatsune.png');
		this.load.image('alex', 'assets/textures/Characters/Alex.png');
		this.load.image('compuman', 'assets/textures/Characters/Compuman.png');
		this.load.image('frozono', 'assets/textures/Characters/Frozono.png');
		this.load.image('unverifiedtoni', 'assets/textures/Characters/toni1.png');
		this.load.image('verifiedtoni', 'assets/textures/Characters/toni2.png');
		this.load.image('pepperboy', 'assets/textures/Characters/PepperBoy.png');
        this.load.image('kratos','assets/textures/NPC-RAUL/Kratos.png'); 
		this.load.image('aloy','assets/textures/NPC-RAUL/Aloy.png'); 
        this.load.image('culturista','assets/textures/Characters/Culturista.png');
		this.load.image('dinoseto','assets/textures/Characters/Dinoseto.png');
		this.load.image('angel','assets/textures/Characters/AngelCaido.png');
		
        //FONDOS
        this.load.image('bg', 'assets/textures/Backgrounds/bg.png');
        this.load.image('fightBg','assets/textures/Backgrounds/parqueLucha.png')

        //PROPS
        this.load.image('pixel', 'assets/textures/Props/pixel1x1.png');
		this.load.image('hierba', 'assets/textures/Props/hierba.png');

        //ANIMACIONES
		this.load.spritesheet('manin_move','assets/textures/Characters/manin_move.png',{frameWidth:25, frameHeight:32});
		this.load.spritesheet('manin_pop','assets/textures/Characters/manin_pop.png',{frameWidth:25, frameHeight:32});
		this.load.spritesheet('manin_pose','assets/textures/Characters/manin_pose.png',{frameWidth:25, frameHeight:32});

        this.load.spritesheet('people_daño','assets/textures/Characters/people_daño.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('people_idle','assets/textures/Characters/people_idle.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('people_wow','assets/textures/Characters/people_wow.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('people_dead','assets/textures/Characters/people_dead.png',{frameWidth:19, frameHeight:26});

		this.load.spritesheet('artist_daño','assets/textures/Characters/artist_daño.png',{frameWidth:24, frameHeight:32});
		this.load.spritesheet('artist_idle','assets/textures/Characters/artist_idle.png',{frameWidth:24, frameHeight:32});
		this.load.spritesheet('artist_wow','assets/textures/Characters/artist_wow.png',{frameWidth:24, frameHeight:32});
		this.load.spritesheet('artist_dead','assets/textures/Characters/artist_dead.png',{frameWidth:24, frameHeight:32});

		this.load.spritesheet('manin_daño','assets/textures/Characters/manin_daño.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('manin_idle','assets/textures/Characters/manin_idle.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('manin_wow','assets/textures/Characters/manin_wow.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('manin_dead','assets/textures/Characters/manin_dead.png',{frameWidth:19, frameHeight:26});

		this.load.spritesheet('melendi_daño','assets/textures/Characters/melendi_daño.png',{frameWidth:22, frameHeight:27});
		this.load.spritesheet('melendi_idle','assets/textures/Characters/melendi_idle.png',{frameWidth:22, frameHeight:27});
		this.load.spritesheet('melendi_wow','assets/textures/Characters/melendi_wow.png',{frameWidth:22, frameHeight:27});
		this.load.spritesheet('melendi_dead','assets/textures/Characters/melendi_dead.png',{frameWidth:22, frameHeight:27});


		this.load.spritesheet('jarfaiter', 'assets/textures/Characters/Jarfaiter_idle.png',{frameWidth:24, frameHeight:32})
		this.load.spritesheet('jarfaiter_wow', 'assets/textures/Characters/Jarfaiter_wow.png',{frameWidth:24, frameHeight:32})
		this.load.spritesheet('jarfaiter_daño', 'assets/textures/Characters/Jarfaiter_daño.png',{frameWidth:24, frameHeight:32})

        //JSON
        this.load.json('npc_dialogues', 'assets/dialogues/npc_dialog.json');

        this.scene.launch('initial');
    }
}