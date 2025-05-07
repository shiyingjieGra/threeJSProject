import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import mesh from './mesh.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { AfterimagePass } from 'three/addons/postprocessing/AfterimagePass.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';


const scene = new THREE.Scene();
scene.add(mesh);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.set(0, 500, 500);
camera.lookAt(0, 0, 0);

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(300, 200, 400);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const axesHelper = new THREE.AxesHelper(500);
scene.add(axesHelper);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);


const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const v = new THREE.Vector2(window.innerWidth, window.innerWidth);
const outlinePass = new OutlinePass(v, scene, camera);
outlinePass.visibleEdgeColor.set('orange');
outlinePass.edgeStrength = 10;
outlinePass.edgeThickness = 10;
outlinePass.pulsePeriod = 1.5;
composer.addPass(outlinePass);

const bloomPass = new UnrealBloomPass(v);
bloomPass.strength = 0.5;

// 动作添加残影
const afterimagePass = new AfterimagePass();
afterimagePass.uniforms.damp.value = 0.9;
// composer.addPass(afterimagePass);

renderer.domElement.addEventListener('click', (e) => {
  const y = -((e.offsetY / height) * 2 - 1);
  const x = (e.offsetX / width) * 2 - 1;

  const rayCaster = new THREE.Raycaster();
  rayCaster.setFromCamera(new THREE.Vector2(x, y), camera);

  const intersections = rayCaster.intersectObjects(mesh.children);

  if (intersections.length > 0)  {
    outlinePass.selectedObjects = [intersections[0].object];

    if (!composer.passes.includes(bloomPass)) {
      composer.addPass(bloomPass);
    }
  } else {
    outlinePass.selectedObjects = [];
    composer.removePass(bloomPass);
  }

  intersections.forEach(item => {
    item.object.material.color.set('yellow');
  })
})

function animate() {
  // mesh.position.x += 1;
  requestAnimationFrame(animate);
  // renderer.render(scene, camera);
  composer.render();
}
animate();
