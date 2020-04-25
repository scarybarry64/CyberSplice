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
        // define key codes
        var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        // spawn player and set its gravity
        this.player = this.physics.add.sprite(game.config.width/2, 400, 'pixel_guy');
        this.player.setGravityY(500);

        // spawn the floor and set it immovable
        let floor = this.physics.add.sprite(game.config.width/2, game.config.width/2 + 110, 'bounds').
            setScale(4, 0.5);
        floor.setImmovable();

        // spawn the roof and set it immovable
        let roof = this.physics.add.sprite(game.config.width/2, 40, 'bounds').
            setScale(4, 0.5);
        roof.setImmovable();

        // set the collision property of player on floor and roof
        this.physics.add.collider(this.player, floor);
        this.physics.add.collider(this.player, roof);

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();

    }

    //Jump function
    jump() {
        this.player.setVelocityY(-500);
    }

    update() {
        // jump functionality, single jump only
        if (Phaser.Input.Keyboard.JustDown(cursors.up) && 
            this.player.body.touching.down) {
            this.jump();
        }

        // Spin the player whilst in the air
        if(!this.player.body.touching.down) {
            this.player.angle += 10;
        }

        // reset the player angle when back on the ground
        if(this.player.body.touching.down) {
            this.player.angle = 0;
        }
    }    
}