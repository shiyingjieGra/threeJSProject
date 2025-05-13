import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import mesh from './mesh3.js'

const scene = new THREE.Scene();

scene.add(mesh);

const axesHelper = new THREE.AxesHelper(50);
// scene.add(axesHelper);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

function animate () {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();