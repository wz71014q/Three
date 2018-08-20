/* eslint-disable */
var alpha;
function startMove(obj,json,func) {
    clearInterval(obj.timer);
    var attr;
    obj.timer=setInterval(function () {
        var flag=true;//需放进定时器内，否则定时器只会关闭一个
        for(attr in json){//循环取出json中的属性值
            var oldAttr=0;
            if(attr==='opacity'){//判断更改属性是不是透明度
                oldAttr=parseFloat(getStyle(obj,attr))*100;
            }else {
                oldAttr=parseInt(getStyle(obj,attr));
            }
            var speed=(json[attr]-oldAttr)/5;//计算速度
            speed=speed>0?Math.ceil(speed):Math.floor(speed);
            if(oldAttr!==json[attr]){
                flag=false;
            }
            if(flag===true){
                clearInterval(obj.timer);
                console.log("定时器关闭");
                if(func){
                    func();
                }
            }else {
                if(attr==='opacity'){
                    obj.style[attr]=(oldAttr+speed)/100;
                }else {
                    obj.style[attr]=oldAttr+speed+"px";
                }
            }
            console.log("当前属性："+attr+":"+obj.style[attr]);
        }
    },30);
}

function getStyle(obj,att) {
    //解决offset+att无效的情况
    if(obj.currentStyle){
        return obj.currentStyle[att];
    }else {
        return getComputedStyle(obj,false)[att];
    }
}