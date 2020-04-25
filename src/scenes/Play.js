class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
<<<<<<< HEAD
        // load paddle
        this.load.image('paddle', './assets/images/paddle.png');
    }

    create() {
        // set up cursor keys
        controls = this.input.keyboard.createCursorKeys();

        // set up placeholder paddle
        paddle = this.physics.add.sprite(32, centerY, 'paddle').setOrigin(0.5);
        paddle.setCollideWorldBounds(true);
        paddle.setImmovable();
        paddle.setMaxVelocity(0, 600);
        paddle.setDragY(200);
        paddle.setDepth(1);
        paddle.isDead = false; // tracks if dead
    }

    update() {
        // more stuff
        if (controls.up.isDown) {
            paddle.body.velocity.y -= 150;
        }
        else if (controls.down.isDown) {
            paddle.body.velocity.y += 150;
        }
    }
=======
        // load the necessary images and tile sprites
        this.load.image('pixel_guy', './assets/sprites/pixel_guy.png'); //placeholder
        this.load.image('bounds', './assets/sprites/bounds.png'); //placeholder
    
    }

    create() {
        // define key codes
        var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        // spawn player and set its gravity
        this.player = this.physics.add.sprite(game.config.width/2, 400, 'pixel_guy');
        this.player.setVelocityY(-300);
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
>>>>>>> e72fba88031579d7e725c65f31f6fb9ec824caf3
}