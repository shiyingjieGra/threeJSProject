import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'

const scene = new THREE.Scene();

const axesHelper = new THREE.AxesHelper(200);
// scene.add(axesHelper);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const camera2 = new THREE.PerspectiveCamera(20, 16 / 9, 100, 300);
let cameraHelper = new THREE.CameraHelper(camera2);
scene.add(cameraHelper);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

function onCameraChange () {
  scene.remove(cameraHelper);
  cameraHelper = new THREE.CameraHelper(camera2);
  scene.add(cameraHelper);
}
function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

const gui = new GUI();
const cameraFolder = gui.addFolder('Camera');
cameraFolder.add(camera2, 'fov', 10, 100).onChange(onCameraChange)
cameraFolder.add(camera2, 'aspect', { '16:9': 16 / 9, '4:3': 4 / 3, '1:1': 1 / 1 }).onChange(onCameraChange)
cameraFolder.add(camera2, 'near', 0, 300).onChange(onCameraChange)
cameraFolder.add(camera2, 'far', 0, 300).onChange(onCameraChange)
cameraFolder.open();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);