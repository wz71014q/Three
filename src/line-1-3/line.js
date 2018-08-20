/* eslint-disable */
var renderer;
var width;
var height;
function initTHree() {
    width=document.getElementById("canvas-frame").clientWidth;
    height=document.getElementById("canvas-frame").clientHeight;
    renderer=new THREE.WebGLRenderer({
        antialias:true
    });
    renderer.setSize(width,height);
    document.getElementById('canvas-frame').appendChild(renderer.domElement);
    renderer.setClearColor(0xffffff,1.0);
}

var camera;
function initCamera(){
    camera=new THREE.PerspectiveCamera(45,width / height,1,10000);
    camera.position.x=100;//相机的位置
    camera.position.y=100;
    camera.position.z=100;
    camera.up.x=0;//相机以哪个方向为上方
    camera.up.y=1;
    camera.up.z=0;
    camera.lookAt(0,0,0);
}

var scene;
function initScene(){
    scene=new THREE.Scene();
}

var light;
function initLight() {
    light=new THREE.DirectionalLight(0xffffff,1.0,0);
    light.position.set(100,100,100);
    scene.add(light);
}

var lineX,lineY,lineZ;
function initObject() {
    lineX=new THREE.Geometry();
    lineY=new THREE.Geometry();
    lineZ=new THREE.Geometry();
    var color=new THREE.Color(0x000000);
    var color1=new THREE.Color(0xff0000);
    var color2=new THREE.Color(0x00ff00);
    var color3=new THREE.Color(0x0000ff);
    var line_material=new THREE.LineBasicMaterial({vertexColors:true});
    var p=new THREE.Vector3(0,0,0);
    var p1=new THREE.Vector3(100,0,0);
    var p2=new THREE.Vector3(0,100,0);
    var p3=new THREE.Vector3(0,0,100);
    lineX.vertices.push(p);
    lineY.vertices.push(p);
    lineZ.vertices.push(p);
    lineX.vertices.push(p1);
    lineY.vertices.push(p2);
    lineZ.vertices.push(p3);
    lineX.colors.push(color,color1);
    lineY.colors.push(color,color2);
    lineZ.colors.push(color,color3);

    var line1=new THREE.Line(lineX,line_material,THREE.LineSegments);
    scene.add(line1);
    var line2=new THREE.Line(lineY,line_material,THREE.LineSegments);
    scene.add(line2);
    var line3=new THREE.Line(lineZ,line_material,THREE.LineSegments);
    scene.add(line3);
}

function threeStart() {
    initTHree();
    initCamera();
    initScene();
    initLight();
    initObject();
    renderer.clear();
    renderer.render(scene,camera);
}

window.onload=threeStart;