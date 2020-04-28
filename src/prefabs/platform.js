class platform{
    constructor(scene, player, x, y, len, width){
        
        this.rect = scene.add.rectangle(x, y, len, width, 0x000000).setOrigin(0,0);
        this.visible = true;
        scene.physics.add.collider(player, this.rect);
    }

    update(){
        if (!this.visible){
            this.rect.alpha = 0;
        }
        else{
            this.rect.alpha = 1;
        }
    }
}