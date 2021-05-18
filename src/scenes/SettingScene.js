var BIRD_ICON = {
    RED: 1,
    BLUE: 2,
    YELLOW: 3
}
var BIRD_STYLE = {
    RED: [res.red_bird_mid, res.red_bird_up, res.red_bird_down],
    BLUE: [res.blue_bird_mid, res.blue_bird_up, res.blue_bird_down],
    YELLOW: [res.yellow_bird_mid, res.yellow_bird_up, res.yellow_bird_down]
}
var BG_STYLE = {
    DAY: res.bg,
    NIGHT: res.bg_dark
}
var GAME_ENV = {
    bird: BIRD_ICON.BLUE,
    bg: BG_STYLE.NIGHT
}
var getBirdSrcFromStyle = (style) => {
    switch (style) {
        case BIRD_ICON.RED:
            return [res.red_bird_mid, res.red_bird_up, res.red_bird_down]
        case BIRD_ICON.BLUE:
            return [res.blue_bird_mid, res.blue_bird_up, res.blue_bird_down]
        case BIRD_ICON.YELLOW:
            return [res.yellow_bird_mid, res.yellow_bird_up, res.yellow_bird_down]
    }
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
        this.birdLabel = new cc.LabelTTF("Type: ", "Arial", 20)
        this.birdLabel.setPosition(size.width / 4, size.height / 1.5)
        this.addChild(this.birdLabel)
        this.birdLabel.setColor(new cc.Color(247, 159, 31, 1.0))


        this.redBird = new cc.Sprite(res.red_bird_mid)
        this.redBird.setPosition(size.width / 2.2, size.height / 1.5)
        this.addChild(this.redBird)


        this.blueBird = new cc.Sprite(res.blue_bird_mid)
        this.blueBird.setPosition(size.width / 1.6, size.height / 1.5)
        this.addChild(this.blueBird)

        this.yellowBird = new cc.Sprite(res.yellow_bird_mid)
        this.yellowBird.setPosition(size.width / 1.25, size.height / 1.5)
        this.addChild(this.yellowBird)


        this.levelLabel = new cc.LabelTTF('Level:', 'Arial', 20)
        this.levelLabel.setPosition(size.width / 4, size.height / 2)
        this.levelLabel.setColor(new cc.Color(247, 159, 31, 1.0))
        this.addChild(this.levelLabel)

        this.easyLabel = new cc.LabelTTF('EASY', 'Arial', '10')
        this.easyLabel.setPosition(size.width / 2.2, size.height / 2)
        this.addChild(this.easyLabel)

        this.normalLabel = new cc.LabelTTF('NORMAL', 'Arial', '10')
        this.normalLabel.setPosition(size.width / 1.6, size.height / 2)
        this.addChild(this.normalLabel)

        this.hardLabel = new cc.LabelTTF('HARD', 'Arial', '10')
        this.hardLabel.setPosition(size.width / 1.25, size.height / 2)
        this.addChild(this.hardLabel)

        this.homeButton = gv.commonButton(120, 60, size.width / 2, size.height / 3, 'Home')
        this.addChild(this.homeButton)
        this.homeButton.addClickEventListener(this.handleHomeBtnOnClick)

        var scaleAction = cc.scaleBy(0.2, 1.5, 1.5)
        var event = cc.EventListener.create({
            event: cc.EventListener.MOUSE,
            onMouseDown: function (event) {
                var pos = event.getLocation()
                var _this = event.getCurrentTarget()
                var type = null;
                if (cc.rectContainsPoint(_this.redBird.getBoundingBox(), pos)) {
                    type = BIRD_ICON.RED
                } else if (cc.rectContainsPoint(_this.blueBird.getBoundingBox(), pos)) {
                    type = BIRD_ICON.BLUE
                } else if (cc.rectContainsPoint(_this.yellowBird.getBoundingBox(), pos)) {
                    type = BIRD_ICON.YELLOW
                }
                console.log(GAME_ENV.bird)
                if (type) {
                    switch (GAME_ENV.bird) {
                        case BIRD_ICON.RED:
                            _this.redBird.runAction(scaleAction.reverse())
                            break
                        case BIRD_ICON.BLUE:
                            _this.blueBird.runAction(scaleAction.reverse())
                            GAME_ENV.bird = BIRD_ICON.BLUE
                            break
                        case BIRD_ICON.YELLOW:
                            _this.blueBird.runAction(scaleAction.reverse())
                            GAME_ENV.bird = BIRD_ICON.YELLOW
                            break
                    }
                    switch (type) {
                        case BIRD_ICON.RED:
                            _this.redBird.runAction(scaleAction)
                            GAME_ENV.bird = BIRD_ICON.RED
                            break
                        case BIRD_ICON.BLUE:
                            _this.blueBird.runAction(scaleAction)
                            GAME_ENV.bird = BIRD_ICON.BLUE
                            break
                        case BIRD_ICON.YELLOW:
                            _this.yellowBird.runAction(scaleAction)
                            GAME_ENV.bird = BIRD_ICON.YELLOW
                            break
                    }
                }
            }
        })

        cc.eventManager.addListener(event, this)

        switch (GAME_ENV.bird) {
            case BIRD_ICON.RED:
                this.redBird.runAction(scaleAction);
                break;
            case BIRD_ICON.BLUE:
                this.blueBird.runAction(scaleAction);
                break;
            case BIRD_ICON.YELLOW:
                this.yellowBird.runAction(scaleAction);
                break;
        }
        return true
    },
    handleHomeBtnOnClick: () => {
        cc.director.runScene(new HelloWorldScene())
    }
})