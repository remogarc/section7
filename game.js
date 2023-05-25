class TitleScreen extends Phaser.Scene {
    constructor() {
        super('titlescreen');
    }

    preload() {
        this.load.image('rolypoly', 'assets/RolyPoly.png');
        this.load.image('snail', 'assets/snails.png');
    }

    create() {
        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.cameras.main.setBackgroundColor('#001133');
        let titleText = this.add.text((this.cameras.main.width/2)-500, (this.cameras.main.height/2)-400, "Roly Poly: To The End",{
            fontSize: '96px',
            color: '#52f298'});
            titleText.preFX.addShadow(5,-5, .006, 2, 0x155933, 10);
        
            // prob needs to change x and y coords
        let roly = this.add.image((this.cameras.main.width*.293), (this.cameras.main.height*.17), 'rolypoly')
            .setScale(0.2);
        // Spin animation for the roly
        this.tweens.add({
            targets: roly,
            angle: 360,
            duration: 2000, 
            ease: 'Linear',
            repeat: -1, 
            yoyo: true 
        });

        let snail = this.add.image(this.cameras.main.width*0.5, this.cameras.main.height*0.5, 'snail');
        snail.setScale(.25);
        // breathe animation for the snail
        this.tweens.add({
            targets: snail,
            scale: .3,
            repeat: -1,
            yoyo: true,
            ease: 'Sine.inOut',
            duration: 500,
        })


        let start = this.add.rectangle((this.cameras.main.width*0.5), (this.cameras.main.height*0.8), (this.cameras.main.width*0.2), (this.cameras.main.height*0.1), 0xb098d9);
        start.setInteractive()
        this.add.text((this.cameras.main.width*0.42), (this.cameras.main.height*0.77), "Start",{
            fontSize: '96px',
            color: '#52f298'});
        
        start.on('pointerdown', () => {
            this.cameras.main.fade(500, 0,0,0);
            this.time.delayedCall(500, () => this.scene.start('victoryscreen'));
        });
    }

    update() {
        
    }
}

class VictoryScreen extends Phaser.Scene {
    constructor() {
        super('victoryscreen');
    }
    
    preload() {
        this.load.image('rolypoly', 'assets/RolyPoly.png');
        this.load.image('badge', 'assets/badge.png');
    }

    create() {
        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.cameras.main.setBackgroundColor('#001133');
        // Clicking on button restarts the game
        let restart = this.add.rectangle((this.cameras.main.width*0.5), (this.cameras.main.height*0.8), (this.cameras.main.width*0.3), (this.cameras.main.height*0.1), 0xb098d9)
            .setInteractive();
            
        this.add.text((this.cameras.main.width*0.4), (this.cameras.main.height*0.78), "Restart",{
            fontSize: '96px',
            color: '#52f298'});
           
        restart.on('pointerdown', () => {
            this.cameras.main.fade(500, 0,0,0);
            this.time.delayedCall(500, () => this.scene.start('titlescreen'));
        });
        let getaBadge = this.add.text((this.cameras.main.width*.2), (this.cameras.main.height*.1), "Roly Poly Gets a Badge!",{
            fontSize: '96px',
            color: '#52f298'});
        let roly = this.add.image(this.cameras.main.width*0.2, this.cameras.main.height*0.6, 'rolypoly')
            .setScale(0.7);
        this.tweens.add({
            targets: roly,
            angle: 360,
            duration: 2000, 
            ease: 'Linear',
            repeat: -1, 
            yoyo: true 
        });
        //Roly Poly gets a badge
        let badge = this.add.image(this.cameras.main.width+300, this.cameras.main.height*.6, 'badge');
         // Movement animation to badge
        this.tweens.add({
            targets: badge,
            x: this.cameras.main.width*0.2,
            duration: 2000, 
            ease: 'Linear',
            //onComplete: function(){badge.destroy()},
        });
    }

    update() {
    
    }
}

let config = {
    type: Phaser.WEBGL,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
    backgroundColor: 0x000000,
    scene: [TitleScreen, VictoryScreen],
}
let game = new Phaser.Game(config);