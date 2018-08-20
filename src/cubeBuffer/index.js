var renderer;
var scene;
var camera;
var light;
var stats;
var controls;
const width = window.innerWidth;
const height = window.innerHeight;

function initStats() {
  stats = new Stats();
  stats.domElement.style.position = 'absolutle';
  stats.domElement.style.top = '0px';
  stats.domElement.style.right = '0px';
  document
    .body
    .appendChild(stats.domElement);
}

function initRender() {
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0xffffff, 1.0);
  renderer.shadowMap.enabled = true; // 告诉渲染器需要阴影效果
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
  document.body.appendChild(renderer.domElement);
}

function initScene() {
  scene = new THREE.Scene();
}

function initCamera() {
  camera = new THREE.PerspectiveCamera(45, width / height, 100, 10000);
  camera.up.set(0, 0, 1);
  camera.position.set(500, 500, 500);
  camera.lookAt(0, 0, 0);
}

function initLight() {
  scene.add(new THREE.AmbientLight(0xcccccc));
  light = new THREE.PointLight(0xffffff);
  light.castShadow = true; // 告诉光需要开启阴影投射
  // Set up shadow properties for the light
  light.shadow.mapSize.width = 612; // default
  light.shadow.mapSize.height = 612; // default
  light.shadow.camera.near = 0.5; // default
  light.shadow.camera.far = 600; // default
  light.position.set(-100, 0, 400);
  scene.add(light);
  let helper = new THREE.CameraHelper(light.shadow.camera);
  scene.add(helper);
}

function initAxes() {
  let axes = new THREE.AxesHelper(1000); // 红色为X轴, 绿色为Y轴, 蓝色为Z轴
  scene.add(axes);
}

function initCube() {
  let geometry = new THREE.Geometry(); // 声明一个空几何体
  let vertices = [
    new THREE.Vector3(100, 100, 10),
    new THREE.Vector3(-100, 100, 10),
    new THREE.Vector3(-100, -100, 10),
    new THREE.Vector3(100, -100, 10),
    new THREE.Vector3(100, 100, 210),
    new THREE.Vector3(-100, 100, 210),
    new THREE.Vector3(-100, -100, 210),
    new THREE.Vector3(100, -100, 210),
  ]; // 正方体的顶点数据
  geometry.vertices = vertices; // 声明几何体的顶点
  let faces = [
    new THREE.Face3(0, 1, 2),
    new THREE.Face3(0, 2, 3),
    new THREE.Face3(0, 1, 5),
    new THREE.Face3(0, 4, 5),
    new THREE.Face3(4, 5, 6),
    new THREE.Face3(4, 6, 7),
    new THREE.Face3(2, 3, 6),
    new THREE.Face3(3, 6, 7),
    new THREE.Face3(0, 4, 7),
    new THREE.Face3(0, 3, 7),
    new THREE.Face3(1, 2, 6),
    new THREE.Face3(1, 5, 6),
  ];
  geometry.faces = faces; // 声明几何体的面
  geometry.computeFaceNormals();// 自动生成法向量
  let material = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    side: THREE.DoubleSide,
  });
  let cube = new THREE.Mesh(geometry, material);
  cube.castShadow = true; // 告诉立方体需要投射阴影
  cube.receiveShadow = false;
  scene.add(cube);
}

function initMesh() {
  let planeBuffer = new THREE.PlaneBufferGeometry(10000, 10000);
  let material = new THREE.MeshLambertMaterial({
    color: 0xaaaaaa,
    side: THREE.DoubleSide
  });
  let plane = new THREE.Mesh(planeBuffer, material);
  // plane.rotateX(Math.PI * -0.5);
  plane.receiveShadow = true; // 告诉底部平面需要接收阴影
  scene.add(plane);
}

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function initControl() {
  controls = new THREE.OrbitControls(camera);
  controls.enableDamping = true; // boolean, 开启后有缓冲效果，具有物理的阻力感
  controls.dampingFactor = 0.1; // Float, 阻尼系数(0~1)，数值越低，阻力越小
}

function animated() {
  renderer.clear();
  stats.update();
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animated);
}

function threeStart() {
  initStats();
  initRender();
  initCamera();
  initScene();
  initLight();
  initAxes();
  initCube();
  initMesh();
  initControl();
  resize();
  animated();
}

window.onload = function () {
  threeStart();
};
