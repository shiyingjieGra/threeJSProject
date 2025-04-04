import * as THREE from 'three';

const texture = new THREE.TextureLoader().load('./muxing.jpg');

const geometry = new THREE.SphereGeometry(100);

const material = new THREE.MeshBasicMaterial({map: texture});
texture.colorSpace = THREE.SRGBColorSpace;
texture.wrapS = THREE.RepeatWrapping;

const mesh = new THREE.Mesh(geometry, material);

export default mesh;