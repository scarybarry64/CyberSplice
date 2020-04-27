// Prefab for the obstacle
class Obstacle extends Phaser.Physics.Arcade .Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        var custom_body = new Phaser.Physics.Arcade.Body(scene.physics.world, this);
        this.body = custom_body;
        this.setImmovable();
        this.scene.physics.world.enableBody(this, 0);
        scene.add.existing(this);
    }

    update() {
        console.log("YEET");
        this.setVelocityX(game.settings.scrollSpeed);
    }
}