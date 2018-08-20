var renderer,width,height;
function initThree() {
    width=document.getElementById("canvas-frame").clientWidth;
    height=document.getElementById("canvas-frame").clientHeight;
    renderer=new THREE.WebGLRenderer({
            antialias:true
        });//新建渲染器
    renderer.setSize(width,height);//设置大小
    document.getElementById("canvas-frame").appendChild(renderer.domElement);//将渲染器添加到div中
    renderer.setClearColor(0xffffff,1.0);
}

var camera;
function initCamera(){
    camera=new THREE.PerspectiveCamera(45,width/height,1,10000);//新建相机
    camera.position.x=0;//设置相机位置
    camera.position.y=1208;
    camera.position.z=0;
    camera.up.x=0;//相机看到的坐标轴方向
    camera.up.y=0;
    camera.up.z=1;
    camera.lookAt(0,0,0);
}

var scene;
function initScene() {
    scene=new THREE.Scene();//新建场景
}

var light;
function initLight() {
    light=new THREE.DirectionalLight(0xff0000,1.0,0);//新建灯光
    light.position.set(100,100,200);//设置灯光位置
    scene.add(light);//将灯光添加到场景中
}

var cube;
function initObject() {
    var geometry=new THREE.Geometry();//新建几何体
    geometry.vertices.push(new THREE.Vector3(-500,0,0));//设置几何体的顶点
    geometry.vertices.push(new THREE.Vector3(500,0,0));

    for(var i=0;i<=20;i++){
        var material=new THREE.LineBasicMaterial({color:0x000000,opacity:0.2});//新建材料
        var line=new THREE.Line(geometry,material);//新建线条
        line.position.z=( i * 50 ) - 500;
        scene.add(line);

        var line1=new THREE.Line(geometry,material);
        line1.position.x=( i * 50 ) - 500;
        line1.rotation.y=0.5*Math.PI;
        scene.add(line1);
    }
}


function threeStart() {
    initThree();
    initCamera();
    initScene();
    initLight();
    initObject();
    renderer.clear();
    renderer.render(scene,camera);
}
window.onload=threeStart;