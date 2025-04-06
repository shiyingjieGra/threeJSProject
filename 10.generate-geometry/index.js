import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { renderGeometry } from './mesh.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const scene = new THREE.Scene();

const controlObj = {
    type: 'extrudeGeometry',
    pointNum: 20,
    radius: 20, // 圆柱体半径
    radialSegments: 20, // 圆柱体径向分段数
}

let currentMesh = renderGeometry(controlObj);
scene.add(currentMesh);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const directionLight = new THREE.DirectionalLight(0xffffff);
directionLight.position.set(100, 100, 100);
scene.add(directionLight);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const axesHelper = new THREE.AxesHelper(200);
scene.add(axesHelper);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
const gui = new GUI();
gui.add(controlObj, 'type', ['latheGeometry', 'tubeGeometry', 'shapeGeometry']).name('类型').onChange(renderMesh);
gui.add(controlObj, 'pointNum', 3, 100, 1).name('分段数').onChange(renderMesh);
gui.add(controlObj, 'radius', 0, 100, 1).name('半径').onChange(renderMesh);
gui.add(controlObj, 'radialSegments', 3, 100, 1).name('径向分段数').onChange(renderMesh);

function renderMesh () {
    scene.remove(currentMesh);
    currentMesh = renderGeometry(controlObj);
    scene.add(currentMesh);
}
