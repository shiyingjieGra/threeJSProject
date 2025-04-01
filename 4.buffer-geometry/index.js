import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import mesh from './mesh3.js'

const scene = new THREE.Scene();

scene.add(mesh);

const pointLight = new THREE.PointLight(new THREE.Color('white', 10000));
pointLight.position.set(80, 80, 80);
scene.add(pointLight);

const axesHelper = new THREE.AxesHelper(200);
scene.add(axesHelper);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.set(200, 200, 200);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.append(renderer.domElement);

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

const orBitControl = new OrbitControls(camera, renderer.domElement);