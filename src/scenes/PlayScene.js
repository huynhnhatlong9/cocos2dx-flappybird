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
const spaceSize = (cc.director.getWinSize().height - 112) / 3;

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
        this.score.visible = false
        this.addChild(this.score, 5, TAG.SCORE);

        this.bird = new Bird();
        this.addChild(this.bird, 4, TAG.BIRD);

        this.pipe_layer = new PipeLayer();
        this.addChild(this.pipe_layer, 3, TAG.PIPE_LAYER);

        this.message = new Message()
        this.addChild(this.message,6)

        this.game_over = new GameOver()
        this.game_over.visible = false

        this.addChild(this.game_over, 6)
        var event = cc.EventListener.create({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                target = event.getCurrentTarget();
                if (keyCode === 32 && target.status !== 'gameover') {
                    if (target.status === 'waiting') {
                        target.score.visible = true
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
        this.children.map((e)=>{
            e.stopAllActions()
        })
        this.bird.birdSprite.stopAllActions()
        var bestScore = cc.sys.localStorage.getItem('bestScore') || 0
        if (this.env.score > bestScore) {
            cc.sys.localStorage.setItem('bestScore', this.env.score)
        }
        this.game_over.visible = true
        this.game_over.scoreText.setString('Score: ' + this.env.score)
        this.score.visible = false
        this.status = 'gameover'
        this.unscheduleAllCallbacks()
    },
    checkCollision: function () {
        let birdSprite = this.bird.getBirdSprite()
        let pipes = this.pipe_layer.pipes
        let leftBirdZone = birdSprite.getPositionX() - birdSprite.getBoundingBox().width / 2
        let rightBirdZone = birdSprite.getPositionX() + birdSprite.getBoundingBox().width / 2

        for (let i = 0; i < pipes.length; i++) {
            let pipe = pipes[i]
            let leftPipeZone = pipe.getPositionX() - pipe.upPipe.getBoundingBox().width / 2
            let rightPipeZone = pipe.getPositionX() + pipe.upPipe.getBoundingBox().width / 2
            if ((rightBirdZone >= leftPipeZone && rightBirdZone <= rightPipeZone) || (leftBirdZone >= leftPipeZone && leftBirdZone <= rightPipeZone)) {
                if (!(birdSprite.getPositionY()+birdSprite.getBoundingBox().height/2 <= pipe.getPositionY() + pipe.upPipe.getBoundingBox().height / 2 + spaceSize)
                    || !(birdSprite.getPositionY()-birdSprite.getBoundingBox().height/2 >= pipe.getPositionY() + pipe.downPipe.getBoundingBox().height / 2)) {
                    this.status='gameover'
                    this.handleGameOver()
                }
                else {
                    this.env.score += pipe.visited?0:1;
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
