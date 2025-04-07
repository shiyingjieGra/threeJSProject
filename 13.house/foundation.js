import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(4000, 300, 3000);
const material = new THREE.MeshLambertMaterial({color: new THREE.Color('gray')});

const foundation = new THREE.Mesh(geometry, material);

export default foundation;