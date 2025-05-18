import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';
import loadTree from './tree.js';

const geometry = new THREE.PlaneGeometry(3000, 3000, 100, 100);

const positions = geometry.attributes.position;

const noise = createNoise2D();

const heightArr = [];

for (let i = 0; i < positions.count; i++) {
  const x = positions.getX(i);
  const y = positions.getY(i);

  const z = noise(x / 600, y / 600) * 80;

  positions.setZ(i, z);
  heightArr.push(positions.getZ(i));
}

heightArr.sort();
const minHeight = heightArr[0];
const maxHeight = heightArr[heightArr.length - 1];

const heightRange = maxHeight - minHeight;

const startColor = new THREE.Color('#F5F5F5');
const endColor = new THREE.Color('white');

const colorArr = [];
for (let i = 0; i < positions.count; i++) {
  const z = positions.getZ(i);
  const normalizedHeight = (z - minHeight) / heightRange;
  const color = startColor.clone().lerp(endColor, normalizedHeight);
  colorArr.push(color.r, color.g, color.b);
}

geometry.attributes.color = new THREE.BufferAttribute(new Float32Array(colorArr), 3);

const material = new THREE.MeshLambertMaterial({ vertexColors:true, });

const mesh = new THREE.Mesh(geometry, material);
mesh.rotateX(-Math.PI / 2);
mesh.receiveShadow = true;

loadTree(tree => {
  let i = 0;
  while (i < positions.count) {
    const cloneTree = tree.clone();
    const x = positions.getX(i);
    const y = positions.getY(i);
    const z = positions.getZ(i);
    cloneTree.position.set(x, y, z);
    cloneTree.rotateX(Math.PI / 2);
    mesh.add(cloneTree);
    i += Math.floor(Math.random() * 300);
  }
})

export default mesh;