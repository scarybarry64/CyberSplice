// Floor prefab
class Floor extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // adding the object to the existing scene so it shows up
        scene.add.existing(this);
        // enable its physics, static so it doesnt fall with gravity
        scene.physics.add.staticGroup(this);

    }
}