var GameOver = cc.Layer.extend({
    ctor: function () {
        this._super()
        this.gameOverSprite = new cc.Sprite(res.gameover)
        this.gameOverSprite.setPosition(size.width / 2, size.height / 1.3)


        this.scoreText = new ccui.Text("", '', 30)
        this.scoreText.setPosition(size.width / 2, size.height / 1.7)
        this.addChild(this.scoreText)


        this.replayButton = gv.commonButton(120, 60, size.width / 2, size.height / 3, "Replay")
        this.replayButton.addClickEventListener(this.replayButtonOnClick)
        this.homeButton =  gv.commonButton(120, 60, size.width / 2, size.height / 5, "Home")
        this.homeButton.addClickEventListener(this.homeButtonOnClick)
        this.addChild(this.replayButton)
        this.addChild(this.gameOverSprite)
        this.addChild(this.homeButton)
    }
    ,
    replayButtonOnClick: () => {

        cc.director.runScene(new PlayScene())
    },
    homeButtonOnClick: ()=>{
        cc.director.runScene(new HelloWorldScene())
    }
})