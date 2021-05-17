var Base = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.baseSprite = new cc.Sprite(res.base);
        this.baseSprite.setAnchorPoint(0, 0);
        this.addChild(this.baseSprite);
        return true;
    },
});