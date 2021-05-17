var status = {
    waiting: 1,
    playing: 2,
    die: 3,
};
var TAG = {
    BASE: 1,
    BACKGROUND: 2,
    SCORE: 3,
    BIRD: 4,
    PIPE_LAYER: 5,
};
var SPACE_FLY = 200
const spaceSize = (cc.director.getWinSize().height - 112) / 3;
var BackGround = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.sprite = new cc.Sprite(res.bg);
        this.sprite.setAnchorPoint(0, 0);
        this.addChild(this.sprite);
        return true;
    },
});

var Base = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.baseSprite = new cc.Sprite(res.base);
        this.baseSprite.setAnchorPoint(0, 0);
        this.addChild(this.baseSprite);
        return true;
    },
});

var Score = cc.Layer.extend({
    ctor: function () {
        this._super();
        var size = cc.director.getWinSize();
        this.label = new ccui.Text("0", '', 35)
        this.label.setPosition(size.width / 2, 5 * size.height / 6)
        this.addChild(this.label)
        return true;
    },
    updateScore: function (score) {
        cc.audioEngine.playMusic(res.point,true)
        this.label.setString(score.toString())
    }
});

var Bird = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.status === 'waiting'
        var size = cc.director.getWinSize();
        this.birdSprite = new cc.Sprite(res.blue_bird_mid);
        this.birdSprite.setPosition(size.width / 2, size.height / 2);

        // Animation
        var birdFrames = [];
        birdFrames.push(
            new cc.SpriteFrame(res.blue_bird_up, new cc.Rect(0, 0, 34, 24))
        );
        birdFrames.push(
            new cc.SpriteFrame(res.blue_bird_mid, new cc.Rect(0, 0, 34, 24))
        );
        birdFrames.push(
            new cc.SpriteFrame(res.blue_bird_down, new cc.Rect(0, 0, 34, 24))
        );

        var birdAnimation = cc.Animation.create(birdFrames, 0.1);
        this.birdSprite.runAction(
            cc.RepeatForever.create(cc.Animate.create(birdAnimation))
        );

        // Move
        this.addChild(this.birdSprite);
        return true;
    },
    update_function: function (dt) {
        this.checkCollision()
        if (this.getParent().status === "playing" && this.status === 'falling') {
            this.fall(dt);
        }

    },
    getBirdSprite: function () {
        return this.birdSprite;
    },
    fall: function (dt) {
        let birdSprite = this.getBirdSprite();
        this.getParent().updateEnv({
            speed: this.getParent().env.speed + 10,
            score: null,
        });
        birdSprite.setPositionY(
            birdSprite.getPositionY() - this.getParent().env.speed * dt
        );
    },
    fly: function () {
        console.log("flying")
        this.status = 'flying'
        var birdSprite = this.getBirdSprite();
        var fly = cc.jumpBy(0.5, cc.p(0, 50), 50, 1)
        // var fly2 = cc.moveBy(0.1,cc.p(0,40),10)
        birdSprite.runAction(fly)
        this.status = 'falling'
    },
    checkCollision: function () {
        var birdSprite = this.getBirdSprite()
        var {x, y} = birdSprite.getPosition()
        if (y < 112 || y > size.height) {
            cc.director.getRunningScene().handleGameOver()
        }
    }

});

var Pipes = cc.Layer.extend({
    ctor: function (yIndex = null) {
        this._super();
        this.visited = false

        this.upPipe = cc.Sprite.create(res.pipe)
        this.upPipe.setScale(0.5, 1)
        this.upPipe.setRotation(180)
        this.upPipe.setPositionY(320 + spaceSize)
        this.downPipe = cc.Sprite.create(res.pipe)
        this.downPipe.setScale(0.5, 1)
        this.addChild(this.upPipe)
        this.addChild(this.downPipe)
        return true;
    },
    destroy: function () {
        this.visible = false
    }
});

var PipeLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.status = status.waiting;
        this.pipes = []
        this.initPipes()
    },
    scrolling: function (dt) {
        this.pipes.map((pipe) => {
            pipe.setPositionX(pipe.getPositionX() - dt * 100)
        })
    },
    update_function: function (dt) {
        if (cc.director.getRunningScene().status === 'playing') {
            this.checkOver()
            this.scrolling(dt)
        }
    },
    randPipes: function () {
        var pipes = new Pipes()
        pipes.setAnchorPoint(0.5, 0.5)
        pipes.setPositionY(cc.random0To1() * 100)
        return pipes
    },
    initPipes: function () {
        for (let i = 0; i < 8; i++) {
            var pipe = this.randPipes()
            pipe.setPositionX((3 + i) * size.width / 4)
            this.pipes.push(pipe)
            this.addChild(pipe)
        }
        return true
    },
    checkOver: function () {
        if (this.pipes[0].getPositionX() < 0) {
            var pipe = this.pipes.shift()
            pipe.setPositionX(this.pipes[this.pipes.length - 1].getPositionX() + 100)
            pipe.setPositionY(cc.random0To1() * 100)
            pipe.visited = false
            this.pipes.push(pipe)
        }
    }
});


var GameOver = cc.Layer.extend({
    ctor: function () {
        this._super()
        this.gameOverSprite = new cc.Sprite(res.gameover)
        this.gameOverSprite.setPosition(size.width / 2, size.height / 1.3)


        this.scoreText = new ccui.Text("", '', 30)
        this.scoreText.setPosition(size.width/2,size.height/1.7)
        this.addChild(this.scoreText)


        this.replayButton = gv.commonButton(120, 60, size.width / 2, size.height / 3, "Replay")
        this.replayButton.addClickEventListener(this.replayButtonOnClick)
        this.addChild(this.replayButton)
        this.addChild(this.gameOverSprite)
    }
    ,
    replayButtonOnClick: () => {
        cc.director.runScene(new PlayScene())
    }
})

var Message = cc.Layer.extend({
    ctor: function () {
        this._super()
        this.mesageSprite = new cc.Sprite(res.message)
        this.mesageSprite.setPosition(size.width / 2, size.height / 1.5)
        this.addChild(this.mesageSprite)
    }
})


var PlayScene = cc.Scene.extend({
    ctor: function () {
        this._super();
        this.env = null;
        this.status = "waiting";
        size = cc.director.getWinSize();
        this.background = new BackGround();
        this.addChild(this.background, 0, TAG.BACKGROUND);

        this.base = new Base();
        this.addChild(this.base, 5, TAG.BASE);

        this.score = new Score();
        this.score.visible=false
        this.addChild(this.score, 5, TAG.SCORE);

        this.bird = new Bird();
        this.addChild(this.bird, 4, TAG.BIRD);

        this.pipe_layer = new PipeLayer();
        this.addChild(this.pipe_layer, 3, TAG.PIPE_LAYER);

        this.message = new Message()
        this.addChild(this.message)

        this.game_over = new GameOver()
        this.game_over.visible = false

        this.addChild(this.game_over, 6)
        var event = cc.EventListener.create({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                target = event.getCurrentTarget();
                if (keyCode === 32 && target.status !== 'gameover') {
                    if (target.status === 'waiting') {
                        target.score.visible=true
                        target.message.removeFromParent()
                    }
                    target.status = "playing";
                    target.resetSpeed();
                    target.getChildByTag(TAG.BIRD).fly()
                } else {
                }
            },
        });
        cc.eventManager.addListener(event, this);
        this.init();
        this.scheduleUpdate();
        return true;
    },

    resetSpeed: function () {
        this.env.speed = 20
    },
    init: function () {
        this.env = {
            speed: 20,
            score: 0
        }
        return true;
    },
    updateEnv: function ({speed, score}) {
        this.env = {
            speed: speed || this.env.speed,
            score: score || this.env.score,
        };
    },
    handleGameOver: function () {
        var bestScore = cc.sys.localStorage.getItem('bestScore') || 0
        if (this.env.score > bestScore) {
            cc.sys.localStorage.setItem('bestScore', this.env.score)
        }
        this.game_over.visible = true
        this.game_over.scoreText.setString('Score: '+this.env.score)
        this.score.visible=false
        this.status = 'gameover'
        this.unscheduleAllCallbacks()
    },
    checkCollision: function () {
        let birdSprite = this.bird.getBirdSprite()
        for (let i = 0; i < this.pipe_layer.pipes.length; i++) {
            let pipe = this.pipe_layer.pipes[i]
            if ((pipe.getPositionX() - birdSprite.getPositionX() >= 2) && (pipe.getPositionX() - birdSprite.getPositionX() <= 4) && pipe.visited === false) {
                let upperBound = pipe.getPositionY() + 160 + spaceSize
                let lowerBound = pipe.getPositionY() + 160
                if (!(birdSprite.getPositionY() >= lowerBound && birdSprite.getPositionY() <= upperBound)) {
                    this.handleGameOver()
                } else {
                    this.env.score += 1;
                    this.score.updateScore(this.env.score)
                    console.log(this.env.score)
                }
                pipe.visited = true
                break
            }
        }

    },
    update: function (dt) {
        this.checkCollision()
        this.bird.update_function(dt)
        this.pipe_layer.update_function(dt)
    }

});
