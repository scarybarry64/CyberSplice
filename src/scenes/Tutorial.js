class Tutorial extends Phaser.Scene {
    constructor() {
        super('tutorialScene');
    }

    preload() {
        // load the necessary images and tile 
        this.load.spritesheet('arrow_left', 'assets/sprites/arrow_left.png', {
            frameWidth: 32, frameHeight: 32, endFrame: 2
        });
        this.load.atlas('Glitch', './assets/sprites/Glitch.png', './assets/sprites/Glitch.json'); //placeholder
        this.load.image('bounds', './assets/sprites/bounds.png'); //placeholder
        this.load.image('bounds_terminal', './assets/sprites/bounds_terminal.png'); //placeholder terminal
        this.load.image('obstacle', './assets/sprites/obstacle.png'); //placeholder
        this.load.image('obstacle_terminal', './assets/sprites/obstacle_terminal.png'); //placeholder terminal
        this.load.image('eye_closed', './assets/sprites/eye_closed.png');
        this.load.image('eye_open', './assets/sprites/eye_open.png');
        this.load.image('eye_disabled', './assets/sprites/eye_disabled.png');

        // load audio
        this.load.audio('sfx_jump', './assets/audio/Jump19.wav');
        this.load.audio('sfx_stuck', './assets/audio/Hit_Hurt7.wav');
        this.load.audio('sfx_unstuck', './assets/audio/Powerup22.wav');
        this.load.audio('sfx_view', './assets/audio/Pickup_Coin27.wav');
        this.load.audio('sfx_viewOff', './assets/audio/Hit_Hurt29.wav');
        this.load.audio('sfx_slam', './assets/audio/Hit_Hurt39.wav');


    }

    create() {

        // tutorial prompt
        this.prompt = this.add.text(centerX, centerY / 2, 'Press UP ARROW to Jump.\n\nHold it down to jump longer.', {
            fontFamily: 'Consolas',
            fontSize: '28px',
            color: primaryColor,
            align: 'center',
        }).setOrigin(0.5);

        this.step = 0; // tracks tutorial progress




        // animation config for left arrow
        let leftAnimConfig = {
            key: 'blink_l',
            frames: this.anims.generateFrameNumbers('arrow_left', {
                start: 0, end: 1,
                first: 0
            }), frameRate: 12, repeat: -1
        };

        // animation config for right arrow
        let rightAnimConfig = {
            key: 'blink_r',
            frames: this.anims.generateFrameNumbers('arrow_left', {
                start: 0, end: 1,
                first: 0
            }), frameRate: 14, repeat: -1
        };

        // create the roof obstacle particles
        this.particles = this.add.particles('obstacle_terminal');

        //Timer variable for vision
        this.timer = 100;
        this.visible = false;

        // spawn player and set its gravity
        this.player = this.physics.add.sprite(game.config.width / 3, 525, 'Glitch', 'Glitch_Running_01');
        this.player.setVelocityY(-500); // initial jump off title screen platform
        this.player.setGravityY(1000); // default gravity

        // player running animation config
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

        // player jumping animation config
        let playerJumpAnimConfig = {
            key: 'jumping',
            defaultTextureKey: 'Glitch',
            frames: [
                { frame: 'Glitch_Jumping' }
            ],
            repeat: -1
        };

        // spawn the floor and set it immovable
        let floor = this.physics.add.sprite(game.config.width / 2, game.config.width / 2 + 110, 'bounds_terminal').
            setScale(4, 0.5);
        floor.setImmovable();

        // spawn the roof and set it immovable
        let roof = this.physics.add.sprite(game.config.width / 2, 40, 'bounds_terminal').
            setScale(4, 0.5);
        roof.setImmovable();

        // spawn initial floor obstacle that appears in title screen
        this.Obstacle1 = new Obstacle(this, game.config.width / 1.5, 542, 'obstacle_terminal').
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
        this.anims.create(playerRunAnimConfig);
        this.anims.create(playerJumpAnimConfig);

        // add the left arrow key sprite and set invisible
        this.blink_left = this.add.sprite(centerX - 50, 45, 'blink').setScale(2, 2);
        this.blink_left.alpha = 0;

        // add the right arrow key sprite, mirror it, and set invisible
        this.blink_right = this.add.sprite(centerX + 50, 45, 'blink').setScale(2, 2);
        this.blink_right.flipX = true;
        this.blink_right.alpha = 0;

        // start the animations
        this.blink_left.anims.play('blink_l');
        this.blink_right.anims.play('blink_r');

        // setup cursor keys / controls
        controls = this.input.keyboard.createCursorKeys();
        this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
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

        // EYE DISPLAY
        this.eyeDisplay = this.add.sprite(30, 44, 'eye_closed');

        // Power variable and display bar
        this.power = maxPower;
        this.powerBar = this.add.rectangle(60, 35, 200, 20, 0x03C04A).setOrigin(0, 0);


        // Tutorial messages
        this.messsage = null;


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
        // Tutorial
        if (this.step == 0) {
            if (this.keyUp.isDown) {
                this.time.delayedCall(6000, () => {
                    this.step = 1;
                }, null, this);
            }
        };
        if (this.step == 1) {
            this.prompt.text = 'While jumping, press DOWN  ARROW to Ground Slam.';
            if (this.keyDown.isDown) {
                this.time.delayedCall(6000, () => {
                    this.step = 2;
                }, null, this);
            }
        }
        if (this.step == 2) {
            this.prompt.text = 'Hold SPACEBAR to use Cyber-sight.';
            if (this.keySpace.isDown) {
                this.time.delayedCall(6000, () => {
                    this.step = 3;
                }, null, this);
            }
        }
        if (this.step == 3) {
            this.prompt.text = 'Cyber-sight lets you see obstacles,\nbut rapidly drains your power.';
            this.time.delayedCall(8000, () => {
                this.step = 4;
            }, null, this);
        }
        if (this.step == 4) {
            this.prompt.text = 'No power means no cyber-sight for 5 seconds.';
            this.time.delayedCall(8000, () => {
                this.step = 5;
            }, null, this);
        }
        if (this.step == 5) {
            this.prompt.text = 'Stop using cyber-sight to slowly regenerate power,\nbut be careful as obstacles turn invisible.';
            this.time.delayedCall(8000, () => {
                this.step = 6;
            }, null, this);
        }
        if (this.step == 6) {
            this.prompt.text = 'That\'s it! Returning to main menu . . .';
            this.time.delayedCall(6000, () => {
                this.scene.start('titleScene');
            }, null, this);
        }
        // Play running animation for player sprite when running
        if (isRunning) {
            this.player.anims.play('running', true);
        }

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

        if (timer == 45) {
            game.settings.scrollSpeed == 250;
        }

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
                isRunning = false;
                this.player.anims.play('jumping', true);
                this.jumpStartHeight = this.player.y;
                this.canHoldJump = true;
                this.sound.play('sfx_jump');
                this.startJump();
            }

            // this causes the players jump to be longer if held down
            if (this.keyUp.isDown && this.canHoldJump) {
                isRunning = false;
                this.player.anims.play('jumping', true);
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
                isRunning = false;
                this.player.anims.play('jumping', true);
                this.player.angle = 0;
                this.groundSlam();
            }

            // Spin the player whilst in the air
            if (!this.player.body.touching.down && !this.isSlamming) {
                this.player.angle += 40;
            }

            // reset the player sprite and angle when back on the ground
            if (this.player.body.touching.down) {
                this.player.anims.play('running', true);
                isRunning = true;
                this.player.angle = 0;
                this.player.setVelocityX(0);
                if (this.isSlamming) {
                    // shake the camera (duration, intensity)
                    this.cameras.main.shake(50, 0.005);
                    this.isSlamming = false;
                    this.sound.play('sfx_slam');
                }
            }
        }


        // Fire code when stuck to roof obstacle
        if (game.settings.isStuck) {
            if (!game.settings.isPlayingAnim) {
                this.sound.play('sfx_stuck');
                this.playAnim();
                game.settings.isPlayingAnim = true;
            }

            // can and does press left arrow key
            if (this.keyLeft.isDown && this.allowedToLeft && !this.keyRight.isDown) {
                this.player.x -= 2; // jiggle player left
                this.allowedToLeft = false;
                this.lefts++;
                console.log("LEFTS: " + this.lefts);
                this.allowedToRight = true;
            }
            // can and does press right arrow key
            else if (this.keyRight.isDown && this.allowedToRight && !this.keyLeft.isDown) {
                this.player.x += 2; // jiggle player right
                this.allowedToRight = false;
                this.rights++;
                console.log("RIGHTS: " + this.rights);
                this.allowedToLeft = true;
            }

            // unstick the player
            if (this.lefts >= Phaser.Math.Between(5, 8)
                && this.rights >= Phaser.Math.Between(10, 15) && game.settings.isStuck) {
                this.sound.play('sfx_unstuck');
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

        // Game ends if player is out of bounds or runs out of power
        if ((this.player.x < -10 && !this.isGameOver)) { //} || (this.power <= 0)) {
            this.music.pause();
            this.isGameOver = true;
            var locScore = JSON.parse(localStorage.getItem('highscore')); //parse the string
            if (timer > game.settings.highScore) {
                game.settings.highScore = timer;
            }
            if (!locScore) {
                localStorage.setItem('highscore', game.settings.highScore);
            }
            this.scene.start('gameOver');
        }

        if (game.settings.spawnParticles) {
            this.spawnParticles(100, game.settings.obstacleToDestroy.y - 10);
            game.settings.spawnParticles = false;
        }

        // Enable use of vision bar after regening to 25% following full depletion
        if (this.power > 25) {
            game.settings.regenDone = true;
            this.eyeDisplay.setTexture('eye_closed');
        }

        // Disable the vision bar if fully depleted
        if (this.power < 1) {
            game.settings.regenDone = false;
            this.eyeDisplay.setTexture('eye_disabled');
        }

        // VISION MECHANIC
        if (this.keySpace.isDown && this.power > 0 && game.settings.regenDone) {

            if (!game.settings.shownEye) {
                this.sound.play('sfx_view');
                game.settings.shownEye = true;
            }

            // Display obstacles
            this.Obstacle1.makeVisible();
            this.Obstacle2.makeVisible();
            this.Obstacle3.makeVisible();
            this.Obstacle4.makeVisible();
            this.roofObstacle1.makeVisible();
            this.roofObstacle2.makeVisible();

            // Display open eye
            this.eyeDisplay.setTexture('eye_open');

            // Drain power and decrease power bar
            this.power -= (drainRate / 60);
            if (this.power > 0) {
                this.powerBar.width -= (((200 / maxPower) * drainRate) / 60);
            }
            else {
                this.powerBar.width = 0;
            }
            // console.log("Power is draining: " + this.power);
        }
        else {

            if (game.settings.shownEye) {
                this.sound.play('sfx_viewOff'); //turn off eye
                game.settings.shownEye = false;
            }

            // Hide obstacles
            this.Obstacle1.makeInvisible();
            this.Obstacle2.makeInvisible();
            this.Obstacle3.makeInvisible();
            this.Obstacle4.makeInvisible();
            this.roofObstacle1.makeInvisible();
            this.roofObstacle2.makeInvisible();

            // Eye is closed
            //this.eyeDisplay.setTexture('eye_closed');

            // Regen power and increase power bar
            if (this.power < maxPower) {
                this.power += (regenRate / 60);
                if (this.power > maxPower) {
                    this.power = maxPower;
                }
                // console.log("Power is regenerating: " + this.power);
            }
            if (this.powerBar.width < 200) {
                this.powerBar.width += (((200 / maxPower) * regenRate) / 60);
                if (this.powerBar.width > 200) {
                    this.powerBar.width = 200;
                }
            }
        }
    }
}