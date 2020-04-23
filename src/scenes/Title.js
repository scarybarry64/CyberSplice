class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    create() {

        // placeholder title screen
        this.add.text(centerX, centerY, 'G2P1 Endless Runner', {
            fontFamily: 'Helvetica', fontSize: '48px', color: '#FACADE'
        }).setOrigin(0.5);
        this.add.text(centerX, centerY + 50, 'Press UP ARROW to Start', {
            fontFamily: 'Helvetica', fontSize: '24px', color: '#FFF'
        }).setOrigin(0.5);

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // check for UP input
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.scene.start('playScene');
        }
    }
}