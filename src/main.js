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
            debug: true,
        }
    },
    //backgroundColor: "FFFFFF",
    scene: [Title, Play, GameOver],
};

// define game
let game = new Phaser.Game(config);

game.settings = {
    scrollSpeed: -200, // negative number to look like scrolling left
    isStuck: false,
    collidedRoof: 0,
}

// define globals
let centerX = game.config.width / 2;
let centerY = game.config.height / 2;
let controls;
let paddle = null;
let primaryColor = '#03C04A';
let initialTime = 0;