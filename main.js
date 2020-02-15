var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var titleScene = new TitleScene(window.innerWidth, window.innerHeight);

function preload ()
{
}

function create ()
{
    
}

function update ()
{
    
}

game.scene.add('titleScene', titleScene);
game.scene.start('titleScene');