import * as THREE from 'three';

const geometry = new THREE.BufferGeometry();

const vertices = new Float32Array([
  0, 0, 100,
  0, 100, 100,
  100, 0, 100,
  100, 100, 100,
  100, 100, 0,
  0, 100, 0,
  0, 0, 0,
  100, 0, 0
]);

const attribute = new THREE.BufferAttribute(vertices, 3);
geometry.attributes.position = attribute;

const index = new Uint16Array([
  3, 1, 0,
  0, 2, 3,
  0, 1, 6,
  5, 6, 1,
  1, 3, 5,
  5, 3, 4,
  7, 4, 2,
  4, 3, 2,
  6, 5, 4,
  4, 7, 6,
  7, 0, 6,
  2, 0, 7,
]);
geometry.index = new THREE.BufferAttribute(index, 1);

const material = new THREE.MeshBasicMaterial({ color: new THREE.Color('orange')});;

const mesh = new THREE.Mesh(geometry, material);

export default mesh;

// import * as THREE from 'three';

// const geometry = new THREE.BoxGeometry(100, 100, 100);
// const material = new THREE.MeshLambertMaterial(({
//     color: new THREE.Color('orange')
// }));
// const mesh = new THREE.Mesh(geometry, material);

// console.log(mesh);

// export default mesh;
