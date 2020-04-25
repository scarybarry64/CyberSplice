class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        // load the necessary images and tile sprites
        this.load.image('pixel_guy', './assets/sprites/pixel_guy.png'); //placeholder
    }

    create() {
        
        // spawn player
        this.player1 = new Player(this, game.config.width/2, 255,
            'pixel_guy').setScale(1, 1).setOrigin(0,0);
    }
}