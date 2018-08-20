- [一、官方网站:https://threejs.org](#%E4%B8%80%E3%80%81%E5%AE%98%E6%96%B9%E7%BD%91%E7%AB%99httpsthreejsorg)
- [二、关于Three.js](#%E4%BA%8C%E3%80%81%E5%85%B3%E4%BA%8Ethreejs)
- [三、开始](#%E4%B8%89%E3%80%81%E5%BC%80%E5%A7%8B)
- [四、实例](#%E5%9B%9B%E3%80%81%E5%AE%9E%E4%BE%8B)
	- [基本结构](#%E5%9F%BA%E6%9C%AC%E7%BB%93%E6%9E%84)
	- [结果](#%E7%BB%93%E6%9E%9C)
- [五、概念](#%E4%BA%94%E3%80%81%E6%A6%82%E5%BF%B5)
	- [坐标系](#%E5%9D%90%E6%A0%87%E7%B3%BB)
	- [场景](#%E5%9C%BA%E6%99%AF)
	- [相机](#%E7%9B%B8%E6%9C%BA)
	- [灯光](#%E7%81%AF%E5%85%89)
	- [3D模型](#3d%E6%A8%A1%E5%9E%8B)
- [六、简单动画](#%E5%85%AD%E3%80%81%E7%AE%80%E5%8D%95%E5%8A%A8%E7%94%BB)
- [七、交互控制](#%E4%B8%83%E3%80%81%E4%BA%A4%E4%BA%92%E6%8E%A7%E5%88%B6)
- [结束](#%E7%BB%93%E6%9D%9F)
# **Three入门学习笔记整理** #
-----
# [一、官方网站:https://threejs.org](https://threejs.org "https://threejs.org")
# 二、关于Three.js #
> WebGL是大部分浏览器直接支持的一种3D绘图标准，它可以创建二维图形和应用，还可以充分利用GPU，创建漂亮的、高性能的三维应用。直接使用WebGL非常复杂，Three.js库提供了一套基于WebGL的、非常易用的JavaScrip API，它源自github的一个**[开源项目](https://github.com/mrdoob/three.js "https://github.com/mrdoob/three.js")**，通过这些API可以直接在浏览器中创建三维场景。本文整理了一些入门资料。
# 三、开始 #
- 引入  
可以直接在HTML引入[Three.js](https://raw.githubusercontent.com/mrdoob/three.js/dev/build/three.js "https://raw.githubusercontent.com/mrdoob/three.js/dev/build/three.js")：  
```  
<script src="three.js"></script>  
```  
也可以用npm安装：  
`npm i three`  
`import * as THREE from 'three'`  

- 使用  
three渲染一个3D场景需要以下**必要元素**:  
1.场景(Scene)：是物体、光源等元素的容器，要渲染的东西需要先添加进场景；  
2.相机（Camera）：控制视角的位置、范围以及视觉焦点的位置,一个3D环境中只能存在一个相机；  
3.光源（Light）：包括全局光、平行光、点光源； 
4.物体对象（Mesh）：包括二维物体（点、线、面）、三维物体、粒子等；   
5.渲染器（Renderer）：指定渲染方式，如webGL\canvas2D\Css2D\Css3D等；  
**非必要元素**：  
控制器(Control)：相机控件，可通过键盘、鼠标控制相机的移动。
# 四、实例  
## 基本结构  

    const width = window.innerWidth;  
	const height = window.innerHeight;   
	var renderer;  
	var camera;  
	var light;  
	var scene;   
	
	function initRender() {
	  // 初始化渲染器
	  renderer = new THREE.WebGLRenderer({
	    antialias: true// 抗锯齿
	  });
      renderer.setSize(width, height);  // 设置大小
      renderer.setClearColor(0xffffff, 1.0);  // 设置背景色
      document.body.appendChild(renderer.domElement);  
    }

    function initScene() {  
	  // 初始化场景
      scene = new THREE.Scene();  
    }

    function initCamera() {  
	  // 初始化相机
      camera = new THREE.PerspectiveCamera(45, width / height, 10, 10000);  // 添加透视相机
      camera.position.set(500, 500, 500); // 设置相机位置  
      camera.up.set(0, 1, 0);  // 相机以哪个轴为上方
      camera.lookAt(0, 0, 0);  // 相机焦点设置
    }

    function initLight() {  
	  // 初始化灯光
      light = new THREE.DirectionalLight({ color: 0xffffff });  // 添加平行光
      light.position.set(1, 0, 0); // 光的方向(x,y,z) 
      scene.add(light);  
      let pointLight = new THREE.PointLight(0xffffff);  // 添加点光源  
      pointLight.position.set(100, 100, 100);  // 点光源的位置
      scene.add(pointLight);  
      let pointHelper = new THREE.PointLightHelper(pointLight, 5, 0xff0000);  // 设置点光源辅助工具,可以看到点光源的位置  
      scene.add(pointHelper);
    }

    function initObject() {  
	  // 初始化物体
	  let geometry = new THREE.CylinderGeometry(100, 100, 300, 100, 100); // 添加一个圆柱体
	  let material = new THREE.MeshLambertMaterial({
    	color: 0xffff00
	  }); // 添加材料
	  // material.wireframe=true; // 圆柱体是否以网格显示
	  mesh = new THREE.Mesh(geometry, material);
	  mesh.position.set(0, 0, 0);
	  scene.add(mesh);
	}

    function initAxes() {
	// 添加辅助坐标轴
      let axes = new THREE.AxesHelper(1000);// 蓝色为Z轴，绿色为Y轴，红色为X轴
      scene.add(axes);
    }

    function threeStart() {  
      initRender();  
	  initScene();  
      initCamera();  
      initLight();  
	  initAxes();  
      initObject();  
	  renderer.clear();
      renderer.render(scene, camera);
    }

    window.onload = function () {  
      threeStart();  
    };  
## 结果 ##
![](https://i.imgur.com/GFKovos.png)  
# 五、概念 #
## 坐标系
three.js中采用的是右手坐标系，坐标轴方向主要是`camera.up.set(x, y, z);`设置。也就是说在相机眼里（其实就是我们看的角度）哪个轴向上。理解坐标系很重要，详情请看[three右手坐标系讲解](https://www.cnblogs.com/heyach/p/6902948.html "http://www.cnblogs.com/heyach/p/6902948.html")。
## [场景](https://threejs.org/docs/index.html#api/scenes/Scene "https://threejs.org/docs/index.html#api/scenes/Scene") 
物体、光源、控制器的添加必须使用secen.add(object)添加到场景中才能渲染出来。  
    
    var scene;
    function initScene(){
      scene=new THREE.Scene();
    }
## [相机](https://threejs.org/docs/index.html#api/cameras/Camera "https://threejs.org/docs/index.html#api/cameras/Camera") 
[正交投影相机](https://threejs.org/docs/index.html#api/cameras/OrthographicCamera "https://threejs.org/docs/index.html#api/cameras/OrthographicCamera")：  
`THREE.OrthographicCamera(left, right, top, bottom, near, far) // 大小不因远近而变化`  
[透视投影相机](https://threejs.org/docs/index.html#api/cameras/PerspectiveCamera "https://threejs.org/docs/index.html#api/cameras/PerspectiveCamera")：  
`THREE.PerspectiveCamera(fov, aspect, near, far) // 遵循近大远小的空间规则`

一般情况下，我们使用的是透视投影相机，其参数为：

    fov：垂直方向夹角(视角)
    aspect：可视区域长宽比 width/height
    near：渲染区域离摄像机最近的距离
    far：渲染区域离摄像机最远的距离，仅在距离摄像机near和far间的区域会被渲染到canvas中
相机的位置设置：  
`camera.position.set(x,y,z)或camera.position = new THREE.Vector3(x, y, z);`  
控制相机的焦点位置，决定相机的朝向  
`camera.lookAt(0, 0, 0);`  
添加[相机辅助工具](https://threejs.org/docs/index.html#api/helpers/CameraHelper "https://threejs.org/docs/index.html#api/helpers/CameraHelper")来查看相机的位置
## [灯光](https://threejs.org/docs/index.html#api/lights/Light "https://threejs.org/docs/index.html#api/lights/Light") ##
[全局光](https://threejs.org/docs/index.html#api/lights/AmbientLight "https://threejs.org/docs/index.html#api/lights/AmbientLight")：THREE.AmbientLight，影响整个scene的光源，一般是为了弱化阴影或调整整体色调，可设置光照颜色，以颜色的明度确定光源亮度；  
[平行光](https://threejs.org/docs/index.html#api/lights/DirectionalLight "https://threejs.org/docs/index.html#api/lights/DirectionalLight")：THREE.DirectionalLight，模拟类似太阳的光源，所有被照射的区域亮度是一致的，可设置光照颜色、光照方向（通过向量确定方向），以颜色的明度确定光源亮度；  
[点光源](https://threejs.org/docs/index.html#api/lights/PointLight "https://threejs.org/docs/index.html#api/lights/PointLight")：THREE.PointLight，单点发光，照射所有方向，可设置光照强度，光照半径和光颜色；  
[聚光灯](https://threejs.org/docs/index.html#api/lights/shadows/SpotLightShadow "https://threejs.org/docs/index.html#api/lights/shadows/SpotLightShadow")：THREE.SpotLight，这种光源有聚光的效果，类似于台灯，吊灯，手电筒。  
最简单的用法：  

	function initLight() {  
	  light = new THREE.DirectionalLight({ color: 0xffffff }); // 创建白色平行光  
	  light.position.set(1, 0, 0); // 平行光只需设置方向向量，其他光源需要设置具体位置
	  scene.add(light);  
	}
光影关系可以显著影响显示效果。参考资料：[https://www.cnblogs.com/amy2011/p/5761174.html](https://www.cnblogs.com/amy2011/p/5761174.html "https://www.cnblogs.com/amy2011/p/5761174.html")
## 3D模型 ##
我们可以用three自由地创建一些[点](https://threejs.org/docs/index.html#api/objects/Points "https://threejs.org/docs/index.html#api/objects/Points")、[线](https://threejs.org/docs/index.html#api/objects/Line "https://threejs.org/docs/index.html#api/objects/Line")、[面](https://threejs.org/docs/index.html#api/math/Plane "https://threejs.org/docs/index.html#api/math/Plane")和[几何体](https://threejs.org/docs/index.html#api/core/Geometry "https://threejs.org/docs/index.html#api/core/Geometry")。或者加载一些已经做好的3D模型，three更新的很快，目前支持大部分格式的3D模型，以后会越来越多。 

	function initObject() {
	  // 添加一个圆柱体
	  let geometry = new THREE.CylinderGeometry(100, 100, 300, 100, 100);
	  let material = new THREE.MeshLambertMaterial({ color: 0xffff00 });
	  mesh = new THREE.Mesh(geometry, material);
	  mesh.position = new THREE.Vector3(0, 0, 0);
	  scene.add(mesh);
	}
[CylinderGeometry](https://threejs.org/docs/index.html#api/geometries/CylinderGeometry "https://threejs.org/docs/index.html#api/geometries/CylinderGeometry")是柱体，控制底面边的数量可以得到近似的圆柱体，还可以创建[正方体](https://threejs.org/docs/index.html#api/geometries/BoxGeometry "https://threejs.org/docs/index.html#api/geometries/BoxGeometry")、[球](https://threejs.org/docs/index.html#api/geometries/OctahedronGeometry "https://threejs.org/docs/index.html#api/geometries/OctahedronGeometry")、[环](https://threejs.org/docs/index.html#api/geometries/RingGeometry "https://threejs.org/docs/index.html#api/geometries/RingGeometry")、[文字](https://threejs.org/docs/index.html#api/geometries/TextGeometry "https://threejs.org/docs/index.html#api/geometries/TextGeometry")等已经设定好的几何体。如果库里没有需要的，可以自己创建自定义几何体。
 
---

	function initCar() {  
	  // 加载一个外部.obj汽车模型
	  let mtlLoader = new THREE.MTLLoader();  
	  mtlLoader.load('../../../3Dmodel/Lamborghini/Avent.mtl', (materials) => {  
	    // 加载材料
        materials.preload();  
        let objLoader = new THREE.OBJLoader();  
        objLoader.setMaterials(materials);  
        objLoader.load('../../../3Dmodel/Lamborghini/Avent.obj', (object) => {// 加载模型  
            object.scale.set(80, 80, 80); // 放大倍数  
            scene.add(object);  
          }, (suc) => { console.log(((suc.loaded / suc.total) * 100) + '% OBJloaded'); }, (err) => { console.log(err); }  
	    );  
	  }, (suc) => { console.log(((suc.loaded / suc.total) * 100) + '% MTLloaded'); }, (err) => { console.log(err); });  
	}
![picture](https://i.imgur.com/LAWWs58.png)  
three.js加载外部文件需要用[“loader系列”方法](https://github.com/mrdoob/three.js/tree/dev/examples/js/loaders "https://github.com/mrdoob/three.js/tree/dev/examples/js/loaders")，通过这些方法可以加载.obj、.json、.dae等格式的模型([点击查看不同格式的模型之间的差异及优劣](https://www.zhihu.com/question/50005990 "https://www.zhihu.com/question/50005990")）。
![picture](https://i.imgur.com/VokCPRx.png)  
像这种将一张图片当作一个平面的，要用[Texture](https://threejs.org/docs/index.html#api/textures/Texture "https://threejs.org/docs/index.html#api/textures/Texture")加载[材质（纹理）](https://threejs.org/docs/index.html#api/constants/Materials "https://threejs.org/docs/index.html#api/constants/Materials")。[参考资料](https://www.cnblogs.com/amy2011/p/6148736.html "https://www.cnblogs.com/amy2011/p/6148736.html")
# 六、简单动画 #
- 动画  
动画有两种方式，一种是让图像动，另一种是让相机动。  
一个简单的[旋转](https://www.cnblogs.com/silent-stranger/p/6027266.html "https://www.cnblogs.com/silent-stranger/p/6027266.html")：  

		function animate() {
	      var v1 = new THREE.Vector3( 1, 1, 1 );
	      meshAll.rotateOnAxis(v1,0.01);
	      mesh.rotation.z -= 0.01;
	      requestAnimationFrame(animate);
	      renderer.render(scene,camera);
	      stats.update();
		}
- 性能检测  
为了监控帧率，引用[Stats](https://github.com/mrdoob/stats.js/ "https://github.com/mrdoob/stats.js/")插件来监控动画的帧率  
![picture](https://i.imgur.com/vVFkb9X.png)  
  

		<script src="Stats.js"></script>
		……
		function initStats() {  
		  stats = new Stats();  
		  stats.domElement.style.position = 'absolute';  
		  stats.domElement.style.top = '0px';  
		  stats.domElement.style.left = '0px';  
		  document.body.appendChild(stats.domElement);  
		}
# 七、交互控制 #
- [dat.gui](https://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage "https://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage")  
![GUI](https://i.imgur.com/ak98EV0.png)  
资料：[https://www.cnblogs.com/xiaoniuzai/p/6685556.html](https://www.cnblogs.com/xiaoniuzai/p/6685556.html "https://www.cnblogs.com/xiaoniuzai/p/6685556.html")
- [其它插件](https://github.com/mrdoob/three.js/tree/dev/examples/js/controls "https://github.com/mrdoob/three.js/tree/dev/examples/js/controls")  
three自己也提供了很多插件来控制，例如[OrbitControls](https://threejs.org/docs/index.html#examples/controls/OrbitControls "https://threejs.org/docs/index.html#examples/controls/OrbitControls")，详情请看官网！  
![](https://i.imgur.com/FsY3Q2T.gif)  

		function initControl() {
		  controls = new THREE.OrbitControls(camera);
		  // controls.enabled = false;// boolean,禁用控制器
		  // controls.enableKeys = false; // boolean,禁用键盘
		  // controls.autoRotate = true; // boolean,是否自动旋转,所有的旋转都是绕着场景中心旋转，不是原点
		  // controls.autoRotateSpeed = 2; // Number,自动旋转速度
		  controls.enableDamping = true; // boolean, 开启后有缓冲效果，具有物理的阻力感
		  controls.dampingFactor = 0.3; // Float, 阻尼系数(0~1)，数值越低，阻力越小
		  // controls.enablePan = false; // boolean,禁止平移
		  // controls..panSpeed = 0.5; // 平移速度
		  // controls.enableRotate = false; // boolean,禁止旋转
		  // controls.enableZoom = false; // boolean,禁止远近拉伸
		  // controls.zoomSpeed = 0.1;// 鼠标滚动一个单位时拉伸幅度
		  // controls.rotateSpeed = 0.5;// 旋转速度
		  // controls.keyPanSpeed = 0.5; // Float, 用键盘平移的速度
		  // controls.keys = {
		  //   LEFT: 65,
		  //   RIGHT: 68,
		  //   UP: 87,
		  //   BOTTOM: 83
		  // }; // 键盘编码
		  // controls.minAzimuthAngle = 0 * Math.PI; // 水平方向最小角度
		  // controls.maxAzimuthAngle = 0.5 * Math.PI; // 水平方向最大角度，当Z轴向上时，从Z轴正方向往下看，逆时针90度
		  // controls.minDistance = 500; // 相机离物体最近距离
		  // controls.maxDistance = 600; // 相机离物体最远距离
		  // controls.minPolarAngle = 0 * Math.PI;// 上下两极的可视区域最小角度
		  // controls.maxPolarAngle = 0.5 * Math.PI;// 上下两极的可视区域最大角度，Z轴向上，从屏幕正上方往下90度
		  // controls.mouseButtons = {
		  //   ORBIT: THREE.MOUSE.LEFT,
		  //   ZOOM: THREE.MOUSE.MIDDLE,
		  //   PAN: THREE.MOUSE.RIGHT
		  // }; // 鼠标键位设置
		  // controls.screenSpacePanning = false; // boolean,false时只能在不是向上轴的方向移动。比如相机Z轴向上，那么物体只能在XY平面内移动
		  // controls.target = new THREE.Vector3(300, 200, 0); // 相机聚焦坐标
		}  
# 结束 #
一个练习demo：[一个采用 Three.js 的 3D 动画场景制作：飞行者](https://www.jianshu.com/p/92771817c73f "https://www.jianshu.com/p/92771817c73f")  
这些只是入门资料整理，如果想做出官网展示的那些demo，还要自己下功夫钻研！让我们一起快乐地学习吧！