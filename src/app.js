/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var BTN_SIZE={
    height:50,
    width:100
}
var BIRD_ICON = {
    RED: 1,
    BLUE: 2,
    YELLOW: 3
}
var BG_STYLE = {
    DAY: 1,
    NIGHT: 2
}

var LEVEL = {
    EASY: 1,
    NORMAL: 2,
    HARD: 3
}
var GAME_ENV = {
    bird: BIRD_ICON.BLUE,
    bg: BG_STYLE.NIGHT,
    level: LEVEL.NORMAL,
    dScroll: 100
}
var resetEnv = ()=>{
    GAME_ENV.dScroll=100
}
var getBgSrcFromStyle = (style) => {
    switch (style) {
        case BG_STYLE.DAY:
            return res.bg
        case BG_STYLE.NIGHT:
            return res.bg_dark
    }
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
var getSpeedByLevel = (level) => {
    switch (level) {
        case LEVEL.EASY:
            return 100
        case LEVEL.NORMAL:
            return 200
        case LEVEL.HARD:
            return 300
    }
}
var getSpaceByLevel = (level)=>{
    switch (level) {
        case LEVEL.EASY:
            return 150
        case LEVEL.NORMAL:
            return 125
        case LEVEL.HARD:
            return 100
    }
}

var getDistanceByLevel= (level)=>{
    size.width / 3
    switch (level) {
        case LEVEL.EASY:
            return size.width / 2.5
        case LEVEL.NORMAL:
            return size.width / 3
        case LEVEL.HARD:
            return size.width / 3.5
    }
}

var BeginLayer = cc.Layer.extend({
    ctor: function () {
        this._super()
        var size = cc.director.getWinSize()

        // Background
        this.bg = new cc.Sprite(getBgSrcFromStyle(GAME_ENV.bg))
        this.bg.setPosition(size.width / 2, size.height / 2)
        this.addChild(this.bg, 0)

        //Base
        this.base = new cc.Sprite(res.base)
        this.base.setPosition(0, 0)
        this.base.setAnchorPoint(0, 0)
        this.addChild(this.base, 1)
        var src = getBirdSrcFromStyle(GAME_ENV.bird)

        this.birdSprite = new cc.Sprite(src[0]);
        this.birdSprite.setPosition(size.width / 2, size.height / 1.5);

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
        this.birdSprite.runAction(cc.jumpBy(2, cc.p(0, 0), 80, 4).repeatForever())
        this.addChild(this.birdSprite);
        // Setting button

        this.settingButton = gv.commonButton(BTN_SIZE.width, BTN_SIZE.height, size.width/2, size.height/2.5, "Setting")
        this.addChild(this.settingButton, 3)
        this.settingButton.setTitleFontSize(25);
        this.settingButton.addClickEventListener(this.settingButtonHandleOnClick)
        // Play button

        this.playButton = gv.commonButton(BTN_SIZE.width, BTN_SIZE.height, size.width/2, size.height/4, "Play")
        this.addChild(this.playButton, 3)
        this.playButton.setTitleFontSize(25);
        this.playButton.addClickEventListener(this.playButtonHandleOnClick)
        // Best score
        var bestScore = cc.sys.localStorage.getItem('bestScore')||0
        this.bestScore= new ccui.Text('Best: '+bestScore.toString(),"Arial",30)
        this.bestScore.setPosition(size.width/2,size.height/2)
        this.addChild(this.bestScore,5)
        return true
    },
    playButtonHandleOnClick: ()=>{
        cc.director.runScene(new PlayScene())
    },
    settingButtonHandleOnClick: ()=>{
        cc.director.runScene(new SettingScene())
    }
})


var HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var size = cc.director.getWinSize();
        var sprite = new cc.Sprite(res.bg)
        sprite.setPosition(size.width / 2, size.height / 2);
        this.beginlayer = new BeginLayer()
        this.addChild(this.beginlayer);
    },
});
