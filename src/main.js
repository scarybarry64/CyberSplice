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
    isPlayingAnim: false
}

// define globals
let centerX = game.config.width / 2;
let centerY = game.config.height / 2;
let controls;
let paddle = null;
let primaryColor = '#03C04A';
let initialTime = 0;
let timerFlag = false;