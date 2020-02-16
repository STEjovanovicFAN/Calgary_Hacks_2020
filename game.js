var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'matter',
        matter: {
            debug: true,
            enableSleeping: true,
            gravity: {
                y: 0.5
            }
        }
    }
};

var game = new Phaser.Game(config);
var titleScene = new TitleScene(window.innerWidth, window.innerHeight);
var levelOne = new Level(window.innerWidth, window.innerHeight);
var gameOverScene = new GameOverScene(window.innerWidth, window.innerHeight);
game.scene.add('titleScene', titleScene);
game.scene.add('levelOne', levelOne);
game.scene.add('gameOverScene', gameOverScene);
game.scene.start('titleScene');