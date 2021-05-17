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
        this.label.setString(score.toString())
    }
});
