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
    antialias: true
  });
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
  camera.up.set(0, 0, 1);
  camera.lookAt(0, 0, 0);
}

function initLight() {
  light = new THREE.AmbientLight({ color: 0xffffff });
  light.position.set(1, 1, 1);
  scene.add(light);
}

function initObject() {
  let obj = new THREE.Geometry();
  let v1 = new THREE.Vector3(100, 0, 0);
  let v2 = new THREE.Vector3(0, 100, 0);
  let v3 = new THREE.Vector3(0, 0, 100); // 创建顶点
  obj.vertices.push(v1, v2, v3); // 将顶点添加进空几何体对象
  let normal = new THREE.Vector3(1, 1, 1); // 创建三角面法向量
  let face = new THREE.Face3(0, 1, 2, normal); // 创建三角面
  // Face3( a : Integer, b : Integer, c : Integer, normal : Vector3, color : Color, materialIndex : Integer )
  obj.faces.push(face);
  let material = new THREE.MeshLambertMaterial({
    color: 0x0000ff,
    side: THREE.DoubleSide
  }); // 创建材质
  mesh = new THREE.Mesh(obj, material); // 创建网格模型
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
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // boolean, 开启后有缓冲效果，具有物理的阻力感
  controls.dampingFactor = 0.1; // Float, 阻尼系数(0~1)，数值越低，阻力越小
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
  animated();
}

window.onload = function () {
  threeStart();
};
