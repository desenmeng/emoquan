/**
 * Created By mdemo.
 * Date: 12-5-9
 * Time: 下午1:58
 * ©2012 FiveNode
 */
define(function (require, exports) {
//    exports.player = gdemo.Sprite.extend({
//        init:function (animation,id) {
//            this._super({animation:animation, x:5, y:3, speedX:3, speedY:0,id:id,type:"sprite"});
//        },
//        health:100,
//        attack:10
//    });
    exports.speedman = gdemo.Sprite.extend({
        init:function(x,id){//initialize monster x location
            this._super({animation:'speedmanRun',x:x,y:gdemo.vars.height-100,speedX:-7,speedY:0,id:id,type:"monster"});
        },
        health:100,
        attack:100,
        defense:10,
        name:"speedman",
        dying:false
    });
//    exports.strongman = gdemo.Sprite.extend({
//        init:function(x,id){
//            this._super({animation:'strongmanRun',x:x,y:300,speedX:-3,speedY:0,id:id,type:"monster"});
//        },
//        health:150,
//        attack:300,
//        defense:30,
//        name:"strongman",
//        dying:false
//    });
});