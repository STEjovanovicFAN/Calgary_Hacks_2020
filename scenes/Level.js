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
    createDonut(matter, rotation)
    {
        let donut = matter.add.sprite(Math.random() * window.innerWidth, Math.random() * -40); 
        donut.setTexture('donut' + Math.floor(Math.random() * 4));
        donut.setInteractive();
        this.donuts.push(donut);
        let val = this.donutRotation.length;
        donut.on('pointerdown', function() {
            donutRotation[val] = 0;
        });
        donut.setScale(2)
        this.donutRotation.push(rotation);
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
    }

    create ()
    {
        this.initialTime = 120;
        this.timer = this.add.text(32, 32, 'Countdown: ' + this.formatTime(this.initialTime));
        //timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });
        this.add.text(32, 50, 'Level: ' + this.level);
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
        if(this.elapsedTime >= 16) {
            this.elapsedTime = 0
            this.initialTime -= 1; // One second
            this.timer.setText('Countdown: ' + this.formatTime(this.initialTime));
        }
        else{
            this.elapsedTime ++
        }
    }
    
    
    
   

}