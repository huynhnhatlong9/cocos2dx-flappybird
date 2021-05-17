var Message = cc.Layer.extend({
    ctor: function () {
        this._super()
        this.mesageSprite = new cc.Sprite(res.message)
        this.mesageSprite.setPosition(size.width / 2, size.height / 1.5)
        this.addChild(this.mesageSprite)
    }
})