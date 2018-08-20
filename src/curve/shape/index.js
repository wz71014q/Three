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
  renderer.setClearColor(0xffffff, 0.3);
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
  camera.position.set(0, 0, 800);
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
  // let helper = new THREE.CameraHelper(light.shadow.camera);
  // scene.add(helper);
}

function initAxes() {
  let axes = new THREE.AxesHelper(1000); // 红色为X轴, 绿色为Y轴, 蓝色为Z轴
  scene.add(axes);
}
/**
 * @todo Curve
 */
function initCircle() {
  let shape = new THREE.Shape();
  shape.absarc(0, 0, 100, 0, 0.5 * Math.PI); // https://threejs.org/docs/#api/extras/core/Path.absarc
  let geometry = new THREE.ShapeGeometry(shape);
  let material = new THREE.PointsMaterial({
    color: 0x0000ff,
    size: 10.0 // 点对象像素尺寸
  }); // 材质对象
  let line = new THREE.Points(geometry, material); // 运用点模型渲染圆
  scene.add(line); // 点模型添加到场景中
}

function initCurve() {
  let shape = new THREE.Shape();
  let myShape = new THREE.Shape();
  myShape.moveTo(0, 10);
  myShape.lineTo(0, 90);
  myShape.bezierCurveTo(0, 100, 10, 100, 10, 100);
  myShape.lineTo(90, 100);
  myShape.bezierCurveTo(100, 100, 100, 90, 100, 90);
  myShape.lineTo(100, 10);
  myShape.bezierCurveTo(100, 0, 90, 0, 90, 0);
  myShape.lineTo(10, 0);
  myShape.bezierCurveTo(0, 0, 0, 10, 0, 10);
  shape.moveTo(0, 0);
  shape.quadraticCurveTo(0, 100, 100, 100);
  let geometry = new THREE.ShapeGeometry(shape);
  let material = new THREE.PointsMaterial({
    color: 0x0ff000,
    size: 10.0 // 点对象像素尺寸
  }); // 材质对象
  let line = new THREE.Points(geometry, material); // 运用点模型渲染圆
  // line.translateX(-20);
  console.log(shape.getPoint(0.5)); // 获取50%的点处的向量
  console.log(shape.getPointAt(0.5)); // 获取50%弧长处的向量
  console.log(shape.getPoints(5));
  console.log(shape.getLength());
  console.log(shape.getLengths(5));
  console.log(shape.getUtoTmapping(0.5, 0.5));
  console.log(shape.getTangent(0.5));
  console.log(shape.toJSON());
  scene.add(line); // 点模型添加到场景中
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
  initCircle();
  initCurve();
  initControl();
  resize();
  animated();
}

window.onload = function () {
  threeStart();
};
