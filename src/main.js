// Barry Day, Trevor Moropoulos, Lucio Espinoza

let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 640,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    },
    //backgroundColor: "FFFFFF",
    scene: [Title, Play, GameOver],
};

// define game
let game = new Phaser.Game(config);

game.settings = {
    scrollSpeed: -200, // negative number to look like scrolling left
    isStuck: false, // if the player is stuck to a roof obstacle or not
    collidedRoof: 0, // used to keep track of the roof obstacle the player is stuck to
    visionEnabled: 0, // if the vision mechanic is enabled
    isPlayingAnim: false, // if the mash keys anim is playing
    highScore: 0, // current high score
    isLocalEnabled: false, // is local storage enabled
    spawnParticles: false, // check if should spawn particles
    obstacleToDestroy: 0, // the obstacle to spawn the particles from
    shownEye: false, // has enabled view
    regenDone: true,
}

// define globals
let centerX = game.config.width / 2;
let centerY = game.config.height / 2;
let controls;
let paddle = null;
let primaryColor = '#03C04A';
let initialTime = 0;
let timerFlag = false;
const maxPower = 100;
const drainRate = 10; // rate at which power drains per second
const regenRate = 5; // rate at which power regens per second
let isRunning = true; // for player sprite animation tracking
