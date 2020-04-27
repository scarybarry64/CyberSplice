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

    update() {
        this.setVelocityX(game.settings.scrollSpeed);

        if (this.x <= 100 - this.width) {
            this.reset();
        }
    }

    reset() {
        console.log("YEET");
        this.x = game.config.width;
        this.setScale(4,8);
        
    }
}