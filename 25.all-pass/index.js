import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { AfterimagePass } from 'three/addons/postprocessing/AfterimagePass.js';
import { FilmPass } from 'three/addons/postprocessing/FilmPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';
import { HalftonePass } from 'three/addons/postprocessing/HalftonePass.js'
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js'
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { GammaCorrectionShader } from 'three/addons/shaders/GammaCorrectionShader.js';

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(300, 300, 300);
const material = new THREE.MeshLambertMaterial({ color: new THREE.Color('orange') });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const directLight = new THREE.DirectionalLight(0xffffff, 2);
directLight.position.set(500, 400, 300);
scene.add(directLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1500);
camera.position.set(400, 500, 600);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

document.body.append(renderer.domElement);

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const glitchPass = new GlitchPass();
composer.addPass(glitchPass);

const afterimagePass = new AfterimagePass();
afterimagePass.enabled = false;
composer.addPass(afterimagePass);

const filmPass = new FilmPass();
filmPass.enabled = false;
composer.addPass(filmPass);

const v = new THREE.Vector2(width, height);
const unrealBloomPass = new UnrealBloomPass(v);
unrealBloomPass.enabled = false;
unrealBloomPass.strength = 0.8;
unrealBloomPass.radius = 10;
composer.addPass(unrealBloomPass);

const halftonePass = new HalftonePass();
halftonePass.enabled = false;
composer.addPass(halftonePass);

const outlinePass = new OutlinePass(new THREE.Vector2(width, width), scene, camera);
outlinePass.selectedObjects = [cube];
outlinePass.enabled = false;
outlinePass.visibleEdgeColor.set('white');
outlinePass.hiddenEdgeColor.set('black');
composer.addPass(outlinePass);

const pixelRatio = renderer.getPixelRatio();
const smaaPass = new SMAAPass(width * pixelRatio, height * pixelRatio);
smaaPass.enabled = false;
composer.addPass(smaaPass);

const gammaPass = new ShaderPass(GammaCorrectionShader)
gammaPass.enabled = false;
composer.addPass(gammaPass);

const controlObject = {
  type: 'GlitchPass'
}

const gui = new GUI();
gui.add(controlObject, 'type', ['GlitchPass', 'AfterimagePass', 'FilmPass', 'UnrealBloomPass', 'HalftonePass', 'OutlinePass']).name('动画类型').onChange(changeType);
gui.add(smaaPass, 'enabled').name('抗锯齿');
gui.add(gammaPass, 'enabled').name('伽马校正');
const glitchPassFolder = gui.addFolder('GlitchPass');
glitchPassFolder.add(glitchPass, 'goWild');
glitchPassFolder.add(glitchPass, 'curF', 0, 1);
glitchPassFolder.add(glitchPass, 'randX');
const afterimagePassFolder = gui.addFolder('AfterimagePass');
afterimagePassFolder.add(afterimagePass.uniforms.damp, 'value', 0, 1).name('残影系数');
const filmPassFolder = gui.addFolder('FilmPass');
filmPassFolder.add(filmPass.uniforms.time, 'value', 0, 1).name('时间');
filmPassFolder.add(filmPass.uniforms.grayscale, 'value', 0, 1).name('灰度');
filmPassFolder.add(filmPass.uniforms.intensity, 'value', 0, 1).name('噪声强度');
const unrealBloomPassFolder = gui.addFolder('UnrealBloomPass');
unrealBloomPassFolder.add(unrealBloomPass, 'strength', 0, 10).name('强度');
unrealBloomPassFolder.add(unrealBloomPass, 'radius', 0, 10).name('半径');
const halftonePassFolder = gui.addFolder('HalftonePass');
halftonePassFolder.add(halftonePass.uniforms.radius, 'value', 0, 10).name('半径');
halftonePassFolder.add(halftonePass.uniforms.shape, 'value', [1, 2, 3, 4, 5]).name('形状');
halftonePassFolder.add(halftonePass.uniforms.scatter, 'value', 0, 1).name('散布随机度');
const outlinePassFolder = gui.addFolder('OutlinePass');
console.log(outlinePass);
outlinePassFolder.add(outlinePass, 'visibleEdgeColor');
outlinePassFolder.add(outlinePass, 'hiddenEdgeColor');
outlinePassFolder.add(outlinePass, 'edgeStrength', 0, 10).name('边缘发光强度');
outlinePassFolder.add(outlinePass, 'edgeThickness', 0, 10).name('边缘发光厚度');
outlinePassFolder.add(outlinePass, 'pulsePeriod', 0, 10).name('脉动周期');

function changeType(type) {
  console.log(type, composer);
  composer.passes.forEach(item => {
    if (item instanceof GlitchPass) {
      item.enabled = type === 'GlitchPass';
    }
    if (item instanceof AfterimagePass) {
      item.enabled = type === 'AfterimagePass';
    }
    if (item instanceof FilmPass) {
      item.enabled = type === 'FilmPass';
    }
    if (item instanceof UnrealBloomPass) {
      item.enabled = type === 'UnrealBloomPass';
    }
    if (item instanceof HalftonePass) {
      item.enabled = type === 'HalftonePass';
    }
    if (item instanceof OutlinePass) {
      item.enabled = type === 'OutlinePass';
    }
  })
}

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  if (afterimagePass.enabled) {
    cube.position.x = Math.sin(Date.now() * 0.001) * 100;
    cube.position.y = Math.cos(Date.now() * 0.001) * 100;
  }
  requestAnimationFrame(animate);
  // renderer.render(scene, camera);
  composer.render();
}

animate();

