import * as THREE from 'three';

const mesh = new THREE.Group();

const planeGeometry = new THREE.PlaneGeometry(2000, 2000);
planeGeometry.rotateX(-Math.PI / 2);
const planeMaterial = new THREE.MeshLambertMaterial({ color: new THREE.Color('skyblue')});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;

const boxGeometry = new THREE.BoxGeometry(200, 600, 200);
const material = new THREE.MeshLambertMaterial({ color: new THREE.Color('orange')});
const box = new THREE.Mesh(boxGeometry, material);
box.translateY(300);
box.castShadow = true;

const box2 = box.clone();
box2.translateX(500);

mesh.add(plane, box, box2);

export default mesh;