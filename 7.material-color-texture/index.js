import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { line, plane, sphere, wall } from './mesh.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const scene = new THREE.Scene();
scene.add(wall);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.set(80, 80, 200);
camera.lookAt(0, 0, 0);

const pointLight = new THREE.PointLight(0xffffff, 100);
pointLight.position.set(80, 80, 80);
scene.add(pointLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

function animate () {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

const controlsObj = {
    meshType: 'wall',
    isDoubleRender: false,
    opacity: 0.5
}

const gui = new GUI();
gui.add(controlsObj, 'meshType', { '线型': 'line', '网格': 'plane', '地球': 'sphere', '一面墙': 'wall'}).name('图形类型').onChange(meshTypeChange);

let planeAdvance = gui.addFolder('平面配置');
planeAdvance.addColor(plane.material, 'color').name('颜色');
planeAdvance.add(controlsObj, 'isDoubleRender').name('双面渲染').onChange(toggleDoubleSideRender)
planeAdvance.add(controlsObj, 'opacity', 0, 1).name('透明度').onChange(changeOpacity);
planeAdvance.open();

const meshList = [line, plane, sphere, wall];

function meshTypeChange (type) {
    meshList.forEach(mesh => {
        scene.remove(mesh);
    })
    switch (type) {
        case 'line':
            scene.add(line);
            break;
        case 'plane':
            scene.add(plane);
            break;
        case 'sphere':
            scene.add(sphere);
            break;
        case 'wall':
            scene.add(wall);
        default:
            break;
    }
}

function toggleDoubleSideRender (isDoubleRender) {
    plane.material.side = isDoubleRender ? THREE.DoubleSide : THREE.FrontSide;
    console.log('isDoubleRender', isDoubleRender);
}

function changeOpacity (opacity) {
    plane.material.opacity = opacity;
}
