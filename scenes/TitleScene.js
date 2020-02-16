class TitleScene extends Phaser.Scene
{
    constructor(w, h) {
        super({key: "titleScene"});
        this.displayHeight = h;
        this.displayWidth = w;
    }

    preload() {
        this.load.image('startbutton_up', '../assets/ui/green_button01.png');
        this.load.image('startbutton_over', '../assets/ui/green_button00.png');
        this.load.image('startbutton_down', '../assets/ui/green_button05.png');
    }

    create() {
        var text = this.add.text(0, 0, "Midway Madness", {fontSize: '32px'});
        text.y = (this.displayHeight - text.height) / 2;
        text.x = (this.displayWidth - text.width) / 2;

        var button = this.add.sprite(text.x, text.y + text.height + 40, 'startbutton_up')
        button.setInteractive()
        button.on('pointerover', function () {
            button.setTexture('startbutton_over')
        })
        button.on('pointerout', function () {
            button.setTexture('startbutton_up')
        })
        var _this = this
        button.on('pointerdown', function() {
            button.setTexture('startbutton_down')
        })
        button.on('pointerup', function() {
            button.setTexture('startbutton_over')
            _this.scene.switch('levelOne')
        })
    }


}