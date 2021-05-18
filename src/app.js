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


var BeginLayer = cc.Layer.extend({
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
        // Setting button

        this.settingButton = gv.commonButton(100, 50, size.width/2, size.height/2.5, "Setting")
        this.addChild(this.settingButton, 3)
        this.settingButton.setTitleFontSize(25);
        this.settingButton.addClickEventListener(this.settingButtonHandleOnClick)
        // Play button

        this.playButton = gv.commonButton(100, 50, size.width/2, size.height/4, "Play")
        this.addChild(this.playButton, 3)
        this.playButton.setTitleFontSize(25);
        this.playButton.addClickEventListener(this.playButtonHandleOnClick)
        // Best score
        var bestScore = cc.sys.localStorage.getItem('bestScore')||0
        this.bestScore= new ccui.Text('Best Score: '+bestScore.toString(),"Arial",30)
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
