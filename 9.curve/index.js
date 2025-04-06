import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import mesh, { renderEllipse } from './mesh.js';

const scene = new THREE.Scene();
scene.add(mesh);

const axesHelper = new THREE.AxesHelper(200);
scene.add(axesHelper);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(75, width/ height, 0.1, 1000);
camera.position.set(0, 0, 200);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

function animate () {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

const controlObj = {
    type: 'points',
    xWidth: 100,
    yWidth: 50,
    pointNum: 30,
    pointSize: 3,
    startRange: 0,
    endRange: 2,
    controlPointY: 50,
    controlPointX: 50,
}

// 初始化gui
const gui = new GUI();
gui.add(controlObj, 'type', ['points', 'line', 'sinLine', 'sinPoints', 'quadraticBezierCurve', 'cubicBezierCurve', 'curvePath']).name('图形类别').onChange(resetMesh);
gui.add(controlObj, 'xWidth', 0, 100, 1).name('x轴宽度').onChange(resetMesh);
gui.add(controlObj, 'yWidth', 0, 100, 1).name('y轴宽度').onChange(resetMesh);
gui.add(controlObj, 'pointNum', 1, 100, 1).name('点数量').onChange(resetMesh);
gui.add(controlObj, 'pointSize', 1, 10, 1).name('点大小').onChange(resetMesh);
gui.add(controlObj, 'startRange', 0, 2, 0.01).name('起始角度(PI)').onChange(resetMesh);
gui.add(controlObj, 'endRange', 0, 2, 0.01).name('结束角度(PI)').onChange(resetMesh);
gui.add(controlObj, 'controlPointY', 0, 100, 1).name('纵向控制点').onChange(resetMesh);
gui.add(controlObj, 'controlPointX', 0, 100, 1).name('横向控制点').onChange(resetMesh);

let currentMesh = mesh;

function resetMesh () {
    scene.remove(currentMesh);
    const renderMesh = renderEllipse(controlObj);
    currentMesh = renderMesh;
    scene.add(renderMesh);
}