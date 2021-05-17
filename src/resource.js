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

var res = {
    HelloWorld_png : "res/HelloWorld.png",
    bg: "res/sprites/background-day.png",
    base: "res/sprites/base.png",
    //IMG
    img_btn_disable:  "res/Button_Disable.png",
    img_btn_press : "res/Button_Disable.png",
    img_btn_normal : "res/Button_Normal.png",

    //score
    zero: "res/sprites/0.png",
    one: "res/sprites/1.png",
    two: "res/sprites/2.png",
    three: "res/sprites/3.png",
    four: "res/sprites/4.png",
    five: "res/sprites/5.png",
    six: "res/sprites/6.png",
    seven: "res/sprites/7.png",
    eight: "res/sprites/8.png",
    nine: "res/sprites/9.png",

    //bird
    blue_bird_mid: "res/sprites/bluebird-midflap.png",
    blue_bird_up: "res/sprites/bluebird-upflap.png",
    blue_bird_down: "res/sprites/bluebird-downflap.png",

    //pipe
    pipe:"res/sprites/pipe-green.png",

    //game over
    gameover: "res/sprites/gameover.png",
    //Message
    message: "res/sprites/message.png",
    die: 'res/sounds/sfx_die.ogg',
    hit: 'res/sounds/sfx_hit.ogg',
    point: 'res/sounds/sfx_point/ogg',
    wing: 'res/sounds/wing.ogg'
};


var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
