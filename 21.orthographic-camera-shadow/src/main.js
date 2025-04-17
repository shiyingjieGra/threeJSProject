import './style.css';
import * as THREE from 'three';
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import mesh from './mesh.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const scene = new THREE.Scene();

scene.add(mesh);

// const geometry = new THREE.BoxGeometry(100, 100, 100);
// const material = new THREE.MeshLambertMaterial({
//   color: new THREE.Color('orange')
// });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

const axesHelper = new THREE.AxesHelper(500);
scene.add(axesHelper);

// const light = new THREE.DirectionalLight(0xffffff);
// const light = new THREE.PointLight(0xffffff, 10000000);
const light = new THREE.SpotLight(0xffffff, 10000000);
light.position.set(1000, 1000, 500);
light.castShadow = true;
light.shadow.camera.left = -500;
light.shadow.camera.right = 500;
light.shadow.camera.top = 500;
light.shadow.camera.bottom = -500;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 3000;
scene.add(light);

// const pointLight = new THREE.PointLight(0xffffff, 10000000);
// scene.add(pointLight);

const gui = new GUI();
gui.add(light.position, 'x').min(-10000).max(10000);
gui.add(light.position, 'y').min(-10000).max(10000);
gui.add(light.position, 'z').min(-10000).max(10000);
gui.add(light.shadow.camera, 'near').min(0.1).max(10);
gui.add(light.shadow.camera, 'far').min(0.1).max(10000);

console.log(light.shadow.camera);

const cameraHelper = new THREE.CameraHelper(light.shadow.camera);
scene.add(cameraHelper);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
camera.position.set(1000, 2000, 1000);
camera.lookAt(0, 0, 0);

// const aspectRatio = width / height;
// const num = 500;
// const camera2 = new THREE.OrthographicCamera(-num * aspectRatio, num * aspectRatio, num, -num, 0.1, 10000);
// camera2.position.set(400, 200, 300);
// camera2.lookAt(0, 0, 0);

// const cameraHelper = new THREE.CameraHelper(camera2);
// scene.add(cameraHelper);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height)
renderer.shadowMap.enabled = true;

function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);