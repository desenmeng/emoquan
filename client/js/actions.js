/**
 * Created By mdemo.
 * Date: 12-5-9
 * Time: 下午1:58
 * ©2012 FiveNode
 */
define(function(require,exports){
    var mod = require('models'),
        levelInfo = require("levelInfos"),
        dollar = require("dollar"),
        skilloperate = require("skilloperate");
    var elements = [],towerHP,mana,spriteId = 0,monsterId = 0,wave = 1,
        waveCount,level,_points,dollar,_ifdown = false,t = {},sp;
    var skillCDFlags = [false,false,false,false,false],skillString = [];//use for draw cd img;//judge skill cd
    var skillElements = [];//store skills
    var lightingDamage,lightingMana,lightingFlag,lightingCD = {};
    var meteoriteDamege,meteoriteMana,meteoriteFlag,meteoriteCD={};

    // define ponit struct
    function Point(x, y) {
        this.X = x;
        this.Y = y;
    }
    //define room struct
    function Room(id,level,number,state){
        this.id = id;
        this.level = level;
        this.number = number;
        this.state = state;
    }
    //add sprite to elements
    var addSprite = function (sprite) {
        var type = sprite.type;
        var id = sprite.id;
        if(!elements[type]){
            elements[type]=[];
        }
        if(!elements[type][id]){
            elements[type][id] = sprite;
        }else{
            Console.log("Add spirte to elements fault");
        }
    };

    //remove sprite from elements
    var removeSprite = function (type,i) {
        elements[type][i]=0;//TODO:数组元素的删除问题
    };

    //judge the elements states
    var charge = function(){
        window.scrollTo(0, 1);//pop the iOS browser address
        //draw the background
        gdemo.Context.drawImage("back",0,0,gdemo.vars.width,gdemo.vars.height);

        for(var i = 1;i<skillCDFlags.length;i++){
            if(skillCDFlags[i]===true){
                skillString[i] = "CD";
            }else{
                skillString[i] = "";
            }
        }
            gdemo.Context.drawImage("skillOne",10,gdemo.vars.height-60,50,50).
            drawImage("skillTwo"+skillString[1],70,gdemo.vars.height-60,50,50).
            drawImage("skillThree"+skillString[2],130,gdemo.vars.height-60,50,50).
            drawImage("skillFour"+skillString[3],190,gdemo.vars.height-60,50,50).
            drawImage("skillFive"+skillString[4],250,gdemo.vars.height-60,50,50);

        for(var t in elements){
            for(var i = 0;i<elements[t].length;i++){
                if(!elements[t][i]){
                    continue;
                }
                elements[t][i].draw();
                if(elements[t][i]&&elements[t][i].getX()<0){//whether destory tower
                    towerHP = towerHP - elements[t][i].attack;
                    removeSprite(t,i);
                }
                if(elements[t][i]&&elements[t][i].health <= 0 &&
                    elements[t][i].dying === false){ //whether kill the monster
                    (function(){
                        var _t = t,_i = i;
                        elements[t][i].dying = true;
                        elements[t][i].changeAnimation(elements[t][i].name+"Die",function(){
                            removeSprite(_t,_i);
                        });
                    })();
                }
            }
        }
    };

    //initialize the game state
    exports.ginitAction = function(){
        window.scrollTo(0,-5);
        level = "level2";
        waveCount = levelInfo[level][0].wave;
        towerHP = 1000;
        InitMage();
        gdemo.Context.active("canvas");
        t = new gdemo.Timer(createMonster,8000);

        gdemo.Events.down(function(e){
            e.preventDefault();
            _ifdown = true;
            _points = [];
            var _x = e.pageX - gdemo.vars.SCREEN_OFFSET_LEFT;
            var _y = e.pageY - gdemo.vars.SCREEN_OFFSET_TOP;
            gdemo.Context.beginPath().moveTo(_x,_y).lineTo(_x,_y);
        });
        gdemo.Events.up(function(e){
            e.preventDefault();
            _ifdown = false;
            gesture();
        });
        gdemo.Events.move(function(e){
            e.preventDefault();

            if(!_ifdown){
                return;
            }
            var _x = e.pageX - gdemo.vars.SCREEN_OFFSET_LEFT;
            var _y = e.pageY - gdemo.vars.SCREEN_OFFSET_TOP;
            gdemo.Context.fillText(_x+"--"+_y,300,100);
            _points[_points.length] = new Point(_x, _y);
            gdemo.Context.lineTo(_x, _y).stroke();
        });
        gdemo.changeState("GamePlaying");
    }

    //game running state
    exports.playAction = function(){
        window.scrollTo(0,-5);
        if(!t.active){
            t.start();
        }
        charge();
    };

    //gameover state
    exports.overAction = function(){};

    //create monster
    var createMonster = function(){
        if(wave <= waveCount){
            var monsters = levelInfo[level][wave];
            var waveMonsterCount = 0;
            for(var x in monsters ){
                for(var i = 0;i < monsters[x];i++){
                    addSprite(new mod[x](800 + waveMonsterCount * levelInfo[level][0][x + "width"],monsterId++));
                    waveMonsterCount++;
                }
            }
            waveMonsterCount = 0;
            wave++;
        }
        else{
            t.end();
        }
    };

    //use magic with gesture
    var gesture = function(){
        var result = {};
        result.Name = "点数太少";
        if(_points.length > 10){
            _recognize = new dollar.DollarRecognizer();
            result = _recognize.Recognize(_points,false);
        }
        if(result.Name === "circle"){
            Lighting();
        }
        if(result.Name === "对号"){
            Meteorite();
        }
        var gestureResult = skilloperate.judgeDirect(_points);//judge the gesture
        if(gestureResult === "MiddleToTopRight"){
            changMagic(1);
        }else if(gestureResult === "MiddleToTopLeft"){
            changMagic(2);
        }else if(gestureResult === "MiddleToBottomLeft"){
            changMagic(3);
        }else if(gestureResult === "MiddleToBottomRight"){
            changMagic(4);
        }
    };

    //change magic
    var changMagic = function(skillNum){
        switch(skillNum){
            case 1:{
                if(skillCDFlags[1] === false){
                    skillCDFlags[1] = true;
                    gdemo.funs.requestTimeout(RefreshSkillOneCD,4000,this);
                }
            }break;
            case 2:{
                if(skillCDFlags[2] === false){
                    skillCDFlags[2] = true;
                    gdemo.funs.requestTimeout(RefreshSkillTwoCD,5000,this);
                }
            }break;
            case 3:{
                if(skillCDFlags[3] === false){
                skillCDFlags[3] = true;
                gdemo.funs.requestTimeout(RefreshSkillThreeCD,6000,this);
                }
            }break;
            case 4:{
                if(skillCDFlags[4] === false){
                    skillCDFlags[4] = true;
                    gdemo.funs.requestTimeout(RefreshSkillFourCD,7000,this);
                }
            }break;
        }
    };

    //魔法扣血函数
    var MageDamage = function(health,defense,damage){
        var result = health + defense - damage;
        if(health > result){
            health = result;
        }
        else{
            health = 0;
        }
        return health;
    };

    //初始化魔法,读取天赋并计算加成
    var InitMage = function(){
        mana = 300;
        lightingDamage = 50;
        meteoriteDamege=20;
        meteoriteMana=0;
        lightingMana = 0;
    };

    //刷新技能CD
    var RefreshSkillOneCD = function(){
        skillCDFlags[1] = false;
        console.log("refresh"+skillNum + "skill" + skillCDFlags[skillNum]);
    };

    var RefreshSkillTwoCD = function(){
        skillCDFlags[2] = false;
        console.log("refresh"+skillNum + "skill" + skillCDFlags[skillNum]);
    };

    var RefreshSkillThreeCD = function(){
        skillCDFlags[3] = false;
        console.log("refresh"+skillNum + "skill" + skillCDFlags[skillNum]);
    };

    var RefreshSkillFourCD = function(){
        skillCDFlags[4] = false;
        console.log("refresh"+skillNum + "skill" + skillCDFlags[skillNum]);
    };

    //闪电魔法 全屏魔法,遍历全屏怪物进行损血计算及状态切换
    var Lighting = function(){
        if(mana >= lightingMana){
                mana = mana - lightingMana;
                for(var x in elements["monster"]){
                    (function(){
                        var s = elements["monster"][x];
                        if(s != 0 && s.getX() < 800){
                            s.health = MageDamage(s.health,s.defense,lightingDamage);
                            console.log("monsterHP" + s.health);
                            if(s.health > 0){
                                s.changeAnimation(s.name + "Hit",function(){
                                    s.changeAnimation(s.name+"Run");
                                    s = null;
                                });
                            }
                        }
                    })();
                }
        }
        else{
            console.log("not enough mana");
        }
    };

    //陨石魔法
    var Meteorite=function(){
        if(mana >= lightingMana){
                mana = mana - lightingMana;
                for(var x in elements["monster"]){//
                    (function(){
                        var s = elements["monster"][x];
                        if(s != 0 && s.getX() <= _points[0].X&& s.getX()>_points[0].X-200){
                            s.health = MageDamage(s.health,s.defense,lightingDamage);
                            console.log("monsterHP" + s.health);
                            if(s.health > 0){
                                s.changeAnimation(s.name + "Hit",function(){
                                    s.changeAnimation(s.name+"Run");
                                    s = null;
                                });
                            }
                        }
                    })();
                }
        }
        else{
            console.log("not enough mana");
        }
    };

    /**********游戏房间部分开始****************/
    exports.roomSelectAction = function () {
        var _x = 100,_y =117;
        gdemo.Context.fillRect(0, 0, 800, 480, "rgba(169,169,169,0.9)")
            .fillRect(75, 100, 650, 25, "rgba(112,128,144, 0.8)")
            .fillText("房间名", _x, 117).fillText("关卡", _x+120, 117)
            .fillText("人数", _x+120*2, 117).fillText("状态", _x+120*3, 117)
            .fillText("操作", _x+120*4, 117);
        var room = new Room(1, 1, "1/4", false);
        for (var i = 0; i < 10; i++) {
            _y+=25;
            gdemo.Context.fillRect(75,100+((i+1)*25), 650, 25, "rgba(119,136,153, 0.5)")
                .fillText(i+1, 100, _y).fillText("裁决之地", 220, _y)
                .fillText(i+"/9", 340, _y).fillText("准备中", 460, _y)
                .fillText("加入游戏", 580, _y);
        }
        gdemo.Context.fillText("上一页",140,430).fillText("下一页",240,430)
            .fillText("1/100",340,430).fillText("快速加入",440,430)
            .fillText("创建房间",540,430).fillText("天赋树",640,430)
            .fillText("恶魔圈房间选择",215,65,"40pt 微软雅黑");
    };
    exports.roomCreateAction = function(){
        gdemo.Context.fillRect(0, 0, 800, 480, "rgba(169,169,169,0.9)")
            .fillRect(100,50,250,120,"rgba(119,136,153, 0.5)")
            .fillRect(450,50,250,120,"rgba(119,136,153, 0.5)")
            .fillRect(100,250,250,120,"rgba(119,136,153, 0.5)")
            .fillRect(450,250,250,120,"rgba(119,136,153, 0.5)")
            .fillText("当前关卡:初出茅庐",100,450)
            .fillText("选择关卡或禁用",250,450)
            .fillText("开始游戏或准备游戏",350,450);
    };
});
