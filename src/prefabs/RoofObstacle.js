// Prefab for the roof obstacle
class RoofObstacle extends Phaser.Physics.Arcade .Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        var custom_body = new Phaser.Physics.Arcade.Body(scene.physics.world, this);
        this.body = custom_body;
        this.setImmovable(); //nothing should be able to move the obstacles
        this.setFrictionX(0); // makes the player character slide on top
        this.scene.physics.world.enableBody(this, 0);
        scene.add.existing(this);
        this.visible = true;
    }

    // Generate random number for height of obstacle
    getRandomNumY() {
        var ranNumY = Phaser.Math.Between(1, 6);
        return ranNumY;
    }

    // Generate random number for width of obstacle
    getRandomNumX() {
        var ranNumX = Phaser.Math.Between(1, 3);
        return ranNumX;
    }

    // Generate random number for padding for respawn on right side of screen
    getRandomX() {
        var ranX = Phaser.Math.Between(0, 500);
        return ranX;
    }

    update() {
        this.setVelocityX(game.settings.scrollSpeed);

        // when obstacle exits left side of screen
        if (this.x <= 0 - this.width) {
            game.settings.spawnParticles = true;
            game.settings.obstacleToDestroy = this;
            this.reset();
        }

        if (!this.visible){
            this.alpha = 0;
        }
        else{
            this.alpha = 1;
        }
    }

    // reset the obstacle to the right of the screen
    reset() {
        this.x = game.config.width + this.getRandomX(); //position of right side of screen
        this.setScale(this.getRandomNumX(), this.getRandomNumY()); // randomize the size (6.5 is current height of jump)
    }
}