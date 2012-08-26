/**
 * Created By mdemo.
 * Date: 12-5-9
 * Time: 下午1:59
 * ©2012 FiveNode
 */
define(function(require,exports){
   exports.loading = function(){
       gdemo.Context.clearScreen();
       gdemo.Context.fillText(gdemo.vars.loaded + "/" + gdemo.vars.sum, 50, 50);
   };

    exports.level2 = [
        {id:'back',src:'img/back.png'},
        {id:'skillOne',src:'img/skillOne.png'},
        {id:'skillTwo',src:'img/skillTwo.png'},
        {id:'skillThree',src:'img/skillThree.png'},
        {id:'skillFour',src:'img/skillFour.png'},
        {id:'skillFive',src:'img/skillFive.png'},
//        {id:'skillTwoCD',src:'img/skillTwoCD.png'},
//        {id:'skillThreeCD',src:'img/skillThreeCD.png'},
//        {id:'skillFourCD',src:'img/skillFourCD.png'},
//        {id:'skillFiveCD',src:'img/skillFiveCD.png'},
        {id:'speedman_Die',src:'img/speed_die.png'},
        {id:'speedman_Run',src:'img/speed_run.png'},
        {id:'speedman_Hit',src:'img/speed_hit.png'},
        {id:'strongman_Die',src:'img/strong_die.png'},
        {id:'strongman_Run',src:'img/strong_run.png'},
        {id:'strongman_Hit',src:'img/strong_hit.png'}
    ];
});
