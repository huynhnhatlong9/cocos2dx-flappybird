var BIRD_STYLE = {
    RED: [res.red_bird_mid,res.red_bird_up,res.red_bird_down],
    BLUE: [res.blue_bird_mid,res.blue_bird_up,res.blue_bird_down],
    YELLOW: [res.yellow_bird_mid,res.yellow_bird_up,res.yellow_bird_down]
}
var BG_STYLE = {
    DAY: res.bg,
    NIGHT: res.bg_dark
}
var GAME_ENV = {
    bird: BIRD_STYLE.RED,
    bg: BG_STYLE.NIGHT
}

var SettingScene = cc.Scene.extend({
    ctor: function () {
        this._super()
        var size = cc.director.getWinSize()

        // Background
        this.bg = new cc.Sprite(res.bg)
        this.bg.setPosition(size.width / 2, size.height / 2)
        this.addChild(this.bg, 0)

        //Base
        this.base = new cc.Sprite(res.base)
        this.base.setPosition(0, 0)
        this.base.setAnchorPoint(0, 0)
        this.addChild(this.base, 1)
        // Bird option
        this.birdLabel = gv.commonText("Type: ", "Arial", 20)
        this.birdLabel.attr({
            x: size.width / 4,
            y: size.height / 1.5
        })

        this.blueBird= new Bird()
        this.addChild(this.birdLabel)

        //BG option
        this.bgLabel = gv.commonText("Background")
        return true
    }
})