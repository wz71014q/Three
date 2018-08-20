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
  light = new THREE.AmbientLight({
    color: 0xffffff
  });
  light
    .position
    .set(500, 500, 500);
}

function initAxes() {
  let axes = new THREE.AxesHelper(1000); // 蓝色为Z轴，绿色为Y轴，红色为X轴
  scene.add(axes);
}

function initCube() {
  var geometry = new THREE.BufferGeometry();
  var vertexPositions = [
    [-100.0, -100.0, 100.0],
    [
      100.0, -100.0, 100.0
    ],
    [
      100.0, 100.0, 100.0
    ],

    [
      100.0, 100.0, 100.0
    ],
    [-100.0, 100.0, 100.0],
    [-100.0, -100.0, 100.0],

    [-100.0, -100.0, -100.0],
    [
      100.0, -100.0, -100.0
    ],
    [
      100.0, 100.0, -100.0
    ],

    [
      100.0, 100.0, -100.0
    ],
    [-100.0, 100.0, -100.0],
    [-100.0, -100.0, -100.0]
  ];
  var vertices = new Float32Array(vertexPositions.length * 3); // 创建一个顶点*3长度的数组
  console.log(vertices);
  // three components per vertex components of the position vector for each vertex
  // are stored contiguously in the buffer.
  for (let i = 0; i < vertexPositions.length; i++) {
    // 将顶点放进数组
    vertices[(i * 3) + 0] = vertexPositions[i][0];
    vertices[(i * 3) + 1] = vertexPositions[i][1];
    vertices[(i * 3) + 2] = vertexPositions[i][2];
    console.log(i * 3, vertices[(i * 3) + 0]);
    console.log((i * 3) + 1, vertices[(i * 3) + 1]);
    console.log((i * 3) + 2, vertices[(i * 3) + 2]);
  }
  console.log(vertices);
  geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
  // 材质
  let material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    visible: true, // 是否可见,默认为true
    side: THREE.DoubleSide, // 渲染面片正面或是反面,默认为正面 THREE.FrontSide ,可设置为反面THREE.BackSide ,或双面 THREE.DoubleSide
    wireframe: false, // 是否渲染线而非面,默认为 false
    // map :使用纹理贴图
  });
  // 增加坐标点，坐标点是X,Y,Z的布局，可以自己任意设置 geometry.addAttribute( 'position', new
  // THREE.BufferAttribute( vertices, 3 ) );
  let mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  let obj = new THREE.Geometry(); // 声明一个空几何体对象
  let v1 = new THREE.Vector3(300, 0, 0);
  let v2 = new THREE.Vector3(300, 300, 0);
  let v3 = new THREE.Vector3(300, 0, 300); // 创建顶点
  obj.vertices.push(v1, v2, v3); // 将顶点添加进空几何体对象
  let normal = new THREE.Vector3(1, 0, 0); // 创建三角面法向量
  let face = new THREE.Face3(0, 1, 2, normal); // 创建三角面
  // Face3( a : Integer, b : Integer, c : Integer, normal : Vector3, color : Color, materialIndex : Integer )
  obj.faces.push(face);
  let mesh1 = new THREE.Mesh(obj, material);
  scene.add(mesh1);

  let geometryA = new THREE.Geometry(); // 声明一个空几何体对象
  let p1 = new THREE.Vector3(500, 0, 0); // 顶点1坐标
  let p2 = new THREE.Vector3(0, 500, 0); // 顶点2坐标
  let p3 = new THREE.Vector3(0, 0, 500); // 顶点3坐标
  geometryA.vertices.push(p1, p2, p3); // 顶点坐标添加到geometry对象
  let material1 = new THREE.PointsMaterial({
    color: 0x0000ff,
    size: 100.0 // 点对象像素尺寸
  }); // 材质对象
  let points = new THREE.Points(geometryA, material1); // 点模型对象
  scene.add(points); // 点对象添加到场景中

  let geometry1 = new THREE.Geometry(); // 声明一个空几何体对象
  let p1A = new THREE.Vector3(100, 0, 0); // 顶点1坐标
  let p2A = new THREE.Vector3(0, 200, 0); // 顶点2坐标
  geometry1.vertices.push(p1A, p2A); // 顶点坐标添加到geometry对象
  let material2 = new THREE.LineBasicMaterial({
    color: 0x0000ff // 线条颜色
  }); // 材质对象
  let line = new THREE.Line(geometry1, material2); // 线条模型对象
  scene.add(line); // 线条对象添加到场景中
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
  // mTime += (1 / 60); mParticleSystem.material.uniforms.uTime.value = mTime;
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
  initControl();
  initCube();
  // initTriangle();
  resize();
  animated();
}

window.onload = function () {
  threeStart();
};
