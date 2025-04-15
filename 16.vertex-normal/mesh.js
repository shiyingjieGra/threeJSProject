import * as THREE from 'three';

const meshArray = [
  new THREE.Vector3(-100, 0, 0),
  new THREE.Vector3(50, 100, 0),
  new THREE.Vector3(100, 0, 100),
  new THREE.Vector3(100, 0, 0),
];

const curve = new THREE.CubicBezierCurve3(...meshArray);

const geometry = new THREE.TubeGeometry(curve, 50, 10, 20);

const material = new THREE.MeshPhongMaterial({ color: new THREE.Color('orange'), shininess: 500 });

const mesh = new THREE.Mesh(geometry, material);

console.log('mesh', mesh);

export default mesh;