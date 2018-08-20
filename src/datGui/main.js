var stats;
var renderer;
var scene;
var camera;
var light;
var mesh;
var controls;
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
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.setClearColor(0xffffff, 1.0);
}

function initStats() {
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  document.body.appendChild(stats.domElement);
}

function initCamera() {
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(600, 600, 600);
  camera.up.set(0, 1, 0);
  camera.lookAt(0, 0, 0);
}

function initScene() {
  scene = new THREE.Scene();
}

function initLight() {
  light = new THREE.DirectionalLight({ color: 0xffffff });
  light.position.set(1, 1, 1);
  scene.add(light);
}

function initObject() {
  let axes = new THREE.AxesHelper(1000);
  scene.add(axes);
}

function initCube() {
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

function initControl() {
  controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function initGui() {
  // 控制面板
  let gui = new dat.GUI();
  gui.add(cyControls, 'cx', 300, 800).onChange(cyControls.redraw);
  gui.add(cyControls, 'cy', 300, 800).onChange(cyControls.redraw);
  gui.add(cyControls, 'cz', 300, 800).onChange(cyControls.redraw);
}

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  stats.update();
  controls.update();
}

function threeStart() {
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
}

window.onload = threeStart;
