var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'matter',
        matter: {
            enableSleeping: true,
            gravity: {
                y: 1
            }
        }
    }
};

var game = new Phaser.Game(config);
var titleScene = new TitleScene(window.innerWidth, window.innerHeight);
var levelOne = new Level(window.innerWidth, window.innerHeight);
game.scene.add('titleScene', titleScene);
game.scene.add('levelOne', levelOne);
game.scene.start('levelOne');