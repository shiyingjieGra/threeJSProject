import * as THREE from 'three';

const group = new THREE.Group();

function createBox (color, x, y, z) {
  const geometry = new THREE.BoxGeometry(100, 100, 100);
  const material = new THREE.MeshLambertMaterial({ color: new THREE.Color(color) });
  const box = new THREE.Mesh(geometry, material);
  box.position.set(x, y, z);
  return box;
}
const boxa = createBox('red', 0, 0, 0);
const boxb = createBox('green', 0, 0, 300);
const boxc = createBox('blue', 300, 0, 0);

group.add(boxa, boxb, boxc);

// requestAnimationFrame(() => {
//   const rayCaster = new THREE.Raycaster();
//   rayCaster.ray.origin.set(-100, 30, 0);
//   rayCaster.ray.direction.set(1, 0, 0);

//   const arrowHelper = new THREE.ArrowHelper(rayCaster.ray.direction, rayCaster.ray.origin, 600);
//   group.add(arrowHelper);

//   const intersections = rayCaster.intersectObjects([boxa, boxb, boxc]);
//   console.log(intersections);
//   intersections.forEach(intersection => {
//     intersection.object.material.color = new THREE.Color('pink');
//   });
// })

export default group;
