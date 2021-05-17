var Bird = cc.Layer.extend({
    ctor: function (src=GAME_ENV.bird) {
        this._super();
        this.status === 'waiting'
        var size = cc.director.getWinSize();
        this.birdSprite = new cc.Sprite(src[0]);
        this.birdSprite.setPosition(size.width / 2, size.height / 2);

        // Animation
        var birdFrames = [];
        birdFrames.push(
            new cc.SpriteFrame(src[1], new cc.Rect(0, 0, 34, 24))
        );
        birdFrames.push(
            new cc.SpriteFrame(src[0], new cc.Rect(0, 0, 34, 24))
        );
        birdFrames.push(
            new cc.SpriteFrame(src[2], new cc.Rect(0, 0, 34, 24))
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
        if(cc.director.getRunningScene().status==='playing') {
            let birdSprite = this.getBirdSprite();
            this.getParent().updateEnv({
                speed: this.getParent().env.speed + 10,
                score: null,
            });
            birdSprite.setPositionY(
                birdSprite.getPositionY() - this.getParent().env.speed * dt
            );
        }
    },
    fly: function () {
        console.log("flying")
        this.status = 'flying'
        var birdSprite = this.getBirdSprite();
        birdSprite.stopActionByTag(1)
        birdSprite.stopActionByTag(2)
        birdSprite.stopActionByTag(3)
        //fly action
        var fly = cc.jumpBy(0.5, cc.p(0, 1), 60, 1)
        fly.setTag(1)
        birdSprite.runAction(fly)
        //rotate action
        var rotateUp = cc.rotateTo(0.2,-30)
        rotateUp.setTag(3)
        var rotateDown = cc.rotateTo(0.4,90)
        rotateDown.setTag(3)
        birdSprite.runAction(cc.sequence(rotateUp,rotateDown))
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