var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'matter',
        matter: {
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
var score = 0;
var scoreText;


var donuts = [];

function preload ()
{
    this.load.image('donut', '/assets/sprites/Plain1.png')
    this.load.image('bucket', '/assets/sprites/Feeding_Bucket.png')
}

function create ()
{

    scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#FFF'});

    let bucket = this.physics.add.sprite(400, 100, 'bucket');
    bucket.displayHeight = 150;
    bucket.displayWidth = 150;
    bucket.setInteractive();
    this.input.setDraggable(bucket);
    bucket.body.setAllowGravity(false);
    bucket.body.setSize(1150,300);
    bucket.body.setOffset(70, 750);

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

    this.physics.world.gravity.y = 10;
    this.physics.world.friction = 0.9;

    var group = this.physics.add.group({
        defaultKey: 'donut'
    });

    this.physics.add.overlap(bucket, group, collectDonut, null, this);
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

function collectDonut(bucket, donut) {
    donut.disableBody(true, true);

    score += 1;
    scoreText.setText('Score: ' + score);
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
game.scene.add('levelOne', levelOne);
game.scene.start('levelOne');