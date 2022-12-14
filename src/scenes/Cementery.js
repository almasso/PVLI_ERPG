import FatherScene from './FatherScene.js';
// Escena de exploración (temporal de momento)
export default class CementeryScene extends FatherScene {
	// construimos la escena
	constructor() {
		super('cementery');
	}

	// inicializamos la escena
	create() {
		const config = {
			mute: false,
			volume: 1,
			rate: 1,
			detune: 0,
			seek: 0,
			loop: false,
			delay: 0,
		  };
		this.dreamon = this.sound.add('dreamon', config);
		super.create();
		this.npcs[0].setFlip(true,false);
		this.eObjs[0].setVisible(false);
		this.kratos=false;
		this.count=0;
		this.manin.x=750;
		this.manin.y=122;
		for(let i=1;i<this.eObjs.length;i++)
		{
			this.eObjs[i].setVisible(false);
		}
		
		
	}

	// comprobación de colisiones y apertura de menús
	update(t,dt){

		super.update();

		if(this.kratos)
		{
			console.log("E")
			this.count += dt;
			if(this.count > 1)
			{

				if(this.npcs[0].x!=440)
				{
					this.npcs[0].x-=1;					

					if(this.npcs[0].x==440)
					{
						this.npcs[0].y+=45;
						this.npcs[0].setFlip(false, true);
					}
				}
				else
				{
					this.npcs[0].y+=0.75;	
				}
				this.count = 0;
			}
			if(this.npcs[0].y>=650)
			{
				this.kratos=false;
				this.npcs[0].destroy();
				this.dreamon.stop();
				this.eObjs[0].setVisible(true);
				this.manin.setActive(true);
			}
		}
	}	

	Kratos()
	{
		this.dreamon.play();
		console.log("HAAAAAAAAAAAAA");
		this.kratos=true;
		
		this.npcs[0].trigger.destroy();
		this.manin.setActive(false);
	
	}
	
}