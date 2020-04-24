class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
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
}