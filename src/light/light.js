var renderer;
var width,height;
function initThree(){
    width=document.getElementById("canvas-frame").clientWidth;
    height=document.getElementById("canvas-frame").clientHeight;
    renderer=new THREE.WebGLRenderer({
        antialias:true
    });
    renderer.setSize(width,height);
    document.getElementById("canvas-frame").appendChild(renderer.domElement);
    renderer.setClearColor(0xffffff,1.0);
}

var camera;
function initCamera() {
    camera=new THREE.PerspectiveCamera(45,width/height,100,10000);
    camera.position.set(800,200,600);
    camera.up.set(0,1,0);
    camera.lookAt(0,0,0);
}

var scene;
function initScene() {
    scene=new THREE.Scene();
}

var light;
function initLight() {
    light=new THREE.PointLight(0xff0000,1);
    light.position.set(0,0,100);
    scene.add(light);

    var light1=new THREE.DirectionalLight(0x00ff00,1);
    light1.position.set(1,0,1);
    scene.add(light1);

    var light2=new THREE.AmbientLight(0x0000ff,0.5);
    light2.position.set(0,1,0);
    scene.add(light2);
}

var cube1,mesh1;
function initObject() {
    cube1=new THREE.CubeGeometry(100,100,100,4,4);
    var material=new THREE.MeshLambertMaterial({ color:0xFFFFFF});
    mesh1=new THREE.Mesh(cube1,material);
    mesh1.position.set(0,0,0);
    // scene.add(mesh1);

    var geometry2 = new THREE.CubeGeometry( 100, 100, 100,4,4);
    var mesh2 = new THREE.Mesh( geometry2,material);
    mesh2.position.set(-300,0,0);
    // scene.add(mesh2);

    var geometry3 = new THREE.CubeGeometry( 100, 100,100,4,4);
    var mesh3 = new THREE.Mesh( geometry3,material);
    mesh3.position.set(300,0,0);
    // scene.add(mesh3);

    var cube2=new THREE.CubeGeometry(100,100,100,4,4);
    var mesh4=new THREE.Mesh(cube2,material);
    mesh4.position.set(0,0,300);
    // scene.add(mesh4);

    var cube3=new THREE.CubeGeometry(100,100,100,4,4);
    var mesh5=new THREE.Mesh(cube3,material);
    mesh5.position.set(0,0,-300);
    // scene.add(mesh5);

    var cube4=new THREE.CubeGeometry(100,100,100,4,4);
    var mesh6=new THREE.Mesh(cube4,material);
    mesh6.position.set(0,-200,0);
    // scene.add(mesh6);

    var cube5=new THREE.CubeGeometry(100,100,100,4,4);
    var mesh7=new THREE.Mesh(cube5,material);
    mesh7.position.set(0,200,0);
    // scene.add(mesh7);


    var pivotPoint = new THREE.Object3D();
    pivotPoint.add(mesh2);
    pivotPoint.add(mesh3);
    pivotPoint.add(mesh4);
    pivotPoint.add(mesh5);
    pivotPoint.add(mesh6);
    pivotPoint.add(mesh7);
    mesh1.add(pivotPoint);
    scene.add(mesh1);
}

function animate() {
    var v1 = new THREE.Vector3( 0, 1, 0 );
    // mesh1.rotation.y += 0.01;
    mesh1.rotateOnAxis(v1,0.01);
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
}
function threeStart() {
    initThree();
    initCamera();
    initScene();
    initLight();
    initObject();
    animate();
    renderer.clear();
    renderer.render(scene,camera);
}


window.onload=threeStart;