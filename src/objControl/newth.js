// import * as Stats from 'stats';
// import * as THREE from 'three';
const width = window.innerWidth;
const height = window.innerHeight;
var stats;
var renderer;
var camera;
var light;
var mesh;
var scene;
var controls;
var clock;

function initStats() {
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  stats.domElement.style.left = '0px';
  document.body.appendChild(stats.domElement);
}

function initThree() {
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  // 抗锯齿打开后坐标轴可能会有几条看不清
  renderer.setSize(width, height);
  renderer.setClearColor(0xffffff, 1.0);
  document.body.appendChild(renderer.domElement);
}

function initScene() {
  scene = new THREE.Scene();
}

function initCamera() {
  camera = new THREE.PerspectiveCamera(45, width / height, 10, 10000);
  camera.position.set(500, 500, 500);
  camera.up.set(0, 1, 0);
  camera.lookAt(0, 0, 0);
}

function initLight() {
  light = new THREE.DirectionalLight({ color: 0xffffff });
  light.position.set(1, 1, 1);
  scene.add(light);
}

function initObject() {
  let geometry = new THREE.CylinderGeometry(100, 100, 300, 100, 100);
  let material = new THREE.MeshLambertMaterial({
    color: 0xffff00
  });
  // material.wireframe=true; // 网格显示
  mesh = new THREE.Mesh(geometry, material);
  mesh.position = new THREE.Vector3(0, 0, 0);
  // mesh.castShadow = true;// 增加投影
  // mesh.receiveShadow = true;// 允许接收投影
  scene.add(mesh);
}

function initAxes() {
  /**
   * @author Qiang
   * @function initAxes 坐标轴
   */
  let axes = new THREE.AxesHelper(10000);
  scene.add(axes);
}

function initControl() {
  clock = new THREE.Clock();
  // controls = new THREE.PointerLockControls(camera);
  // scene.add(controls.getObject());
  // flycontrols
  // controls = new THREE.FlyControls(camera);
  // clock.autoStart = false;
  // controls.movementSpeed = 100; // 设置移动的速度
  // controls.rollSpeed = Math.PI / 6; // 设置旋转速度
  // controls.autoForward = false;
  // controls.dragToLook = false;
  // flycontrols
  // FirstPersonControls
  // controls = new THREE.FirstPersonControls(camera);
  // controls.lookSpeed = 0.2; // 鼠标移动查看的速度
  // controls.lookVertical = true;
  // controls.movementSpeed = 20; // 相机移动速度
  // controls.noFly = true;
  // controls.constrainVertical = true; // 约束垂直
  // controls.verticalMin = 1.0;
  // controls.verticalMax = 2.0;
  // controls.lon = 1000; // 进入初始视角x轴的角度
  // controls.lat = -100; // 初始视角进入后y轴的角度
  // FirstPersonControls
  // controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  // controls.target.set(0, 5, 0); // 控制器的中心点
  // controls.enabled = false;// boolean,禁用控制器
  // controls.enableKeys = false; // boolean,禁用键盘
  // controls.autoRotate = true; // boolean,是否自动旋转,所有的旋转都是绕着场景中心旋转，不是原点
  // controls.autoRotateSpeed = 2; // Number,自动旋转速度
  controls.enableDamping = true; // boolean, 开启后有缓冲效果，具有物理的阻力感
  controls.dampingFactor = 0.1; // Float, 阻尼系数(0~1)，数值越低，阻力越小
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
  // controls.maxAzimuthAngle = 0 * Math.PI; // 水平方向最大角度，当Z轴向上时，从Z轴正方向往下看，逆时针90度
  // controls.minDistance = 500; // 相机离物体最近距离
  // controls.maxDistance = 600; // 相机离物体最远距离
  // controls.minPolarAngle = 0 * Math.PI;// 上下两极的可视区域最小角度
  // controls.maxPolarAngle = 0.2 * Math.PI;// 上下两极的可视区域最大角度，Z轴向上，从屏幕正前方往上90度
  // controls.mouseButtons = {
  //   ORBIT: THREE.MOUSE.LEFT,
  //   ZOOM: THREE.MOUSE.MIDDLE,
  //   PAN: THREE.MOUSE.RIGHT
  // }; // 鼠标键位设置
  // controls.screenSpacePanning = false; // boolean,false时只能在不是向上轴的方向移动。比如相机Z轴向上，那么物体只能在XY平面内移动
  // controls.target = new THREE.Vector3(300, 200, 0); // 相机聚焦坐标
}

function animated() {
  // let delta = clock.getDelta();
  // controls.update(delta);
  renderer.clear();
  renderer.render(scene, camera);
  requestAnimationFrame(animated);
  stats.update();
  controls.update();
}

function threeStart() {
  initStats();
  initThree();
  initCamera();
  initScene();
  initLight();
  initAxes();
  initObject();
  initControl();
  animated();
}

window.onload = function () {
  threeStart();
};
