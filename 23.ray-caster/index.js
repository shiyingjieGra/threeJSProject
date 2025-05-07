import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import mesh from './mesh2.js';

const scene = new THREE.Scene();

scene.add(mesh);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
camera.position.set(500, 500, 500);
camera.lookAt(0, 0, 0);

const light = new THREE.AmbientLight(0xffffff, 1);
light.position.set(500, 400, 300);
scene.add(light);

const axesHelper = new THREE.AxesHelper(500);
scene.add(axesHelper);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.append(renderer.domElement);

renderer.domElement.addEventListener('click', (e) => {
  const x = (e.offsetX / width) * 2 - 1;
  const y = -(e.offsetY / height) * 2 + 1;
  console.log('click', x, y);
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
  const intersects = raycaster.intersectObjects(mesh.children);
  console.log(intersects);
  if (intersects.length > 0) {
    const arrowHelper = new THREE.ArrowHelper(raycaster.ray.direction, raycaster.ray.origin, 1000);
    scene.add(arrowHelper);
  }
  intersects.forEach((intersect) => {
    intersect.object.material.color = new THREE.Color('red');
  });
})

const controls = new OrbitControls(camera, renderer.domElement)
controls.autoRotate = true;
controls.autoRotateSpeed = 5;
controls.enableDamping = true;
controls.enableRotate = false;
controls.enablePan = false;
controls.enableZoom = false;
controls.maxPolarAngle = Math.PI / 2;

const gui = new GUI();
gui.add(controls, 'autoRotate');
gui.add(controls, 'autoRotateSpeed', 0, 20).step(1);
gui.add(controls, 'enableDamping');
gui.add(controls, 'enableRotate');
gui.add(controls, 'enablePan');
gui.add(controls, 'enableZoom');

function animate() {
  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

