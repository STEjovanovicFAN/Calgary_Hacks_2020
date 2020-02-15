class TitleScene extends Phaser.Scene
{
    constructor(w, h) {
        super({key: "titleScene"});
        this.displayHeight = h;
        this.displayWidth = w;
    }

    preload() {
        
    }

    create() {
        var text = this.add.text(0, 0, "Midway Madness", {fontSize: '32px'});
        text.y = (this.displayHeight - text.height) / 2;
        text.x = (this.displayWidth - text.width) / 2;
    }
}