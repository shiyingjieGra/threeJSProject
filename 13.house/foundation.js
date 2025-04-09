import * as THREE from 'three';

const texture = new THREE.TextureLoader().load('./shuini.png');
texture.colorSpace = THREE.SRGBColorSpace;

const geometry = new THREE.BoxGeometry(4000, 300, 3000);
const material = new THREE.MeshLambertMaterial({map: texture, aoMap: texture});

const foundation = new THREE.Mesh(geometry, material);

export default foundation;