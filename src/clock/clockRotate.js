/* eslint-disable */
var renderer;
var stats;
var cyControls = {
    cx: 500,
    cy: 500,
    cz: 500,
    redraw: () => {
      camera.position.set(cyControls.cx, cyControls.cy, cyControls.cz);
    }
};

function initThree() {
    renderer = new THREE.WebGLRenderer({
        // antialias:true
    });
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    renderer.setClearColor(0xffffff,1.0);
}
function initStats() {
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild( stats.domElement );
}

var camera;
function initCamera(){
    camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,10000);
    camera.position.set(600,600,600);
    camera.up.set(0,1,0);
    camera.lookAt(0,0,0);
}

var scene;
function initScene() {
    scene=new THREE.Scene();
}

var light;
function initLight() {
    light=new THREE.DirectionalLight({color:0xffffff});
    light.position.set(1,1,1);
    scene.add(light);
}

var lineX,lineY,lineZ;
var line1,line2,line3;
var mesh;
var meshAll;
function initObject() {
    let axes = new THREE.AxesHelper(1000);
    scene.add(axes);
}

var texture;
function initCube() {
    var geometry = new THREE.CubeGeometry(150, 150, 150);
    texture = new THREE.Texture( canvas);
    var material = new THREE.MeshBasicMaterial({map:texture});

    texture.needsUpdate = true;
    mesh = new THREE.Mesh( geometry,material );
    scene.add( mesh );
}

var controls;
function initControl() {
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  // controls.minDistance = 300;
  // controls.maxDistance = 600;
  // controls.maxPolarAngle = 1.5;// 上下两极的可视区域的最大角度
  // controls.minPolarAngle = 1;// 上下两极的可视区域最小角度
  // controls.enableDamping = true;// 允许远近拉伸
  // controls.enableKeys = false;// 禁止键盘控制
  // controls.enablePan = false;// 禁止平移
  // controls.dampingFactor = 0.1;// 鼠标滚动一个单位时拉伸幅度
  // controls.rotateSpeed = 0.5;// 旋转速度
  // // controls.enabled = false;// 禁用控制器
  // controls.minDistance = 300;// 离中心物体的最近距离
  // controls.maxDistance = 3000;// 离中心物体的最远距离
}

function initGui() {
    // 控制面板
    let gui = new dat.GUI();
    gui.add(cyControls, 'cx', 300, 800).onChange(cyControls.redraw);
    gui.add(cyControls, 'cy', 300, 800).onChange(cyControls.redraw);
    gui.add(cyControls, 'cz', 300, 800).onChange(cyControls.redraw);
 }

function animate() {
    var v1 = new THREE.Vector3( 1, 1, 1 );
    var v2 = new THREE.Vector3( 1, 0, 0 );
    // meshAll.rotateOnAxis(v1,0.01);
    // mesh.rotateOnAxis(v2,0.01);
    texture.needsUpdate = true;
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
    stats.update();
    controls.update();
}

function onWindowResize() {
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
}

function threeStart() {
    clock();
    initThree();
    initStats();
    initCamera();
    initScene();
    initLight();
    initObject();
    initCube();
    initControl();
    initGui();
    animate();
    // onWindowResize();
}

window.onload=threeStart;