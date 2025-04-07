import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import house from './house.js';

const scene = new THREE.Scene();
scene.add(house);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
camera.position.set(3000, 3000, 3000);
camera.lookAt(0, 0, 0);

const directionLight = new THREE.DirectionalLight(0xffffff);
directionLight.position.set(3000, 3000, 3000);
scene.add(directionLight);

const axesHelper = new THREE.AxesHelper(5000);
scene.add(axesHelper);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

function animate () {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
