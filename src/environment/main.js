const width = window.innerWidth;
const height = window.innerHeight;
var stats;
var renderer;
var camera;
var light;
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
  let ambient = new THREE.AmbientLight(0xffffff);
  let pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(100, 100, 100);
  scene.add(pointLight);
  scene.add(ambient);
  scene.add(light);
  let pointHelper = new THREE.PointLightHelper(pointLight, 5, 0xff0000);
  scene.add(pointHelper);// 设置点光源辅助工具（可以看到点光源的位置）
}

function initCar() {
  let mtlLoader = new THREE.MTLLoader();
  mtlLoader.load('../../../3Dmodel/Lamborghini/Avent.mtl', (materials) => {
    materials.preload();
    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('../../../3Dmodel/Lamborghini/Avent.obj', (object) => {
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
  controls = new THREE.TrackballControls(camera);
  controls.enableDamping = true; // boolean, 开启后有缓冲效果，具有物理的阻力感
  controls.dampingFactor = 0.3; // Float, 阻尼系数(0~1)，数值越低，阻力越小
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
