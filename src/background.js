var BackGround = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.sprite = new cc.Sprite(res.bg);
        this.sprite.setAnchorPoint(0, 0);
        this.addChild(this.sprite);
        return true;
    },
});