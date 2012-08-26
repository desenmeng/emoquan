/**
 * Created by JetBrains WebStorm.
 * User: lxy
 * Date: 12-7-9
 * Time: 上午8:46
 * To change this template use File | Settings | File Templates.
 */
define(function (require, exports) {
    function Point(x, y) // constructor
    {
        this.X = x;
        this.Y = y;
    }

    exports.judgeDirect = function(points){
        console.log("judgeDirect"+points[0].X);
        if(points[0].X<=points[1].X&&points[0].Y<=points[1].Y){
            return judgeMiddleToBottomRight(points);
        }else if(points[0].X<=points[1].X&&points[0].Y>=points[1].Y){
            return judgeMiddleToTopRight(points);
        }else if(points[0].X>=points[1].X&&points[0].Y>=points[1].Y){
            return judgeMiddleToTopLeft(points);
        }else{
            return judgeMiddleToBottomLeft(points);
        }
    }

    function judgeMiddleToBottomLeft(points){
        var result = false;
        for(var i = 0;i<points.length-1;i++){
           if(points[i].X>=points[i+1].X&&points[i].Y<=points[i+1].Y){
               if(i === points.length-2){
                   result = true;
               }
               continue;
               console.log("continue");
           }else{
               console.log("break");
               break;
           }
        }
        if(result === true){
            console.log("MiddleToTopRight");
            return "MiddleToBottomLeft";
        }
    }
    function judgeMiddleToBottomRight(points){
        var result = false;
        for(var i = 0;i<points.length-1;i++){
            if(points[i].X<=points[i+1].X&&points[i].Y<=points[i+1].Y){
                if(i === points.length-2){
                    result = true;
                }
                continue;
            }else{
                break;
            }
        }
        if(result === true){
            console.log("MiddleToTopRight");
            return "MiddleToBottomRight";
        }
    }
    function judgeMiddleToTopLeft(points){
        var result = false;
        for(var i = 0;i<points.length-1;i++){
            if(points[i].X>=points[i+1].X&&points[i].Y>=points[i+1].Y){
                if(i === points.length-2){
                    result = true;
                }
                continue;
            }else{
                break;
            }
        }
        if(result === true){
            console.log("MiddleToTopRight");
            return "MiddleToTopLeft";
        }
    }
    function judgeMiddleToTopRight(points){
        var result = false;
        for(var i = 0;i<points.length-1;i++){
            if(points[i].X<=points[i+1].X&&points[i].Y>=points[i+1].Y){
                console.log("continue");
                if(i === points.length-2){
                    result = true;
                }
                continue;
            }else{
                console.log("break");
                break;
            }
        }
        if(result === true){
            console.log("MiddleToTopRight");
            return "MiddleToTopRight";
        }
    }

});