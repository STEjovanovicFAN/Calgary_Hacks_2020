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
        var text = this.add.text(this.displayWidth / 2, this.displayHeight / 2, "Mini Donut Madness");
    }
}