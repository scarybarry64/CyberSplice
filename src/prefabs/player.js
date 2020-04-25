// Player prefab
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // adding the object to the existing scene so it shows up
        scene.add.existing(this);
        // enable its physics
        scene.physics.add.existing(this);

        // amount of bounciness
        this.setBounce(0.1, 0.1);

        //currently using this until floors added
        this.setCollideWorldBounds(true); 
        this.body.onWorldBounds = true;
    }
    
}