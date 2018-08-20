/* eslint-disable */
var renderer,scene,camera,light,width,height;
function initThree() {
    width=document.getElementById("canvas-frame").clientWidth;
    height=document.getElementById("canvas-frame").clientHeight;
    renderer=new THREE.WebGLRenderer({
        antialias:true
    });
    renderer.setSize(width,height);
    document.getElementById("canvas-frame").appendChild(renderer.domElement);
    renderer.setClearColor(0x00ff00,0.01);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000);
    camera.position.set(600, 200, 600);// 设置相机位置
    camera.up.set(0, 1, 0);// 相机以哪个轴为上方向
    camera.lookAt(0, 0, 0);// 相机看向哪里
}// 初始化相机

function initScene() {
    scene = new THREE.Scene();
}

var light1;
function initLight() {
    light = new THREE.DirectionalLight(0xff0000,1);
    light.position.set(1, 0, 1);
    scene.add(light);

    light1 = new THREE.PointLight(0x00ff00,0.5);
    light1.position.set(300, 150, 300);
    scene.add(light1);
}

var net;
function initNet() {
    net=new THREE.GridHelper(1000,50,0xff0000,0x808080);
    scene.add(net);// 画网格
}

var pointHelper;
function initHelper() {
    pointHelper=new THREE.PointLightHelper(light1,5);
    scene.add(pointHelper);// 设置点光源辅助工具（可以看到点光源的位置）
}

var cube,mesh;
function initCube() {
    cube=new THREE.BoxGeometry(100,100,100,1,1,1);// 设置原点的几何体
    for(var i=0;i<cube.faces.length;i+=2){
        var color=Math.random()*0xffffff;
        cube.faces[i].color.setHex(color);
        cube.faces[i+1].color.setHex(color);// 设置每个面为随机颜色
    }

    var material=new THREE.MeshBasicMaterial({vertexColors:THREE.FaceColors});
    mesh=new THREE.Mesh(cube,material);
    mesh.position.set(0,0,0);
    console.log("mesh的矩阵为:"+mesh.matrix.elements);

    scene.add(mesh);
}
var cube1,meshAll,meshAll_1;
function initObject() {
    cube1=new THREE.CubeGeometry(1,1,1,4,4);
    var material=new THREE.MeshLambertMaterial({ color:0xFFFFFF});
    meshAll=new THREE.Mesh(cube1,material);
    meshAll.position.set(0,0,0);

    var cube9=new THREE.CubeGeometry(1,1,1,4,4);
    meshAll_1=new THREE.Mesh(cube9,material);
    meshAll_1.position.set(300,200,50);

    var geometry2 = new THREE.CubeGeometry( 100, 100, 100,4,4);
    var mesh2 = new THREE.Mesh( geometry2,material);
    mesh2.position.set(-300,0,0);

    var geometry3 = new THREE.CubeGeometry( 100, 100,100,4,4);
    var mesh3 = new THREE.Mesh( geometry3,material);
    mesh3.position.set(300,0,0);

    var cube2=new THREE.CubeGeometry(100,100,100,4,4);
    var mesh4=new THREE.Mesh(cube2,material);
    mesh4.position.set(0,0,300);

    var cube3=new THREE.CubeGeometry(100,100,100,4,4);
    var mesh5=new THREE.Mesh(cube3,material);
    mesh5.position.set(0,0,-300);

    var cube4=new THREE.CubeGeometry(100,100,100,4,4);
    var mesh6=new THREE.Mesh(cube4,material);
    mesh6.position.set(0,-200,0);

    var cube5=new THREE.CubeGeometry(100,100,100,4,4);
    var mesh7=new THREE.Mesh(cube5,material);
    mesh7.position.set(0,200,0);

    var newCube1=new THREE.SphereGeometry(10, 18, 12);
    var newMesh1=new THREE.Mesh(newCube1,material);
    newMesh1.position.set(300,200,50);
    scene.add(newMesh1);

    var newCube2=new THREE.CubeGeometry(10,10,10,4,4);
    var newMesh2=new THREE.Mesh(newCube2,material);
    newMesh2.position.set(50,0,0);// 以新原点meshAll_1为坐标中心

    var newCube3=new THREE.CubeGeometry(10,10,10,4,4);
    var newMesh3=new THREE.Mesh(newCube3,material);
    newMesh3.position.set(-50,0,0);

    var newCube4=new THREE.CubeGeometry(10,10,10,4,4);
    var newMesh4=new THREE.Mesh(newCube4,material);
    newMesh4.position.set(0,-50,0);

    var newCube5=new THREE.CubeGeometry(10,10,10,4,4);
    var newMesh5=new THREE.Mesh(newCube5,material);
    newMesh5.position.set(0,50,0);

    var newCube6=new THREE.CubeGeometry(10,10,10,4,4);
    var newMesh6=new THREE.Mesh(newCube6,material);
    newMesh6.position.set(0,0,50);

    var newCube7=new THREE.CubeGeometry(10,10,10,4,4);
    var newMesh7=new THREE.Mesh(newCube7,material);
    newMesh7.position.set(0,0,-50);

    var pivotPoint = new THREE.Object3D();
    pivotPoint.add(mesh2);
    pivotPoint.add(mesh3);
    pivotPoint.add(mesh4);
    pivotPoint.add(mesh5);
    pivotPoint.add(mesh6);
    pivotPoint.add(mesh7);
    meshAll.add(pivotPoint);// 将除原点以外的几何体放进一个空间，可以集中旋转
    scene.add(meshAll);


    var pivotPoint1=new THREE.Object3D();
    pivotPoint1.add(newMesh2);
    pivotPoint1.add(newMesh3);
    pivotPoint1.add(newMesh4);
    pivotPoint1.add(newMesh5);
    pivotPoint1.add(newMesh6);
    pivotPoint1.add(newMesh7);
    meshAll_1.add(pivotPoint1);
    scene.add(meshAll_1);
}

function animate() {
    /* **********************************矩阵旋转************************** */
    // var axis = new THREE.Vector3(1,1,0);    //创建一个三维向量
    // var rotWorldMatrix = new THREE.Matrix4();      //创建一个4*4矩阵
    // rotWorldMatrix.makeRotationAxis(axis.normalize(),  Math.PI/4 );// rotWorldMatrix.makeRotationAxis( 旋转轴，旋转弧度 )；计算出所选轴的方向向量，将其按照逆时针方向旋转指定角度后返回到rotWorldMatrix这个矩阵中，这就是旋转矩阵
    // rotWorldMatrix.multiply(mesh.matrix);// 将mesh矩阵与旋转矩阵相乘后返回一个新矩阵
    // mesh.matrix = rotWorldMatrix;// 设置mesh的新位置
    // mesh.rotation.setFromRotationMatrix(mesh.matrix);
    //
    // rotWorldMatrix.multiply(meshAll.matrix);                // pre-multiply
    // meshAll.matrix = rotWorldMatrix;
    // meshAll.rotation.setFromRotationMatrix(meshAll.matrix);

    /* **********************************矩阵旋转************************** */

    mesh.rotateY(0.01);
    mesh.rotateX(0.01);
    mesh.rotateZ(0.01);
    meshAll.rotateY(-0.01);// meshALL以(0,0,0)为原点沿Y轴旋转
    meshAll_1.rotateX(-0.01);// meshALL_1以(300,200,50)为原点沿（-1,1,1）旋转
    meshAll_1.rotateY(0.01);
    meshAll_1.rotateZ(0.01);
    // var v1=new THREE.Vector3(1,1,1);
    // meshAll.rotateOnAxis(v1,0.01);
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}

function threeStart() {
    initThree();
    initCamera();
    initScene();
    initLight();
    initNet();
    initHelper();
    initCube();
    initObject();
    animate();
    renderer.clear();
    renderer.render(scene,camera);
}

window.onload=threeStart;