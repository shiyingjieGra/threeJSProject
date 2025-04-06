import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { renderGeometry } from './vase.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const scene = new THREE.Scene();

const controlObj = {
    bottomWidth: 30, // 花瓶底部宽度
    bottom2BottomMiddleHeight: 90, // 花瓶底部到瓶肚的垂直高度
    bottomMiddleWidth: 120, // 瓶肚宽度
    bottomMiddle2TopMiddleHeight: 110, // 花瓶瓶肚到瓶颈的垂直高度
    topMiddleWidth: 1, // 瓶颈宽度
    topMiddle2TopHeight: 170, // 瓶颈到瓶口的高度
    topWidth: 25, // 花瓶口宽度
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

const pointLight = new THREE.PointLight(0xffffff, 10000);
pointLight.position.set(200, 200, 200);
scene.add(pointLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(lightHelper);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const axesHelper = new THREE.AxesHelper(200);
// scene.add(axesHelper);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const gui = new GUI();
gui.add(controlObj, 'bottomWidth', 10, 100, 1).name('底部宽度').onChange(renderMesh);
gui.add(controlObj, 'bottom2BottomMiddleHeight', 10, 100, 1).name('底部到瓶肚高度').onChange(renderMesh);
gui.add(controlObj, 'bottomMiddleWidth', 10, 200, 1).name('瓶肚宽度').onChange(renderMesh);
gui.add(controlObj, 'bottomMiddle2TopMiddleHeight', 80, 180, 1).name('瓶肚到瓶颈高度').onChange(renderMesh);
gui.add(controlObj, 'topMiddleWidth', 1, 100, 1).name('瓶颈宽度').onChange(renderMesh);
gui.add(controlObj, 'topMiddle2TopHeight', 150, 300, 1).name('瓶颈到瓶口高度').onChange(renderMesh);
gui.add(controlObj, 'topWidth', 10, 100, 1).name('瓶口宽度').onChange(renderMesh);

function animate() {
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animate);
}

animate();

function renderMesh () {
    scene.remove(currentMesh);
    currentMesh = renderGeometry(controlObj);
    scene.add(currentMesh);
}

controls.addEventListener('change', () => {
    pointLight.position.copy(camera.position);
    pointLight.position.z -= 50;
    directionLight.position.copy(camera.position);
    directionLight.position.z -= 50;
})
