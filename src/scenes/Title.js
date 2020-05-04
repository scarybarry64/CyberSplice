class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    preload() {
        // load the necessary images and tile sprites
        
        this.load.atlas('Glitch', './assets/sprites/Glitch.png', './assets/sprites/Glitch.json');
        this.load.image('bounds', './assets/sprites/bounds.png'); //placeholder
        this.load.image('obstacle', './assets/sprites/obstacle.png'); //placeholder
        this.load.image('obstacle_terminal', './assets/sprites/obstacle_terminal.png'); //placeholder terminal
        this.load.image('bounds_terminal', './assets/sprites/bounds_terminal.png'); //placeholder terminal
        this.load.audio('music', './assets/audio/SynthKid_Chromatic.mp3');

        // load audio
        this.load.audio('sfx_jump', './assets/audio/jump19.wav');
        this.load.audio('sfx_select', './assets/audio/Blip_Select5.wav');

    }

    create() {
        // spawn frozen player
        this.player = this.physics.add.sprite(game.config.width/3, 520, 'Glitch', 'Glitch_Running_01');
        this.player.setGravityY(0);

        // spawn the floor and set it immovable
        let floor = this.physics.add.sprite(game.config.width/2, game.config.width/2 + 110, 'bounds_terminal').
            setScale(4, 0.5);
        floor.setImmovable();

        // spawn the roof and set it immovable
        let roof = this.physics.add.sprite(game.config.width/2, 40, 'bounds_terminal').
            setScale(4, 0.5);
        roof.setImmovable();

        // title stuff
        this.add.text(centerX, centerY / 1.5 - 10, 'CyberSplice', {
            fontFamily: 'Consolas', fontSize: '60px', color: primaryColor
        }).setOrigin(0.5);
        this.add.text(centerX, centerY - 40, 'A Matrix-esque endless runner\nby Barry Day, Trevor Moropoulos, and Lucio Espinoza', {
            fontFamily: 'Consolas', fontSize: '20px', color: primaryColor, align: 'center'
        }).setOrigin(0.5);

        // Message to start
        this.add.text(centerX, game.config.height - 70, 'Up Arrow to START', {
            fontFamily: 'Consolas', fontSize: '24px', color: primaryColor
        }).setOrigin(0.5);


        // Skips tutorial if already completed
        if (!tutorialDone) {
            this.add.text(centerX, game.config.height - 30, 'Down Arrow for TUTORIAL', {
                fontFamily: 'Consolas', fontSize: '24px', color: primaryColor
            }).setOrigin(0.5);
        }

        // set up cursor keys
        controls = this.input.keyboard.createCursorKeys();

        // Running animation
        let playerRunAnimConfig = {
            key: 'running',
            frames: this.anims.generateFrameNames('Glitch', {
                prefix: 'Glitch_Running_',
                start: 1,
                end: 8,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 10,
            repeat: -1
        };
        this.anims.create(playerRunAnimConfig);
    }

    update() {

        // Play running animation for player sprite
        this.player.anims.play('running', true);

        // check for UP input
        if (Phaser.Input.Keyboard.JustDown(controls.up)) {
            initialTime = this.time.now;
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        else if (Phaser.Input.Keyboard.JustDown(controls.down) && !tutorialDone) {
            initialTime = this.time.now;
            this.sound.play('sfx_select');
            this.scene.start('tutorialScene');
        }
    }
}