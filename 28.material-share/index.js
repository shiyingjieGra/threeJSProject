import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import loadTree from './mesh.js';

const scene = new THREE.Scene();

const width = window.innerWidth;
const height = window.innerHeight;

loadTree((gltf) => {
  const tree = gltf.scene;
  const group = new THREE.Group();
  const tree2 = tree.clone();
  tree2.position.x = -200;
  const tree3 = tree.clone();
  tree3.position.x = 200;
  group.add(tree, tree2, tree3);
  tree.getObjectByName('leaves001').material.color = new THREE.Color('green');
  tree.getObjectByName('tree001').material.color = new THREE.Color('brown');
  tree2.traverse((obj) => {
    if (obj.isMesh) {
      obj.material = obj.material.clone();
    }
  });
  tree2.getObjectByName('leaves001').material.color = new THREE.Color('orange');
  scene.add(group);
});

const geometry = new THREE.BoxGeometry(100, 100, 100);
const material = new THREE.MeshLambertMaterial({ color: new THREE.Color('red')});
const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

const mesh2 = mesh.clone();
mesh2.material = mesh2.material.clone();
mesh2.geometry = mesh2.geometry.clone();
mesh2.material.color = new THREE.Color('blue');
mesh2.position.y = 200;
const positions = mesh2.geometry.attributes.position;
for (let index = 0; index < positions.count; index++) {
  positions.setX(index, positions.getX(index) * 2);
}
// scene.add(mesh2);

const mesh3 = mesh.clone();
mesh3.position.x = 200;
const mesh4 = mesh.clone();
mesh4.position.x = -200;
// scene.add(mesh3, mesh4);

// mesh3.material.visible = false;


const camera = new THREE.PerspectiveCamera(75, width/ height, 0.1, 1000);
camera.position.set(300, 300, 500);
camera.lookAt(0, 0, 0);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(500, 400, 300);
scene.add(directionalLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const clock = new THREE.Clock();
function animate() {
  const delta = clock.getDelta();
  mesh.rotateY(delta * Math.random());
  mesh.rotateX(delta * Math.random());
  mesh.rotateZ(delta * Math.random());
  mesh2.rotation.copy(mesh.rotation);
  mesh3.rotation.copy(mesh.rotation);
  mesh4.rotation.copy(mesh.rotation);
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();