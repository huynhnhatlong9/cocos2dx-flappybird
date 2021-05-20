var Base = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.bases = []
        this.baseSprite = new cc.Sprite(res.base);
        this.baseSprite.setAnchorPoint(0, 0);
        this.addChild(this.baseSprite);
        this.bases.push(this.baseSprite)

        this.secondBaseSprite = new cc.Sprite(res.base);
        this.secondBaseSprite.setPosition(this.baseSprite.getBoundingBox().width, 0)
        this.secondBaseSprite.setAnchorPoint(0, 0)
        this.addChild(this.secondBaseSprite)
        this.bases.push(this.secondBaseSprite)
        return true;
    },
    scroll: function (dt) {
        if (cc.director.getRunningScene().status === GAME_STATUS.playing) {

            var base1=this.bases[0]
            var base2 = this.bases[1]
            base1.setPositionX(base1.getPositionX() - dt * GAME_ENV.dScroll)
            base2.setPositionX(base2.getPositionX() - dt * GAME_ENV.dScroll)
            if (base2.getPositionX()<=0){
                base1 = this.bases.shift()
                base1.setPositionX(size.width)
                this.bases.push(base1)
            }
            // this.bases.map((base) => {
            //     base.setPositionX(base.getPositionX() - dt * GAME_ENV.dScroll)
            //     if (base.getPositionX() + base.getBoundingBox().width <= 0) {
            //         var tmp = this.bases.shift()
            //         tmp.setPositionX(5*size.width/5)
            //         this.bases.push(tmp)
            //     }
            // })
        }
    }
});