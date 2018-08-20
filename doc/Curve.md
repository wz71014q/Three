# 曲线  

## 属性  

```js
1、 .arcLengthDivisions  
```

>当通过.getLengths计算曲线的累积段长度时，此值决定了分割的数量。为了确保在使用.getSpacedPoint等方法时的精度，如果曲线非常大，建议增加.arcLengthDivision属性。默认值为200。  

## 方法

```js
1、.getPoint ( t : Float, optionalTarget : Vector ) : Vector  
// getPoint方法返回在curve对象上t点(取值范围0.0-1.0之间)的矢量.
t: 来获取在任意百分比下的ｔ点的向量，百分比的值限于[0-1]。0是从路径的第一个点开始算起，1是最后一点,t=0.6表示从起点开始的60%处的点的向量。  
optionalTarget:　(可选)如果指定，结果将复制到此向量，否则将创建一个新的向量。  
2、.getPointAt ( u : Float, optionalTarget : Vector ) : Vector
// 根据弧长返回曲线上给定位置的矢量。  
u: u的取值范围是0.0 - 1.0, 将曲线作为一个整体, 一段弧长占曲线总长度的百分比。  
3、.getPoints ( divisions : Integer ) : Array  
// getPoints方法根据divisions将曲线等分,获得在曲线对象上等分点的点序列.如果没有设置参数divisions,默认初始化为5等分.返回对应等分线段顶点的坐标数组.数组长度为(divisions + 1)  
divisions -- 将曲线分成的段数，默认是5  
4、.getSpacedPoints ( divisions : Integer ) : Array  
// getSpacedPoints方法根据divisions将曲线等分,获得在曲线对象上等分点的点序列.如果没有设置参数divisions,默认初始化为5等分.返回对应等分线段端点在曲线上的相对位置数组,用弧长表示.  
// 获得一系列顶点的相对位置的数组.调用getPointAt方法。  
源码：
THREE.Curve.prototype.getSpacedPoints = function ( divisions ) {
  if ( ! divisions ) divisions = 5;
  var d, pts = [];
  for ( d = 0; d <= divisions; d ++ ) {
    pts.push( this.getPointAt(d / divisions ));
  }
  return pts;
};
5、.getLength () : Float  
获取曲线的长度  
6、.getLengths ( divisions : Integer ) : Array  
将曲线分成divisions等份，从起点开始获取每个等分点距离起点的长度，数组长度为divisions + 1  
e.g.: [0, 32.40468003621915, 64.70282683002952, 96.89129617675769, 129.189442970568, 161.59412300678719]  
7、.updateArcLengths () : null  
// 更新累积段距离缓存。调用getLengths方法,更新长度数组.
8、.getUtoTmapping ( u : Float, distance : Float ) : Float  
// 输入u(0~1),将曲线作为一个整体,一段弧长占曲线总长度的百分比。返回这个点处的百分比  
distance: 如果设置长度值, 则以该段长度为总长度，计算u占这段曲线的百分比，返回对应点的占比。  
9、.getTangent ( t : Float ) : Vector  
// getTangent方法将返回一个点t在曲线上位置向量的法线向量  
源码：  
THREE.Curve.prototype.getTangent = function( t ) {
  //这里为了给向量设定一个方向.
  var delta = 0.0001; // 设置一个delta值
  var t1 = t - delta; // t点减delta值,
  var t2 = t + delta; // t点加delta值.
  // tan(0)和tan(1)无法取值，所以采用近似值
  if ( t1 < 0 ) t1 = 0;
  if ( t2 > 1 ) t2 = 1;
  var pt1 = this.getPoint( t1 );
  var pt2 = this.getPoint( t2 );
  var vec = pt2.clone().sub(pt1); // pt2向量减去pt1向量
  return vec.normalize(); // 单位化  
  //返回一个点t在曲线上位置向量的法线向量.  
10、.getTangentAt ( u : Float ) : Vector  
11、.computeFrenetFrames ( segments : Integer, closed : Boolean ) : Object  
计算弗莱纳标架，实际就是管道每一段的计算的值，每一帧都是有三个参数组成，用于拉伸图形或者管道图形
```  

[computeFrenetFrames示例](http://www.jackpu.com/yi-shi-yong-three-js-zhi-zuo-chong-dong/)  

```js
12、.toJSON () : Object  
返回一个曲线 JSON 对象  
13、.fromJSON ( json : Object ) : Curve  
复制一个json格式的曲线，返回一个曲线
```

# path

## 构造器：

> 1、Path( points : Array )  
> points是二维点的数组，第一个点作为起点，然后将连续点作为线添加到曲线数组中。如果没有点，画了一个空路径，那么将原点作为currentPoint  

## 属性
> 1、currentPoint  
> 当前路径的起点

## 方法

 ```js
 1、圆  
 .absarc ( x : Float, y : Float, radius : Float, startAngle : Float, endAngle : Float, clockwise : Float )  
 x, y: 圆心位置  
 clockwise ：是否顺时针方向画圆，默认是false  

 2、椭圆：  
 .absellipse ( x : Float, y : Float, xRadius : Float, yRadius : Float, startAngle : Float, endAngle : Float, clockwise : Float, rotation : Float )  

rotation: 椭圆的旋转角，从x正轴方向逆时针旋转，默认是0。如果现在有一段从x轴方向逆时针画30度的圆弧，rotation设为2/3PI, 则该段弧是从x轴正方形逆时针60度开始，画到逆时针90度结束。  

3、圆：  
.arc ( x : Float, y : Float, radius : Float, startAngle : Float, endAngle : Float, clockwise : Float )

4、椭圆  
.ellipse ( x : Float, y : Float, xRadius : Float, yRadius : Float, startAngle : Float, endAngle : Float, clockwise : Float, rotation : Float )  

5、贝塞尔曲线  
.bezierCurveTo ( cp1X : Float, cp1Y : Float, cp2X : Float, cp2Y : Float, x : Float, y : Float )  
创建一段从currentPoint(如果没有设置就是原点)开始的贝塞尔曲线，以(cp1X, cp1Y)和(cp2X, cp2Y)作为控制点，(x, y)为终点。  

6、原点位置  
.moveTo(x, y)  
将原点设置为(x, y)

7、.lineTo(x, y)  
从原点到(x, y)连一条线。

8、.setFromPoints ( vector2s : Array )
points -- 二维点的数组。
这个方法将二维点的数组以直线连接起来，形成折线。可以用在三维点数组  
9、.splineThru ( points : Array )  
这个方法将二维点的数组以曲线连接起来，形成一条平滑曲线。这个方法只能用于二维点数组
10、二次方曲线  
.quadraticCurveTo ( cpX : Float, cpY : Float, x : Float, y : Float )  
以(cpX, cpY)为控制点, 起点为currentPoint, 终点为(x, y)  
```