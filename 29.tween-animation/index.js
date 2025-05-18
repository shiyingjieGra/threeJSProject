import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Tween, Easing, Group } from '@tweenjs/tween.js';

const scene = new THREE.Scene();

const box = new THREE.Mesh(new THREE.BoxGeometry(30, 30, 30), new THREE.MeshPhongMaterial({color: new THREE.Color('orange')}));
scene.add(box);

const axesHelper = new THREE.AxesHelper(200);
scene.add(axesHelper);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.set(150, 150, 150);
camera.lookAt(0, 0, 0);

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(100, 200, 300);
scene.add(light);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.append(renderer.domElement);

const tweenPosition = new Tween(box.position).
  to({x: 100}, 5000).
  easing(Easing.Quadratic.InOut)
  .repeat(0)
  // .start();

const tweenRotation = new Tween(box.rotation).
  to({x: Math.PI * 2}, 5000)
  .repeat(Infinity)
  // .start();

const jumpTween = new Tween(box.position)
  .to({y: 100}, 1000)
  .easing(Easing.Quadratic.InOut)
const group = new Group();
group.add(tweenPosition, tweenRotation, jumpTween);

jumpTween.chain(tweenPosition);
tweenPosition.chain(tweenRotation);
jumpTween.start();

// const r = 50;
// const tweenAngle = new Tween({ angle: 0 }).to({ angle: Math.PI * 2 }, 5000).
//   onUpdate(function (obj) {
//     camera.position.x = r * Math.cos(obj.angle);
//     camera.position.z = r * Math.sin(obj.angle);
//     camera.lookAt(0, 0, 0);
//   })
//   // .easing(Easing.Bounce.InOut)
//   .repeat(Infinity).start();

function animate () {
  // tweenPosition.update();
  // tweenAngle.update();
  // tweenRotation.update();
  group.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

const controls = new OrbitControls(camera, renderer.domElement);