import * as THREE from 'three';

const geometry = new THREE.BufferGeometry();

const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 100, 0), new THREE.Vector3(100, 0, 0)];

geometry.setFromPoints(points);

const colors = new Float32Array([
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
]);

geometry.attributes.color = new THREE.BufferAttribute(colors, 3);

// const material = new THREE.PointsMaterial({ size: 10, vertexColors: true });

// const material = new THREE.LineBasicMaterial({ vertexColors: true});

// const mesh = new THREE.LineLoop(geometry, material);

const material = new THREE.MeshBasicMaterial({
  vertexColors: true,
  side: THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry, material);

console.log('mesh', mesh);

export default mesh;