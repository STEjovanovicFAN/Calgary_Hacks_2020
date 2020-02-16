class TitleScene extends Phaser.Scene
{
    constructor(w, h) {
        super({key: "titleScene"});
        this.displayHeight = h;
        this.displayWidth = w;
        this.donuts = [];
        this.donutRotation = [];
        this.elapsedTime = 0;
        this.level = 1
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
    
    genRandomRotation() {
        return ((Math.random() * 6.28) - 3.14)/180
    }
    
    preload() {
        this.load.image('startbutton_up', 'assets/ui/green_button01.png');
        this.load.image('startbutton_over', '../assets/ui/green_button00.png');
        this.load.image('textbg', '../assets/ui/green_button02.png');
        this.load.image('startbutton_down', '../assets/ui/green_button05.png');
        this.load.image('calgaryStampede', 'assets/background/cal.png')
        this.load.image('sky', 'assets/background/sky.png')
        this.load.image('donut0', 'assets/sprites/Chocolate-icon.png')
        this.load.image('donut1', 'assets/sprites/Plain-2-icon.png')
        this.load.image('donut2', 'assets/sprites/Plain1.png')
        this.load.image('donut3', 'assets/sprites/PowderSugared-icon.png')
    }
    create() {
        this.elapsedTime = 0;
        let sky = this.add.image(0, 0, 'sky')
        sky.setScale(7);

        let cs = this.add.sprite(this.displayWidth/2,this.displayHeight/2, 'calgaryStampede');
        cs.setScale(0.5)
        cs.y -= 100
        var path = '0 200 200 0 400 200';

        //  The direct Matter way:
    
        // var verts = Phaser.Physics.Matter.Matter.Vertices.fromPath(path);
    
        // var body = Phaser.Physics.Matter.Matter.Bodies.fromVertices(408, 492, verts, { ignoreGravity: true }, true, 0.01, 10);
    
        // Phaser.Physics.Matter.Matter.World.add(this.matter.world.localWorld, body);
    
        //  Or the short-cut version using factory helpers:
    
        var verts = this.matter.verts.fromPath(path);
    
        this.matter.world.setBounds(0, 0, this.displayWidth, this.displayHeight, 64, true, true, false, true)
        for (var i = 0; i < 10; i++) {
            this.createDonut(this.matter, this.genRandomRotation())
        }
        this.matter.add.mouseSpring({ length: 1, stiffness: 0.02 });

        var text = this.add.text(0, 0, "Midway Madness", {color: '#EE0000', fontSize: '32px', fontFamily:"Candara" });
        
        text.y = (this.displayHeight - text.height) / 2 + 96
        text.x = (this.displayWidth - text.width) / 2;
        
        var button = this.add.sprite(0, 0, 'startbutton_up')
        button.x = text.x + (text.width/2)
        button.y = text.y + text.height + 128

        var buttonText = this.add.text(0, 0, "Start", {fontSize: '24px'});
        function resizeButton() {
            buttonText.x = button.x - (button.width - buttonText.width) / 3.2
            buttonText.y = button.y - (button.height - buttonText.height) / 1.2
        }
        button.setInteractive()
        button.on('pointerover', function () {
            button.setTexture('startbutton_over')
            resizeButton()
        })
        button.on('pointerout', function () {
            button.setTexture('startbutton_up')
            resizeButton()
        })
        var _this = this
        button.on('pointerdown', function() {
            button.setTexture('startbutton_down')
            resizeButton()
        })
        button.on('pointerup', function() {
            button.setTexture('startbutton_over')
            _this.scene.switch('levelOne')
        })
        resizeButton()
    }
    update ()
    {
        let donuts = this.donuts
        let donutRotation = this.donutRotation
        for (var i = 0; i < donuts.length; i++)
        {
            var donut = donuts[i];
            donut.rotation += donutRotation[i]
            if (false &&donut.y > this.displayHeight/2)
            {
                donuts.splice(i, 1)
                donutRotation.splice(i, 1)
                
                this.matter.world.remove(donut)
                donut.visible = false
                this.createDonut(this.matter, this.genRandomRotation())
            }
        }
        if(this.elapsedTime >= 10) {
            this.elapsedTime = 0
            this.createDonut(this.matter, this.genRandomRotation())
        }
        
        this.elapsedTime ++;
    }

}
