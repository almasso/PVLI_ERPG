import {FightScene} from './scenes/FightScene.js'
import InitialScene from './scenes/InitialScene.js'
import FinalScene from './scenes/FinalScene.js'
import DialogScene from './ui/dialogues.js'
import HUDScene from './scenes/HUDScene.js'
import ParkScene from './scenes/Park.js'
import CementeryScene from './scenes/Cementery.js'
import PortScene from './scenes/Port.js'
import Preload from './scenes/PreloadScene.js'
import Square from './scenes/Square.js'


/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.CANVAS,
    canvas: document.getElementById("game"),
    width:  800,
    height: 600,
    pixelArt: true,
	scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
		// Configuramos phaser para que se adapte al tamaño de pantalla donde ejecutadmos
		// con un mínimo y un máximo de tamaño
		mode: Phaser.Scale.FIT,
		min: {
            width: 328,
            height: 188
        },
		max: {
            width: 1312,
            height: 752
        },
		zoom: 1
    },
    scene: [Preload, InitialScene, Square, FightScene, FinalScene, DialogScene, ParkScene,CementeryScene,PortScene, HUDScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        },
        checkCollision: {
            up: true,
            down: true,
            left: true,
            right: true
        }
    },
    title: "ÑRPG: Rondando Por Galicia",
    version: "0.0.1"
};

new Phaser.Game(config);
