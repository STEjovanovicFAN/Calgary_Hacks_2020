var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: { y: 500 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var titleScene = new TitleScene(window.innerWidth, window.innerHeight);

var donuts = [];

function preload ()
{
    this.load.image('donut', '/assets/sprites/Plain1.png')
}

function create ()
{

    this.input.on('dragstart', function (pointer, gameObject) {

        gameObject.setTint(0xff0000);

    });

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        gameObject.x = dragX;
        gameObject.y = dragY;

    });

    this.input.on('dragend', function (pointer, gameObject) {

        gameObject.clearTint();

    });

    //var s = this.add.sprite(80, 0, 'donut');

    this.physics.world.gravity.y = 60;
    this.physics.world.friction = 0.9;

    var group = this.physics.add.group({
        defaultKey: 'donut'
    });

    //group.create(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
    
    //group.create(100,100);

    for (var i = 0; i < 10; i++)
    {
        //var sprite = this.add.sprite(Math.random() * 800, Math.random * -200, 'donut');
        //this.physics.world.enable(sprite);
        //littleBoxes.push(sprite);   
        var donut = group.create(Math.random() * window.innerWidth, Math.random() * -200); 
        //console.log(donut);
        donut.setInteractive();
        this.input.setDraggable(donut);
        donuts.push(donut);

    }
    
}

function update ()
{
    this.input.on('dragstart', function (pointer, gameObject) {

        gameObject.setTint(0xff0000);

    });

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        gameObject.x = dragX;
        gameObject.y = dragY;

    });

    this.input.on('dragend', function (pointer, gameObject) {

        gameObject.clearTint();

    });

    var group = this.physics.add.group({
        defaultKey: 'donut'
    });

    for (var i = 0; i < donuts.length; i++)
    {
        var donut = donuts[i];

        if (donut.body.y > 630)
        {
            donuts.splice(i, 1);

            var donut = group.create(Math.random() * window.innerWidth, Math.random() * -200); 
            //console.log(donut);
            donut.setInteractive();
            this.input.setDraggable(donut);
            donuts.push(donut);
            //donut.body.x = Math.random() * 800;
            //donut.body.y = Math.random() * -200;
            //donut.body.setZeroVelocity();
            //console.log('hellothere');
        }
    }
}

game.scene.add('titleScene', titleScene);
game.scene.start('titleScene');
