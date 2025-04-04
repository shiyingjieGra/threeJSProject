import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import mesh from './mesh2.js';

const scene = new THREE.Scene();

scene.add(mesh);

const axesHelper = new THREE.AxesHelper(200);
// scene.add(axesHelper);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000);
camera.position.set(0, 0, 200);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);;

document.body.append(renderer.domElement);

const control = new OrbitControls(camera, renderer.domElement);

function animate () {
    mesh.material.map.offset.x += 0.001;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();