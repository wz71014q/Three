// import * as Stats from 'stats';
// import * as THREE from 'three';
const width = window.innerWidth;
const height = window.innerHeight;
let stats;
let renderer;
let camera;
let light;
let scene;
let controls;

function initStats() {
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  stats.domElement.style.left = '0px';
  document.body.appendChild(stats.domElement);
}

function initThree() {
  renderer = new THREE.WebGLRenderer({
    // antialias: true
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
  camera.up.set(0, 0, 1);
  camera.lookAt(0, 0, 0);
}

function initLight() {
  light = new THREE.DirectionalLight({ color: 0xffffff });
  light.position.set(1, 1, 1);
  let ambient = new THREE.AmbientLight(0xffffff);
  scene.add(ambient);
  scene.add(light);
}

function initCar() {
  let mtlLoader = new THREE.MTLLoader();
  mtlLoader.load('./Blackhawk/uh60.mtl', (materials) => {
    materials.preload();
    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('./Blackhawk/uh60.obj', (object) => {
      // object.position.y = -0.5;
      object.scale.set(80, 80, 80);
      scene.add(object);
    }, (suc) => { console.log(((suc.loaded / suc.total) * 100) + '% OBJloaded'); }, (err) => { console.log(err); });
  }, (suc) => { console.log(((suc.loaded / suc.total) * 100) + '% MTLloaded'); }, (err) => { console.log(err); });
}

function initAxes() {
  /**
   * @author Qiang
   * @function initAxes 坐标轴
   */
  let axes = new THREE.AxesHelper(1000);// 蓝色为Z轴，绿色为Y轴，红色为X轴
  scene.add(axes);
}

function initControl() {
  controls = new THREE.OrbitControls(camera, renderer.domElement);
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
  //   BOTTOM: 83,
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
  initCar();
  initControl();
  animated();
}

window.onload = function () {
  threeStart();
};
