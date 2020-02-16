class Level extends Phaser.Scene
{
    constructor(w, h) {
        super({key: "levelOne"});
        this.displayHeight = h;
        this.displayWidth = w;
        this.donuts = [];
        this.donutRotation = [];
        this.elapsedTime = 0;
        this.level = 1
    }

    formatTime(seconds) {
        // Minutes
        var minutes = Math.floor(seconds/60);
        // Seconds
        var partInSeconds = seconds%60;
        // Adds left zeros to seconds
        partInSeconds = partInSeconds.toString().padStart(2,'0');
        // Returns formated time
        return `${minutes}:${partInSeconds}`;
    }

    createBackground(matter){
        let sky = this.add.sprite(0,0);
        sky.setTexture('sky');
        sky.setScale(7);

        let cs = this.add.sprite(this.displayWidth/2,this.displayHeight/2);
        cs.setTexture('calgaryStampede')
        cs.setScale(0.5)

    }
    createDonut(matter, rotation)
    {
        let donut = matter.add.sprite(Math.random() * window.innerWidth, Math.random() * -40); 
        donut.setTexture('donut' + Math.floor(Math.random() * 4));
        donut.setInteractive();
        this.donuts.push(donut);
        let _donutRotation = this.donutRotation
        let val = _donutRotation.length;
        donut.on('pointerdown', function() {
            _donutRotation[val] = 0;
        });
        donut.setScale(2)
        this.donutRotation.push(rotation);
    }
    createBucket(matter) {
        let bucket = matter.add.sprite(400, 100, 'cowboyhat');
        bucket.displayHeight = 150;
        bucket.displayWidth = 150;
        bucket.setInteractive();
        bucket.setIgnoreGravity(true);
        // bucket.setSize(1150,300);
        // bucket.setOffset(70, 750);
        return bucket;
    }
    collectDonut(bucket, donut) {
        donut.disableBody(true, true);
    
        score += 1;
        scoreText.setText('Score: ' + score);
    }
    genRandomRotation() {
        return ((Math.random() * 6.28) - 3.14)/180
    }
    preload ()
    {
        this.load.image('donut0', 'assets/sprites/Chocolate-icon.png')
        this.load.image('donut1', 'assets/sprites/Plain-2-icon.png')
        this.load.image('donut2', 'assets/sprites/Plain1.png')
        this.load.image('donut3', 'assets/sprites/PowderSugared-icon.png')

        this.load.image('cowboyhat', '/assets/sprites/cowboyhat.png')
        this.load.image('sky', 'assets/background/sky.png')
        this.load.image('calgaryStampede', 'assets/background/cal.png')
    }

    create ()
    {
        this.scoreText = this.add.text(32, 72, 'Score: 0');
        this.initialTime = 120;

        this.createBackground(this.matter)

        this.initialTime = 0;
        this.timer = this.add.text(32, 32, 'Countdown: ' + this.formatTime(this.initialTime));
        //timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });
        this.add.text(32, 50, 'Level: ' + this.level);

        var matter = this.matter;
        var bucket = this.createBucket(this.matter);
        
        // this.matter.world.on('collisionstart', function(event, b, donut){
        //     console.log(donut);
        // });


        this.matter.world.setBounds(0, -40)
        for (var i = 0; i < 10; i++) {
            this.createDonut(this.matter, this.genRandomRotation())
        }
        this.matter.add.mouseSpring({ length: 1, stiffness: 0.02 });
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
    }
    
    update ()
    {
        let donuts = this.donuts
        let donutRotation = this.donutRotation
        for (var i = 0; i < donuts.length; i++)
        {
            var donut = donuts[i];
            donut.rotation += donutRotation[i]
            if (donut.y > 630)
            {
                donuts.splice(i, 1)
                donutRotation.splice(i, 1)
                
                this.matter.world.remove(donut)
                donut.visible = false
                this.createDonut(this.matter, this.genRandomRotation())
            }
        }
        if(this.elapsedTime >= 45) {
            this.elapsedTime = 0
            this.initialTime += 1; // One second
            this.timer.setText('Time: ' + this.formatTime(this.initialTime));

        }
        else{
            this.elapsedTime ++;
        }
    }
    
    
    
   

}