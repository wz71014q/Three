const width = window.innerWidth;
const height = window.innerHeight;
var stats;
var renderer;
var camera;
var light;
var mesh;
var scene;
var controls;

function initStats() {
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  stats.domElement.style.left = '0px';
  document.body.appendChild(stats.domElement);
}

function initThree() {
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    precision: 'highp', // precision:highp/mediump/lowp着色精度选择
    alpha: true, // alpha:true/false是否可以设置背景色透明
    preserveDrawingBuffer: true, // preserveDrawingBuffer:true/false是否保存绘图缓冲
    powerPreference: 'high-performance',
    maxLights: 1 // maxLights:最大灯光数
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.setClearColor(0xffffff, 1.0);
  renderer.autoClear = true; // 是否自动清除渲染缓存，false就不会清除上次的痕迹
  renderer.autoClearColor = true;
  renderer.autoClearDepth = true;
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
    color: 0x00ff00
  });
  // material.wireframe=true; // 网格显示
  mesh = new THREE.Mesh(geometry, material);
  mesh.position = new THREE.Vector3(0, 0, 0);
  scene.add(mesh);
}

function initAxes() {
  /**
   * @author Qiang
   * @function initAxes 坐标轴
   */
  let axes = new THREE.AxesHelper(1000);
  scene.add(axes);
}

function initControl() {
  controls = new THREE.TrackballControls(camera, renderer.domElement);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}


function animated() {
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
  onWindowResize();
  animated();
}

window.onload = function () {
  threeStart();
};
