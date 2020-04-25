class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        // load the necessary images and tile sprites
        this.load.image('pixel_guy', './assets/sprites/pixel_guy.png'); //placeholder
        this.load.image('bounds', './assets/sprites/bounds.png'); //placeholder
    
    }

    create() {
        
        // spawn player
        this.player1 = new Player(this, game.config.width/2, 255,
            'pixel_guy').setScale(1, 1).setOrigin(0,0);

        //spawn floor
        this.floor1 = new Floor(this, -25, 550,
            'bounds').setScale(4,0.5).setOrigin(0,0);
    }
}