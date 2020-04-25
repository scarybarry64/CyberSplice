class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        // Temporary text to indicate on Play screen
        this.add.text(centerX, centerY, 'Play Scene', {
            fontFamily: 'Helvetica', fontSize: '48px', color: '#FACADE'
        }).setOrigin(0.5);

        // setting background to FACADE
    }
}