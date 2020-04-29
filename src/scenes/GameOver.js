// Game over screen
class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOver');
    }

    preload() {
        // load the necessary images and tile sprites
        this.load.image('pixel_guy', './assets/sprites/pixel_guy.png'); //placeholder
        this.load.image('bounds', './assets/sprites/bounds.png'); //placeholder
        this.load.image('obstacle', './assets/sprites/obstacle.png'); //placeholder
        this.load.image('obstacle_terminal', './assets/sprites/obstacle_terminal.png'); //placeholder terminal
        this.load.image('bounds_terminal', './assets/sprites/bounds_terminal.png'); //placeholder terminal
    
    }

    create() {

        // spawn the floor and set it immovable
        let floor = this.physics.add.sprite(game.config.width/2, game.config.width/2 + 110, 'bounds_terminal').
            setScale(4, 0.5);
        floor.setImmovable();

        // spawn the roof and set it immovable
        let roof = this.physics.add.sprite(game.config.width/2, 40, 'bounds_terminal').
            setScale(4, 0.5);
        roof.setImmovable();

        // placeholder game over text
        this.add.text(centerX, centerY-50, 'GAME OVER', {
            fontFamily: 'Helvetica', fontSize: '48px', color: '#11ff00'
        }).setOrigin(0.5);
        this.add.text(centerX, centerY, 'Press DOWN ARROW for Main Menu', {
            fontFamily: 'Helvetica', fontSize: '24px', color: '#FFF'
        }).setOrigin(0.5);

        // set up cursor keys
        controls = this.input.keyboard.createCursorKeys();
    }

    update() {
        // check for DOWN input
        if (Phaser.Input.Keyboard.JustDown(controls.down)) {
            this.scene.start('titleScene');
        }
    }
}