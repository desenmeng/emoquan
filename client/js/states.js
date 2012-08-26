/**
 * Created By mdemo.
 * Date: 12-5-9
 * Time: 下午1:58
 * ©2012 FiveNode
 */
define(function(require,exports){
   var a = require('actions');

    exports.level2 = [
        {id:'RoomSelect',action:a.roomSelectAction},//用户选择房间
        {id:'RoomCreate',action:a.roomCreateAction},//用户创建房间
        {id:'GameInit',action:a.ginitAction},    //游戏初始化状态，载入所有初始元素
        {id:'GamePlaying',action:a.playAction},//游戏进行状态
        {id:'GameOver',action:a.overAction}    //游戏结束状态
    ]
});
