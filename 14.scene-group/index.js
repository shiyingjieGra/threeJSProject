import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import mesh from './mesh.js';

const scene = new THREE.Scene();

const group = new THREE.Group();
group.add(mesh);
scene.add(group);
group.position.x = 200;
group.translateZ(200);

const pos = new THREE.Vector3();
mesh.getWorldPosition(pos);
console.log('pos1', pos);

const axesHelper1 = new THREE.AxesHelper(1000);
group.add(axesHelper1);

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(3000, 2000, 1000);
scene.add(light);

const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.set(500, 500, 500);
camera.lookAt(0, 0, 0);

const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

scene.traverse((obj) => {
  console.log(obj);
  if (obj.isMesh) {
    obj.material.color = new THREE.Color('blue');
  }
});

const cube = scene.getObjectByName('cube');
cube.material.color = new THREE.Color('red');


const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();