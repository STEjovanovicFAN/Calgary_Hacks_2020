class GameScene extends Phaser.Scene
{
    constructor(w, h) {
        super({key: "gameScene"});
        this.displayHeight = h;
        this.displayWidth = w;
    }

    preload() {
        
    }

    create() {
        this.stage.backgroundColor = "#0000FF";
    }
}