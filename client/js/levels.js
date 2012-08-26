/**
 * Created By mdemo.
 * Date: 12-5-9
 * Time: 下午1:58
 * ©2012 FiveNode
 */
define(function (require, exports) {
    var imgs = require('imgs'),
        ani = require('animations'),
        sta = require('states');

    var canvasInit = function () {
        gdemo.init(20, true, [
            {id:"canvas", width:800, height:480}
        ], "gameArea");
        gdemo.Context.active("canvas");
    };

    exports.level2 = function(){
        canvasInit();
        gdemo.ImageLoader.load(
            imgs.level2,
            imgs.loading,
            function(){
                gdemo.initAnimations(ani.monster);
                gdemo.initStates(sta.level2);
                gdemo.start("GameInit");
            }
        );
    };
});
