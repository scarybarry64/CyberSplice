// Prefab for the obstacle
class Obstacle extends Phaser.Physics.Arcade .Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        var custom_body = new Phaser.Physics.Arcade.Body(scene.physics.world, this);
        this.body = custom_body;
        this.setImmovable(); //nothing should be able to move the obstacles
        this.setFrictionX(0); // makes the player character slide on top
        this.scene.physics.world.enableBody(this, 0);
        scene.add.existing(this);
    }

    getRandomNumY() {
        var ranNumY = Phaser.Math.Between(1.0, 6.5);
        return ranNumY;
    }

    getRandomNumX() {
        var ranNumX = Phaser.Math.Between(1.0, 3);
        return ranNumX;
    }

    update() {
        this.setVelocityX(game.settings.scrollSpeed);

        if (this.x <= 100 - this.width) {
            this.reset();
        }
    }

    // reset the obstacle to the right of the screen
    reset() {
        console.log(this.getRandomNumY());
        this.x = game.config.width; //position of right side of screen
        this.setScale(this.getRandomNumX(), this.getRandomNumY()); // randomize the size (6.5 is current height of jump)
        //this.setOrigin(0.5, 1); //set the origin to the bottom of the sprite
        
    }
}