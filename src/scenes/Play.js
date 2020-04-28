class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        // load the necessary images and tile sprites
        this.load.image('pixel_guy', './assets/sprites/pixel_guy.png'); //placeholder
        this.load.image('bounds', './assets/sprites/bounds.png'); //placeholder
        this.load.image('obstacle', './assets/sprites/obstacle.png'); //placeholder
        
    
    }

    create() {
        // define key codes
        var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        // spawn player and set its gravity
        this.player = this.physics.add.sprite(game.config.width/3, 400, 'pixel_guy');
        game.settings.gamePlayer = this.player;
        this.player.setVelocityY(-300);
        this.player.setGravityY(1000);

        // spawn the floor and set it immovable
        let floor = this.physics.add.sprite(game.config.width/2, game.config.width/2 + 110, 'bounds').
            setScale(4, 0.5);
        floor.setImmovable();

        // spawn the roof and set it immovable
        let roof = this.physics.add.sprite(game.config.width/2, 40, 'bounds').
            setScale(4, 0.5);
        roof.setImmovable();

        // spawn initial obstacle that appears in title screen
        this.Obstacle1 = new Obstacle(this, game.config.width/3, 542, 'obstacle').
        setScale(1, 4).setOrigin(0.5, 1);
        this.add.existing(this.Obstacle1);

        //spawn second obstacle
        this.Obstacle2 = new Obstacle(this, game.config.width - 290, 542, 'obstacle').
        setScale(2, 2).setOrigin(0.5, 1);
        this.add.existing(this.Obstacle2);

        //spawn third obstacle
        this.Obstacle3 = new Obstacle(this, game.config.width + 200, 542, 'obstacle').
        setScale(Phaser.Math.Between(1.0, 3), Phaser.Math.Between(1.0, 6.5)).setOrigin(0.5, 1);
        this.add.existing(this.Obstacle3);

        //spawn fourth obstacle
        this.Obstacle4 = new Obstacle(this, game.config.width + 400, 542, 'obstacle').
        setScale(Phaser.Math.Between(1.0, 3), Phaser.Math.Between(1.0, 6.5)).setOrigin(0.5, 1);
        this.add.existing(this.Obstacle4);

        // set the collision property of player on objects
        this.physics.add.collider(this.player, floor);
        this.physics.add.collider(this.player, roof);
        this.physics.add.collider(this.player, this.Obstacle1);
        this.physics.add.collider(this.player, this.Obstacle2);
        this.physics.add.collider(this.player, this.Obstacle3);
        this.physics.add.collider(this.player, this.Obstacle4);

        // set up cursor keys / controls
        controls = this.input.keyboard.createCursorKeys();
        this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // BOOLEAN VARS
        this.isSlamming = false; // keeps track of if player is ground slamming
        this.isDashing = false; // Only used if left right control is turned on
        this.isGameOver = false; // keeps track of if game should go to game over scene'
        this.canHoldJump = false; // keeps track of if player can continue to gain height in their jump

        // INTEGER VARS
        this.jumpStartHeight = 0;

    }

    // Initial Jump made from object, -300 is the smallest possible jump height
    startJump() {
        this.player.setVelocityY(-300);
    }

    // This makes it possible to hold your jump to increase height
    holdJump() {
        // only allow the player to jump 100 units above the 
        // height at which the jump was made
        if(this.player.y > this.jumpStartHeight - 65) {
            this.player.setGravityY(-1500);
        } else {
            // else reset the gravity to pull the player to the ground
            this.player.setGravityY(1000);
            this.canHoldJump = false;
        }
    }

    // Ground slam function
    groundSlam() {
        this.player.setVelocityY(850);
    }

    // Randomize the size of the obstacle
    spawnObstacle() {

    }

    // ** UPDATE FUNCTION **
    update() {

        // Update the Obstacles
        this.Obstacle1.update();
        this.Obstacle2.update();
        this.Obstacle3.update();
        this.Obstacle4.update();

        // Keep the player from flying off the screen when coming
        // in contact with an obstacle while in the air
        if (this.player.body.velocity.x != 0) {
            this.player.setVelocityX(0);
        }

    //JUMP ---
        // Jump functionality, single jump only
        if (Phaser.Input.Keyboard.JustDown(controls.up) && 
                this.player.body.touching.down) {
            this.jumpStartHeight = this.player.y;
            this.canHoldJump = true;
            this.startJump();
        }

        // this causes the players jump to be longer if held down
        if (this.keyUp.isDown && this.canHoldJump) {
            this.holdJump();
        }

        // Let go of jump key and gravity returns to normal
        if (Phaser.Input.Keyboard.JustUp(controls.up)) {
            this.canHoldJump = false;
            this.currGravity = 1000;
            this.player.setGravityY(1000);
        }
    //END JUMP ---

        // ground slam functionality
        if (Phaser.Input.Keyboard.JustDown(controls.down) && 
        !this.player.body.touching.down) {
            this.isSlamming = true;
            this.player.angle = 0;
            this.groundSlam();
        }

        /* ******* LEFT / RIGHT ********
        // move player to the left
        if(this.keyLeft.isDown && !this.player.body.touching.down
            && !this.isDashing) {
            console.log('LEFT');
            this.player.setVelocityX(-50);
            this.isDashing = true;
        }
        // move player to the right
        if(this.keyRight.isDown && !this.player.body.touching.down
            && !this.isDashing) {
            console.log('RIGHT');
            this.player.setVelocityX(50);
            this.isDashing = true;
        }
        */

        // Spin the player whilst in the air
        if(!this.player.body.touching.down && !this.isSlamming) {
            this.player.angle += 10;
        }

        // reset the player angle when back on the ground
        if(this.player.body.touching.down) {
            this.player.angle = 0;
            this.isDashing = false;
            this.player.setVelocityX(0);
            if(this.isSlamming) {
                // shake the camera (duration, intensity)
                this.cameras.main.shake(50, 0.005);
                this.isSlamming = false;   
            }
        }

        //check if out of bounds to the left
        if(this.player.x < 148 && !this.isGameOver) {
            this.isGameOver = true;
            this.scene.start('gameOver');
        }   
    }    
}