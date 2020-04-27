class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    preload() {
        // load the necessary images and tile sprites
        this.load.image('pixel_guy', './assets/sprites/pixel_guy.png'); //placeholder
        this.load.image('bounds', './assets/sprites/bounds.png'); //placeholder
        this.load.image('obstacle', './assets/sprites/obstacle.png'); //placeholder
    
    }

    create() {

        this.player = this.physics.add.sprite(game.config.width/3, 400, 'pixel_guy');
        this.player.setGravityY(0);

        // spawn the floor and set it immovable
        let floor = this.physics.add.sprite(game.config.width/2, game.config.width/2 + 110, 'bounds').
            setScale(4, 0.5);
        floor.setImmovable();

        // spawn the roof and set it immovable
        let roof = this.physics.add.sprite(game.config.width/2, 40, 'bounds').
            setScale(4, 0.5);
        roof.setImmovable();

        // placeholder title screen
        this.add.text(centerX, centerY-50, 'G2P1 Endless Runner', {
            fontFamily: 'Helvetica', fontSize: '48px', color: '#FACADE'
        }).setOrigin(0.5);
        this.add.text(centerX, centerY, 'Press UP ARROW to Jump', {
            fontFamily: 'Helvetica', fontSize: '24px', color: '#FFF'
        }).setOrigin(0.5);

        // set up cursor keys
        controls = this.input.keyboard.createCursorKeys();
    }

    update() {
        // check for UP input
        if (Phaser.Input.Keyboard.JustDown(controls.up)) {
            this.scene.start('playScene');
        }
    }
}