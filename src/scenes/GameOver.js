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
        // handle high score
        // check if local storage is supported in the brower
        if(game.settings.isLocalEnabled){
            var locScore = JSON.parse(localStorage.getItem('highscore')); //parse the string
            if(game.settings.highScore > locScore) { // if a new high score should be reported
                this.updateScore(); //update the local storage
            }
            // add the high score text
        this.add.text(centerX, centerY+5, "This browser's high score: " + locScore, {
            fontFamily: 'Helvetica', fontSize: '24px', color: '#FFF'
        }).setOrigin(0.5);
        // ELSE if local storage is not supported
        } else {
            // Just add the current session high score to the screen
            this.add.text(centerX, centerY+5, 'Current session high score: ' + game.settings.highScore, {
                fontFamily: 'Helvetica', fontSize: '24px', color: '#FFF'
            }).setOrigin(0.5);
        }
        

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
            fontFamily: 'Helvetica', fontSize: '48px', color: primaryColor
        }).setOrigin(0.5);
        
        this.add.text(centerX, centerY+50, 'Press DOWN ARROW for Main Menu', {
            fontFamily: 'Helvetica', fontSize: '24px', color: '#FFF'
        }).setOrigin(0.5);

        // set up cursor keys
        controls = this.input.keyboard.createCursorKeys();
        
    }

    updateScore() {
        localStorage.setItem('highscore', game.settings.highScore);
    }

    update() {
        // check for DOWN input
        if (Phaser.Input.Keyboard.JustDown(controls.down)) {
            this.scene.start('titleScene');
        }
    }
}