import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import mesh from './mesh.js';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const scene = new THREE.Scene();
scene.add(mesh);

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(100, 100, 100);
scene.add(light);

const light2 = new THREE.AmbientLight(0xffffff);
scene.add(light2);

const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.lookAt(0, 0, 0);
camera.position.set(10, 10, 10);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
// controls.autoRotate = true;
// controls.autoRotateSpeed = 10;
// controls.enableDamping = true;
// controls.enableRotate = false;

const gui = new GUI();
gui.add(controls, 'autoRotate');
gui.add(controls, 'autoRotateSpeed', 0, 10);
gui.add(controls, 'enableDamping');
gui.add(controls, 'enableRotate');
gui.add(controls, 'enablePan');
gui.add(controls, 'enableZoom');
gui.add(controls, 'maxPolarAngle', 0, Math.PI);



function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}

animate();