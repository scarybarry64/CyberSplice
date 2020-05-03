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
        this.player = this.physics.add.sprite(game.config.width/3, 525, 'Glitch', 'Glitch_Running_01');
        this.player.setGravityY(0);

        // spawn the floor and set it immovable
        let floor = this.physics.add.sprite(game.config.width/2, game.config.width/2 + 110, 'bounds_terminal').
            setScale(4, 0.5);
        floor.setImmovable();

        // spawn the roof and set it immovable
        let roof = this.physics.add.sprite(game.config.width/2, 40, 'bounds_terminal').
            setScale(4, 0.5);
        roof.setImmovable();

        // placeholder title screen text
        this.add.text(centerX, centerY - 75, 'G2P1 Endless Runner', {
            fontFamily: 'Helvetica', fontSize: '48px', color: primaryColor
        }).setOrigin(0.5);
        this.add.text(centerX, centerY - 20, 'JUMP to START', {
            fontFamily: 'Helvetica', fontSize: '24px', color: '#FFF'
        }).setOrigin(0.5);
        this.add.text(centerX, centerY + 145, 'UP ARROW to Jump', {
            fontFamily: 'Helvetica', fontSize: '18px', color: '#FFF'
        }).setOrigin(0.5);
        this.add.text(centerX, centerY + 170, 'DOWN ARROW to Ground Slam', {
            fontFamily: 'Helvetica', fontSize: '18px', color: '#FFF'
        }).setOrigin(0.5);
        this.add.text(centerX, centerY + 195, 'Hold SPACEBAR for Cyber Vision', {
            fontFamily: 'Helvetica', fontSize: '18px', color: '#FFF'
        }).setOrigin(0.5);

        // set up cursor keys
        controls = this.input.keyboard.createCursorKeys();
    }

    update() {
        // check for UP input
        if (Phaser.Input.Keyboard.JustDown(controls.up)) {
            initialTime = this.time.now;
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}