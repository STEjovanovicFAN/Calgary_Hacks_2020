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

var donuts = [];
var timer;
var level = 1;

function preload ()
{
    this.load.image('donut', '/assets/sprites/Plain1.png')
    this.load.image('sky', '/assets/background/sky.png' )

    this.load.image('sky', '/assets/background/calgarystampede.png' )
}

function create ()
{
    sky = this.add.sprite(0,0, 'sky');
    sky.displayWidth = this.sys.canvas.width;
    sky.displayHeight = this.sys.canvas.height; 

    //sky.width = window.innerWidth;
    //sky.height = window.innerHeight;


    //timer 
    this.initialTime = 120;
    timer = this.add.text(32, 32, 'Countdown: ' + formatTime(this.initialTime));
    timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });

    //level 
    this.add.text(32, 50, 'Level: ' + level);
    

    
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
    //this.input.dragDistanceThreshold = 50;
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

function formatTime(seconds){
    // Minutes
    var minutes = Math.floor(seconds/60);
    // Seconds
    var partInSeconds = seconds%60;
    // Adds left zeros to seconds
    partInSeconds = partInSeconds.toString().padStart(2,'0');
    // Returns formated time
    return `${minutes}:${partInSeconds}`;
}

function onEvent ()
{
    if(this.initialTime != 0){
        this.initialTime -= 1; // One second
        timer.setText('Countdown: ' + formatTime(this.initialTime));
    }
    else{

    }
}

game.scene.add('titleScene', titleScene);
game.scene.add('levelOne', levelOne);
game.scene.start('levelOne');
