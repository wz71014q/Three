/* eslint-disable */
var renderer;
var width,height;
var stats;
function initThree(){
    width=document.getElementById("canvas-frame").clientWidth;
    height=document.getElementById("canvas-frame").clientHeight;
    renderer=new THREE.WebGLRenderer({
        antialias:true
    });
    renderer.setSize(width,height);
    document.getElementById("canvas-frame").appendChild(renderer.domElement);
    renderer.setClearColor(0xffffff,1.0);

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.getElementById('canvas-frame').appendChild(stats.domElement);
}

var camera;
function initCamera() {
    camera=new THREE.PerspectiveCamera(45,width/height,100,10000);
    camera.position.x=0;
    camera.position.y=0;
    camera.position.z=1000;
    camera.up.x=0;
    camera.up.y=1;
    camera.up.z=0;
    camera.lookAt(0,0,0);
}

var scene;
function initScene(){
    scene=new THREE.Scene();
}

var light1,light2;
function initLight() {
    light1=new THREE.SpotLight(0xffffff);
    light1.position.set(100,100,200);
    scene.add(light1);
    light2=new THREE.DirectionalLight(0x00ff00);
    light2.position.set(0,0,300);
    scene.add(light2);
}

var cube;
var mesh;
function initObject() {
    var geometry=new THREE.CylinderGeometry(100,100,300,100,100);
    var material=new THREE.MeshLambertMaterial({color:0xffff00});
    mesh=new THREE.Mesh(geometry,material);
    mesh.position=new THREE.Vector3(0,0,0);
    // mesh.castShadow = true;// 增加投影
    // mesh.receiveShadow = true;// 允许接收投影
    scene.add(mesh);
}

function ThreeStart() {
    initThree();
    initCamera();
    initScene();
    initLight();
    initObject();
    animate();
}

function animate() {
   // camera.position.x=camera.position.x+1;
    mesh.position.x=mesh.position.x-1;
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
    stats.update();
}


window.onload=ThreeStart;