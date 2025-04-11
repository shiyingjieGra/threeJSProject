import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { mesh, renderLight } from './mesh.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const scene = new THREE.Scene();
const controlObj = {
  type: 'directionalLight'
}
const light = renderLight(controlObj);
scene.add(mesh, light);

const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
camera.position.set(200, 800, 800);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

let gui = new GUI();
refreshGui(light)


function resetLight () {
  const light = scene.getObjectByName('light');
  if(light) {
    scene.remove(light);
  }
  const newLight = renderLight(controlObj);
  scene.add(newLight);
  refreshGui(newLight);
}

function refreshGui (light) {
  gui.destroy();
  gui = new GUI();
  gui.add(controlObj, 'type', ['directionalLight', 'pointLight', 'ambientLight', 'spotLight']).onChange(resetLight);
  const f1 = gui.addFolder('光');
  f1.add(light.position, 'x').min(-1000).max(1000).step(10);
  f1.add(light.position, 'y').min(-1000).max(1000).step(10);
  f1.add(light.position, 'z').min(-1000).max(1000).step(10);
  f1.add(light, 'intensity').min(0).max(10).step(0.1);
  f1.open();
}
