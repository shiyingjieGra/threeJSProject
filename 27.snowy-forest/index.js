import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import mountainside from './mountainside.js';
import snow from './snow.js';


const scene = new THREE.Scene();

scene.add(mountainside);
scene.add(snow);

const light = new THREE.DirectionalLight(0xffffff, 2);
light.castShadow = true;
light.shadow.camera.left = -2000;
light.shadow.camera.right = 2000;
light.shadow.camera.top = 2000;
light.shadow.camera.bottom = -2000;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 10000;
light.position.set(1000, 1000, 1000);
scene.add(light);

const ambientLigt = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLigt);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
camera.position.set(300, 300, 500);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(width, height);
renderer.shadowMap.enabled = true;
renderer.setClearColor(new THREE.Color('darkblue'));
document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  light.position.x = Math.sin(new Date() * 0.0001) * 1000;
  light.position.z = Math.cos(new Date() * 0.0001) * 1000;
}
animate();
