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
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0xffffff, 1.0);
  document
    .body
    .appendChild(renderer.domElement);
  document.onselectstart = function non() {
    return false;
  };
}

function initScene() {
  scene = new THREE.Scene();
}

function initCamera() {
  camera = new THREE.PerspectiveCamera(45, width / height, 100, 10000);
  camera
    .up
    .set(0, 1, 0);
  camera
    .position
    .set(500, 500, 500);
  camera.lookAt(0, 0, 0);
}

function initLight() {
  light = new THREE.AmbientLight({ color: 0xffffff });
  light
    .position
    .set(500, 500, 500);
}

function initAxes() {
  let axes = new THREE.AxesHelper(1000); // 蓝色为Z轴，绿色为Y轴，红色为X轴
  scene.add(axes);
}

function initMesh() {
  let plane = new THREE.PlaneGeometry(10000, 10000);
  let material = new THREE.MeshBasicMaterial({
    color: 0xcccccc,
    side: THREE.DoubleSide
  }); // 材质对象
  let mesh = new THREE.Mesh(plane, material);
  mesh.rotateX(Math.PI / 2);
  scene.add(mesh);
}

function initCubeClone() {
  let obj = new THREE.Geometry();// 声明一个空几何体对象
  let v1 = new THREE.Vector3(300, 0, 0);
  let v2 = new THREE.Vector3(300, 300, 0);
  let v3 = new THREE.Vector3(300, 0, 300); // 创建顶点
  obj.vertices.push(v1, v2, v3); // 将顶点添加进空几何体对象
  let normal = new THREE.Vector3(1, 0, 0); // 创建三角面法向量
  let face = new THREE.Face3(0, 1, 2, normal);// 创建三角面
  // Face3( a : Integer, b : Integer, c : Integer, normal : Vector3, color : Color, materialIndex : Integer )
  obj.faces.push(face);
  let material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    visible: true, // 是否可见,默认为true
    side: THREE.DoubleSide, // 渲染面片正面或是反面,默认为正面 THREE.FrontSide ,可设置为反面THREE.BackSide ,或双面 THREE.DoubleSide
    wireframe: false, // 是否渲染线而非面,默认为 false
    // map :使用纹理贴图
  });
  let mesh = new THREE.Mesh(obj, material);
  scene.add(mesh);

  let meshClone = mesh.clone();
  meshClone.translateOnAxis(new THREE.Vector3(1, 0, 0), 100); // X轴平移100
  scene.add(meshClone);
}

function initCubeCopy() {
  let box = new THREE.BoxGeometry(100, 100, 100);// 创建一个正方体对象
  let sphere = new THREE.SphereGeometry(80, 50, 50); // 创建一个球体
  box.copy(sphere); // 将球体的数据复制到box几何体,执行语句geometry2.copy(geometry1),几何体geometry1的顶点相关数据会替换几何体geometry2的顶点相关数据，然后box就变成一个球。
  let material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    visible: true, // 是否可见,默认为true
    side: THREE.DoubleSide, // 渲染面片正面或是反面,默认为正面 THREE.FrontSide ,可设置为反面THREE.BackSide ,或双面 THREE.DoubleSide
    wireframe: false, // 是否渲染线而非面,默认为 false
    // map :使用纹理贴图
  });
  let mesh = new THREE.Mesh(box, material);
  scene.add(mesh);
}

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function initControl() {
  controls = new THREE.TrackballControls(camera);
  controls.enableDamping = true; // boolean, 开启后有缓冲效果，具有物理的阻力感
  controls.dampingFactor = 0.3; // Float, 阻尼系数(0~1)，数值越低，阻力越小
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
  initMesh();
  initControl();
  initCubeClone();
  initCubeCopy();
  resize();
  animated();
}

window.onload = function () {
  threeStart();
};
