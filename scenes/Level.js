class Level extends Phaser.Scene {

    constructor(w, h) {
        super({ key: "levelOne" });
        this.displayHeight = h;
        this.displayWidth = w;
        this.donuts = [];
        this.boots = [];
        this.donutRotation = [];
        this.prevBootYs = [];
        this.elapsedTime = 0;
        this.level = 1
        this.levelMsg;
    }


    formatTime(seconds) {
        // Minutes
        var minutes = Math.floor(seconds / 60);
        // Seconds
        var partInSeconds = seconds % 60;
        // Adds left zeros to seconds
        partInSeconds = partInSeconds.toString().padStart(2, '0');
        // Returns formated time
        return `${minutes}:${partInSeconds}`;
    }

    createBackground(matter) {
        let sky = this.add.sprite(0, 0);
        sky.setTexture('sky');
        sky.setScale(7);

        let cs = this.add.sprite(this.displayWidth / 2, this.displayHeight / 2);
        cs.setTexture('calgaryStampede')
        cs.setScale(0.5)

    }
    createBoot(matter, rotation) {
        let boot = matter.add.sprite(Math.random() * window.innerWidth, Math.random() * 100);
        boot.setRectangle(300, 400, {'label': 'boot'});
        boot.setTexture('boot')
        boot.setInteractive();
        this.boots.push(boot);
        let _donutRotation = this.donutRotation
        let val = _donutRotation.length;
        boot.setScale(0.4)
        boot.on('pointerdown', function () {
            _donutRotation[val] = 0;
        });
        this.donutRotation.push(rotation);

        //Phaser.Geom.Rectangle.Overlaps(this.scene.physics.world.bounds, sprite.getBounds())

    }
    createDonut(matter, rotation) {
        let donut = matter.add.sprite(Math.random() * window.innerWidth, Math.random() * 100);
        var dtype = Math.floor(Math.random() * 4)
        donut.setBody('circle', { 'label': 'donut' + dtype });
        donut.setTexture('donut' + dtype);
        donut.setInteractive();
        donut.label = "donut";
        this.donuts.push(donut);
        let _donutRotation = this.donutRotation
        let val = _donutRotation.length;
        donut.on('pointerdown', function () {
            _donutRotation[val] = 0;
        });
        donut.setScale(2)
        this.donutRotation.push(rotation);
    }
    createBucket(matter) {
        let bucket = matter.add.sprite(this.displayWidth * 0.6, this.displayHeight * 0.8, 'cowboyhat');
        bucket.setBody('circle', { 'label': 'cowboyhat' });
        bucket.displayHeight = 150;
        bucket.displayWidth = 150;
        //bucket.setInteractive();
        bucket.setIgnoreGravity(true);
        // bucket.setSize(1150,300);
        // bucket.setOffset(70, 750);
        return bucket;
    }
    collectDonut(matter, bodyB) {
        if (bodyB.label.substring(0, 5) === 'donut') {
            bodyB.visible = false
            matter.world.remove(bodyB);
        }
        score += parseInt(bodyB.label.substring(6, bodyb.label.length))
        scoreText.setText('Score: ' + score);
    }
    genRandomRotation() {
        return ((Math.random() * 6.28) - 3.14) / 180
    }
    preload() {
        this.load.image('donut0', 'assets/sprites/Chocolate-icon.png')
        this.load.image('donut1', 'assets/sprites/Plain-2-icon.png')
        this.load.image('donut2', 'assets/sprites/Plain1.png')
        this.load.image('donut3', 'assets/sprites/PowderSugared-icon.png')
        this.load.image('boot', 'assets/sprites/boot.png')

        this.load.image("cowboyhat", 'assets/sprites/cowboyhat.png')
        this.load.image('sky', 'assets/background/sky.png')
        this.load.image('calgaryStampede', 'assets/background/cal.png')

        this.load.audio('theme',
            ['assets/sounds/country.mp3']);
    }

    create() {

        var music = this.sound.add('theme');
        var score = 0;
        music.play();

        this.initialTime = 120;

        this.createBackground(this.matter)

        this.initialTime = 0;
        var scoreText = this.add.text(32, 135, 'Score: 0',{fontSize: '64px'});
        this.timer = this.add.text(32, 45, 'Timer: ' + this.formatTime(this.initialTime),{fontSize: '64px'});
        //timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });
        this.levelMsg = this.add.text(32, 90, 'Difficulty: ' + this.level,{fontSize: '64px'});

        var matter = this.matter;
        var bucket = this.createBucket(this.matter);
        var _this = this;
        this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
            if ((bodyA.label === 'cowboyhat' && bodyB.label.substring(0,5) === 'donut') ||
                (bodyA.label.substring(0,5) === 'donut' && bodyB.label === 'cowboyhat')) {

                const donutBody = bodyA.label.substring(0,5) === 'donut' ? bodyA : bodyB;
                const donut = donutBody.gameObject;

                donut.visible = false;
                matter.world.remove(donutBody);
                score += 1;
                scoreText.setText('Score: ' + score);
            }
            else if((bodyA.label === 'cowboyhat' && bodyB.label === 'boot') || (bodyB.label === 'cowboyhat' && bodyA.label === 'boot')) {
                _this.scene.switch('gameOverScene')
            }
        });

        this.matter.world.setBounds(0, -40)

        this.matter.add.mouseSpring({ length: 1, stiffness: 0.1 });
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

        for (var i = 0; i < 10; i++) {
            this.createDonut(this.matter, this.genRandomRotation())
            if (Math.random() * i % 7 == 0) {
                this.createBoot(this.matter, this.genRandomRotation())
            }
        }

    }

    update() {
        let donuts = this.donuts
        let donutRotation = this.donutRotation
        this.levelMsg.setText('Level: ' + this.level);
        for (var i = 0; i < donuts.length; i++) {
            var donut = donuts[i];
            donut.rotation += donutRotation[i]
            if (donut.y < 1) {
                donuts.splice(i, 1)
                donutRotation.splice(i, 1)

                this.matter.world.remove(donut)
                donut.visible = false
                //this.createDonut(this.matter, this.genRandomRotation())
            }
        }

        for(var j = 0; j < this.boots.length; j++){
            //console.log(this.boots[j].getBounds())
            var boot = this.boots[j];
            var velocity = (boot.y - this.prevBootYs[j])
            if(boot.y < 100 && velocity > 10){
                this.boots.splice(j, 1)
                this.matter.world.remove(boot)
                boot.visible = false
            }
        }

        if (this.elapsedTime >= 45) {
            this.elapsedTime = 0
            this.initialTime += 1; // One second
            this.timer.setText('Timer: ' + this.formatTime(this.initialTime));
            if (this.initialTime % 10 == 0) {
                for (var i = 0; i < (donuts.length); i++) {
                    this.matter.world.remove(donuts[i]);
                    donuts[i].visible = false;
                }
                this.level++;
                if(this.elapsedTime == 0){
                    this.createBoot(this.matter, this.genRandomRotation())
                }    
            }
            if (this.initialTime % 3 == 0) {
                for (var i = 0; i < (this.level + 9); i++) {
                    this.createDonut(this.matter, this.genRandomRotation());
                }
            }
            


        }
        else {
            this.elapsedTime++
        }

    }





}