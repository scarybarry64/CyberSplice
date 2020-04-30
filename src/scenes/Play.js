class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        // load the necessary images and tile 
        this.load.spritesheet('arrow_left', 'assets/sprites/arrow_left.png', {
            frameWidth: 32, frameHeight: 32, endFrame: 2});
        this.load.image('pixel_guy', './assets/sprites/pixel_guy.png'); //placeholder
        this.load.image('pixel_guy_terminal', './assets/sprites/pixel_guy_terminal.png'); //placeholder
        this.load.image('bounds', './assets/sprites/bounds.png'); //placeholder
        this.load.image('bounds_terminal', './assets/sprites/bounds_terminal.png'); //placeholder terminal
        this.load.image('obstacle', './assets/sprites/obstacle.png'); //placeholder
        this.load.image('obstacle_terminal', './assets/sprites/obstacle_terminal.png'); //placeholder terminal

    }

    create() {
        // animation config for left arrow
        var leftAnimConfig = {
            key: 'blink_l',
            frames: this.anims.generateFrameNumbers('arrow_left', { start: 0, end: 1,
            first: 0 }), frameRate: 12, repeat: -1
        };

        // animation config for right arrow
        var rightAnimConfig = {
            key: 'blink_r',
            frames: this.anims.generateFrameNumbers('arrow_left', { start: 0, end: 1,
            first: 0 }), frameRate: 14, repeat: -1
        };

        
        // create the roof obstacle particles
        this.particles = this.add.particles('obstacle_terminal');

        // spawn player and set its gravity
        this.player = this.physics.add.sprite(game.config.width/3, 525, 'pixel_guy_terminal');
        this.player.setVelocityY(-500); // initial jump off title screen platform
        this.player.setGravityY(1000); // default gravity

        // spawn the floor and set it immovable
        let floor = this.physics.add.sprite(game.config.width/2, game.config.width/2 + 110, 'bounds_terminal').
            setScale(4, 0.5);
        floor.setImmovable();

        // spawn the roof and set it immovable
        let roof = this.physics.add.sprite(game.config.width/2, 40, 'bounds_terminal').
            setScale(4, 0.5);
        roof.setImmovable();

        // spawn initial floor obstacle that appears in title screen
        this.Obstacle1 = new Obstacle(this, game.config.width + 200, 542, 'obstacle_terminal').
        setScale(1, 4).setOrigin(0.5, 1); //Origin currently set at base of sprite
        this.add.existing(this.Obstacle1); //add to display list

        //spawn second floor obstacle
        this.Obstacle2 = new Obstacle(this, game.config.width + 400, 542, 'obstacle_terminal').
        setScale(2, 2).setOrigin(0.5, 1); //Origin currently set at base of sprite
        this.add.existing(this.Obstacle2); //add to display list

        //spawn third floor obstacle
        this.Obstacle3 = new Obstacle(this, game.config.width + 600, 542, 'obstacle_terminal').
        setScale(Phaser.Math.Between(1.0, 3), Phaser.Math.Between(1.0, 6.5)).setOrigin(0.5, 1); //Origin currently set at base of sprite
        this.add.existing(this.Obstacle3); //add to display list

        //spawn fourth floor obstacle
        this.Obstacle4 = new Obstacle(this, game.config.width + 800, 542, 'obstacle_terminal').
        setScale(Phaser.Math.Between(1.0, 3), Phaser.Math.Between(1.0, 6.5)).setOrigin(0.5, 1); //Origin currently set at base of sprite
        this.add.existing(this.Obstacle4); //add to display list

        // spawn initial roof obstacle that appears in title screen
        this.roofObstacle1 = new RoofObstacle(this, game.config.width + 300, 90, 'obstacle_terminal').
        setScale(1, 6).setOrigin(0.5, 0); //Origin currently set at base of sprite
        this.add.existing(this.Obstacle1); //add to display list

        // spawn roof obstacle that appears in title screen
        this.roofObstacle2 = new RoofObstacle(this, game.config.width + 500, 90, 'obstacle_terminal').
        setScale(2, 3).setOrigin(0.5, 0); //Origin currently set at base of sprite
        this.add.existing(this.Obstacle2); //add to display list

        // set the collision property of player on objects
        this.physics.add.collider(this.player, floor);
        this.physics.add.collider(this.player, roof);
        // floor obstacles collision 
        this.physics.add.collider(this.player, this.Obstacle1);
        this.physics.add.collider(this.player, this.Obstacle2);
        this.physics.add.collider(this.player, this.Obstacle3);
        this.physics.add.collider(this.player, this.Obstacle4);

        // roof obstacles collision
        this.physics.add.collider(this.player, this.roofObstacle1, function (player, RoofObstacle) {
            // Only get stuck if collision is on the left side of the roof obstacle
            if (player.body.touching.right && RoofObstacle.body.touching.left) {
                game.settings.isStuck = true; //set the global var true
                player.angle = 0; // set player sprite upright
                player.setGravityY(0); // kill gravity
                player.body.velocity.y = 0; // neutralize vertical movement
                player.body.velocity.x = 0 // neutralize horizontal movement
                game.settings.scrollSpeed = -50; // slo-mo scroll speed
                game.settings.collidedRoof = RoofObstacle; // save the obstacle stuck to as a global var
            }
        });

        // roof obstacle2 collision
        this.physics.add.collider(this.player, this.roofObstacle2, function (player, RoofObstacle) {
            // Only get stuck if collision is on the left side of the roof obstacle
            if (player.body.touching.right && RoofObstacle.body.touching.left) {
                game.settings.isStuck = true; //set the global var true
                player.angle = 0; // set player sprite upright
                player.setGravityY(0); // kill gravity
                player.body.velocity.y = 0; // neutralize vertical movement
                player.body.velocity.x = 0 // neutralize horizontal movement
                game.settings.scrollSpeed = -50; // slo-mo scroll speed
                game.settings.collidedRoof = RoofObstacle; // save the obstacle stuck to as a global var
            }
        });

        // TIME DISPLAY
        this.timeDisplay = this.add.text(game.config.width - 60, 20, 0, {
            fontFamily: 'Consolas', 
            fontSize: '48px', 
            color: primaryColor,
        });

        //ANIMATION 
        this.anims.create(leftAnimConfig);
        this.anims.create(rightAnimConfig);

        // add the left arrow key sprite and set invisible
        this.blink_left = this.add.sprite(centerX-50, 45, 'blink').setScale(2, 2);
        this.blink_left.alpha = 0;

        // add the right arrow key sprite, mirror it, and set invisible
        this.blink_right = this.add.sprite(centerX+50, 45, 'blink').setScale(2, 2);
        this.blink_right.flipX = true;
        this.blink_right.alpha = 0;

        // start the animations
        this.blink_left.anims.play('blink_l');
        this.blink_right.anims.play('blink_r');

        // setup cursor keys / controls
        controls = this.input.keyboard.createCursorKeys();
        this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // BOOLEAN VARIABLES
        this.isSlamming = false; // keeps track of if player is ground slamming
        this.isGameOver = false; // keeps track of if game should go to game over scene'
        this.canHoldJump = false; // keeps track of if player can continue to gain height in their jump
        game.settings.isStuck = false; //reset the global isStuck variable
        this.allowedToLeft = true;
        this.allowedToRight = true;

        // INTEGER VARIABLES
        this.jumpStartHeight = 0; // used to calculate relative max jump height
        game.settings.scrollSpeed = -200; // global game scroll speed, this is how we imitate time dilation
        this.lefts = 0;
        this.rights = 0;
        
    }

    // reveal the mash buttons anim
    playAnim() {
        this.blink_left.alpha = 1;
        this.blink_right.alpha = 1;
    }

    // Initial Jump made from object, -300 is the smallest possible jump height
    startJump() {
        this.player.setVelocityY(-300);
    }

    // This makes it possible to hold your jump to increase height
    holdJump() {
        // only allow the player to jump 100 units above the 
        // height at which the jump was made
        if (this.player.y > this.jumpStartHeight - 65) {
            this.player.setGravityY(-1500); //negative gravity simulates extending a jump
        } else {
            // else reset the gravity to pull the player to the ground
            this.player.setGravityY(1000);
            this.canHoldJump = false; // disables double jump
        }
    }

    // Ground slam function
    groundSlam() {
        this.player.setVelocityY(850);
    }

    // Spawn the particles after roof obstacle destroyed, param is x and y coord
    spawnParticlesStuck(x, y) {
        this.particles.createEmitter({
            alpha: { start: game.settings.visionEnabled, end: !game.settings.visionEnabled },
            scale: { start: game.settings.collidedRoof.scale, end: 0 },
            //tint: { start: 0xff945e, end: 0xff945e },
            speed: 10,
            accelerationY: 300,
            accelerationX: -300,
            angle: { min: 0, max: 0 },
            rotate: { min: -180, max: 180 },
            lifespan: { min: 1000, max: 1100 },
            blendMode: 'ADD',
            frequency: 110,
            maxParticles: 1,
            x: x,
            y: y,
        });
    }

    // Spawn the particles for each passing obstacle, param is x and y coord
    spawnParticles(x, y) {
        this.particles.createEmitter({
            alpha: { start: game.settings.visionEnabled, end: !game.settings.visionEnabled },
            scale: { start: game.settings.obstacleToDestroy.scale, end: 0 },
            //tint: { start: 0xff945e, end: 0xff945e },
            speed: 10,
            accelerationY: -300,
            accelerationX: -300,
            angle: { min: 0, max: 0 },
            rotate: { min: -180, max: 180 },
            lifespan: { min: 1000, max: 1100 },
            blendMode: 'ADD',
            frequency: 110,
            maxParticles: 1,
            x: x,
            y: y,
        });
    }

    // ** UPDATE FUNCTION **
    update() {

        // Update timer display
        let timer = Math.floor((this.time.now - initialTime) / 1000);
        this.timeDisplay.text = timer;
        if (timer == 10 && !timerFlag) { // aligns timer to right when 2 digits
            this.timeDisplay.x -= this.timeDisplay.width / 2;
            timerFlag = true;
        }
        else if (timer == 99 && timerFlag) { // aligns when 3 digits
            this.timeDisplay.x -= this.timeDisplay.width / 3;
            timerFlag = false;
        }

        if(timer == 45) {
            game.settings.scrollSpeed == 250;
        }
        
        // Update floor obstacles
        this.Obstacle1.update();
        this.Obstacle2.update();
        this.Obstacle3.update();
        this.Obstacle4.update();

        // Update roof obstacles
        this.roofObstacle1.update();
        this.roofObstacle2.update();

        // Keep the player from flying off the screen when coming
        // in contact with an obstacle while in the air
        if (this.player.body.velocity.x != 0) {
            this.player.setVelocityX(0);
        }

        //JUMP ---
        if (!game.settings.isStuck) {
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

            // Spin the player whilst in the air
            if (!this.player.body.touching.down && !this.isSlamming) {
                this.player.angle += 10;
            }

            // reset the player angle when back on the ground
            if (this.player.body.touching.down) {
                this.player.angle = 0;
                this.player.setVelocityX(0);
                if (this.isSlamming) {
                    // shake the camera (duration, intensity)
                    this.cameras.main.shake(50, 0.005);
                    this.isSlamming = false;
                }
            }
        }


        // Fire code when stuck to roof obstacle
        if(game.settings.isStuck) {
            if(!game.settings.isPlayingAnim) {
                this.playAnim();
                game.settings.isPlayingAnim = true;
            }
            
            // can and does press left arrow key
            if(this.keyLeft.isDown && this.allowedToLeft && !this.keyRight.isDown) {
                this.player.x-= 2; // jiggle player left
                this.allowedToLeft = false;
                this.lefts++;
                console.log("LEFTS: " + this.lefts);
                this.allowedToRight = true;
            }
            // can and does press right arrow key
            else if(this.keyRight.isDown && this.allowedToRight && !this.keyLeft.isDown) {
                this.player.x += 2; // jiggle player right
                this.allowedToRight = false;
                this.rights++;
                console.log("RIGHTS: " + this.rights);
                this.allowedToLeft = true;
            }

            // unstick the player
            if(this.lefts >= Phaser.Math.Between(10, 15) 
            && this.rights >= Phaser.Math.Between(10,15) && game.settings.isStuck) {
                console.log("UNSTUCK! and: " + game.settings.isStuck);
                game.settings.isPlayingAnim = false;
                this.blink_left.alpha = 0;
                this.blink_right.alpha = 0;
                this.spawnParticlesStuck(this.player.x, this.player.y - 50); //pass the y coord
                this.player.setGravityY(1000); // reset the gravity
                this.player.setVelocityX(1000);
                game.settings.scrollSpeed = -200; // reset the scroll speed
                game.settings.collidedRoof.reset(); // reset the roof obstacle to right of screen
                this.lefts = 0; // reset left cursor count
                this.rights = 0; // reset right cursor count
                game.settings.isStuck = false;

            }
        }

        //check if out of bounds to the left
        if (this.player.x < -10 && !this.isGameOver) {
            this.isGameOver = true;
            if(timer > game.settings.highScore) {
                game.settings.highScore = timer;
            }
            this.scene.start('gameOver');
        }

        if(game.settings.spawnParticles) {
            this.spawnParticles(100, game.settings.obstacleToDestroy.y - 10);
            game.settings.spawnParticles = false;
        }
    }
}