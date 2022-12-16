export default class Boot extends Phaser.Scene {
	/**
	 * Escena inicial en la que se cargan todos
	 * los assets necesarios para ejecutar el juego
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'boot' });
	}

	preload() {
		// Barra de cargando página (borde)........................................................................................
		let progressBar = this.add.graphics();
		let progressBox = this.add.graphics();
		progressBox.fillStyle(0x22ff44, 0.8);
		progressBox.fillRect(340, 250, 120, 50);

		// Barra de cargando página........................................................................................
		this.load.on('progress', function (value) {
			percentText.setText(parseInt(value * 100) + '%');
			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			progressBar.fillRect(350, 260, 100 * value, 30);
		});

		// Textos de cargando página........................................................................................
		let width = this.cameras.main.width;
		let height = this.cameras.main.height;
		let loadingText = this.make.text({
			x: width / 2,
			y: height / 2 - 70,
			text: 'CARGANDO O MELHOR JOGO DO MUNDINHO',
			style: {
				font: '20px monospace',
				fill: '#ffffff'
			}
		});
		loadingText.setOrigin(0.5, 0.5);

		let percentText = this.make.text({
			x: width / 2,
			y: height / 2 + 15,
			text: '0%',
			style: {
				font: '18px monospace',
				fill: '#ffffff'
			}
		});
		percentText.setOrigin(0.5, 0);
        
        // Cargamos todas las imágenes de nuestro juego:

        // HUD
        this.load.image('logButton','assets/textures/HUD/logButton.png');
        this.load.image('resP', 'assets/textures/HUD/explore/resP.png');
		this.load.image('resR', 'assets/textures/HUD/explore/resR.png');
		this.load.image('resE', 'assets/textures/HUD/explore/resE.png');
		this.load.image('resF', 'assets/textures/HUD/explore/resF.png');
		this.load.image('resT', 'assets/textures/HUD/explore/resT.png');
		this.load.image('miniHUD', 'assets/textures/HUD/explore/miniHUD.png');
		this.load.image('menuBG', 'assets/textures/HUD/explore/menuBG.png');
		this.load.image('menuPartyButton', 'assets/textures/HUD/explore/menuPartyButton.png');
		this.load.image('menuOrderButton', 'assets/textures/HUD/explore/menuOrderButton.png');
		this.load.image('pointer', 'assets/textures/HUD/explore/pointer.png');
		this.load.image('partyStateBG', 'assets/textures/HUD/explore/partyStateBG.png');
		this.load.image('resistancesText', 'assets/textures/HUD/explore/resistancesText.png');
		this.load.image('partyStats', 'assets/textures/HUD/explore/partyStats.png');
		this.load.image('startButton', 'assets/textures/HUD/StartInicio.png');
		this.load.image('retryButton', 'assets/textures/HUD/Retry.png'); 
        this.load.image('attackPointer','assets/textures/HUD/attackPointer.png');
        this.load.image('log','assets/textures/HUD/log.png');
		this.load.image('attackButton','assets/textures/HUD/attackButton.png');
		this.load.image('attackButtonHover','assets/textures/HUD/attackButtonHover.png');
		this.load.image('objectButton','assets/textures/HUD/objectButton.png');
		this.load.image('objectButtonHover','assets/textures/HUD/objectButtonHover.png');
        this.load.image('AllyBlock','assets/textures/HUD/AllyBlock.png');
		this.load.image('attackBlock','assets/textures/HUD/AllyAttack.png');
		this.load.image('buy', 'assets/textures/HUD/buyButton.png');
		this.load.image('noBuy', 'assets/textures/HUD/noButton.png');
		this.load.image('buyItem', 'assets/textures/HUD/buyItem.png');
		this.load.image('showItem', 'assets/textures/HUD/explore/itemsButton.png');
		this.load.image('showQuests', 'assets/textures/HUD/explore/menuQuestsButton.png');
		

		// nosotros c:
		this.load.image('alex', 'assets/textures/Characters/Alex.png');
        this.load.spritesheet('alex_dmg','assets/textures/Characters/alex_dmg.png',{frameWidth:19, frameHeight:26});
        this.load.spritesheet('alex_shock','assets/textures/Characters/alex_shock.png',{frameWidth:19, frameHeight:26});
        this.load.spritesheet('alex_poison','assets/textures/Characters/alex_poison.png',{frameWidth:19, frameHeight:26});
        this.load.spritesheet('alex_dead','assets/textures/Characters/alex_dead.png',{frameWidth:19, frameHeight:26});
        this.load.spritesheet('alex_burn','assets/textures/Characters/alex_burn.png',{frameWidth:19, frameHeight:26});
        this.load.spritesheet('alex_idle','assets/textures/Characters/alex_idle.png',{frameWidth:19, frameHeight:26});
        this.load.spritesheet('alex_wow','assets/textures/Characters/alex_wow.png',{frameWidth:19, frameHeight:26});

		this.load.image('raul', 'assets/textures/Characters/Raul.png');
		this.load.spritesheet('raul_dmg','assets/textures/Characters/raul_dmg.png',{frameWidth:19, frameHeight:26});
        this.load.spritesheet('raul_shock','assets/textures/Characters/raul_shock.png',{frameWidth:19, frameHeight:26});
        this.load.spritesheet('raul_poison','assets/textures/Characters/raul_poison.png',{frameWidth:19, frameHeight:26});
        this.load.spritesheet('raul_dead','assets/textures/Characters/raul_dead.png',{frameWidth:19, frameHeight:26});
        this.load.spritesheet('raul_burn','assets/textures/Characters/raul_burn.png',{frameWidth:19, frameHeight:26});
        this.load.spritesheet('raul_idle','assets/textures/Characters/raul_idle.png',{frameWidth:19, frameHeight:26});
        this.load.spritesheet('raul_wow','assets/textures/Characters/raul_wow.png',{frameWidth:19, frameHeight:26});

		this.load.image('pablo', 'assets/textures/Characters/pablo.png');
		this.load.spritesheet('pablo_dmg','assets/textures/Characters/pablo_dmg.png',{frameWidth:19, frameHeight:26});
        this.load.spritesheet('pablo_shock','assets/textures/Characters/pablo_shock.png',{frameWidth:19, frameHeight:26});
        this.load.spritesheet('pablo_poison','assets/textures/Characters/pablo_poison.png',{frameWidth:19, frameHeight:26});
        this.load.spritesheet('pablo_dead','assets/textures/Characters/pablo_dead.png',{frameWidth:19, frameHeight:26});
        this.load.spritesheet('pablo_burn','assets/textures/Characters/pablo_burn.png',{frameWidth:19, frameHeight:26});
        this.load.spritesheet('pablo_idle','assets/textures/Characters/pablo_idle.png',{frameWidth:19, frameHeight:26});
        this.load.spritesheet('pablo_wow','assets/textures/Characters/pablo_wow.png',{frameWidth:19, frameHeight:26});
		
		this.load.image('roi', 'assets/textures/Characters/roi.png');
		this.load.spritesheet('roi_dmg','assets/textures/Characters/roi_dmg.png',{frameWidth:19, frameHeight:26});
        this.load.spritesheet('roi_shock','assets/textures/Characters/roi_shock.png',{frameWidth:19, frameHeight:26});
        this.load.spritesheet('roi_poison','assets/textures/Characters/roi_poison.png',{frameWidth:19, frameHeight:26});
        this.load.spritesheet('roi_dead','assets/textures/Characters/roi_dead.png',{frameWidth:19, frameHeight:26});
        this.load.spritesheet('roi_burn','assets/textures/Characters/roi_burn.png',{frameWidth:19, frameHeight:26});
        this.load.spritesheet('roi_idle','assets/textures/Characters/roi_idle.png',{frameWidth:19, frameHeight:26});
        this.load.spritesheet('roi_wow','assets/textures/Characters/roi_wow.png',{frameWidth:19, frameHeight:26});
		
		this.load.image('david', 'assets/textures/Characters/david.png');
		this.load.spritesheet('david_dmg','assets/textures/Characters/david_dmg.png',{frameWidth:19, frameHeight:26});
        this.load.spritesheet('david_shock','assets/textures/Characters/david_shock.png',{frameWidth:19, frameHeight:26});
        this.load.spritesheet('david_poison','assets/textures/Characters/david_poison.png',{frameWidth:19, frameHeight:26});
        this.load.spritesheet('david_dead','assets/textures/Characters/david_dead.png',{frameWidth:19, frameHeight:26});
        this.load.spritesheet('david_burn','assets/textures/Characters/david_burn.png',{frameWidth:19, frameHeight:26});
        this.load.spritesheet('david_idle','assets/textures/Characters/david_idle.png',{frameWidth:19, frameHeight:26});
        this.load.spritesheet('david_wow','assets/textures/Characters/david_wow.png',{frameWidth:19, frameHeight:26});
        
		// NPCS
		this.load.image('elmotivao', 'assets/textures/Characters/elmotivao.png');
		this.load.image('vovovo', 'assets/textures/Characters/vovovo.png');
		this.load.image('jatsune', 'assets/textures/Characters/jatsune.png');


		this.load.image('compuman', 'assets/textures/Characters/Compuman.png');
		this.load.image('frozono', 'assets/textures/Characters/Frozono.png');
		this.load.image('unverifiedtoni', 'assets/textures/Characters/toni1.png');
		this.load.image('verifiedtoni', 'assets/textures/Characters/toni2.png');
		this.load.image('pepperboy', 'assets/textures/Characters/PepperBoy.png');
        this.load.image('kratos','assets/textures/NPC-RAUL/Kratos.png'); 
		this.load.image('aloy','assets/textures/NPC-RAUL/Aloy.png'); 
        this.load.image('culturista','assets/textures/Characters/Culturista.png');
		this.load.image('dinoseto','assets/textures/Characters/Dinoseto.png');
		this.load.image('patri', 'assets/textures/Characters/patri.png');
		this.load.image('sanxe', 'assets/textures/Characters/sanxe.png');
		this.load.image('health', 'assets/textures/Characters/chiringo.png');
		this.load.image('andrea', 'assets/textures/Characters/Andrea.png');
		this.load.image('joker','assets/textures/NPC-RAUL/Joker2.png'); 
		this.load.image('homero','assets/textures/NPC-RAUL/Homero.png'); 
		this.load.image('spider','assets/textures/NPC-RAUL/spiderMan.png'); 
		this.load.image('patrik','assets/textures/NPC-RAUL/patrik.png'); 
		this.load.image('bob','assets/textures/NPC-RAUL/bob.png'); 
		this.load.image('tienda', 'assets/textures/Characters/tienda.png');
		this.load.image('sirenita','assets/textures/NPC-RAUL/sirenita.png'); 
		this.load.image('rick','assets/textures/NPC-RAUL/rick.png'); 
		this.load.image('ikerJimenez','assets/textures/NPC-RAUL/ikerjimenez.png');
		this.load.image('tiolavara', 'assets/textures/Characters/tiolavara.png'); 
		this.load.image('fisher', 'assets/textures/Characters/fisherman.png');
		this.load.image('delincuente', 'assets/textures/Characters/delincuentes.png');
		this.load.image('PabloMotos', 'assets/textures/Characters/PabloMotos.png');

		
        // FONDOS
        this.load.image('initialBg', 'assets/textures/HUD/Inicio.png');
        this.load.image('square', 'assets/textures/Backgrounds/plaza2.png');
        this.load.image('bg2', 'assets/textures/Backgrounds/bg2.png'); // BORRAR
        this.load.image('fightBg','assets/textures/Backgrounds/parqueLucha.png')
        this.load.image('finalBg', 'assets/textures/HUD/Gameover.png');
		this.load.image('park','assets/textures/Backgrounds/park.png')
		this.load.image('clif','assets/textures/Backgrounds/clif.png')
		this.load.image('home','assets/textures/Backgrounds/home.png')
		this.load.image('plazaNoche','assets/textures/Backgrounds/plazaNoche.png')
		this.load.image('angelPark','assets/textures/Backgrounds/angel.png')

        // PROPS
        this.load.image('pixel', 'assets/textures/Props/pixel1x1.png');
		this.load.image('hierba', 'assets/textures/Props/hierba.png');
		this.load.image('insignia', 'assets/textures/Props/insignia.png');
		this.load.image('tree', 'assets/textures/Props/tree.png');
		this.load.image('valla', 'assets/textures/Props/valla.png');
		this.load.image('ten', 'assets/textures/Props/ten.png');
		this.load.image('text', 'assets/textures/Props/text.png');
		this.load.image('emptyShop', 'assets/textures/Props/tienda.png');
		this.load.image('emptyBar', 'assets/textures/Props/Bar.png');
		this.load.image('z1', 'assets/textures/Props/Z1.png');
		this.load.image('intro', 'assets/textures/Props/intro.png');
		this.load.image('caña', 'assets/textures/Props/caña.png');
		this.load.image('dinostatue','assets/textures/Characters/dinoestatua.png');
		this.load.image('dinoRoto','assets/textures/Characters/dinoRoto.png');
		this.load.image('guitarra','assets/textures/Props/guitarra.png');

        // ANIMACIONES
		this.load.spritesheet('manin_move','assets/textures/Characters/manin_move.png',{frameWidth:25, frameHeight:32});
		this.load.spritesheet('manin_pop','assets/textures/Characters/manin_pop.png',{frameWidth:25, frameHeight:32});
		this.load.spritesheet('manin_pose','assets/textures/Characters/manin_pose.png',{frameWidth:25, frameHeight:32});

        // generic
        this.load.spritesheet('people_dmg','assets/textures/Characters/people_dmg.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('people_idle','assets/textures/Characters/people_idle.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('people_wow','assets/textures/Characters/people_wow.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('people_dead','assets/textures/Characters/people_dead.png',{frameWidth:19, frameHeight:26});

        // artista
		this.load.image('artist','assets/textures/Characters/Artista2.png'); 
        this.load.image('artistHead','assets/textures/HUD/explore/artista2Head.png');
		this.load.spritesheet('artist_dmg','assets/textures/Characters/artist_dmg.png',{frameWidth:24, frameHeight:32});
		this.load.spritesheet('artist_idle','assets/textures/Characters/artist_idle.png',{frameWidth:24, frameHeight:32});
		this.load.spritesheet('artist_wow','assets/textures/Characters/artist_wow.png',{frameWidth:24, frameHeight:32});
		this.load.spritesheet('artist_dead','assets/textures/Characters/artist_dead.png',{frameWidth:24, frameHeight:32});
		this.load.spritesheet('artist_burn','assets/textures/Characters/artist_burn.png',{frameWidth:24, frameHeight:32});
		this.load.spritesheet('artist_poison','assets/textures/Characters/artist_poison.png',{frameWidth:24, frameHeight:32});
		this.load.spritesheet('artist_shock','assets/textures/Characters/artist_shock.png',{frameWidth:24, frameHeight:32});

        // manín
		this.load.image('manin', 'assets/textures/Characters/manin_new.png');
        this.load.image('maninHead', 'assets/textures/HUD/explore/maninHead.png');
		this.load.spritesheet('manin_dmg','assets/textures/Characters/manin_dmg.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('manin_idle','assets/textures/Characters/manin_idle.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('manin_wow','assets/textures/Characters/manin_wow.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('manin_dead','assets/textures/Characters/manin_dead.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('manin_burn','assets/textures/Characters/manin_burn.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('manin_poison','assets/textures/Characters/manin_poison.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('manin_shock','assets/textures/Characters/manin_shock.png',{frameWidth:19, frameHeight:26});

        // melendi
		this.load.image('melendi','assets/textures/Characters/Melendi.png');
		this.load.image('melendiHead', 'assets/textures/HUD/explore/melendiHead.png');
		this.load.spritesheet('melendi_dmg','assets/textures/Characters/melendi_dmg.png',{frameWidth:22, frameHeight:27});
		this.load.spritesheet('melendi_idle','assets/textures/Characters/melendi_idle.png',{frameWidth:22, frameHeight:27});
		this.load.spritesheet('melendi_wow','assets/textures/Characters/melendi_wow.png',{frameWidth:22, frameHeight:27});
		this.load.spritesheet('melendi_dead','assets/textures/Characters/melendi_dead.png',{frameWidth:22, frameHeight:27});
		this.load.spritesheet('melendi_burn','assets/textures/Characters/melendi_burn.png',{frameWidth:22, frameHeight:27});
		this.load.spritesheet('melendi_poison','assets/textures/Characters/melendi_poison.png',{frameWidth:22, frameHeight:27});
		this.load.spritesheet('melendi_shock','assets/textures/Characters/melendi_shock.png',{frameWidth:22, frameHeight:27});

        // jarfaiter
		this.load.image('jarfaiter','assets/textures/Characters/jarfaiter.png');
		this.load.image('jarfaiterHead','assets/textures/HUD/explore/jarfaiterHead.png');
		this.load.spritesheet('jarfaiter_idle', 'assets/textures/Characters/jarfaiter_idle.png',{frameWidth:19, frameHeight:26})
		this.load.spritesheet('jarfaiter_wow', 'assets/textures/Characters/jarfaiter_wow.png',{frameWidth:19, frameHeight:26})
		this.load.spritesheet('jarfaiter_dmg', 'assets/textures/Characters/jarfaiter_dmg.png',{frameWidth:19, frameHeight:26})
		this.load.spritesheet('jarfaiter_dead', 'assets/textures/Characters/jarfaiter_dead.png',{frameWidth:19, frameHeight:26})
		this.load.spritesheet('jarfaiter_burn','assets/textures/Characters/jarfaiter_burn.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('jarfaiter_poison','assets/textures/Characters/jarfaiter_poison.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('jarfaiter_shock','assets/textures/Characters/jarfaiter_shock.png',{frameWidth:19, frameHeight:26});

		//pedro sanxe
		this.load.image('sanxe', 'assets/textures/Characters/sanxe.png');
        this.load.image('sanxeHead', 'assets/textures/HUD/explore/sanxeHead.png');
		this.load.spritesheet('sanxe_idle', 'assets/textures/Characters/sanxe_idle.png',{frameWidth:19, frameHeight:26})
		this.load.spritesheet('sanxe_wow', 'assets/textures/Characters/sanxe_wow.png',{frameWidth:19, frameHeight:26})
		this.load.spritesheet('sanxe_dmg', 'assets/textures/Characters/sanxe_dmg.png',{frameWidth:19, frameHeight:26})
		this.load.spritesheet('sanxe_dead', 'assets/textures/Characters/sanxe_dead.png',{frameWidth:19, frameHeight:26})
		this.load.spritesheet('sanxe_burn','assets/textures/Characters/sanxe_burn.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('sanxe_poison','assets/textures/Characters/sanxe_poison.png',{frameWidth:19, frameHeight:26});
		this.load.spritesheet('sanxe_shock','assets/textures/Characters/sanxe_shock.png',{frameWidth:19, frameHeight:26});

		// angel caido
		this.load.image('angel','assets/textures/Characters/AngelCaido.png',{frameWidth:59, frameHeight:50});
		this.load.spritesheet('angel_idle','assets/textures/Characters/AngelCaido_idle.png',{frameWidth:59, frameHeight:50});
		this.load.spritesheet('angel_wow','assets/textures/Characters/AngelCaido_wow.png',{frameWidth:59, frameHeight:50});
		this.load.spritesheet('angel_dmg','assets/textures/Characters/AngelCaido_dmg.png',{frameWidth:59, frameHeight:50});
		this.load.spritesheet('angel_dead','assets/textures/Characters/AngelCaido_dead.png',{frameWidth:59, frameHeight:50});
		this.load.spritesheet('angel_burn','assets/textures/Characters/AngelCaido_burn.png',{frameWidth:59, frameHeight:50});
		this.load.spritesheet('angel_poison','assets/textures/Characters/AngelCaido_poison.png',{frameWidth:59, frameHeight:50});
		this.load.spritesheet('angel_shock','assets/textures/Characters/AngelCaido_shock.png',{frameWidth:59, frameHeight:50});


		// objetos
		this.load.image('cigarro', 'assets/textures/Props/cigarro.png');
		this.load.image('dalsyF', 'assets/textures/Props/dalsyFresa.png');
		this.load.image('dalsyN', 'assets/textures/Props/dalsyNaranja.png');
		this.load.image('fria', 'assets/textures/Props/fria.png');
		this.load.image('kebab', 'assets/textures/Props/kebab.png');
		this.load.image('porro', 'assets/textures/Props/porro.png');
		this.load.image('tartaS', 'assets/textures/Props/tartaSantiago.png');
		this.load.image('i200', 'assets/textures/Props/cigarro.png');
		this.load.image('i600', 'assets/textures/Props/cigarro.png');
		this.load.image('i1', 'assets/textures/Props/cigarro.png');
		this.load.image('piezaDino', 'assets/textures/Props/piezaDino.png');


        //JSON
        this.load.json('npc_dialogues', 'assets/dialogues/npc_dialog.json');
		this.load.json('quests', 'assets/dialogues/quests_dialogs.json');

		//MÚSICA
		this.load.audio('intro', ['assets/sounds/intro.ogg', 'assets/sounds/intro.mp3',])
		this.load.audio('startbutton',  ['assets/sounds/startbutton.ogg', 'assets/sounds/startbutton.mp3',])
		this.load.audio('dreamon', ['assets/sounds/dreamon.ogg', 'assets/sounds/dreamon.mp3',]);
		this.load.audio('rickroll', ['assets/sounds/rickroll.ogg', 'assets/sounds/rickroll.mp3',]);
		this.load.audio('combat', ['assets/sounds/combat.ogg', 'assets/sounds/combat.mp3',]);
		this.load.audio('bossfight', ['assets/sounds/bossfight.ogg', 'assets/sounds/bossfight.mp3',]);
		this.load.audio('victory', ['assets/sounds/victory.ogg', 'assets/sounds/victory.mp3',]);
		this.load.audio('devs', ['assets/sounds/devs.ogg', 'assets/sounds/devs.mp3',]);
		this.load.audio('park', ['assets/sounds/park.ogg', 'assets/sounds/park.mp3',]);
		this.load.audio('square', ['assets/sounds/square.ogg', 'assets/sounds/square.mp3',]);
		this.load.audio('cinematic1', ['assets/sounds/square.ogg', 'assets/sounds/square.mp3',]);
		this.load.audio('wind', ['assets/sounds/wind.ogg', 'assets/sounds/wind.mp3',]);
		

        // Destruye la barra de cargando página
		this.load.on('complete', function () {
			progressBar.destroy();
			progressBox.destroy();
			loadingText.destroy();
			percentText.destroy();
		});
    }

	create() {
		this.scene.launch('initial');
	}
}

