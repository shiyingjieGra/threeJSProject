import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import mesh from './mesh.js';

const scene = new THREE.Scene();
scene.add(mesh);

// scene.add(mesh);

// mesh.name = 'Box';
// const times = [0, 2, 5];
// const values = [
//   0, 0, 0,
//   0, 100, 0,
//   0, 0, -100,
// ];

// const times2 = [0, 1, 4];
// const values2 = [
//   1, 1, 1,
//   1, 2, 1,
//   1, 0.5, 1
// ];

// const track = new THREE.KeyframeTrack('Box.position', times, values);
// const track2 = new THREE.KeyframeTrack('Box.scale', times2, values2);
// const clip = new THREE.AnimationClip('hello', 5, [track, track2]);
// const mixer = new THREE.AnimationMixer(mesh);
// const clipAction = mixer.clipAction(clip);
// clipAction.timeScale = 2;
// clipAction.play();

// setTimeout(() => {
//   clipAction.paused = 2;
// }, 2000);

const width = window.innerWidth;
const height = window.innerHeight;

const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.set(300, 300, 500);
camera.lookAt(0, 0, 0);
scene.add(camera);

const directLight = new THREE.DirectionalLight(0xffffff, 2);
directLight.position.set(500, 400, 300);
scene.add(directLight);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const clock = new THREE.Clock();
function animation() {
  requestAnimationFrame(animation);
  renderer.render(scene, camera);
  // mixer.update(clock.getDelta())
}
animation();

