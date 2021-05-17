var Pipes = cc.Layer.extend({
    ctor: function (yIndex = null) {
        this._super();
        this.visited = false

        this.upPipe = cc.Sprite.create(res.pipe)
        this.upPipe.setScale(0.5, 1)
        this.upPipe.setRotation(180)
        this.upPipe.setPositionY(320 + spaceSize)

        this.downPipe = cc.Sprite.create(res.pipe)
        this.downPipe.setScale(0.5, 1)
        this.addChild(this.upPipe)
        this.addChild(this.downPipe)
        return true;
    },
    destroy: function () {
        this.visible = false
    }
});

var PipeLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.status = status.waiting;
        this.pipes = []
        this.initPipes()
    },
    scrolling: function (dt) {
        this.pipes.map((pipe) => {
            pipe.setPositionX(pipe.getPositionX() - dt * 100)
        })
    },
    update_function: function (dt) {
        if (cc.director.getRunningScene().status === 'playing') {
            this.checkOver()
            this.scrolling(dt)
        }
    },
    randPipes: function () {
        var pipes = new Pipes()
        pipes.setAnchorPoint(0.5, 0.5)
        pipes.setPositionY(cc.random0To1() * 100)
        return pipes
    },
    initPipes: function () {
        for (let i = 0; i < 8; i++) {
            var pipe = this.randPipes()
            pipe.setPositionX((3 + i) * size.width / 4)
            this.pipes.push(pipe)
            this.addChild(pipe)
        }
        return true
    },
    checkOver: function () {
        if (this.pipes[0].getPositionX() < 0) {
            var pipe = this.pipes.shift()
            pipe.setPositionX(this.pipes[this.pipes.length - 1].getPositionX() + 100)
            pipe.setPositionY(cc.random0To1() * 100)
            pipe.visited = false
            this.pipes.push(pipe)
        }
    }
});