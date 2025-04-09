import * as THREE from 'three';
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import house from './house.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const scene = new THREE.Scene();
scene.fog = new THREE.Fog( 0xcccccc, 100, 20000);

const gui = new GUI();
gui.add(scene.fog, 'near', 10, 1000, 10).name('near');
gui.add(scene.fog, 'far', 20, 100000, 10).name('far');


scene.add(house);

const directionLight = new THREE.DirectionalLight(0xffffff);
directionLight.position.set(3000, 3000, 3000);
scene.add(directionLight);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const axesHelper = new THREE.AxesHelper(20000);
scene.add(axesHelper);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
camera.position.set(3000, 3000, 3000);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  logarithmicDepthBuffer: true,
});
renderer.setClearColor(new THREE.Color('skyblue'))
renderer.setSize(width, height)

function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
