import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();

const texture = textureLoader.load('./bg.jpg');

const uvs = new Float32Array([
    0, 0.5,
    0.5, 0.5,
    0, 0,
    0.5, 0
]);

const geometry = new THREE.PlaneGeometry(200, 100);

geometry.attributes.uv = new THREE.BufferAttribute(uvs, 2);

const material = new THREE.MeshBasicMaterial({map: texture});
texture.colorSpace = THREE.SRGBColorSpace;

const mesh = new THREE.Mesh(geometry, material);

console.log(mesh);

export default mesh;