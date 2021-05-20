var BackGround = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.sprite = new cc.Sprite(getBgSrcFromStyle(BG_STYLE.DAY));
        this.sprite.setAnchorPoint(0, 0);
        this.addChild(this.sprite,0);
        this.secondSprite = new cc.Sprite(getBgSrcFromStyle(BG_STYLE.NIGHT));
        this.secondSprite.setAnchorPoint(0, 0);
        this.addChild(this.secondSprite,1);
        this.darkTurn=true
        return true;
    },
    changeBg: function (){
        if(this.darkTurn){
            this.secondSprite.runAction(cc.fadeIn(1).reverse())
           this.darkTurn=false
        }
        else {
            this.secondSprite.runAction(cc.fadeIn(1))
            this.darkTurn=true
        }

    }
});